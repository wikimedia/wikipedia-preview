import{r as h,g as I,a as N,b as B,c as F,d as J}from"./preview-amJWWcKy.js";import"./fullscreen-sQwBA5N6.js";const V={title:"Wikipedia Preview",argTypes:{touch:{name:"Mobile",control:"boolean"},lang:{name:"Language",control:"select",options:["en","ar","atj","bn","ca","cs","cy","et","fa","fr","he","hi","ja","la","ps","ru","sd","sr","szl","tr","ur","uz","zh"]},dir:{name:"Direction",control:"inline-radio",options:["LTR","RTL"]},title:{name:"Article Title",control:"text"},pageUrl:{name:"Article URL",control:"text"},extractHtml:{name:"Preview HTML",control:"text"},imgUrl:{name:"Thumbnail URL",control:"text"}},args:{touch:!1,lang:"en",dir:"LTR",title:"Cat",pageUrl:"https://en.wikipedia.org/wiki/Cat",extractHtml:"<p><strong>Lorem ipsum dolor sit amet,</strong> consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. <br/><br/>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>",imgUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Moons_of_solar_system-he.svg/langhe-320px-Moons_of_solar_system-he.svg.png"}},s=({lang:e,title:r,extractHtml:t,dir:n,pageUrl:a,imgUrl:i,touch:o})=>h(e,{title:r,extractHtml:t,dir:n,pageUrl:a,imgUrl:i},o),c=({lang:e,title:r,extractHtml:t,dir:n,pageUrl:a,touch:i})=>h(e,{title:r,extractHtml:t,dir:n,pageUrl:a},i),l=({lang:e,title:r,extractHtml:t,dir:n,pageUrl:a,touch:i})=>{const o=document.createElement("template");o.innerHTML=h(e,{title:r,extractHtml:t,dir:n,pageUrl:a},i);const x=o.content.firstChild;x.classList.add("expanded");const G=[{caption:"caption1",source:"source1",thumb:"thumb1",title:"title1"},{caption:"caption2",source:"source2",thumb:"thumb2",title:"title2"}];return x.querySelector(".wikipediapreview-gallery").appendChild(I(G,null)),x},u=({touch:e,lang:r,dir:t})=>N(e,r,t),d=({touch:e,lang:r,title:t,dir:n})=>B(e,r,t,n),m=({lang:e,title:r,extractHtml:t,dir:n,pageUrl:a,touch:i})=>h(e,{title:r,extractHtml:t,dir:n,pageUrl:a},i),p=({touch:e,lang:r,title:t,dir:n})=>F(e,r,t,n),g=({touch:e,lang:r,dir:t})=>J(e,r,t);var b,w,f;s.parameters={...s.parameters,docs:{...(b=s.parameters)==null?void 0:b.docs,source:{originalSource:`({
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
}`,...(f=(w=s.parameters)==null?void 0:w.docs)==null?void 0:f.source}}};var v,U,L;c.parameters={...c.parameters,docs:{...(v=c.parameters)==null?void 0:v.docs,source:{originalSource:`({
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
}`,...(L=(U=c.parameters)==null?void 0:U.docs)==null?void 0:L.source}}};var S,H,E;l.parameters={...l.parameters,docs:{...(S=l.parameters)==null?void 0:S.docs,source:{originalSource:`({
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
}`,...(E=(H=l.parameters)==null?void 0:H.docs)==null?void 0:E.source}}};var D,y,T;u.parameters={...u.parameters,docs:{...(D=u.parameters)==null?void 0:D.docs,source:{originalSource:`({
  touch,
  lang,
  dir
}) => {
  return renderLoading(touch, lang, dir);
}`,...(T=(y=u.parameters)==null?void 0:y.docs)==null?void 0:T.source}}};var _,k,q;d.parameters={...d.parameters,docs:{...(_=d.parameters)==null?void 0:_.docs,source:{originalSource:`({
  touch,
  lang,
  title,
  dir
}) => {
  return renderError(touch, lang, title, dir);
}`,...(q=(k=d.parameters)==null?void 0:k.docs)==null?void 0:q.source}}};var P,R,C;m.parameters={...m.parameters,docs:{...(P=m.parameters)==null?void 0:P.docs,source:{originalSource:`({
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
}`,...(C=(R=m.parameters)==null?void 0:R.docs)==null?void 0:C.source}}};var M,O,W;p.parameters={...p.parameters,docs:{...(M=p.parameters)==null?void 0:M.docs,source:{originalSource:`({
  touch,
  lang,
  title,
  dir
}) => {
  return renderDisambiguation(touch, lang, title, dir);
}`,...(W=(O=p.parameters)==null?void 0:O.docs)==null?void 0:W.source}}};var z,j,A;g.parameters={...g.parameters,docs:{...(z=g.parameters)==null?void 0:z.docs,source:{originalSource:`({
  touch,
  lang,
  dir
}) => {
  return renderOffline(touch, lang, dir);
}`,...(A=(j=g.parameters)==null?void 0:j.docs)==null?void 0:A.source}}};const X=["StandardWithImage","Standard","Expanded","Loading","Error","Disambiguation","DisambiguationWithNoExtract","Offline"];export{m as Disambiguation,p as DisambiguationWithNoExtract,d as Error,l as Expanded,u as Loading,g as Offline,c as Standard,s as StandardWithImage,X as __namedExportsOrder,V as default};
