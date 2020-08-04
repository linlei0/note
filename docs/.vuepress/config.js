const nav = require('./nav.js')
const sidebar = require('./sidebar.js')

module.exports = {
    title: 'Memory space',
    base: '/',
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