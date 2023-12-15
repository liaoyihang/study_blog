export default {
  lang: 'en-US',
  title: '汉堡学堂',
  description: '',
  base: '/study_blog/',
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
          text: 'Vue',
          items: [
            { text: 'test', link: '/guide/vue/test' },
          ]
        },
        {
            text: '其他小研究',
            items: [
              { text: '图片懒加载', link: '/guide/other/img-lazy' },
          ]
        }
      ],
  }
};