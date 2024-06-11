import{r as g,a as M,b as $,c as z,d as j}from"./preview-BEKTJxbr.js";import"./utils-DDqRyL-Q.js";const N={title:"Wikipedia Preview",argTypes:{touch:{name:"Mobile",control:"boolean"},lang:{name:"Language",control:"select",options:["en","ar","atj","bn","ca","cs","cy","et","fa","fr","he","hi","ja","la","ps","ru","sd","sr","szl","tr","ur","uz","zh"]},dir:{name:"Direction",control:"inline-radio",options:["LTR","RTL"]},title:{name:"Article Title",control:"text"},pageUrl:{name:"Article URL",control:"text"},extractHtml:{name:"Preview HTML",control:"text"},imgUrl:{name:"Thumbnail URL",control:"text"},prefersColorScheme:{name:"Color Scheme",control:"inline-radio",options:["light","dark","detect"]}},args:{touch:!1,lang:"en",dir:"LTR",title:"Cat",pageUrl:"https://en.wikipedia.org/wiki/Cat",extractHtml:"<p><strong>Lorem ipsum dolor sit amet,</strong> consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. <br/><br/>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>",imgUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Moons_of_solar_system-he.svg/langhe-320px-Moons_of_solar_system-he.svg.png",prefersColorScheme:"light"}},s=({lang:e,title:r,extractHtml:t,dir:n,pageUrl:o,imgUrl:a,touch:i,prefersColorScheme:W})=>`<div style="position: absolute;">${g(e,{title:r,extractHtml:t,dir:n,pageUrl:o,imgUrl:a},i,W)}</div>`,l=({lang:e,title:r,extractHtml:t,dir:n,pageUrl:o,touch:a,prefersColorScheme:i})=>`<div style="position: absolute;">${g(e,{title:r,extractHtml:t,dir:n,pageUrl:o},a,i)}</div>`,c=({touch:e,lang:r,dir:t,prefersColorScheme:n})=>M(e,r,t,n),d=({touch:e,lang:r,title:t,dir:n,prefersColorScheme:o})=>$(e,r,t,n,o),m=({lang:e,title:r,extractHtml:t,dir:n,pageUrl:o,touch:a,prefersColorScheme:i})=>g(e,{title:r,extractHtml:t,dir:n,pageUrl:o},a,i),u=({touch:e,lang:r,title:t,dir:n,prefersColorScheme:o})=>z(e,r,t,n,o),p=({touch:e,lang:r,dir:t,prefersColorScheme:n})=>j(e,r,t,n);var h,f,S;s.parameters={...s.parameters,docs:{...(h=s.parameters)==null?void 0:h.docs,source:{originalSource:`({
  lang,
  title,
  extractHtml,
  dir,
  pageUrl,
  imgUrl,
  touch,
  prefersColorScheme
}) => {
  return \`<div style="position: absolute;">\${renderPreview(lang, {
    title,
    extractHtml,
    dir,
    pageUrl,
    imgUrl
  }, touch, prefersColorScheme)}</div>\`;
}`,...(S=(f=s.parameters)==null?void 0:f.docs)==null?void 0:S.source}}};var b,v,x;l.parameters={...l.parameters,docs:{...(b=l.parameters)==null?void 0:b.docs,source:{originalSource:`({
  lang,
  title,
  extractHtml,
  dir,
  pageUrl,
  touch,
  prefersColorScheme
}) => {
  return \`<div style="position: absolute;">\${renderPreview(lang, {
    title,
    extractHtml,
    dir,
    pageUrl
  }, touch, prefersColorScheme)}</div>\`;
}`,...(x=(v=l.parameters)==null?void 0:v.docs)==null?void 0:x.source}}};var C,U,L;c.parameters={...c.parameters,docs:{...(C=c.parameters)==null?void 0:C.docs,source:{originalSource:`({
  touch,
  lang,
  dir,
  prefersColorScheme
}) => {
  return renderLoading(touch, lang, dir, prefersColorScheme);
}`,...(L=(U=c.parameters)==null?void 0:U.docs)==null?void 0:L.source}}};var w,H,_;d.parameters={...d.parameters,docs:{...(w=d.parameters)==null?void 0:w.docs,source:{originalSource:`({
  touch,
  lang,
  title,
  dir,
  prefersColorScheme
}) => {
  return renderError(touch, lang, title, dir, prefersColorScheme);
}`,...(_=(H=d.parameters)==null?void 0:H.docs)==null?void 0:_.source}}};var y,D,E;m.parameters={...m.parameters,docs:{...(y=m.parameters)==null?void 0:y.docs,source:{originalSource:`({
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
}`,...(E=(D=m.parameters)==null?void 0:D.docs)==null?void 0:E.source}}};var T,k,P;u.parameters={...u.parameters,docs:{...(T=u.parameters)==null?void 0:T.docs,source:{originalSource:`({
  touch,
  lang,
  title,
  dir,
  prefersColorScheme
}) => {
  return renderDisambiguation(touch, lang, title, dir, prefersColorScheme);
}`,...(P=(k=u.parameters)==null?void 0:k.docs)==null?void 0:P.source}}};var q,O,R;p.parameters={...p.parameters,docs:{...(q=p.parameters)==null?void 0:q.docs,source:{originalSource:`({
  touch,
  lang,
  dir,
  prefersColorScheme
}) => {
  return renderOffline(touch, lang, dir, prefersColorScheme);
}`,...(R=(O=p.parameters)==null?void 0:O.docs)==null?void 0:R.source}}};const B=["StandardWithImage","Standard","Loading","Error","Disambiguation","DisambiguationWithNoExtract","Offline"];export{m as Disambiguation,u as DisambiguationWithNoExtract,d as Error,c as Loading,p as Offline,l as Standard,s as StandardWithImage,B as __namedExportsOrder,N as default};
