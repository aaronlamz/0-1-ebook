import{_ as o,o as e,c as t,U as l}from"./chunks/framework.8610b7e0.js";const P=JSON.parse('{"title":"CORS","description":"","frontmatter":{},"headers":[],"relativePath":"security/cors.md","filePath":"security/cors.md"}'),r={name:"security/cors.md"},a=l('<h1 id="cors" tabindex="-1">CORS <a class="header-anchor" href="#cors" aria-label="Permalink to &quot;CORS&quot;">​</a></h1><p>CORS（Cross-Origin Resource Sharing，跨源资源共享）是一种机制，它允许在浏览器中发起跨源（不同域）HTTP 请求。在没有 CORS 的情况下，出于安全考虑，浏览器会限制脚本内发起的跨源 HTTP 请求，这是同源策略的一部分。CORS 提供了一种安全的方式来绕过这些限制。</p><h3 id="如何工作" tabindex="-1">如何工作 <a class="header-anchor" href="#如何工作" aria-label="Permalink to &quot;如何工作&quot;">​</a></h3><ul><li><strong>预检请求（Preflight Request）</strong>: 在发送实际请求前，浏览器可能会先发起一个预检请求，向服务器发送 OPTIONS 请求，询问服务器是否允许跨源请求。</li><li><strong>CORS 头部</strong>: 服务器需要在响应中包含特定的 CORS HTTP 头部，如 <code>Access-Control-Allow-Origin</code>，来指示浏览器允许的源、方法和头部。</li><li><strong>浏览器处理</strong>: 浏览器接收到响应后，会检查这些头部，决定是否允许实际的请求。</li></ul><h3 id="关键-http-头部" tabindex="-1">关键 HTTP 头部 <a class="header-anchor" href="#关键-http-头部" aria-label="Permalink to &quot;关键 HTTP 头部&quot;">​</a></h3><ul><li><strong>Access-Control-Allow-Origin</strong>: 指定哪些源可以访问资源。可以设置为特定的源或 <code>*</code>（表示任何源）。</li><li><strong>Access-Control-Allow-Methods</strong>: 指定允许的 HTTP 方法（如 GET, POST, DELETE）。</li><li><strong>Access-Control-Allow-Headers</strong>: 当请求中包含非简单头部时，此字段指定浏览器可以发送哪些额外的头部。</li><li><strong>Access-Control-Allow-Credentials</strong>: 指定是否允许发送 Cookie。如果设置为 <code>true</code>，则 <code>Access-Control-Allow-Origin</code> 不能设置为 <code>*</code>。</li></ul><h3 id="简单请求与预检请求" tabindex="-1">简单请求与预检请求 <a class="header-anchor" href="#简单请求与预检请求" aria-label="Permalink to &quot;简单请求与预检请求&quot;">​</a></h3><p>简单请求和预检请求（Preflight Request）是两种处理跨源 HTTP 请求的方式，它们是 CORS（跨源资源共享）策略的一部分。理解它们的区别和用途是处理现代网络应用中跨域请求的关键。</p><h4 id="简单请求" tabindex="-1">简单请求 <a class="header-anchor" href="#简单请求" aria-label="Permalink to &quot;简单请求&quot;">​</a></h4><p>简单请求满足以下条件之一：</p><ul><li>使用以下方法之一：GET、HEAD 或 POST。</li><li>对于 POST 请求，其 Content-Type 只能是以下之一：text/plain、multipart/form-data 或 application/x-www-form-urlencoded。</li><li>请求不包含任何自定义头部（即除了浏览器在所有请求中默认设置的头部之外，没有额外的头部）。</li></ul><p>简单请求的特点是：</p><ul><li><strong>不触发预检</strong>：简单请求不会触发 CORS 预检请求。</li><li><strong>直接发送实际请求</strong>：浏览器直接发送请求到服务器，服务器通过响应中的 CORS 相关头部来告知浏览器是否允许该请求。</li></ul><p>例如，一个使用 GET 方法的请求，只要求公共数据，且没有自定义头部，就被认为是简单请求。</p><h4 id="预检请求" tabindex="-1">预检请求 <a class="header-anchor" href="#预检请求" aria-label="Permalink to &quot;预检请求&quot;">​</a></h4><p>当请求不符合简单请求的条件时，它就会被视为需要预检的请求。预检请求通常出现在以下情况：</p><ul><li>使用了 PUT、DELETE、CONNECT、OPTIONS、TRACE 或 PATCH 这类非简单方法。</li><li>请求的头部中包含了除基本头部之外的自定义头部（例如，用于认证的头部）。</li><li>请求包含一个对服务器来说不寻常的 Content-Type（如 application/json）。</li></ul><p>预检请求的特点是：</p><ul><li><strong>发送 OPTIONS 请求</strong>：浏览器首先发送一个 OPTIONS 请求到服务器，询问服务器是否允许该跨源请求。</li><li><strong>服务器响应</strong>：服务器必须响应这个 OPTIONS 请求，指明允许的源（<code>Access-Control-Allow-Origin</code>）、允许的方法（<code>Access-Control-Allow-Methods</code>）和头部（<code>Access-Control-Allow-Headers</code>）。</li><li><strong>后续的实际请求</strong>：只有当预检请求成功时，浏览器才会发送实际的 HTTP 请求。</li></ul><p>例如，一个使用 POST 方法且 Content-Type 为 application/json 的请求，或任何包含自定义头部的请求，都需要先进行预检。</p><h3 id="使用场景" tabindex="-1">使用场景 <a class="header-anchor" href="#使用场景" aria-label="Permalink to &quot;使用场景&quot;">​</a></h3><p>CORS 最常见的使用场景是在构建单页应用（SPA）时，前端应用和后端 API 可能部署在不同的域上。为了安全地从前端应用向后端 API 发起请求，后端需要实现适当的 CORS 支持。</p><h3 id="安全性" tabindex="-1">安全性 <a class="header-anchor" href="#安全性" aria-label="Permalink to &quot;安全性&quot;">​</a></h3><p>虽然 CORS 允许跨源请求，但它不减少安全性，因为它是通过服务器明确授权的方式来允许这些请求。服务器可以控制哪些源、方法和头部是被允许的。</p>',24),i=[a];function s(n,c,d,h,p,T){return e(),t("div",null,i)}const C=o(r,[["render",s]]);export{P as __pageData,C as default};
