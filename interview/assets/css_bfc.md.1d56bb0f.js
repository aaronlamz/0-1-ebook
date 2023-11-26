import{_ as s,o as a,c as o,U as l}from"./chunks/framework.8610b7e0.js";const d=JSON.parse('{"title":"CSS中的BFC是什么以及它的作用","description":"","frontmatter":{},"headers":[],"relativePath":"css/bfc.md","filePath":"css/bfc.md"}'),n={name:"css/bfc.md"},p=l(`<h1 id="css中的bfc是什么以及它的作用" tabindex="-1">CSS中的BFC是什么以及它的作用 <a class="header-anchor" href="#css中的bfc是什么以及它的作用" aria-label="Permalink to &quot;CSS中的BFC是什么以及它的作用&quot;">​</a></h1><h2 id="什么是bfc" tabindex="-1">什么是<code>BFC</code> <a class="header-anchor" href="#什么是bfc" aria-label="Permalink to &quot;什么是\`BFC\`&quot;">​</a></h2><p>了解<code>BFC</code>先了解两个概念：</p><p><code>Box</code>： CSS 布局的对象和基本单位，⼀个⻚⾯是由很多个 Box 组成的，这个Box就是我们所说的<strong>盒模型</strong>。</p><p><code>Formatting context</code>：上下文格式化，是一种渲染规则，它决定了页面中的元素如何定位，以及它们与其他元素之间的相互关系和作用。</p><blockquote><p>那么<code>BFC</code>是什么？ BFC（块格式化上下文，Block Formatting Context）是Web页面的可视化CSS渲染的部分，它是布局盒模型中的一个区域，也是浮动元素与其他元素的交互限定区域。</p></blockquote><h2 id="bfc的特性" tabindex="-1">BFC的特性 <a class="header-anchor" href="#bfc的特性" aria-label="Permalink to &quot;BFC的特性&quot;">​</a></h2><ol><li><p><strong>内部的盒会在垂直方向上一个接一个地放置</strong>：在BFC中，盒子从顶部开始垂直放置，两个盒子之间的垂直间隔是由他们的margin值决定的。在BFC中，两个相邻的块级盒子的垂直外边距会发生合并。</p></li><li><p><strong>盒垂直方向的距离由margin决定</strong>：属于同一个BFC的两个相邻盒子的margin会发生重叠。</p></li><li><p><strong>每个元素的左外边距与包含块的左边界相接触</strong>：即使浮动元素也是如此，这意味着BFC中的元素不会和左浮动盒重叠。</p></li><li><p><strong>BFC的区域不会与float的元素区域重叠</strong>：浮动元素会被BFC所包含，不会影响到BFC外的元素。</p></li><li><p><strong>计算BFC的高度时，浮动元素也参与计算</strong>：通常，浮动元素会脱离文档流，不影响外部元素。但在BFC内部，浮动元素也会参与高度计算。</p></li><li><p><strong>BFC就是页面上的一个隔离的独立容器</strong>，子元素不会影响到外部的元素，反之亦然。</p></li></ol><h2 id="如何生成bfc" tabindex="-1">如何生成BFC？ <a class="header-anchor" href="#如何生成bfc" aria-label="Permalink to &quot;如何生成BFC？&quot;">​</a></h2><p>要生成BFC，元素需要满足以下条件之一：</p><ol><li><code>float</code> 属性的值不为 <code>none</code>。</li><li><code>position</code> 属性的值不为 <code>static</code> 或 <code>relative</code>。</li><li><code>display</code> 属性的值为 <code>inline-block</code>、<code>flex</code>、<code>inline-flex</code>、<code>grid</code> 或 <code>inline-grid</code>。</li><li><code>overflow</code> 属性的值不为 <code>visible</code>。</li></ol><h2 id="bfc的应用" tabindex="-1">BFC的应用 <a class="header-anchor" href="#bfc的应用" aria-label="Permalink to &quot;BFC的应用&quot;">​</a></h2><ol><li><strong>清除浮动</strong>：子元素浮动，父元素不设置高度时会导致高度塌陷。可以给父元素设置生成BFC（例如：<code>overflow: hidden</code>），从而让父元素根据子元素的高度展开。</li><li><strong>避免外边距重叠</strong>：当两个块级元素垂直相邻时，如果下面的元素的上margin和上面的元素的下margin发生重叠，可以使用生成BFC来阻止margin的重叠。</li><li><strong>制作两栏布局</strong>：左边固定宽度浮动，右边生成BFC，从而实现两栏布局，且右边的内容不会跑到左边的浮动元素下方。</li></ol><h2 id="示例" tabindex="-1">示例 <a class="header-anchor" href="#示例" aria-label="Permalink to &quot;示例&quot;">​</a></h2><p>BFC (Block Formatting Context) 的创建和应用对于 CSS 布局非常有用。以下是 BFC 的一些常见应用及相应的示例代码：</p><ol><li><p><strong>清除内部浮动</strong></p><p>当你有一个只包含浮动元素的容器时，这个容器会失去其高度，导致布局崩溃。通过将容器转换为 BFC，您可以使容器包围其浮动子元素。</p><div class="language-css"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">.</span><span style="color:#FFCB6B;">container</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#B2CCD6;">overflow</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> hidden</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">.</span><span style="color:#FFCB6B;">float-child</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#B2CCD6;">float</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> left</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#B2CCD6;">width</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">50%</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div><div class="language-html"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">class</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">container</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">class</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">float-child</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">I&#39;m a floating child.</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">class</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">float-child</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">Me too!</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;">&gt;</span></span></code></pre></div></li><li><p><strong>阻止外边距合并</strong></p><p>当两个垂直相邻的块元素具有外边距时，这些外边距会合并。创建一个 BFC 可以阻止外边距合并。</p><div class="language-css"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">.</span><span style="color:#FFCB6B;">block-with-margin</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#B2CCD6;">margin</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">20px</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">0</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#B2CCD6;">overflow</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> hidden</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div><div class="language-html"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">class</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">block-with-margin</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">First block</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">class</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">block-with-margin</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">Second block</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;">&gt;</span></span></code></pre></div></li><li><p><strong>与浮动元素互不重叠</strong></p><p>当你有一个浮动元素与一个非浮动元素重叠时，你可以为非浮动元素创建一个 BFC 以使其与浮动元素互不重叠。</p><div class="language-css"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">.</span><span style="color:#FFCB6B;">floating</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#B2CCD6;">float</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> left</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#B2CCD6;">width</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">50%</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">.</span><span style="color:#FFCB6B;">non-floating</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#B2CCD6;">overflow</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> hidden</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div><div class="language-html"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">class</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">floating</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">I&#39;m floating on the left.</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">class</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">non-floating</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">I won&#39;t overlap with the floating element.</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;">&gt;</span></span></code></pre></div></li></ol><p>这只是 BFC 的一些应用，但它们是最常见和有用的情况。理解 BFC 可以帮助你解决很多 CSS 布局中的问题。</p><h2 id="ifc、gfc、ffc、ffc、bfc的区别" tabindex="-1"><code>IFC</code>、<code>GFC</code>、<code>FFC</code>、<code>FFC</code>、<code>BFC</code>的区别 <a class="header-anchor" href="#ifc、gfc、ffc、ffc、bfc的区别" aria-label="Permalink to &quot;\`IFC\`、\`GFC\`、\`FFC\`、\`FFC\`、\`BFC\`的区别&quot;">​</a></h2><ul><li><p><code>IFC</code>：内联格式化上下文，<code>inline-formatting context</code>，用于布局内联元素的格式化上下文，<code>inline</code>元素会在水平方向，一个接一个地排列。</p></li><li><p><code>BFC</code>：块级格式化上下文，<code>block-formatting context</code>，用于布局块级元素的格式化上下文，<code>block</code>元素会在垂直方向，一个接一个地排列。</p></li><li><p><code>GFC</code>：网格格式化上下文，<code>grid-formatting context</code>，用于布局网格元素的格式化上下文，<code>grid</code>元素会在二维方向，一个接一个地排列。</p></li><li><p><code>FFC</code>：自适应格式化上下文，<code>flex-formatting context</code>，用于布局弹性盒子元素的格式化上下文，<code>flex</code>元素会在水平或垂直方向，一个接一个地排列。</p></li></ul>`,19),e=[p];function t(c,r,F,i,D,y){return a(),o("div",null,e)}const g=s(n,[["render",t]]);export{d as __pageData,g as default};
