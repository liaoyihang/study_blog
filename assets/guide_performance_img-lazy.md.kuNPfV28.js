import{_ as e,o as t,c as o,R as a}from"./chunks/framework.5IuVB3YY.js";const p=JSON.parse('{"title":"图片懒加载","titleTemplate":"性能优化","description":"","frontmatter":{"title":"图片懒加载","titleTemplate":"性能优化"},"headers":[],"relativePath":"guide/performance/img-lazy.md","filePath":"guide/performance/img-lazy.md"}'),r={name:"guide/performance/img-lazy.md"},i=a('<h1 id="图片懒加载" tabindex="-1">图片懒加载 <a class="header-anchor" href="#图片懒加载" aria-label="Permalink to &quot;图片懒加载&quot;">​</a></h1><p>图片懒加载是一种针对图片资源的性能方案</p><h2 id="什么是图片懒加载" tabindex="-1">什么是图片懒加载？ <a class="header-anchor" href="#什么是图片懒加载" aria-label="Permalink to &quot;什么是图片懒加载？&quot;">​</a></h2><p>懒加载的<em><strong>本质</strong></em>是将渲染的时间从首屏加载延迟到了用户使用中，<em><strong>原理</strong></em>是通过监听用户的浏览行为，即滚动条事件，当用户滚动到资源出现在可视区域内时，再进行资源的加载。</p><blockquote><p>常用的API：</p><ol><li>使用 img 标签中的 loading 属性</li><li>使用 Intersection Observer API</li><li>使用 getBoundingClientRect 方法</li></ol></blockquote><h2 id="图片懒加载的作用" tabindex="-1">图片懒加载的作用 <a class="header-anchor" href="#图片懒加载的作用" aria-label="Permalink to &quot;图片懒加载的作用&quot;">​</a></h2><ol><li>可以减少首屏加载时间，优化<strong>用户体验</strong>；</li><li>其次可以减少不必要的<strong>性能开销</strong>，通过资源懒加载优化系统资源使用，这在内存以及处理能力较低的移动设备上效果比较好。</li></ol><h2 id="图片懒加载需要注意的点" tabindex="-1">图片懒加载需要注意的点 <a class="header-anchor" href="#图片懒加载需要注意的点" aria-label="Permalink to &quot;图片懒加载需要注意的点&quot;">​</a></h2><ol><li>加载一些不明确规格的图片资源时，比如第三方或者未知来源的资源，必然要在图片展示上设置一些参数，并在<strong>容器大小</strong>和<strong>清晰度</strong>之间做出<strong>权衡</strong></li><li>同时，图片资源也可能加载失败，需要对其进行<strong>容错处理</strong>，例如使用默认占位图片</li><li><strong>用户的行为</strong>也是不可控的，如果滚动条速度过快，会导致渲染跟不上</li><li>另外，js层面的监听滚动条事件触发的非常频繁，读取元素宽高等布局属性会引起<strong>回流重绘</strong>，也会在用户使用过程对性能产生一定程度的影响</li></ol>',9),l=[i];function n(s,c,g,d,m,_){return t(),o("div",null,l)}const u=e(r,[["render",n]]);export{p as __pageData,u as default};