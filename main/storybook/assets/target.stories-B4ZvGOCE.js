var h=Object.defineProperty,H=Object.defineProperties;var E=Object.getOwnPropertyDescriptors;var l=Object.getOwnPropertySymbols;var M=Object.prototype.hasOwnProperty,x=Object.prototype.propertyIsEnumerable;var d=(n,t,e)=>t in n?h(n,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):n[t]=e,i=(n,t)=>{for(var e in t||(t={}))M.call(t,e)&&d(n,e,t[e]);if(l)for(var e of l(t))x.call(t,e)&&d(n,e,t[e]);return n},r=(n,t)=>H(n,E(t));import{b as T}from"./utils-DOVVPUGn.js";import{w as p}from"./index-TmHbJU5g.js";import"./fullscreen-CTizVG5O.js";import"./preview-Dkj_Aj8q.js";const U={title:"Targets",argTypes:{lang:{name:"Language",control:"select",options:["en","fr","hi","ks","he","sv"]},title:{name:"Article Title",control:"text"}},args:{lang:"en",title:"Cat"}},o=({lang:n,title:t})=>{const e=document.createElement("div"),a=`<a href="${T(n,t,!0,!1)}">${t} (${n})</a>`;return e.innerHTML=a,p.init({root:e,detectLinks:!0}),e},s=({lang:n,title:t})=>{const e=document.createElement("div"),a=`<a href="${T(n,t,!0,!1)}"><img src="https://upload.wikimedia.org/wikipedia/commons/3/3d/Wikipedia-logo-v2.png"></a>`;return e.innerHTML=a,p.init({root:e,detectLinks:!0}),e},c=({lang:n,title:t})=>{const e=document.createElement("div"),a=`<span class="wmf-wp-with-preview" data-wikipedia-preview data-wp-title="${t}">${t} (${n})</span>`;return e.innerHTML=a,p.init({root:e,lang:n}),e};var m,u,g;o.parameters=r(i({},o.parameters),{docs:r(i({},(m=o.parameters)==null?void 0:m.docs),{source:i({originalSource:`({
  lang,
  title
}) => {
  const container = document.createElement('div');
  const template = \`<a href="\${buildWikipediaUrl(lang, title, true, false)}">\${title} (\${lang})</a>\`;
  container.innerHTML = template;
  wikipediaPreview.init({
    root: container,
    detectLinks: true
  });
  return container;
}`},(g=(u=o.parameters)==null?void 0:u.docs)==null?void 0:g.source)})});var w,k,v;s.parameters=r(i({},s.parameters),{docs:r(i({},(w=s.parameters)==null?void 0:w.docs),{source:i({originalSource:`({
  lang,
  title
}) => {
  const container = document.createElement('div');
  const template = \`<a href="\${buildWikipediaUrl(lang, title, true, false)}"><img src="https://upload.wikimedia.org/wikipedia/commons/3/3d/Wikipedia-logo-v2.png"></a>\`;
  container.innerHTML = template;
  wikipediaPreview.init({
    root: container,
    detectLinks: true
  });
  return container;
}`},(v=(k=s.parameters)==null?void 0:k.docs)==null?void 0:v.source)})});var f,$,L;c.parameters=r(i({},c.parameters),{docs:r(i({},(f=c.parameters)==null?void 0:f.docs),{source:i({originalSource:`({
  lang,
  title
}) => {
  const container = document.createElement('div');
  const template = \`<span class="wmf-wp-with-preview" data-wikipedia-preview data-wp-title="\${title}">\${title} (\${lang})</span>\`;
  container.innerHTML = template;
  wikipediaPreview.init({
    root: container,
    lang
  });
  return container;
}`},(L=($=c.parameters)==null?void 0:$.docs)==null?void 0:L.source)})});const _=["Hyperlink","Image","Text"];export{o as Hyperlink,s as Image,c as Text,_ as __namedExportsOrder,U as default};
