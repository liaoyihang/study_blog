export default {
  lang: 'en-US',
  title: '汉堡学堂',
  description: '',
  base: '/study_blog.github.io/',
  themeConfig: {
    nav: [
      { text: '导航栏选项一', link: '/guide', activeMatch: '/guide/what-is-vitepress' },
      { text: '导航栏选项二', link: '/guide', activeMatch: '/guide/what-is-vitepress' },
      { text: '导航栏选项三', link: '/guide', activeMatch: '/guide/what-is-vitepress' },
      {
        text: '导航栏下拉框',
        items: [
          { text: '下拉选项一', link: '/' },
          { text: '下拉选项二', link: 'http://www.baidu.com' }
        ]
      }
    ],
    sidebar: [
      {
        text: 'JS基础',
        items: [
          { text: 'JS数据类型', link: '/guide/js/data-type' },
          { text: '原型与原型链', link: '/guide/js/prototype' },
          { text: '浮点数原理', link: '/guide/js/decimal' },
        ]
      },
      {
        text: 'Vue',
        items: [
          { text: '响应式基础', link: '/guide/vue/reactive' },
          { text: '$nextTick原理', link: '/guide/vue/nexttick' },
          { text: '模板语法原理', link: '/guide/vue/template' },
        ]
      },
      {
        text: '宿主环境',
        items: [
          { text: 'V8垃圾回收机制(简易版)', link: '/guide/environment/garbage-collection-easy' },
          { text: '浏览器渲染原理', link: '/guide/environment/browser-render' },
          { text: '事件循环', link: '/guide/environment/event-loop' },
        ]
      },
      {
        text: '性能研究',
        items: [
          { text: '图片懒加载', link: '/guide/performance/img-lazy' },
          { text: '虚拟列表', link: '/guide/performance/virtual-list' },
          { text: '分片渲染', link: '/guide/performance/slice-render' },
        ]
      },
      {
        text: '网络通信',
        items: [
          { text: 'Ajax', link: '/guide/network/ajax' },
        ]
      },
      {
        text: '其他',
        items: [
          { text: 'AST抽象语法树', link: '/guide/other/ast' },
        ]
      }
    ],
  }
};