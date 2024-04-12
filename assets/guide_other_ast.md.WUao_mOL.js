import{_ as t,o as a,c as s,R as e}from"./chunks/framework.5IuVB3YY.js";const i="/study_blog.github.io/assets/ast_node.piJDsBUZ.png",r="/study_blog.github.io/assets/ast_test.j94EK3z-.png",l="/study_blog.github.io/assets/ast_transform.mG9T9PUZ.png",m=JSON.parse('{"title":"AST抽象语法树","titleTemplate":"其他","description":"","frontmatter":{"title":"AST抽象语法树","titleTemplate":"其他"},"headers":[],"relativePath":"guide/other/ast.md","filePath":"guide/other/ast.md"}'),o={name:"guide/other/ast.md"},n=e('<h2 id="ast-抽象语法树的定义" tabindex="-1">AST 抽象语法树的定义 <a class="header-anchor" href="#ast-抽象语法树的定义" aria-label="Permalink to &quot;AST 抽象语法树的定义&quot;">​</a></h2><p>抽象语法树 (Abstract Syntax Tree，AST)，是源代码语法结构的一种抽象表示。以<strong>树状的形式</strong>表现编程语言的语法结构，每个节点都表示源代码中的一种结构。</p><h2 id="ast-的节点" tabindex="-1">AST 的节点 <a class="header-anchor" href="#ast-的节点" aria-label="Permalink to &quot;AST 的节点&quot;">​</a></h2><p>在 “AST 的世界”里所有的一切都是节点 (Node)，不同类型的节点之间相互嵌套形成一颗完整的树形结构。 <img src="'+i+'" alt="节点示例" title="节点示例"><strong>例子：</strong></p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> str</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;AST语法树&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span></code></pre></div><p>一句简单的声明，它的AST语法树也会尽可能全面的去描述该语句</p><blockquote><p>在线解析AST网址：<a href="https://astexplorer.net/" target="_blank" rel="noreferrer">https://astexplorer.net/</a></p></blockquote><div align="center"><img src="'+r+'"></div><h2 id="ast-的转化" tabindex="-1">AST 的转化 <a class="header-anchor" href="#ast-的转化" aria-label="Permalink to &quot;AST 的转化&quot;">​</a></h2><div align="center"><img src="'+l+'"></div><ol><li>解析 (Parse)：将原始代码解析为 AST</li><li>转换 (Transform)：遍历源 AST 做转换，生成新的 AST</li><li>生成 (Generate)：遍历新的 AST，生成目标代码</li></ol><h2 id="ast-的应用" tabindex="-1">AST 的应用 <a class="header-anchor" href="#ast-的应用" aria-label="Permalink to &quot;AST 的应用&quot;">​</a></h2><ul><li>语言转换 Babel、Vue模板语法</li><li>语法插件 ESlint</li><li>打包工具插件 代码压缩、树摇tree-shaking</li></ul>',13),h=[n];function p(c,d,_,g,u,T){return a(),s("div",null,h)}const S=t(o,[["render",p]]);export{m as __pageData,S as default};