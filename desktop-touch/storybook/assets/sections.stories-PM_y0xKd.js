import{w as d}from"./index-8EKJN6GR.js";import"./fullscreen-C5N8Pvyy.js";import"./utils-nkwiYPtB.js";import"./preview-C_1G8GtT.js";const E={title:"Sections",argTypes:{lang:{name:"Language",control:"select",options:["en","fr","hi","ks","he","sv"]},title:{name:"Article Title",control:"text"}},args:{lang:"en",title:"Cat"},loaders:[async({args:{lang:i,title:o}})=>({sections:await new Promise(e=>{d.getSections(i,o,n=>{e(n.sections)})})})]},a=({lang:i,title:o},{loaded:{sections:r}})=>{const e=document.createElement("div");return r.forEach(n=>{const t=document.createElement(n.level);t.textContent=n.id,t.setAttribute("data-wikipedia-preview",""),t.setAttribute("data-wp-title",o+"#"+n.id),t.setAttribute("data-wp-lang",i),t.style.maxWidth="fit-content",e.appendChild(t)}),d.init({root:e,lang:i}),e};var s,l,c;a.parameters={...a.parameters,docs:{...(s=a.parameters)==null?void 0:s.docs,source:{originalSource:`({
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
}`,...(c=(l=a.parameters)==null?void 0:l.docs)==null?void 0:c.source}}};const g=["Sections"];export{a as Sections,g as __namedExportsOrder,E as default};
