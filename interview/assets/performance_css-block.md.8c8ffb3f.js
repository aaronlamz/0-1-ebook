import{_ as s,o,c as a,U as t}from"./chunks/framework.8610b7e0.js";const C=JSON.parse('{"title":"css是否会阻塞页面渲染","description":"","frontmatter":{},"headers":[],"relativePath":"performance/css-block.md","filePath":"performance/css-block.md"}'),l={name:"performance/css-block.md"},n=t('<h1 id="css是否会阻塞页面渲染" tabindex="-1">css是否会阻塞页面渲染 <a class="header-anchor" href="#css是否会阻塞页面渲染" aria-label="Permalink to &quot;css是否会阻塞页面渲染&quot;">​</a></h1><p>CSS 会阻塞页面渲染。以下是具体细节：</p><ol><li><p><strong>CSS下载阻塞渲染</strong>：浏览器在下载CSS文件时会延迟渲染操作，因为浏览器要等待CSS文件的加载完毕，从而准确地渲染页面。因此，如果你的CSS文件很大或者加载很慢，页面的渲染将会受到影响，从而导致白屏时间增加。</p></li><li><p><strong>CSS不阻塞JS的下载，但会阻塞JS的执行</strong>：如果浏览器正在下载CSS并且遇到了一个脚本（无论是内联的还是外部的），它将不会执行这个脚本直到CSS已经下载和处理完毕。这是因为JS可能有对DOM的查询操作，而CSS可能会影响这些查询的结果。</p></li></ol><p>为了解决这种渲染阻塞，可以采取以下策略：</p><ul><li><p><strong>将CSS放在头部</strong>：这样浏览器可以尽快地下载CSS并渲染页面。</p></li><li><p><strong>利用媒体查询</strong>：例如，只有当页面在桌面上时才加载某个CSS文件。</p><div class="language-html"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">link</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">rel</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">stylesheet</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">href</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">desktop-style.css</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">media</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">screen and (min-width: 600px)</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span></span></code></pre></div></li><li><p><strong>异步加载非关键CSS</strong>：可以通过JavaScript或<code>rel=&quot;preload&quot;</code>标签将非关键路径的CSS异步加载。</p></li><li><p><strong>内联关键路径CSS</strong>：将关键路径上的CSS直接内联在HTML中，可以确保在首次渲染时有样式可用。</p></li></ul><p>CSS 的阻塞特性是出于好意，为了提供更好的用户体验。但是，正确地管理和优化你的样式和脚本资源可以确保页面快速地渲染和交互。</p>',6),e=[n];function p(r,c,S,i,D,F){return o(),a("div",null,e)}const _=s(l,[["render",p]]);export{C as __pageData,_ as default};
