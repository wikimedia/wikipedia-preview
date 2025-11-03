var K=Object.defineProperty,Q=Object.defineProperties;var V=Object.getOwnPropertyDescriptors;var S=Object.getOwnPropertySymbols;var X=Object.prototype.hasOwnProperty,Y=Object.prototype.propertyIsEnumerable;var x=(i,e,r)=>e in i?K(i,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):i[e]=r,a=(i,e)=>{for(var r in e||(e={}))X.call(e,r)&&x(i,r,e[r]);if(S)for(var r of S(e))Y.call(e,r)&&x(i,r,e[r]);return i},t=(i,e)=>Q(i,V(e));import{r as f,a as Z,b as $,c as ee,d as re}from"./preview-DyCJWCpz.js";import"./utils-7uP73yrj.js";const ne={title:"Wikipedia Preview",argTypes:{touch:{name:"Mobile",control:"boolean"},lang:{name:"Language",control:"select",options:["en","ar","atj","bn","ca","cs","cy","et","fa","fr","he","hi","ja","la","ps","ru","sd","sr","szl","tr","ur","uz","zh"]},dir:{name:"Direction",control:"inline-radio",options:["LTR","RTL"]},title:{name:"Article Title",control:"text"},pageUrl:{name:"Article URL",control:"text"},extractHtml:{name:"Preview HTML",control:"text"},imgUrl:{name:"Thumbnail URL",control:"text"},mediaItems:{name:"Media Items",control:"object"},prefersColorScheme:{name:"Color Scheme",control:"inline-radio",options:["light","dark","detect"]}},args:{touch:!1,lang:"en",dir:"LTR",title:"Cat",pageUrl:"https://en.wikipedia.org/wiki/Cat",extractHtml:"<p><strong>Lorem ipsum dolor sit amet,</strong> consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. <br/><br/>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>",imgUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Moons_of_solar_system-he.svg/langhe-320px-Moons_of_solar_system-he.svg.png",prefersColorScheme:"light",mediaItems:[{caption:"Cylindrical ivory casket, Siculo-Arabic, Hunt Museum",thumb:"https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Cylindrical_Ivory_Casket.jpg/640px-Cylindrical_Ivory_Casket.jpg",src:"https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Cylindrical_Ivory_Casket.jpg/640px-Cylindrical_Ivory_Casket.jpg",title:"File:Cylindrical_Ivory_Casket.jpg"},{caption:void 0,thumb:"https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Muizz_Street_-_Egypt.jpg/640px-Muizz_Street_-_Egypt.jpg",title:"File:Muizz_Street_-_Egypt.jpg"},{caption:void 0,thumb:"https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Porphyrogenetus.jpg/111px-Porphyrogenetus.jpg",title:"File:Porphyrogenetus.jpg"},{caption:"Wikipedia Homepage",thumb:"https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Wikipedia_Main_Page.png/960px-Wikipedia_Main_Page.png",src:"https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Wikipedia_Main_Page.png/960px-Wikipedia_Main_Page.png",title:"File:Wikipedia_Main_Page.png"},{caption:"Wikipedia originally developed from another encyclopedia project called Nupedia",thumb:"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Nupedia_logo_and_wordmark.png/480px-Nupedia_logo_and_wordmark.png",src:"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Nupedia_logo_and_wordmark.png/480px-Nupedia_logo_and_wordmark.png",title:"File:Nupedia_logo_and_wordmark.png"},{caption:"The Wikipedia Page on December 17, 2001",thumb:"https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/English_Wikipedia_main_page_20011217.jpg/480px-English_Wikipedia_main_page_20011217.jpg",src:"https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/English_Wikipedia_main_page_20011217.jpg/480px-English_Wikipedia_main_page_20011217.jpg",title:"File:English_Wikipedia_main_page_20011217.jpg"}]}},d=({lang:i,title:e,extractHtml:r,dir:n,pageUrl:o,imgUrl:s,mediaItems:m,touch:p,prefersColorScheme:w})=>f(i,{title:e,extractHtml:r,dir:n,imgUrl:s,media:m},p,w),l=({lang:i,title:e,extractHtml:r,dir:n,pageUrl:o,imgUrl:s,mediaItems:m,touch:p,prefersColorScheme:w})=>{const b=m.slice(0,2);return f(i,{title:e,extractHtml:r,dir:n,imgUrl:s,media:b},p,w)},c=({lang:i,title:e,extractHtml:r,dir:n,pageUrl:o,touch:s,prefersColorScheme:m})=>f(i,{title:e,extractHtml:r,dir:n,media:[]},s,m),u=({touch:i,lang:e,dir:r,prefersColorScheme:n})=>Z(i,e,r,n),g=({touch:i,lang:e,title:r,dir:n,prefersColorScheme:o})=>$(i,e,r,n,o),h=({lang:i,title:e,extractHtml:r,dir:n,pageUrl:o,touch:s,prefersColorScheme:m})=>f(i,{title:e,extractHtml:r,dir:n,media:[]},s,m),_=({touch:i,lang:e,title:r,dir:n,prefersColorScheme:o})=>ee(i,e,r,n,o),k=({touch:i,lang:e,dir:r,prefersColorScheme:n})=>re(i,e,r,n);var C,y,U;d.parameters=t(a({},d.parameters),{docs:t(a({},(C=d.parameters)==null?void 0:C.docs),{source:a({originalSource:`({
  lang,
  title,
  extractHtml,
  dir,
  pageUrl,
  imgUrl,
  mediaItems,
  touch,
  prefersColorScheme
}) => {
  const media = mediaItems;
  return renderPreview(lang, {
    title,
    extractHtml,
    dir,
    pageUrl,
    imgUrl,
    media
  }, touch, prefersColorScheme);
}`},(U=(y=d.parameters)==null?void 0:y.docs)==null?void 0:U.source)})});var j,v,W;l.parameters=t(a({},l.parameters),{docs:t(a({},(j=l.parameters)==null?void 0:j.docs),{source:a({originalSource:`({
  lang,
  title,
  extractHtml,
  dir,
  pageUrl,
  imgUrl,
  mediaItems,
  touch,
  prefersColorScheme
}) => {
  const media = mediaItems.slice(0, 2);
  return renderPreview(lang, {
    title,
    extractHtml,
    dir,
    pageUrl,
    imgUrl,
    media
  }, touch, prefersColorScheme);
}`},(W=(v=l.parameters)==null?void 0:v.docs)==null?void 0:W.source)})});var E,I,M;c.parameters=t(a({},c.parameters),{docs:t(a({},(E=c.parameters)==null?void 0:E.docs),{source:a({originalSource:`({
  lang,
  title,
  extractHtml,
  dir,
  pageUrl,
  touch,
  prefersColorScheme
}) => {
  const media = [];
  return renderPreview(lang, {
    title,
    extractHtml,
    dir,
    pageUrl,
    media
  }, touch, prefersColorScheme);
}`},(M=(I=c.parameters)==null?void 0:I.docs)==null?void 0:M.source)})});var P,H,L;u.parameters=t(a({},u.parameters),{docs:t(a({},(P=u.parameters)==null?void 0:P.docs),{source:a({originalSource:`({
  touch,
  lang,
  dir,
  prefersColorScheme
}) => {
  return renderLoading(touch, lang, dir, prefersColorScheme);
}`},(L=(H=u.parameters)==null?void 0:H.docs)==null?void 0:L.source)})});var z,D,F;g.parameters=t(a({},g.parameters),{docs:t(a({},(z=g.parameters)==null?void 0:z.docs),{source:a({originalSource:`({
  touch,
  lang,
  title,
  dir,
  prefersColorScheme
}) => {
  return renderError(touch, lang, title, dir, prefersColorScheme);
}`},(F=(D=g.parameters)==null?void 0:D.docs)==null?void 0:F.source)})});var N,T,q;h.parameters=t(a({},h.parameters),{docs:t(a({},(N=h.parameters)==null?void 0:N.docs),{source:a({originalSource:`({
  lang,
  title,
  extractHtml,
  dir,
  pageUrl,
  touch,
  prefersColorScheme
}) => {
  const media = []; // disambiguation doesn't show gallery row
  return renderPreview(lang, {
    title,
    extractHtml,
    dir,
    pageUrl,
    media
  }, touch, prefersColorScheme);
}`},(q=(T=h.parameters)==null?void 0:T.docs)==null?void 0:q.source)})});var O,R,A;_.parameters=t(a({},_.parameters),{docs:t(a({},(O=_.parameters)==null?void 0:O.docs),{source:a({originalSource:`({
  touch,
  lang,
  title,
  dir,
  prefersColorScheme
}) => {
  return renderDisambiguation(touch, lang, title, dir, prefersColorScheme);
}`},(A=(R=_.parameters)==null?void 0:R.docs)==null?void 0:A.source)})});var B,G,J;k.parameters=t(a({},k.parameters),{docs:t(a({},(B=k.parameters)==null?void 0:B.docs),{source:a({originalSource:`({
  touch,
  lang,
  dir,
  prefersColorScheme
}) => {
  return renderOffline(touch, lang, dir, prefersColorScheme);
}`},(J=(G=k.parameters)==null?void 0:G.docs)==null?void 0:J.source)})});const oe=["StandardWithManyImages","StandardWithFewImages","Standard","Loading","Error","Disambiguation","DisambiguationWithNoExtract","Offline"];export{h as Disambiguation,_ as DisambiguationWithNoExtract,g as Error,u as Loading,k as Offline,c as Standard,l as StandardWithFewImages,d as StandardWithManyImages,oe as __namedExportsOrder,ne as default};
