import{_ as t,o as e,c as o,R as a}from"./chunks/framework.5IuVB3YY.js";const g=JSON.parse('{"title":"虚拟Dom","titleTemplate":"Vue","description":"","frontmatter":{"title":"虚拟Dom","titleTemplate":"Vue"},"headers":[],"relativePath":"guide/vue/vDom.md","filePath":"guide/vue/vDom.md"}'),r={name:"guide/vue/vDom.md"},n=a('<h1 id="虚拟-dom" tabindex="-1">虚拟 Dom <a class="header-anchor" href="#虚拟-dom" aria-label="Permalink to &quot;虚拟 Dom&quot;">​</a></h1><p>本文将介绍虚拟 <strong>Dom 的基本概念</strong>、<strong>为什么需要虚拟 Dom</strong>、以及<strong>它如何转换成真实 Dom</strong>。</p><h2 id="什么是-dom" tabindex="-1">什么是 Dom <a class="header-anchor" href="#什么是-dom" aria-label="Permalink to &quot;什么是 Dom&quot;">​</a></h2><p><strong>Dom 是文档对象模型（Document Object Model）</strong>，它将 web 页面与到脚本或编程语言连接起来。通常是指 JavaScript，但将 HTML、SVG 或 XML 文档建模为对象并不是 JavaScript 语言的一部分。<strong>DOM 模型用一个逻辑树来表示一个文档，树的每个分支的终点都是一个节点 (node)，每个节点都包含着对象 (objects)</strong>。DOM 的方法 (methods) 让你可以用特定方式操作这个树，用这些方法你可以改变文档的结构、样式或者内容。节点可以关联上事件处理器，一旦某一事件被触发了，那些事件处理器就会被执行。</p><p>简而言之，<strong>在 JavaScript 中，Dom 是用来描述节点的一个对象（object）</strong>。这个对象上有非常多的成员，用于描述这个节点或关联事件。</p><h2 id="什么是虚拟-dom" tabindex="-1">什么是虚拟 Dom <a class="header-anchor" href="#什么是虚拟-dom" aria-label="Permalink to &quot;什么是虚拟 Dom&quot;">​</a></h2><p><strong>虚拟 Dom 的本质也是一个 JavaScript 的对象（object）</strong>，用于描述一个节点或关联事件，与真实 Dom 不同的是，虚拟 Dom 的成员非常少，取自真实 Dom 中较为常用的成员，例如：tag、children、parent 等。</p><h2 id="为什么需要虚拟-dom" tabindex="-1">为什么需要虚拟 Dom <a class="header-anchor" href="#为什么需要虚拟-dom" aria-label="Permalink to &quot;为什么需要虚拟 Dom&quot;">​</a></h2><p>在 Vue中，渲染视图会调用 render 函数，<strong>这种渲染不仅发生在组件创建时，同时发生在视图依赖的数据更新时</strong>。如果在渲染时，直接使用真实 DOM，由于真实 DOM 的创建、更新、插入等操作会带来大量的性能损耗，从而就会极大的降低渲染效率。</p><p>Vue 团队做过性能对比，结果如下：</p><table><thead><tr><th style="text-align:center;">方案</th><th style="text-align:center;">初始性能</th><th style="text-align:center;">更新性能</th><th style="text-align:center;">可维护性</th><th style="text-align:center;">心智负担</th></tr></thead><tbody><tr><td style="text-align:center;">原生 JS</td><td style="text-align:center;">高</td><td style="text-align:center;">中等</td><td style="text-align:center;">差</td><td style="text-align:center;">大</td></tr><tr><td style="text-align:center;">虚拟 Dom</td><td style="text-align:center;">中等</td><td style="text-align:center;">高</td><td style="text-align:center;">高</td><td style="text-align:center;">小大</td></tr><tr><td style="text-align:center;">innerHTML</td><td style="text-align:center;">差</td><td style="text-align:center;">差</td><td style="text-align:center;">差</td><td style="text-align:center;">中等</td></tr></tbody></table><p><strong>虚拟 Dom 的出现，就是为了最小化找到差异的性能开销，让其最小化而出现的，这也是 Vue 他们在保证可维护性的前提下，最优性能的尝试</strong>。</p><p>因此，Vue 在渲染时，使用虚拟 Dom 来替代真实 Dom，<strong>主要为解决渲染效率的问题</strong>。</p><h2 id="虚拟-dom-是如何转换为真实-dom-的" tabindex="-1">虚拟 Dom 是如何转换为真实 Dom 的 <a class="header-anchor" href="#虚拟-dom-是如何转换为真实-dom-的" aria-label="Permalink to &quot;虚拟 Dom 是如何转换为真实 Dom 的&quot;">​</a></h2><p>在一个组件实例首次被渲染时，它先生成虚拟 Dom 树，然后根据虚拟 Dom 树创建真实 Dom，并把真实 Dom 挂载到页面中合适的位置，此时，每个虚拟 Dom 便会对应一个真实的 Dom。</p><p>如果一个组件受响应式数据变化的影响，需要重新渲染时，它仍然会重新调用 render 函数，创建出一个新的虚拟 Dom 树，<strong>用新树和旧树对比，通过对比，Vue 会找到最小更新量</strong>，然后更新必要的虚拟 Dom 节点，最后，这些更新过的虚拟节点，会去修改它们对应的真实 Dom，保证了对真实 Dom 达到最小的改动。</p><h2 id="虚拟-dom-是如何被创建" tabindex="-1">虚拟 Dom 是如何被创建 <a class="header-anchor" href="#虚拟-dom-是如何被创建" aria-label="Permalink to &quot;虚拟 Dom 是如何被创建&quot;">​</a></h2><p>Vue 框架中有一个 compile 模块，它主要负责将模板转换为 render 函数，而 render 函数调用后将得到虚拟 Dom。编译的过程分三步：</p><ol><li>将模板字符串转换成为 AST</li><li>将 AST 转成新的 AST</li><li>将 AST 转换为 render 函数</li></ol><p>详细的编译过程可以阅读 <a href="/study_blog.github.io/guide/vue/template.html">模板语法原理</a></p><p>如果使用传统的引入方式，则编译时间发生在组件第一次加载时，这称之为运行时编译。如果是在 vue-cli 的默认配置下，编译发生在打包时，这称之为模板预编译。</p><p>编译是一个极其耗费性能的操作，预编译可以有效的提高运行时的性能，而且，由于运行的时候已不需要编译，vue-cli 在打包时会排除掉 Vue 中的 compile 模块，以减少打包体积。模板的存在，仅仅是为了让开发人员更加方便的书写界面代码。</p><p>Vue 最终运行的时候，最终需要的是 render 函数，而不是模板，因此，模板中的各种语法，在虚拟 Dom 中都是不存在的，它们都会变成虚拟 Dom 的配置。</p>',23),l=[n];function d(m,i,s,c,h,D){return e(),o("div",null,l)}const u=t(r,[["render",d]]);export{g as __pageData,u as default};