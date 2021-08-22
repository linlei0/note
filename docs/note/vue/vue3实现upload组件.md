
# vue3实现upload组件
## 通用上传组件开发
开发上传组件前我们需要了解：
- [`FormData`](https://developer.mozilla.org/zh-CN/docs/Web/API/FormData)上传文件所需API
- [ dragOver](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/dragover_event)文件拖拽到区域时触发
- [dragLeave ](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/dragleave_event) 文件离开拖动区域
- [drop](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/drop_event)文件移动到有效目标时
首先实现一个最基本的上传流程：
### 基本上传流程，点击按钮选择，完成上传
代码如下：
```js
<template>
  <div class="app-container">
      <!--使用change事件-->
      <input type="file" @change="handleFileChange">
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import axios from 'axios'
export default defineComponent({
  name: 'App',
  setup() {
    const handleFileChange = (e: Event) => {
      // 断言为HTMLInputElement
      const target = e.target as HTMLInputElement
      const files = target.files
      if(files) {
        const uploadedFile = files[0]
        const formData = new FormData()
        formData.append('file', uploadedFile)
        // 使用node模拟上传接口
        axios.post('http://localhost:3001/upload', formData, {
          headers: {
            "Content-Type": 'multipart/form-data'
          }
        }).then(resp=> {
          console.log('resp', resp)
        }).catch(error=> {

        })
      }
    }

    return {
      handleFileChange  
    }
  }
})
</script>

<style>
.page-title {
  color: #fff;
}
</style>

```
结果如下：

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/01573a21024943b3be102519ba912ab0~tplv-k3u1fbpfcp-watermark.image)
到这里我们基本的上传已经处理完成了，相对来说还是比较简单的，接下来我们创建`Uploader.vue`文件用来封装`Upload`组件。

### 我们需要实现如下功能

#### 自定义模版
我们知道使用`<input type="file">`系统自带样式比较难看所用我们需要如下处理：
- 对样式进行优化，隐藏input
- 点击`<div class="upload-area" @click="triggerUpload"></div>`使用js出发`input`的`click`事件
- 处理上传状态

代码如下：
```vue
<template>
  <div class="file-upload">
    <div class="upload-area" @click="triggerUpload"></div>
    <span v-if="fileStatus==='loading'">正在上传</span>
    <span v-else-if="fileStatus==='success'">上传成功</span>
    <span v-else-if="fileStatus==='error'">上传失败</span>
    <span v-else>点击上传</span>
    <input ref="fileInput" type="file" name="file" style="display: none" />
  </div>
</template>
<script lang="ts">
    import { computed, defineComponent, PropType, reactive, ref } from 'vue'
    import axios from 'axios'
    type UploadStatus = 'ready' | 'loading' | 'success' | 'error'
    export default defineComponent({
        props: {
            action: { // url地址
                type: String,
                required: true
            }
        },
        setup(props) {
            // input实例对象，通过与ref="fileInput"的关联获取到input实例对象
            const fileInput = ref<null | HTMLInputElement>(null)
            const fileStatus = ref<UploadStatus>('ready')
            
            // 1.div点击事件
            const triggerUpload = () => {
                if(fileInput.value) {
                    fileInput.value.click()
                }
            }
            // 通过div来触发input的change事件
            const handleFileChange = (e: Event) => {
              const target = e.target as HTMLInputElement
              const files = target.files
              if(files) {
                const uploadedFile = files[0]
                const formData = new FormData()
                formData.append('file', uploadedFile)
                readyFile.status = 'loading' // 上传之前将状态设置为loading
                axios.post(props.actions, formData, {
                  headers: {
                    "Content-Type": 'multipart/form-data'
                  }
                }).then(resp=> {
                  console.log('resp', resp)
                  readyFile.status = 'success' // 上传成功将状态设置为success
                }).catch(error=> {
                readyFile.status = 'error' // // 上传失败将状态设置为error
                })
              }
            }
            return {
                fileInput,
                triggerUpload,
                handleFileChange,
                fileStatus
            }

        }
    })
</script>
```
现在我们已经完成了对上传组件样式的优化，和上传状态的处理，接下来我们需要处理文件上传列表
#### 支持文件上传列表
处理文件上传列表我们需要有如下实现：
  - 显示文件名称
  - 状态
  - 可删除
  - 显示上传进度
  - 有可能有更丰富的显示
