import{r as h,g as W,a as j,b as A,c as G,d as I}from"./preview-GmIyzDpa.js";import"./fullscreen-JcwL8vPs.js";const J={title:"Wikipedia Preview",argTypes:{touch:{name:"Mobile",control:"boolean"},lang:{name:"Language",control:"select",options:["en","ar","atj","bn","ca","cs","cy","et","fa","fr","he","hi","ja","la","ps","ru","sd","sr","szl","tr","ur","uz","zh"]},dir:{name:"Direction",control:"inline-radio",options:["LTR","RTL"]},title:{name:"Article Title",control:"text"},pageUrl:{name:"Article URL",control:"text"},extractHtml:{name:"Preview HTML",control:"text"},imgUrl:{name:"Thumbnail URL",control:"text"}},args:{touch:!1,lang:"en",dir:"LTR",title:"Cat",pageUrl:"https://en.wikipedia.org/wiki/Cat",extractHtml:"<p><strong>Lorem ipsum dolor sit amet,</strong> consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. <br/><br/>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>",imgUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Moons_of_solar_system-he.svg/langhe-320px-Moons_of_solar_system-he.svg.png"}},s=({lang:e,title:r,extractHtml:t,dir:n,pageUrl:a,imgUrl:i,touch:o})=>h(e,{title:r,extractHtml:t,dir:n,pageUrl:a,imgUrl:i},o),l=({lang:e,title:r,extractHtml:t,dir:n,pageUrl:a,touch:i})=>h(e,{title:r,extractHtml:t,dir:n,pageUrl:a},i),c=({lang:e,title:r,extractHtml:t,dir:n,pageUrl:a,touch:i})=>{const o=document.createElement("template");o.innerHTML=h(e,{title:r,extractHtml:t,dir:n,pageUrl:a},i);const g=o.content.firstChild;g.classList.add("expanded");const z=[{caption:"caption1",source:"source1",thumb:"thumb1",title:"title1"},{caption:"caption2",source:"source2",thumb:"thumb2",title:"title2"}];return g.querySelector(".wikipediapreview-gallery").appendChild(W(z,null)),g},d=({touch:e,lang:r,dir:t})=>j(e,r,t),u=({touch:e,lang:r,title:t,dir:n})=>A(e,r,t,n),m=({touch:e,lang:r,title:t,dir:n})=>G(e,r,t,n),p=({touch:e,lang:r,dir:t})=>I(e,r,t);var b,w,x;s.parameters={...s.parameters,docs:{...(b=s.parameters)==null?void 0:b.docs,source:{originalSource:`({
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
}`,...(x=(w=s.parameters)==null?void 0:w.docs)==null?void 0:x.source}}};var f,v,L;l.parameters={...l.parameters,docs:{...(f=l.parameters)==null?void 0:f.docs,source:{originalSource:`({
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
}`,...(L=(v=l.parameters)==null?void 0:v.docs)==null?void 0:L.source}}};var U,S,H;c.parameters={...c.parameters,docs:{...(U=c.parameters)==null?void 0:U.docs,source:{originalSource:`({
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
}`,...(H=(S=c.parameters)==null?void 0:S.docs)==null?void 0:H.source}}};var y,E,D;d.parameters={...d.parameters,docs:{...(y=d.parameters)==null?void 0:y.docs,source:{originalSource:`({
  touch,
  lang,
  dir
}) => {
  return renderLoading(touch, lang, dir);
}`,...(D=(E=d.parameters)==null?void 0:E.docs)==null?void 0:D.source}}};var T,_,k;u.parameters={...u.parameters,docs:{...(T=u.parameters)==null?void 0:T.docs,source:{originalSource:`({
  touch,
  lang,
  title,
  dir
}) => {
  return renderError(touch, lang, title, dir);
}`,...(k=(_=u.parameters)==null?void 0:_.docs)==null?void 0:k.source}}};var q,R,C;m.parameters={...m.parameters,docs:{...(q=m.parameters)==null?void 0:q.docs,source:{originalSource:`({
  touch,
  lang,
  title,
  dir
}) => {
  return renderDisambiguation(touch, lang, title, dir);
}`,...(C=(R=m.parameters)==null?void 0:R.docs)==null?void 0:C.source}}};var M,P,O;p.parameters={...p.parameters,docs:{...(M=p.parameters)==null?void 0:M.docs,source:{originalSource:`({
  touch,
  lang,
  dir
}) => {
  return renderOffline(touch, lang, dir);
}`,...(O=(P=p.parameters)==null?void 0:P.docs)==null?void 0:O.source}}};const K=["StandardWithImage","Standard","Expanded","Loading","Error","Disambiguation","Offline"];export{m as Disambiguation,u as Error,c as Expanded,d as Loading,p as Offline,l as Standard,s as StandardWithImage,K as __namedExportsOrder,J as default};
//# sourceMappingURL=preview.stories-IIfOu2eU.js.map
