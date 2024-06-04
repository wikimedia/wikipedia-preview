import{r as f,g as N,a as B,b as F,c as J,d as K}from"./preview-6KkOwr__.js";import"./fullscreen-DEmd4C4n.js";const X={title:"Wikipedia Preview",argTypes:{touch:{name:"Mobile",control:"boolean"},lang:{name:"Language",control:"select",options:["en","ar","atj","bn","ca","cs","cy","et","fa","fr","he","hi","ja","la","ps","ru","sd","sr","szl","tr","ur","uz","zh"]},dir:{name:"Direction",control:"inline-radio",options:["LTR","RTL"]},title:{name:"Article Title",control:"text"},pageUrl:{name:"Article URL",control:"text"},extractHtml:{name:"Preview HTML",control:"text"},imgUrl:{name:"Thumbnail URL",control:"text"},prefersColorScheme:{name:"Color Scheme",control:"inline-radio",options:["light","dark","detect"]}},args:{touch:!1,lang:"en",dir:"LTR",title:"Cat",pageUrl:"https://en.wikipedia.org/wiki/Cat",extractHtml:"<p><strong>Lorem ipsum dolor sit amet,</strong> consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. <br/><br/>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>",imgUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Moons_of_solar_system-he.svg/langhe-320px-Moons_of_solar_system-he.svg.png",prefersColorScheme:"light"}},c=({lang:e,title:r,extractHtml:t,dir:n,pageUrl:a,imgUrl:o,touch:i,prefersColorScheme:s})=>f(e,{title:r,extractHtml:t,dir:n,pageUrl:a,imgUrl:o},i,s),l=({lang:e,title:r,extractHtml:t,dir:n,pageUrl:a,touch:o,prefersColorScheme:i})=>f(e,{title:r,extractHtml:t,dir:n,pageUrl:a},o,i),m=({lang:e,title:r,extractHtml:t,dir:n,pageUrl:a,touch:o,prefersColorScheme:i})=>{const s=document.createElement("template");s.innerHTML=f(e,{title:r,extractHtml:t,dir:n,pageUrl:a},o,i);const S=s.content.firstChild;S.classList.add("expanded");const I=[{caption:"caption1",source:"source1",thumb:"thumb1",title:"title1"},{caption:"caption2",source:"source2",thumb:"thumb2",title:"title2"}];return S.querySelector(".wikipediapreview-gallery").appendChild(N(I,null)),S},d=({touch:e,lang:r,dir:t,prefersColorScheme:n})=>B(e,r,t,n),p=({touch:e,lang:r,title:t,dir:n,prefersColorScheme:a})=>F(e,r,t,n,a),u=({lang:e,title:r,extractHtml:t,dir:n,pageUrl:a,touch:o,prefersColorScheme:i})=>f(e,{title:r,extractHtml:t,dir:n,pageUrl:a},o,i),g=({touch:e,lang:r,title:t,dir:n,prefersColorScheme:a})=>J(e,r,t,n,a),h=({touch:e,lang:r,dir:t,prefersColorScheme:n})=>K(e,r,t,n);var x,b,C;c.parameters={...c.parameters,docs:{...(x=c.parameters)==null?void 0:x.docs,source:{originalSource:`({
  lang,
  title,
  extractHtml,
  dir,
  pageUrl,
  imgUrl,
  touch,
  prefersColorScheme
}) => {
  return renderPreview(lang, {
    title,
    extractHtml,
    dir,
    pageUrl,
    imgUrl
  }, touch, prefersColorScheme);
}`,...(C=(b=c.parameters)==null?void 0:b.docs)==null?void 0:C.source}}};var w,v,U;l.parameters={...l.parameters,docs:{...(w=l.parameters)==null?void 0:w.docs,source:{originalSource:`({
  lang,
  title,
  extractHtml,
  dir,
  pageUrl,
  touch,
  prefersColorScheme
}) => {
  return renderPreview(lang, {
    title,
    extractHtml,
    dir,
    pageUrl
  }, touch, prefersColorScheme);
}`,...(U=(v=l.parameters)==null?void 0:v.docs)==null?void 0:U.source}}};var L,H,E;m.parameters={...m.parameters,docs:{...(L=m.parameters)==null?void 0:L.docs,source:{originalSource:`({
  lang,
  title,
  extractHtml,
  dir,
  pageUrl,
  touch,
  prefersColorScheme
}) => {
  const template = document.createElement('template');
  template.innerHTML = renderPreview(lang, {
    title,
    extractHtml,
    dir,
    pageUrl
  }, touch, prefersColorScheme);
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
}`,...(E=(H=m.parameters)==null?void 0:H.docs)==null?void 0:E.source}}};var D,y,T;d.parameters={...d.parameters,docs:{...(D=d.parameters)==null?void 0:D.docs,source:{originalSource:`({
  touch,
  lang,
  dir,
  prefersColorScheme
}) => {
  return renderLoading(touch, lang, dir, prefersColorScheme);
}`,...(T=(y=d.parameters)==null?void 0:y.docs)==null?void 0:T.source}}};var _,k,q;p.parameters={...p.parameters,docs:{...(_=p.parameters)==null?void 0:_.docs,source:{originalSource:`({
  touch,
  lang,
  title,
  dir,
  prefersColorScheme
}) => {
  return renderError(touch, lang, title, dir, prefersColorScheme);
}`,...(q=(k=p.parameters)==null?void 0:k.docs)==null?void 0:q.source}}};var P,R,M;u.parameters={...u.parameters,docs:{...(P=u.parameters)==null?void 0:P.docs,source:{originalSource:`({
  lang,
  title,
  extractHtml,
  dir,
  pageUrl,
  touch,
  prefersColorScheme
}) => {
  return renderPreview(lang, {
    title,
    extractHtml,
    dir,
    pageUrl
  }, touch, prefersColorScheme);
}`,...(M=(R=u.parameters)==null?void 0:R.docs)==null?void 0:M.source}}};var O,W,z;g.parameters={...g.parameters,docs:{...(O=g.parameters)==null?void 0:O.docs,source:{originalSource:`({
  touch,
  lang,
  title,
  dir,
  prefersColorScheme
}) => {
  return renderDisambiguation(touch, lang, title, dir, prefersColorScheme);
}`,...(z=(W=g.parameters)==null?void 0:W.docs)==null?void 0:z.source}}};var j,A,G;h.parameters={...h.parameters,docs:{...(j=h.parameters)==null?void 0:j.docs,source:{originalSource:`({
  touch,
  lang,
  dir,
  prefersColorScheme
}) => {
  return renderOffline(touch, lang, dir, prefersColorScheme);
}`,...(G=(A=h.parameters)==null?void 0:A.docs)==null?void 0:G.source}}};const Y=["StandardWithImage","Standard","Expanded","Loading","Error","Disambiguation","DisambiguationWithNoExtract","Offline"];export{u as Disambiguation,g as DisambiguationWithNoExtract,p as Error,m as Expanded,d as Loading,h as Offline,l as Standard,c as StandardWithImage,Y as __namedExportsOrder,X as default};
