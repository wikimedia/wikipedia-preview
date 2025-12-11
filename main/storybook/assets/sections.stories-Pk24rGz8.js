var x=Object.defineProperty,A=Object.defineProperties;var b=Object.getOwnPropertyDescriptors;var p=Object.getOwnPropertySymbols;var k=Object.prototype.hasOwnProperty,C=Object.prototype.propertyIsEnumerable;var u=(n,t,e)=>t in n?x(n,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):n[t]=e,s=(n,t)=>{for(var e in t||(t={}))k.call(t,e)&&u(n,e,t[e]);if(p)for(var e of p(t))C.call(t,e)&&u(n,e,t[e]);return n},m=(n,t)=>A(n,b(t));var w=(n,t,e)=>new Promise((r,a)=>{var i=o=>{try{c(e.next(o))}catch(d){a(d)}},f=o=>{try{c(e.throw(o))}catch(d){a(d)}},c=o=>o.done?r(o.value):Promise.resolve(o.value).then(i,f);c((e=e.apply(n,t)).next())});import{w as h}from"./index-BBVJ1b1y.js";import"./fullscreen-CyfbXbIh.js";import"./utils-W2Nl3KwM.js";import"./preview-BnbiQeBI.js";const W={title:"Sections",argTypes:{lang:{name:"Language",control:"select",options:["en","fr","hi","ks","he","sv"]},title:{name:"Article Title",control:"text"}},args:{lang:"en",title:"Cat"},loaders:[e=>w(null,[e],function*({args:{lang:n,title:t}}){return{sections:yield new Promise(a=>{h.getSections(n,t,i=>{a(i.sections)})})}})]},l=({lang:n,title:t},{loaded:{sections:e}})=>{const r=document.createElement("div");return e.forEach(a=>{const i=document.createElement(a.level);i.textContent=a.id,i.setAttribute("data-wikipedia-preview",""),i.setAttribute("data-wp-title",t+"#"+a.id),i.setAttribute("data-wp-lang",n),i.style.maxWidth="fit-content",r.appendChild(i)}),h.init({root:r,lang:n}),r};var E,g,v;l.parameters=m(s({},l.parameters),{docs:m(s({},(E=l.parameters)==null?void 0:E.docs),{source:s({originalSource:`({
  lang,
  title
}, {
  loaded: {
    sections
  }
}) => {
  const container = document.createElement('div');
  sections.forEach(section => {
    const titleElement = document.createElement(section.level);
    titleElement.textContent = section.id;
    titleElement.setAttribute('data-wikipedia-preview', '');
    titleElement.setAttribute('data-wp-title', title + '#' + section.id);
    titleElement.setAttribute('data-wp-lang', lang);
    titleElement.style.maxWidth = 'fit-content';
    container.appendChild(titleElement);
  });
  wikipediaPreview.init({
    root: container,
    lang
  });
  return container;
}`},(v=(g=l.parameters)==null?void 0:g.docs)==null?void 0:v.source)})});const L=["Sections"];export{l as Sections,L as __namedExportsOrder,W as default};
