import{i as m,r as G,v as I,a as N,b as $,g as R,c as F,d as X,e as Q}from"./fullscreen-PyJxsbt6.js";import{g as j,r as W,a as z,c as J,b as K,d as V}from"./preview-WkwMGYbc.js";const Z=e=>{let r=[],o=[];const a=(t,l)=>{const n=setTimeout(t,l);return o.push(n),n},y=()=>{o.forEach(t=>{clearTimeout(t)}),o=[]},c=(t,l,n,i=void 0)=>{t.addEventListener(l,n,i),r.push([t,l,n,i])},v=()=>{r.forEach(t=>{const[l,n,i,d]=t;l.removeEventListener(n,i,d)}),r=[]},f=t=>{const l=t.toElement||t.relatedTarget||t.target,n=e.element.currentTargetElement;if(l!==n&&!e.element.contains(l)){const i=a(e.hide,300),d=()=>{clearTimeout(i)};c(e.element,"mouseenter",d)}},S=t=>{const l=e.element.querySelector(".wikipediapreview-body"),n=e.element.querySelector(".wikipediapreview-header"),i=e.element.querySelector(".wikipediapreview-footer-cta")||e.element.querySelector(".wikipediapreview-footer-loading");if(l)if(e.element.style[2]==="bottom"||e.element.style.bottom){const d=e.element.getBoundingClientRect().top,h=parseInt(window.getComputedStyle(l).maxHeight.slice(0,-2));l.style.maxHeight=Math.min(t,h+d)+"px"}else{const d=e.element.getBoundingClientRect().top,h=window.getComputedStyle(n).height.slice(0,-2),p=i?window.getComputedStyle(i).height.slice(0,-2):0,u=window.innerHeight-d-h-p;l.style.maxHeight=Math.min(t,u)+"px"}},s=()=>{const{lang:l,title:n}=e;e.element.component.wikipediapreview.classList.add("expanded"),m||S(496),!e.loading&&l&&n&&G(l,n,i=>{const d=e.element.component.wikipediapreviewGallery;i&&i.length>0?d.appendChild(j(i,e)):e.element.component.body.removeChild(d)})},P=t=>{let l,n,i,d;const h=t.querySelector(".wikipediapreview-header"),p=t.querySelector(".wikipediapreview-body"),u=w=>{l=w.touches[0].clientY,i=window.getComputedStyle(p),d=Number(i.height.slice(0,-2))},x=(w,H)=>{H&&w.preventDefault();const b=w.touches[0].clientY,L=l-b,B=d+L,U=!t.querySelector(".wikipediapreview.expanded")&&!H||H;p.style.transition="auto",n=b,U&&(p.style.maxHeight=B+"px")},T=w=>{const H=t.querySelector(".wikipediapreview.expanded"),b=l-n,L=Math.abs(b)>80,B=!H&&!w||w;p.style.transition="all 0.25s ease-in-out",b<0&&L&&B?e.hide():b>0&&L&&B&&!H?(p.style.maxHeight="70vh",s()):p.style.maxHeight=d+"px"};c(p,"touchstart",u),c(p,"touchmove",w=>{x(w,!1)}),c(p,"touchend",()=>T(!1)),c(h,"touchstart",u),c(h,"touchmove",w=>{x(w,!0)}),c(h,"touchend",()=>T(!0))};return{onHide:()=>{e.element.component.wikipediapreview.classList.remove("expanded"),e.lang=null,e.title=null,e.loading=!1;const t=e.element.querySelector(".wikipediapreview-body");t.style.transition="auto",v(),y()},onShow:t=>{if(t.component={body:t.querySelector(".wikipediapreview-body"),wikipediapreview:t.querySelector(".wikipediapreview"),wikipediapreviewGallery:t.querySelector(".wikipediapreview-gallery"),closeBtn:t.querySelector(".wikipediapreview-header-closebtn"),readMore:t.querySelector(".wikipediapreview-footer-cta-readmore"),content:t.querySelector(".wikipediapreview-body > p")},t.component.content&&t.component.content.getBoundingClientRect().height<248?s():m||S(248),m&&c(t.component.closeBtn,"click",e.hide),t.component.readMore&&c(t.component.readMore,"click",s),m){const l=document.querySelector(".wp-dark-screen");c(l,"click",e.hide,!0),P(t)}else c(t,"mouseleave",f),c(t.currentTargetElement,"mouseleave",f)},onExpand:s}};let g;const _=(e,r,o,a,y)=>{const c=e.left+e.width/2,v=e.top+e.height/2,f=c<=a/2,S=v<=y/2,s=f?e.left:e.left+e.width-r,P=S?e.top+e.height:"",E=S?"":y-e.top;return{left:s,top:P,bottom:E}},M=e=>e&&e+"px",ee=e=>({left:e.left-3,right:e.right+3,top:e.top-3,bottom:e.bottom+3}),te=(e,{x:r,y:o})=>{const a=e.getClientRects();for(let y=0;y<a.length;y++){const c=ee(a[y]);if(r>=c.left&&r<=c.right&&o>=c.top&&o<=c.bottom)return a[y]}return a[0]||e.getBoundingClientRect()},ie=(e,r=window)=>{g||(g=r.document.createElement("div"),g.classList.add("wp-popup"),g.style.visibility="hidden",e.appendChild(g));const o={};return{show:(v,f,S)=>{g.innerHTML=v;const s=_(te(f,S),g.offsetWidth,g.offsetHeight,r.innerWidth,r.innerHeight);g.style.left=M(s.left),g.style.top=M(s.top),g.style.bottom=M(s.bottom),g.currentTargetElement=f,g.style.visibility="visible",o.onShow&&o.onShow(g)},hide:()=>{o.onHide&&o.onHide(g),g.style.visibility="hidden",g.currentTargetElement=null},subscribe:(v={})=>{v.onShow&&(o.onShow=v.onShow),v.onHide&&(o.onHide=v.onHide)},element:g}};let k,O;const oe=e=>{if(!e.querySelector(".wp-dark-screen")){const r=e.createElement("div");r.classList.add("wp-dark-screen"),e.body.appendChild(r),O=e.body.style.overflow,e.body.style.overflow="hidden"}},ne=e=>{const r=e.getElementsByClassName("wp-dark-screen");e.body.removeChild(r[0]),e.body.style.overflow=O},re=(e,r=window)=>{k||(k=r.document.createElement("div"),k.classList.add("wp-touch-popup"),k.style.visibility="hidden",e.appendChild(k));const o={};return{show:f=>{k.innerHTML=f,k.style.visibility="visible",oe(r.document),o.onShow&&o.onShow(k)},hide:()=>{o.onHide&&o.onHide(k),k.style.visibility="hidden",ne(r.document)},expand:()=>{o.onExpand&&o.onExpand()},subscribe:(f={})=>{f.onShow&&(o.onShow=f.onShow),f.onHide&&(o.onHide=f.onHide),f.onExpand&&(o.onExpand=f.onExpand)},element:k}},A=(e,r,o)=>{const a=e&&e[r];if(a instanceof Function)try{a.apply(null,o)}catch(y){console.log("Error invoking Wikipedia Preview custom callback",y)}},le=(e,r,o)=>{N(r,e,a=>{o(W(r,a,m))})},Y=(e,r)=>{const o=[];(typeof e=="string"||e instanceof String)&&Array.prototype.forEach.call(document.querySelectorAll(e),a=>{o.push(a)}),(e instanceof Document||e instanceof Element)&&o.push(e),Array.isArray(e)&&e.forEach(a=>{a instanceof Element&&o.push(a)}),o.forEach(a=>r(a))};let D,q;function se({root:e=document,selector:r="[data-wikipedia-preview]",lang:o="en",detectLinks:a=!1,popupContainer:y=document.body,events:c={},debug:v=!1,prefersColorScheme:f="detect"}){const S=o,s=m?re(y):ie(y),P=Z(s),E={},C=[],t=[];q=f;const l=(n,i=!1)=>{n.preventDefault();const d=Date.now(),{currentTarget:h}=i?E:n,p=i?E.title:decodeURIComponent(h.getAttribute("data-wp-title")||h.textContent),u=i?E.lang:h.getAttribute("data-wp-lang")||S,x=i?E.pointerPosition:{x:n.clientX,y:n.clientY},T=Q(u);s.element.currentTargetElement===h&&!i||(D=d,s.element.style.visibility==="visible"&&s.hide(),s.loading=!0,s.dir=T,s.show(z(m,u,T,q),h,x),N(u,p,w=>{if(d===D&&s.loading){if(s.loading=!1,w){if(s.lang=u,s.title=p,w.type==="standard")s.show(W(u,w,m,q),h,x),A(c,"onShow",[p,u,"standard"]);else if(w.type==="disambiguation"){const b=w.extractHtml?W(u,w,m,q):J(m,u,w.title,w.dir,q);s.show(b,h,x),A(c,"onShow",[p,u,"disambiguation"])}}else if(F())s.show(K(m,u,p,T,q),h,x),A(c,"onShow",[p,u,"error"]);else{s.show(V(m,u,T,q),h,x),A(c,"onShow",[p,u,"offline"]);const b=document.querySelector(".wikipediapreview-body-action");E.lang=u,E.title=p,E.pointerPosition=x,E.target=h,b.addEventListener("click",L=>{l(L,!0)})}const H=s.element.querySelector(".wikipediapreview-footer-cta-readonwiki, .wikipediapreview-cta-readonwiki");if(H&&H.addEventListener("click",()=>{A(c,"onWikiRead",[p,u])}),h.tagName==="A"){const b=X().split("="),L=new URL(h.href);L.searchParams.set(b[0],b[1]),h.href=L.href}}}))};s.subscribe(P),Y(e,n=>{Array.prototype.forEach.call(n.querySelectorAll(r),i=>{m?i.addEventListener("click",l):i.addEventListener("mouseenter",l),C.push({text:i.textContent,title:i.getAttribute("data-wp-title")||i.textContent,lang:i.getAttribute("data-wp-lang")||S})})}),a&&Y(e,n=>{Array.prototype.forEach.call(n.querySelectorAll("a"),i=>{const d=R(i.getAttribute("href"));d&&(i.setAttribute("data-wp-title",d.title),i.setAttribute("data-wp-lang",d.lang),m?i.addEventListener("click",l):i.addEventListener("mouseenter",l),t.push({text:i.textContent,title:d.title,lang:d.lang}))})}),v&&(console.group("Wikipedia Preview [debug mode]"),console.group(`Searching for "${r}" inside ${e}, Total links found: ${C.length}`),C.forEach((n,i)=>{console.log(i+1,`${n.text} -> ${$(n.lang,n.title,m,!1)}`)}),console.groupEnd(),a&&(console.group(`Searching for links to Wikipedia, Total links found: ${t.length}`),t.forEach((n,i)=>{console.log(i+1,`${n.text} -> ${$(n.lang,n.title,m,!1)}`)}),console.groupEnd()),console.groupEnd())}I();const he={init:se,version:I,getPreviewHtml:le};export{he as w};