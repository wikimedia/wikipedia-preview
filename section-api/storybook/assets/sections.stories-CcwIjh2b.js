import{w as d}from"./index-BI_tdDJY.js";import"./fullscreen-c4FLRwU4.js";import"./preview-DgBkcZY4.js";const w={title:"Sections",argTypes:{lang:{name:"Language",control:"select",options:["en","fr","hi","ks","he","sv"]},title:{name:"Article Title",control:"text"}},args:{lang:"en",title:"Cat"},loaders:[async({args:{lang:i,title:o}})=>({sections:await new Promise(e=>{d.getSections(i,o,n=>{e(n.sections)})})})]},a=({lang:i,title:o},{loaded:{sections:r}})=>{const e=document.createElement("div");return r.forEach(n=>{const t=document.createElement(n.level);t.textContent=n.id,t.setAttribute("data-wikipedia-preview",""),t.setAttribute("data-wp-title",o+"#"+n.id),t.setAttribute("data-wp-lang",i),t.style.maxWidth="fit-content",e.appendChild(t)}),d.init({root:e,lang:i}),e};var s,l,c;a.parameters={...a.parameters,docs:{...(s=a.parameters)==null?void 0:s.docs,source:{originalSource:`({
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
}`,...(c=(l=a.parameters)==null?void 0:l.docs)==null?void 0:c.source}}};const E=["Sections"];export{a as Sections,E as __namedExportsOrder,w as default};