在上一步代码的基础上做一些修改：
```js
<template>
  <div class="file-upload">
    <div class="upload-area" @click="triggerUpload"></div>
    <!-- 点击上传态 -->
      <slot v-if="isUploading" name='loading'>
        <button disabled>正在上传</button>
      </slot>
      <!-- 上传完毕态 -->
      <slot name="uploaded" v-else-if="lastFileData && lastFileData.loaded" :uploadData="lastFileData.data">
        <button disabled>点击上传</button>
      </slot>
      <!-- 默认态 -->
      <slot v-else name='default'>
        <!-- <button disabled>点击上传</button> -->
        <span>点击上传</span>  
      </slot>
    <input ref="fileInput" type="file" name="file" style="display: none" />
    <!--展示fileList-->
    <ul>
      <li 
      v-for="file in filesList"
      :key="file.uid"
      :class="`uploaded-file upload-${file.status}`"
      >
        <span class="filname">
          {{ file.name }}
        </span>
        <button class="delete-icon" @click="reomveFile(file.uid)">Del</button>
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
    import { last } from 'lodash-es'
    import { v4 as uuidv4 } from 'uuid';
    // 定义上传状态
    type UploadStatus = 'ready' | 'loading' | 'success' | 'error' 
    // step1 定义上传文件对象接口类
    export interface UploadFile {
      uid: string; // 文件唯一id
      size: number; // 文件大小
      name: string; // 文件名称
      status: UploadStatus; // 上传状态
      raw: File;            // 文件
      progress?: string;    // 文件上传进度
      resp?: any;           // 服务端返回数据
      url?: string          // 对应展示的url
    }
    export default defineComponent({
        props: {
            action: { // url地址
                type: String,
                required: true
            }
        },
        setup(props) {
            // input实例对象，通过与ref="fileInput"的关联获取到input实例对象
            const fileInput = ref<null | HTMLInputElement>(null)
            // step2 上传文件列表
            const filesList = ref<UploadFile[]>([])
            // step4-1 判断是否正在上传中
            const isUploading = computed(()=> {
                return filesList.value.some((file)=>file.status==='loading')
            })
            //step4-2 获取上传文件的最后一项
            const lastFileData = computed(()=>{
              const lastFile = last(filesList.value)
              if(!lastFile) return false
              return {
                loaded: lastFile?.status === 'success',
                data: lastFile?.resp
              }
            })
            // 1.div点击事件
            const triggerUpload = () => {
                if(fileInput.value) {
                    fileInput.value.click()
                }
            }
            // 通过div来触发input的change事件
            const handleFileChange = (e: Event) => {
              const target = e.target as HTMLInputElement
              const files = target.files
              if(files) {
                const uploadedFile = files[0]
                const formData = new FormData()
                formData.append('file', uploadedFile)
                // step3 设置响应式对象，存储到filesList中，以便在页面中展示
                const fileObj = reactive<UploadFile>({ 
                  uid: uuid(); // 文件唯一id
                  size: uploadedFile.size,
                  name: uploadedFile.name,
                  status: 'loading',
                  raw: uploadedFile
                })
                filesList.value.push(fileObj)
                
                axios.post(props.actions, formData, {
                  headers: {
                    "Content-Type": 'multipart/form-data'
                  },
                  //step6 处理上传进度
                  onUploadProgress: (progressEvent)=> {
                      const complete = (progressEvent.loaded / progressEvent.total * 100 | 0) + '%'
                      fileObj.progress = complete
                  }
                }).then(resp=> {
                  console.log('resp', resp)
                  fileObj.status = 'success'
                  
                }).catch(error=> {
                    fileObj.status = 'error'
                }).finally(()=> {
                    // 一张图片重复上传时无法继续上传bug
                    if(fileInput.value) {
                        fileInput.value.value = ''
                    }
                })
              }
            }
            // step7 处理删除
            const reomveFile = (uid: string) => {
                 filesList.value = filesList.value.filter(file=>file.uid!==uid)
            }
            return {
                fileInput,
                triggerUpload,
                handleFileChange,
                fileStatus,
                isUploading,
                filesList,
                lastFileData
            }
        }
    })
</script>
```
1. 首先我们定义上传文件对象接口类`UploadFile`
2. 创建了一个`filesList`响应式对象
3. 去掉了fileStatus，因为在`UploadFile`接口中我们已经有定义`status`
4. 修改模版中的状态，利用`computed`来判读是否是处于上传状态，并增加slot进行自定义
5. 展示上传的图片
6. 处理上传进度
7. 处理删除
**注意点：如果选择相同的图片不会进行上传操作，因为我们使用的是input的change事件，所以我们需要在上传后将input的value设置为null**
#### 支持一系列生命周期钩子事件，上传事件
##### beforeUpload
```js
<template>
 ...
</template>
<script lang="ts">
    import { last } from 'lodash-es'
    import { v4 as uuidv4 } from 'uuid';
    // 定义上传状态
    type UploadStatus = 'ready' | 'loading' | 'success' | 'error'
    // 定义上传文件为boolean或promsie且接受一个File
    type CheckUpload = ()=> boolean | Promise<File>
    export interface UploadFile {
      ...
    }
    export default defineComponent({
        props: {
            action: { // url地址
                type: String,
                required: true
            },
            beforeUpload: {
                type: Function as PropType<CheckUpload>
            }
        },
        setup(props) {
            const fileInput = ref<null | HTMLInputElement>(null)
            const filesList = ref<UploadFile[]>([])
            // step4-1 判断是否正在上传中
            const isUploading = computed(()=> {
                return filesList.value.some((file)=>file.status==='loading')
            })
            const lastFileData = computed(()=>{
              const lastFile = last(filesList.value)
              if(!lastFile) return false
              return {
                loaded: lastFile?.status === 'success',
                data: lastFile?.resp
              }
            })
            const triggerUpload = () => {
                if(fileInput.value) {
                    fileInput.value.click()
                }
            }
            const handleFileChange = (e: Event) => {
              const target = e.target as HTMLInputElement
              const files = target.files
              const uploadedFile = files[0]
              if(props.beforeUpload) {
                  const result = props.beforeUpload(uploadedFile)
                  if(result && result instanceof Promise) {
                      result.then((processFile)=> {
                          if(uploadedFile instanceof File) {
                              postFile(uploadedFile)
                          }
                      }).catch(error=>{
                          console.error(error)
                      })  
                  } esle if(result===true) {
                  postFile(uploadedFile)
                  }
              }else{
                  postFile(uploadedFile)
              }
              
              
            }
            const reomveFile = (uid: string) => {
                 filesList.value = filesList.value.filter(file=>file.uid!==uid)
            }
            // 处理文件上传
            const postFile = (readyFile:UploadFile)=> {
                const formData = new FormData()
                formData.append('file', readyFile.raw)
                readyFile.status = 'loading'
                axios.post(props.action, formData, {
          headers: {
            "Content-Type": 'multipart/form-data'
          },
          onUploadProgress: (progressEvent)=> {
              const complete = (progressEvent.loaded / progressEvent.total * 100 | 0) + '%'
            //   console.log('上传 ' + complete)
            readyFile.progress = complete
          }
        }, ).then(resp=> {
          console.log('resp', resp)
          // fileStatus.value = 'success'
          readyFile.status = 'success'
          readyFile.resp = resp.data
        }).catch(error=> {
            // fileStatus.value = 'error'
            readyFile.status = 'error'
        })
        .finally(()=> {
          // 一张图片重复上传时无法继续上传bug
          if(fileInput.value) {
            fileInput.value.value = ''
          }
        })
            }
            return {
                fileInput,
                triggerUpload,
                handleFileChange,
                fileStatus,
                isUploading,
                filesList,
                lastFileData
            }
        }
    })
</script>
```
实现步骤：
1. 在poops处定义属性beforeUpload，同时定义上传文件为boolean或promsie且接受一个File
2. 将原上传方法进行封装为postFile
3. 根据beforeUpload返回结果，进行接下来的流程处理

