import{w as p}from"./index-I8I8tyRn.js";import"./fullscreen-PyJxsbt6.js";import"./preview-WkwMGYbc.js";const w={title:"Sections",argTypes:{lang:{name:"Language",control:"select",options:["en","fr","hi","ks","he","sv"]},title:{name:"Article Title",control:"text"}},args:{lang:"en",title:"Cat"},loaders:[async({args:{lang:e,title:i}})=>({articleText:await(await fetch(`https://${e}.wikipedia.org/api/rest_v1/page/mobile-html/${encodeURIComponent(i)}`)).text()})]},n=({lang:e,title:i},{loaded:{articleText:c}})=>{const a=new DOMParser().parseFromString(c,"text/html"),m=Array.from(a.querySelectorAll("section")),r=document.createElement("div");return m.forEach(d=>{let t=d.querySelector("h2, h3, h4, h5, h6");return t||(t=a.createElement("h2"),t.textContent="Summary"),t.setAttribute("data-wikipedia-preview",""),t.setAttribute("data-wp-title",i+"#"+t.id),t.setAttribute("data-wp-lang",e),t.style.maxWidth="fit-content",r.appendChild(t),t.outerHTML}),p.init({root:r,lang:e}),r};var o,l,s;n.parameters={...n.parameters,docs:{...(o=n.parameters)==null?void 0:o.docs,source:{originalSource:`({
  lang,
  title
}, {
  loaded: {
    articleText
  }
}) => {
  const doc = new DOMParser().parseFromString(articleText, 'text/html');
  const sections = Array.from(doc.querySelectorAll('section'));
  const container = document.createElement('div');
  sections.forEach(sectionElement => {
    let titleElement = sectionElement.querySelector('h2, h3, h4, h5, h6');
    if (!titleElement) {
      titleElement = doc.createElement('h2');
      titleElement.textContent = 'Summary';
    }
    titleElement.setAttribute('data-wikipedia-preview', '');
    titleElement.setAttribute('data-wp-title', title + '#' + titleElement.id);
    titleElement.setAttribute('data-wp-lang', lang);
    titleElement.style.maxWidth = 'fit-content';
    container.appendChild(titleElement);
    return titleElement.outerHTML;
  });
  wikipediaPreview.init({
    root: container,
    lang
  });
  return container;
}`,...(s=(l=n.parameters)==null?void 0:l.docs)==null?void 0:s.source}}};const g=["Sections"];export{n as Sections,g as __namedExportsOrder,w as default};
