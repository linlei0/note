const nav = require('./nav.js')
const sidebar = require('./sidebar.js')
// console.log(process)
module.exports = {
    title: 'linlei space',
    base: '/note/', // 这个地方需要注意下
    description: '努力向前',
    markdown: {
        lineNumbers: true
    },
    extraWatchFiles: [
        './nav.js',
        './sidebar.js'
    ],
    themeConfig: {
        sidebarDepth: 2,
        smoothScroll: true,
        repo: '/',
        nav,
        sidebar,
        docsDir: 'docs',
        editLinks: true,
        editLinkText: '在 Github 上编辑此页',
        lastUpdated: '更新时间',
    }
}