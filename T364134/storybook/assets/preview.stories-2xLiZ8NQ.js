import{r as g,a as M,b as z,c as j,d as A}from"./preview-DJvDNXJ_.js";import"./utils-C9HMKbAi.js";const B={title:"Wikipedia Preview",argTypes:{touch:{name:"Mobile",control:"boolean"},lang:{name:"Language",control:"select",options:["en","ar","atj","bn","ca","cs","cy","et","fa","fr","he","hi","ja","la","ps","ru","sd","sr","szl","tr","ur","uz","zh"]},dir:{name:"Direction",control:"inline-radio",options:["LTR","RTL"]},title:{name:"Article Title",control:"text"},pageUrl:{name:"Article URL",control:"text"},extractHtml:{name:"Preview HTML",control:"text"},imgUrl:{name:"Thumbnail URL",control:"text"},prefersColorScheme:{name:"Color Scheme",control:"inline-radio",options:["light","dark","detect"]}},args:{touch:!1,lang:"en",dir:"LTR",title:"Cat",pageUrl:"https://en.wikipedia.org/wiki/Cat",extractHtml:"<p><strong>Lorem ipsum dolor sit amet,</strong> consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. <br/><br/>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>",imgUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Moons_of_solar_system-he.svg/langhe-320px-Moons_of_solar_system-he.svg.png",prefersColorScheme:"light"}},s=({lang:e,title:r,extractHtml:n,dir:t,pageUrl:o,imgUrl:a,touch:i,prefersColorScheme:y})=>g(e,{title:r,extractHtml:n,dir:t,pageUrl:o,imgUrl:a},i,y),c=({lang:e,title:r,extractHtml:n,dir:t,pageUrl:o,touch:a,prefersColorScheme:i})=>g(e,{title:r,extractHtml:n,dir:t,pageUrl:o},a,i),l=({touch:e,lang:r,dir:n,prefersColorScheme:t})=>M(e,r,n,t),m=({touch:e,lang:r,title:n,dir:t,prefersColorScheme:o})=>z(e,r,n,t,o),d=({lang:e,title:r,extractHtml:n,dir:t,pageUrl:o,touch:a,prefersColorScheme:i})=>g(e,{title:r,extractHtml:n,dir:t,pageUrl:o},a,i),u=({touch:e,lang:r,title:n,dir:t,prefersColorScheme:o})=>j(e,r,n,t,o),p=({touch:e,lang:r,dir:n,prefersColorScheme:t})=>A(e,r,n,t);var h,f,S;s.parameters={...s.parameters,docs:{...(h=s.parameters)==null?void 0:h.docs,source:{originalSource:`({
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
}`,...(S=(f=s.parameters)==null?void 0:f.docs)==null?void 0:S.source}}};var x,C,b;c.parameters={...c.parameters,docs:{...(x=c.parameters)==null?void 0:x.docs,source:{originalSource:`({
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
}`,...(b=(C=c.parameters)==null?void 0:C.docs)==null?void 0:b.source}}};var U,v,L;l.parameters={...l.parameters,docs:{...(U=l.parameters)==null?void 0:U.docs,source:{originalSource:`({
  touch,
  lang,
  dir,
  prefersColorScheme
}) => {
  return renderLoading(touch, lang, dir, prefersColorScheme);
}`,...(L=(v=l.parameters)==null?void 0:v.docs)==null?void 0:L.source}}};var w,H,_;m.parameters={...m.parameters,docs:{...(w=m.parameters)==null?void 0:w.docs,source:{originalSource:`({
  touch,
  lang,
  title,
  dir,
  prefersColorScheme
}) => {
  return renderError(touch, lang, title, dir, prefersColorScheme);
}`,...(_=(H=m.parameters)==null?void 0:H.docs)==null?void 0:_.source}}};var D,E,T;d.parameters={...d.parameters,docs:{...(D=d.parameters)==null?void 0:D.docs,source:{originalSource:`({
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
}`,...(T=(E=d.parameters)==null?void 0:E.docs)==null?void 0:T.source}}};var k,P,q;u.parameters={...u.parameters,docs:{...(k=u.parameters)==null?void 0:k.docs,source:{originalSource:`({
  touch,
  lang,
  title,
  dir,
  prefersColorScheme
}) => {
  return renderDisambiguation(touch, lang, title, dir, prefersColorScheme);
}`,...(q=(P=u.parameters)==null?void 0:P.docs)==null?void 0:q.source}}};var O,R,W;p.parameters={...p.parameters,docs:{...(O=p.parameters)==null?void 0:O.docs,source:{originalSource:`({
  touch,
  lang,
  dir,
  prefersColorScheme
}) => {
  return renderOffline(touch, lang, dir, prefersColorScheme);
}`,...(W=(R=p.parameters)==null?void 0:R.docs)==null?void 0:W.source}}};const F=["StandardWithImage","Standard","Loading","Error","Disambiguation","DisambiguationWithNoExtract","Offline"];export{d as Disambiguation,u as DisambiguationWithNoExtract,m as Error,l as Loading,p as Offline,c as Standard,s as StandardWithImage,F as __namedExportsOrder,B as default};
