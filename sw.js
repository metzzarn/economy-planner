if(!self.define){let e,s={};const i=(i,n)=>(i=new URL(i+".js",n).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(n,r)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(s[t])return;let d={};const o=e=>i(e,t),l={module:{uri:t},exports:d,require:o};s[t]=Promise.all(n.map((e=>l[e]||o(e)))).then((e=>(r(...e),d)))}}define(["./workbox-fa446783"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/index-9672757f.js",revision:null},{url:"assets/index-fbd2d9bc.css",revision:null},{url:"assets/web-vitals-dfcc5b9a.js",revision:null},{url:"index.html",revision:"0b52e30db77c64a227498cb43ee8aa2a"},{url:"registerSW.js",revision:"8dcdd3e6daa0beca2b4b49db88c0c0dc"},{url:"manifest.webmanifest",revision:"3b3b2f11cb7ff27da2567fa1d6d37d8b"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
