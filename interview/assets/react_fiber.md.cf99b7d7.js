import{_ as s,o as a,c as n,U as l}from"./chunks/framework.8610b7e0.js";const C=JSON.parse('{"title":"React的Fiber架构","description":"","frontmatter":{},"headers":[],"relativePath":"react/fiber.md","filePath":"react/fiber.md"}'),p={name:"react/fiber.md"},o=l(`<h1 id="react的fiber架构" tabindex="-1">React的Fiber架构 <a class="header-anchor" href="#react的fiber架构" aria-label="Permalink to &quot;React的Fiber架构&quot;">​</a></h1><p>React 的 Fiber 架构是 React 16（也称为 React Fiber）中引入的一种新的重构算法，它旨在支持虚拟 DOM 树的增量渲染。与之前的 &quot;Stack Reconciler&quot; 不同，Fiber 允许 React 暂停工作，然后在稍后恢复这些工作，从而使其具有更高的灵活性。这为异步渲染、时间切片和并发模式提供了基础。</p><h2 id="为什么会有-fiber-架构" tabindex="-1">为什么会有 Fiber 架构？ <a class="header-anchor" href="#为什么会有-fiber-架构" aria-label="Permalink to &quot;为什么会有 Fiber 架构？&quot;">​</a></h2><p>React 在 V16 之前会面临的主要性能问题是：当组件树很庞大时，更新状态可能造成页面卡顿，这些问题的根本原因是React的更新和渲染流程是同步和不可中断的。当React开始处理组件树的更新时，它必须一直处理到结束，这有可能阻塞主线程，导致页面卡顿和不流畅的用户体验。</p><p>为了解决这些问题，React团队引入了Fiber架构，这是React 16中的主要变革。Fiber架构的目标是使React的渲染和更新过程变得可中断。</p><p>以下是Fiber带来的主要变革：</p><ol><li><strong>增量渲染</strong>：Fiber允许React将渲染工作分为多个块，并将这些工作分散到多个帧中，而不是一次性完成所有工作。</li><li><strong>可中断性</strong>：Fiber架构引入了任务分片的概念。React可以中断当前正在进行的工作，转而执行更为紧急的任务，可以将控制权交回浏览器，让浏览器及时地相应用户的交互——异步可中断，例如响应用户输入。</li><li><strong>优先级调度</strong>：不是所有更新都是相同的。有些更新（如动画或用户交互）比其他更新（如后台数据同步）更为紧急。React可以基于优先级调度和处理这些更新。</li></ol><p>这些变革确保了即使在大型应用中，React也可以维护流畅的用户体验。Fiber架构使得React在渲染和更新组件时具有更大的灵活性，从而提高了整体的应用性能。</p><h2 id="fiber-数据结构" tabindex="-1">Fiber 数据结构 <a class="header-anchor" href="#fiber-数据结构" aria-label="Permalink to &quot;Fiber 数据结构&quot;">​</a></h2><p>Fiber 是 React 16 (React Fiber 架构) 引入的新特性，代表一个工作单元。它是为了支持更复杂的组件和使 React 具有可中断性渲染能力而设计的。Fiber 为每一个 React 元素建立了一个数据结构，这使得 React 可以跟踪和管理渲染工作。</p><p>依赖数据结构-链表实现的。其中每个节点都是一个 Fiber，一个 Fiber 包含了 child（第一个子节点）、sibling（兄弟节点）、parent（父节点）等属性。Fiber 节点中其实还会保存节点的类型、节点的信息（比如 state、props）、节点对应的值等。</p><h2 id="fiber-工作原理" tabindex="-1">Fiber 工作原理 <a class="header-anchor" href="#fiber-工作原理" aria-label="Permalink to &quot;Fiber 工作原理&quot;">​</a></h2><p>通过简化的伪代码来深入了解一下 Fiber 的工作原理。这里不会完全准确地表示 React 的内部实现，但会为你提供一个大概的框架。</p><p>假设我们有以下简单的组件树：</p><div class="language-jsx"><button title="Copy Code" class="copy"></button><span class="lang">jsx</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">Parent</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> (</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">ChildA</span><span style="color:#89DDFF;"> /&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">ChildB</span><span style="color:#89DDFF;"> /&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#F07178;">  )</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">ChildA</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">Child A</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;">&gt;;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">ChildB</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">Child B</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;">&gt;;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div><p>当状态或props发生变化时，React需要重新渲染该树。</p><h3 id="_1-构建-fiber-tree" tabindex="-1">1. 构建 Fiber Tree <a class="header-anchor" href="#_1-构建-fiber-tree" aria-label="Permalink to &quot;1. 构建 Fiber Tree&quot;">​</a></h3><p>首先，React为每个组件创建一个Fiber节点。Fiber节点可以看作是该组件的一个轻量级表示，其中包含有关该组件的信息，例如其类型、key、props等。</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> parentFiber </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">type</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> Parent</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">child</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> childAFiber</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">sibling</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> childBFiber</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;">// ... 其他属性</span></span>
<span class="line"><span style="color:#89DDFF;">};</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> childAFiber </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">type</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> ChildA</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;">// ... 其他属性</span></span>
<span class="line"><span style="color:#89DDFF;">};</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> childBFiber </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">type</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> ChildB</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;">// ... 其他属性</span></span>
<span class="line"><span style="color:#89DDFF;">};</span></span></code></pre></div><h3 id="_2-协调阶段" tabindex="-1">2. 协调阶段 <a class="header-anchor" href="#_2-协调阶段" aria-label="Permalink to &quot;2. 协调阶段&quot;">​</a></h3><p>在此阶段，React会遍历Fiber tree，比较每个节点的新旧props和state，以确定是否需要更新。</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">reconcile</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">fiber</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#F07178;"> (</span><span style="color:#82AAFF;">hasChanged</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">fiber</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">oldProps</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">fiber</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">newProps</span><span style="color:#F07178;">)) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">fiber</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">effectTag</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">UPDATE</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;">// 遍历子节点</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#F07178;"> (</span><span style="color:#A6ACCD;">fiber</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">child</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#82AAFF;">reconcile</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">fiber</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">child</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;">// 遍历兄弟节点</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#F07178;"> (</span><span style="color:#A6ACCD;">fiber</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">sibling</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#82AAFF;">reconcile</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">fiber</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">sibling</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div><h3 id="_3-提交阶段" tabindex="-1">3. 提交阶段 <a class="header-anchor" href="#_3-提交阶段" aria-label="Permalink to &quot;3. 提交阶段&quot;">​</a></h3><p>在此阶段，React会处理所有在协调阶段标记为需要更新的Fiber节点。</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">commitFiber</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">fiber</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#F07178;"> (</span><span style="color:#A6ACCD;">fiber</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">effectTag</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">===</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">UPDATE</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;">// 更新DOM或执行其他副作用</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#82AAFF;">updateDOM</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">fiber</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;">// 遍历子节点和兄弟节点，继续提交</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#F07178;"> (</span><span style="color:#A6ACCD;">fiber</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">child</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#82AAFF;">commitFiber</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">fiber</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">child</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#F07178;"> (</span><span style="color:#A6ACCD;">fiber</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">sibling</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#82AAFF;">commitFiber</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">fiber</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">sibling</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div><p>上述伪代码为了简化只涉及了更新。实际的React代码需要处理更多的情况，例如插入、删除、错误边界等。</p><p>通过这种方式，React能够快速确定哪些组件需要更新，然后在提交阶段一次性将所有更改应用到DOM，从而优化性能。</p><h2 id="任务优先级" tabindex="-1">任务优先级 <a class="header-anchor" href="#任务优先级" aria-label="Permalink to &quot;任务优先级&quot;">​</a></h2><p>React Fiber 是 React 16+ 的核心算法，它允许框架进行非阻塞渲染，也就是说，React 可以在必要时中断正在进行的工作以优先处理更重要的任务。这是通过一个叫作“时间分片”的技术实现的。</p><p>为了实现这种中断和恢复的能力，Fiber 为每个组件都维护了一个数据结构，包括关于该组件的信息和其他事项。以下是关于 Fiber 如何区分任务优先级和中断的一些关键点：</p><p>每个更新任务（例如，<code>setState</code> 调用或 Redux action 的结果）都有一个与之相关联的优先级。React 内部有几种不同的优先级，例如 Immediate、UserBlocking、Normal、Low、Idle 等。这些优先级允许 React 判断哪些工作更加紧急，应该先进行，哪些可以稍后进行。</p><p>React 使用 <code>requestIdleCallback</code>（或它的自己的模拟版本）来安排低优先级的工作，这样，当浏览器主线程空闲时，这些工作才会执行。</p><h2 id="中断与恢复" tabindex="-1">中断与恢复 <a class="header-anchor" href="#中断与恢复" aria-label="Permalink to &quot;中断与恢复&quot;">​</a></h2><p>Fiber 的核心思想是将渲染工作分解为多个小的单元，并为每个单元分配一定的时间。当该时间段结束时，React 会检查是否有更高优先级的工作需要进行。</p><p>如果存在更高优先级的工作，当前的工作会被中断，并将优先处理那些更重要的任务。一旦高优先级的工作完成，React 会回到被中断的工作，并从中断的地方继续。</p><p>例如，如果用户同时触发了两个操作：一个是数据拉取（可以是异步的，较低优先级），另一个是按钮点击（应该有即时响应，较高优先级）。React 会首先处理按钮点击，并中断数据拉取的渲染，直到按钮的效果渲染完毕，然后再继续之前被中断的数据渲染。</p><h2 id="参考" tabindex="-1">参考 <a class="header-anchor" href="#参考" aria-label="Permalink to &quot;参考&quot;">​</a></h2><ul><li><a href="https://fe.azhubaby.com/React/Fiber.html" target="_blank" rel="noreferrer">Fiber 的作用和原理</a></li></ul>`,38),e=[o];function t(c,r,F,i,y,D){return a(),n("div",null,e)}const b=s(p,[["render",t]]);export{C as __pageData,b as default};