**onProgress，onSuccess，onError，onChange与之类似**
    
### 拖拽支持
 大致流程如下图：
 
![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fb3cc0fe0b474cf18eb0755595c3be3e~tplv-k3u1fbpfcp-watermark.image)

- dragover和dragleave添加和删除对应的class
- drop拿到正在被拖拽的文件，删除class，并且触发上传
- 只有在属性drag为true才能触发
需要注意v-on的使用具体可参考[vue官方文档](https://v3.vuejs.org/guide/migration/v-on-native-modifier-removed.html#_3-x-syntax)
上代码：

```js
<template>
  <div class="file-upload">
    <div 
      :class="['upload-area',  drag && isDragOver ? 'is-dragover': '' ]"
      v-on="events"
      >
      <!-- 点击上传态 -->
      <slot v-if="isUploading" name='loading'>
        <button disabled>正在上传</button>
      </slot>
      <!-- 上传完毕态 -->
      <slot name="uploaded" v-else-if="lastFileData && lastFileData.loaded" :uploadData="lastFileData.data">
        <button disabled>点击上传</button>
      </slot>
      <!-- 默认态 -->
      <slot v-else name='default'>
        <!-- <button disabled>点击上传</button> -->
        <span>点击上传</span>  
      </slot>
    </div>

    <input ref="fileInput" type="file" name="file" style="display: none" @change="handleFileChange" />

    <ul>
      <li 
      v-for="file in filesList"
      :key="file.uid"
      :class="`uploaded-file upload-${file.status}`"
      >
      <img
          v-if="file.url && listType === 'picture'"
          class="upload-list-thumbnail"
          :src="file.url"
          :alt="file.name"
        >
        <span class="filname">
          {{ file.name }}
        </span>
        <span class="progress">
          {{ file.progress }}
        </span>
        <button class="delete-icon" @click="reomveFile(file.uid)">Del</button>
      </li>
    </ul>
    
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, reactive, ref } from 'vue'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid';
import { last } from 'lodash-es'
type UploadStatus = 'ready' | 'loading' | 'success' | 'error' 
type fileListType = 'text' | 'picture'
type CheckUpload = ()=> boolean | Promise<File>

export interface UploadFile  {
  uid: string; // 文件唯一id
  size: number; // 文件大小
  name: string; // 文件名称
  status: UploadStatus; // 上传状态
  raw: File;            // 文件
  progress?: string;
  resp?: any;           // 服务端返回数据
  url?: string          // 对应展示的url

}
// dragOver  文件拖拽到区域时触发
// dragLeave  文件离开拖动区域
// drop 事件拿到正在被拖拽的文件删除class并且触发上传
// 只有设置drag的时候才有效
 
export default defineComponent({
  name: 'Uploader',
  props: {
    action: { // url地址
        type: String,
        required: true
    },
    beofreUpload:{ // 上传之前的处理
      type: Function as PropType<CheckUpload>
    },
    drag: { // 是否拖拽
      type: Boolean,
      default: false
    },
    autoUpload: { // 自动上传
      type: Boolean,
      default: true
    },
    listType: {
      type: String as PropType<fileListType>,
      default: 'text'
    }
  },
  
  setup(props) {
    const fileInput = ref<null | HTMLInputElement>(null)
    const fileStatus = ref<UploadStatus>('ready')
    // 存储上传的文件
    const filesList = ref<UploadFile[]>([])
    // 定义了一个isDragOver标识，处理拖动后样式.upload-area显示
    const isDragOver = ref<boolean>(false)
    const triggerUpload = () => {
        if(fileInput.value) {
            fileInput.value.click()
        }
    }

    let events: {[key:string]: (e: any)=>void} = {
      'click': triggerUpload,
      
    }
    // 只要有一个文件状态是loading态就说明是正在上传
    const isUploading = computed(()=>{
      return filesList.value.some((file)=> file.status==='loading')
    })

    // 获取上传文件的最后一项
    const lastFileData = computed(()=>{
      const lastFile = last(filesList.value)
      if(!lastFile) return false
      return {
        loaded: lastFile?.status === 'success',
        data: lastFile?.resp
      }
    })

    // 处理dragover，dragleave
    const handleDrag = (e: DragEvent,over: boolean)=> {
    // 阻止默认事件
      e.preventDefault()
      // dragover为true，dragleave为fasle
      isDragOver.value = over
    }
    // 处理drop
    const handleDrop = (e: DragEvent) => {
      e.preventDefault()
      isDragOver.value = false
      if(e.dataTransfer) {
        beforeUploadCheck(e.dataTransfer.files)
      }
    }
   
    if(props.drag){
      events =  {
        ...events,
         'dragover': (e: DragEvent) => { handleDrag(e, true)},
        'dragleave': (e: DragEvent) => { handleDrag(e, false)},
        'drop': handleDrop
      }
      // console.log(events)
    }
    // 删除文件
    const reomveFile = (uid: string)=> {
      filesList.value = filesList.value.filter(file=>file.uid!==uid)
    }

    const postFile = (readyFile:UploadFile) => {
       const formData = new FormData()
        formData.append('file', readyFile.raw)
        readyFile.status = 'loading'
        // 选择文件后push到存储对象里面
        axios.post(props.action, formData, {
          headers: {
            "Content-Type": 'multipart/form-data'
          },
          onUploadProgress: (progressEvent)=> {
              const complete = (progressEvent.loaded / progressEvent.total * 100 | 0) + '%'
            //   console.log('上传 ' + complete)
            readyFile.progress = complete
          }
        }, ).then(resp=> {
          console.log('resp', resp)
          // fileStatus.value = 'success'
          readyFile.status = 'success'
          readyFile.resp = resp.data
        }).catch(error=> {
            // fileStatus.value = 'error'
            readyFile.status = 'error'
        })
        .finally(()=> {
          // 一张图片重复上传时无法继续上传bug
          if(fileInput.value) {
            fileInput.value.value = ''
          }
        })
    }
    const addFileToList = (uploadedFile: File) => {
      const fileObj = reactive<UploadFile>({
        uid: uuidv4(),
        size: uploadedFile.size,
        name: uploadedFile.name,
        status: 'ready',
        raw: uploadedFile
      })
       // 处理图片格式并显示
      if(props.listType==='picture') {
        // try {
        //   fileObj.url = URL.createObjectURL(uploadedFile)
        // }catch(err) {
        //   console.error('upload file err', err)
        // }
        const fileReader = new FileReader()
        fileReader.readAsDataURL(uploadedFile)
        fileReader.addEventListener('load', ()=> {
          fileObj.url = fileReader.result as string
        })
      }

      filesList.value.push(fileObj)
      if(props.autoUpload) {
        postFile(fileObj)
      }
    }

    const uploadFiles = ()=> {
      // filesList.value.filter(file => file.status === 'ready').forEach(readyFile => postFile(readyFile))
      filesList.value.filter(file => file.status === 'ready').forEach(readyFile=>postFile(readyFile))
    }

    const beforeUploadCheck = (files: null | FileList ) => {
      if(files) {
          fileStatus.value = 'loading'
        const uploadedFile = files[0]
        if(props.beofreUpload) {
          const result = props.beofreUpload()
          // 如果有返回值
          if(result && result instanceof Promise) {
            result.then(processedFile=> {
              if(processedFile instanceof File) {
                addFileToList(processedFile)
              } else {
                throw new Error('beforeUpload promise should return file object')
              }
            }).catch(err=> {
              console.log(err)
            })
          } else if(result === true) {
              addFileToList(uploadedFile)
          }
        } else {
          addFileToList(uploadedFile)
        }
      }
    }

    const handleFileChange = (e: Event) => {
      const target = e.target as HTMLInputElement
      const files = target.files
      beforeUploadCheck(files)
    }
    return {
        fileInput,
        triggerUpload,
        handleFileChange,
        isUploading, 
        filesList,
        reomveFile,
        lastFileData,
        beforeUploadCheck,
        isDragOver,
        events
    }
  }
})
</script>
```
以上就是基本的基于vue3实现的上传通用组件
另附上上传接口代码：

```js
// 引入模块
const Koa = require('koa');
const fs = require('fs');
const path = require('path');
const router = require('koa-router')();
const koaBody = require('koa-body');
const static = require('koa-static');
const cors = require('koa2-cors')
 
// 实例化
const app = new Koa();
 
app.use(koaBody({
  multipart: true, // 支持文件上传
  formidable: {
    maxFieldsSize: 2 * 1024 * 1024, // 最大文件为2兆
    multipart: true // 是否支持 multipart-formdate 的表单
  }
}));
 
const uploadUrl = "http://localhost:3001/static/upload";
 
// 配置路由
router.get('/', (ctx) => {
  // 设置头类型, 如果不设置，会直接下载该页面
  ctx.type = 'html';
  // 读取文件
  const pathUrl = path.join(__dirname, '/static/upload.html');
  ctx.body = fs.createReadStream(pathUrl);
});
 
// 上传文件
router.post('/upload', (ctx) => {
  // 获取上传文件
  const file = ctx.request.files.file;
  console.log(file);
  // 读取文件流
  const fileReader = fs.createReadStream(file.path);
  // 设置文件保存路径
  const filePath = path.join(__dirname, '/static/upload/');
  // 组装成绝对路径
  const fileResource = filePath + `/${file.name}`;
 
  /**
   * 使用 createWriteStream 写入数据，然后使用管道流pipe拼接
   */
  const writeStream = fs.createWriteStream(fileResource);
  // 判断 /static/upload 文件夹是否存在，如果不在的话就创建一个
  if (!fs.existsSync(filePath)) {
    fs.mkdir(filePath, (err) => {
      if (err) {
        throw new Error(err);
      } else {
        fileReader.pipe(writeStream);
        ctx.body = {
          url: uploadUrl + `/${file.name}`,
          code: 0,
          message: '上传成功1'
        };
      }
    });
  } else {
    fileReader.pipe(writeStream);
    ctx.body = {
      url: uploadUrl + `/${file.name}`,
      code: 0,
      message: '上传成功1'
    };
  }
});
 
// 配置静态资源路径
app.use(static(path.join(__dirname)));
// 开启跨域
app.use(cors())
// 启动路由
app.use(router.routes()).use(router.allowedMethods());

// 监听端口号
app.listen(3001, () => {
  console.log('server is listen in 3001');
});
```

### 写在最后
已上只是一个简单的实现，当然了我们也可以添加自定义headers，自定义传递数据data，accecpt等等