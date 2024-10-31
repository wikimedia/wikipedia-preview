import{b as v}from"./utils-I2GdOVJS.js";import{w as s}from"./index-CwTGo91T.js";import"./fullscreen-BEFrnpvV.js";import"./preview-B5Gdc9xs.js";const h={title:"Targets",argTypes:{lang:{name:"Language",control:"select",options:["en","fr","hi","ks","he","sv"]},title:{name:"Article Title",control:"text"}},args:{lang:"en",title:"Cat"}},r=({lang:t,title:n})=>{const e=document.createElement("div"),i=`<a href="${v(t,n,!0,!1)}">${n} (${t})</a>`;return e.innerHTML=i,s.init({root:e,detectLinks:!0}),e},a=({lang:t,title:n})=>{const e=document.createElement("div"),i=`<a href="${v(t,n,!0,!1)}"><img src="https://upload.wikimedia.org/wikipedia/commons/3/3d/Wikipedia-logo-v2.png"></a>`;return e.innerHTML=i,s.init({root:e,detectLinks:!0}),e},o=({lang:t,title:n})=>{const e=document.createElement("div"),i=`<span class="wmf-wp-with-preview" data-wikipedia-preview data-wp-title="${n}">${n} (${t})</span>`;return e.innerHTML=i,s.init({root:e,lang:t}),e};var c,p,l;r.parameters={...r.parameters,docs:{...(c=r.parameters)==null?void 0:c.docs,source:{originalSource:`({
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
}`,...(l=(p=r.parameters)==null?void 0:p.docs)==null?void 0:l.source}}};var d,m,u;a.parameters={...a.parameters,docs:{...(d=a.parameters)==null?void 0:d.docs,source:{originalSource:`({
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
}`,...(k=(w=o.parameters)==null?void 0:w.docs)==null?void 0:k.source}}};const H=["Hyperlink","Image","Text"];export{r as Hyperlink,a as Image,o as Text,H as __namedExportsOrder,h as default};
