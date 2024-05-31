import{b as v}from"./fullscreen-BniIwj4Z.js";import{w as s}from"./index-D13m642A.js";import"./preview-DEYe3xld.js";const T={title:"Targets",argTypes:{lang:{name:"Language",control:"select",options:["en","fr","hi","ks","he","sv"]},title:{name:"Article Title",control:"text"}},args:{lang:"en",title:"Cat"}},r=({lang:t,title:n})=>{const e=document.createElement("div"),i=`<a href="${v(t,n,!0,!1)}">${n} (${t})</a>`;return e.innerHTML=i,s.init({root:e,detectLinks:!0}),e},a=({lang:t,title:n})=>{const e=document.createElement("div"),i=`<a href="${v(t,n,!0,!1)}"><img src="https://upload.wikimedia.org/wikipedia/commons/3/3d/Wikipedia-logo-v2.png"></a>`;return e.innerHTML=i,s.init({root:e,detectLinks:!0}),e},o=({lang:t,title:n})=>{const e=document.createElement("div"),i=`<span class="wmf-wp-with-preview" data-wikipedia-preview data-wp-title="${n}">${n} (${t})</span>`;return e.innerHTML=i,s.init({root:e,lang:t}),e};var c,l,p;r.parameters={...r.parameters,docs:{...(c=r.parameters)==null?void 0:c.docs,source:{originalSource:`({
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
}`,...(p=(l=r.parameters)==null?void 0:l.docs)==null?void 0:p.source}}};var d,m,u;a.parameters={...a.parameters,docs:{...(d=a.parameters)==null?void 0:d.docs,source:{originalSource:`({
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
}`,...(u=(m=a.parameters)==null?void 0:m.docs)==null?void 0:u.source}}};var g,w,k;o.parameters={...o.parameters,docs:{...(g=o.parameters)==null?void 0:g.docs,source:{originalSource:`({
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
}`,...(k=(w=o.parameters)==null?void 0:w.docs)==null?void 0:k.source}}};const h=["Hyperlink","Image","Text"];export{r as Hyperlink,a as Image,o as Text,h as __namedExportsOrder,T as default};
