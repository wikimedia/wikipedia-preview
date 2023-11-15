import{r as h,g as z,a as W,b as j,c as A,d as G}from"./preview-3e568656.js";import"./fullscreen-77855381.js";const F={title:"Wikipedia Preview",argTypes:{touch:{name:"Mobile",defaultValue:!1,control:"boolean"},lang:{name:"Language",defaultValue:"en",control:{type:"select",options:["en","ar","atj","bn","ca","cs","cy","et","fa","fr","he","hi","ja","la","ps","ru","sd","sr","szl","tr","ur","uz","zh"]}},dir:{name:"Direction",defaultValue:"LTR",control:{type:"inline-radio",options:["LTR","RTL"]}},title:{name:"Article Title",defaultValue:"Cat",control:"text"},pageUrl:{name:"Article URL",defaultValue:"https://en.wikipedia.org/wiki/Cat",control:"text"},extractHtml:{name:"Preview HTML",defaultValue:"<p><strong>Lorem ipsum dolor sit amet,</strong> consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. <br/><br/>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>",control:"text"},imgUrl:{name:"Thumbnail URL",defaultValue:"https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Moons_of_solar_system-he.svg/langhe-320px-Moons_of_solar_system-he.svg.png",control:"text"}}},s=({lang:e,title:r,extractHtml:t,dir:n,pageUrl:a,imgUrl:o,touch:i})=>h(e,{title:r,extractHtml:t,dir:n,pageUrl:a,imgUrl:o},i),l=({lang:e,title:r,extractHtml:t,dir:n,pageUrl:a,touch:o})=>h(e,{title:r,extractHtml:t,dir:n,pageUrl:a},o),c=({lang:e,title:r,extractHtml:t,dir:n,pageUrl:a,touch:o})=>{const i=document.createElement("template");i.innerHTML=h(e,{title:r,extractHtml:t,dir:n,pageUrl:a},o);const g=i.content.firstChild;g.classList.add("expanded");const O=[{caption:"caption1",source:"source1",thumb:"thumb1",title:"title1"},{caption:"caption2",source:"source2",thumb:"thumb2",title:"title2"}];return g.querySelector(".wikipediapreview-gallery").appendChild(z(O,null)),g},u=({touch:e,lang:r,dir:t})=>W(e,r,t),d=({touch:e,lang:r,title:t,dir:n})=>j(e,r,t,n),m=({touch:e,lang:r,title:t,dir:n})=>A(e,r,t,n),p=({touch:e,lang:r,dir:t})=>G(e,r,t);var f,b,w;s.parameters={...s.parameters,docs:{...(f=s.parameters)==null?void 0:f.docs,source:{originalSource:`({
  lang,
  title,
  extractHtml,
  dir,
  pageUrl,
  imgUrl,
  touch
}) => {
  return renderPreview(lang, {
    title,
    extractHtml,
    dir,
    pageUrl,
    imgUrl
  }, touch);
}`,...(w=(b=s.parameters)==null?void 0:b.docs)==null?void 0:w.source}}};var x,v,L;l.parameters={...l.parameters,docs:{...(x=l.parameters)==null?void 0:x.docs,source:{originalSource:`({
  lang,
  title,
  extractHtml,
  dir,
  pageUrl,
  touch
}) => {
  return renderPreview(lang, {
    title,
    extractHtml,
    dir,
    pageUrl
  }, touch);
}`,...(L=(v=l.parameters)==null?void 0:v.docs)==null?void 0:L.source}}};var S,U,y;c.parameters={...c.parameters,docs:{...(S=c.parameters)==null?void 0:S.docs,source:{originalSource:`({
  lang,
  title,
  extractHtml,
  dir,
  pageUrl,
  touch
}) => {
  const template = document.createElement('template');
  template.innerHTML = renderPreview(lang, {
    title,
    extractHtml,
    dir,
    pageUrl
  }, touch);
  const preview = template.content.firstChild;
  preview.classList.add('expanded');
  const mediaData = [{
    caption: 'caption1',
    source: 'source1',
    thumb: 'thumb1',
    title: 'title1'
  }, {
    caption: 'caption2',
    source: 'source2',
    thumb: 'thumb2',
    title: 'title2'
  }];
  preview.querySelector('.wikipediapreview-gallery').appendChild(getGalleryRow(mediaData, null));
  return preview;
}`,...(y=(U=c.parameters)==null?void 0:U.docs)==null?void 0:y.source}}};var E,H,D;u.parameters={...u.parameters,docs:{...(E=u.parameters)==null?void 0:E.docs,source:{originalSource:`({
  touch,
  lang,
  dir
}) => {
  return renderLoading(touch, lang, dir);
}`,...(D=(H=u.parameters)==null?void 0:H.docs)==null?void 0:D.source}}};var T,_,k;d.parameters={...d.parameters,docs:{...(T=d.parameters)==null?void 0:T.docs,source:{originalSource:`({
  touch,
  lang,
  title,
  dir
}) => {
  return renderError(touch, lang, title, dir);
}`,...(k=(_=d.parameters)==null?void 0:_.docs)==null?void 0:k.source}}};var q,R,V;m.parameters={...m.parameters,docs:{...(q=m.parameters)==null?void 0:q.docs,source:{originalSource:`({
  touch,
  lang,
  title,
  dir
}) => {
  return renderDisambiguation(touch, lang, title, dir);
}`,...(V=(R=m.parameters)==null?void 0:R.docs)==null?void 0:V.source}}};var C,M,P;p.parameters={...p.parameters,docs:{...(C=p.parameters)==null?void 0:C.docs,source:{originalSource:`({
  touch,
  lang,
  dir
}) => {
  return renderOffline(touch, lang, dir);
}`,...(P=(M=p.parameters)==null?void 0:M.docs)==null?void 0:P.source}}};const J=["StandardWithImage","Standard","Expanded","Loading","Error","Disambiguation","Offline"];export{m as Disambiguation,d as Error,c as Expanded,u as Loading,p as Offline,l as Standard,s as StandardWithImage,J as __namedExportsOrder,F as default};
//# sourceMappingURL=preview.stories-8208f2a8.js.map
