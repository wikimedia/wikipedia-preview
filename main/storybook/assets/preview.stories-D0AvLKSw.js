import{r as _,a as A,b as B,c as G,d as J}from"./preview-DuNz7Ji9.js";import"./utils-B5rc_8t7.js";const V={title:"Wikipedia Preview",argTypes:{touch:{name:"Mobile",control:"boolean"},lang:{name:"Language",control:"select",options:["en","ar","atj","bn","ca","cs","cy","et","fa","fr","he","hi","ja","la","ps","ru","sd","sr","szl","tr","ur","uz","zh"]},dir:{name:"Direction",control:"inline-radio",options:["LTR","RTL"]},title:{name:"Article Title",control:"text"},pageUrl:{name:"Article URL",control:"text"},extractHtml:{name:"Preview HTML",control:"text"},imgUrl:{name:"Thumbnail URL",control:"text"},mediaItems:{name:"Media Items",control:"object"},prefersColorScheme:{name:"Color Scheme",control:"inline-radio",options:["light","dark","detect"]}},args:{touch:!1,lang:"en",dir:"LTR",title:"Cat",pageUrl:"https://en.wikipedia.org/wiki/Cat",extractHtml:"<p><strong>Lorem ipsum dolor sit amet,</strong> consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. <br/><br/>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>",imgUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Moons_of_solar_system-he.svg/langhe-320px-Moons_of_solar_system-he.svg.png",prefersColorScheme:"light",mediaItems:[{caption:"Cylindrical ivory casket, Siculo-Arabic, Hunt Museum",thumb:"https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Cylindrical_Ivory_Casket.jpg/640px-Cylindrical_Ivory_Casket.jpg",src:"https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Cylindrical_Ivory_Casket.jpg/640px-Cylindrical_Ivory_Casket.jpg",title:"File:Cylindrical_Ivory_Casket.jpg"},{caption:void 0,thumb:"https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Muizz_Street_-_Egypt.jpg/640px-Muizz_Street_-_Egypt.jpg",title:"File:Muizz_Street_-_Egypt.jpg"},{caption:void 0,thumb:"https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Porphyrogenetus.jpg/111px-Porphyrogenetus.jpg",title:"File:Porphyrogenetus.jpg"},{caption:"Wikipedia Homepage",thumb:"https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Wikipedia_Main_Page.png/960px-Wikipedia_Main_Page.png",src:"https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Wikipedia_Main_Page.png/960px-Wikipedia_Main_Page.png",title:"File:Wikipedia_Main_Page.png"},{caption:"Wikipedia originally developed from another encyclopedia project called Nupedia",thumb:"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Nupedia_logo_and_wordmark.png/480px-Nupedia_logo_and_wordmark.png",src:"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Nupedia_logo_and_wordmark.png/480px-Nupedia_logo_and_wordmark.png",title:"File:Nupedia_logo_and_wordmark.png"},{caption:"The Wikipedia Page on December 17, 2001",thumb:"https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/English_Wikipedia_main_page_20011217.jpg/480px-English_Wikipedia_main_page_20011217.jpg",src:"https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/English_Wikipedia_main_page_20011217.jpg/480px-English_Wikipedia_main_page_20011217.jpg",title:"File:English_Wikipedia_main_page_20011217.jpg"}]}},m=({lang:e,title:r,extractHtml:i,dir:a,pageUrl:t,imgUrl:n,mediaItems:o,touch:s,prefersColorScheme:k})=>_(e,{title:r,extractHtml:i,dir:a,pageUrl:t,imgUrl:n,media:o},s,k),d=({lang:e,title:r,extractHtml:i,dir:a,pageUrl:t,imgUrl:n,mediaItems:o,touch:s,prefersColorScheme:k})=>{const f=o.slice(0,2);return _(e,{title:r,extractHtml:i,dir:a,pageUrl:t,imgUrl:n,media:f},s,k)},p=({lang:e,title:r,extractHtml:i,dir:a,pageUrl:t,touch:n,prefersColorScheme:o})=>_(e,{title:r,extractHtml:i,dir:a,pageUrl:t,media:[]},n,o),l=({touch:e,lang:r,dir:i,prefersColorScheme:a})=>A(e,r,i,a),c=({touch:e,lang:r,title:i,dir:a,prefersColorScheme:t})=>B(e,r,i,a,t),u=({lang:e,title:r,extractHtml:i,dir:a,pageUrl:t,touch:n,prefersColorScheme:o})=>_(e,{title:r,extractHtml:i,dir:a,pageUrl:t,media:[]},n,o),g=({touch:e,lang:r,title:i,dir:a,prefersColorScheme:t})=>G(e,r,i,a,t),h=({touch:e,lang:r,dir:i,prefersColorScheme:a})=>J(e,r,i,a);var w,b,S;m.parameters={...m.parameters,docs:{...(w=m.parameters)==null?void 0:w.docs,source:{originalSource:`({
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
}`,...(S=(b=m.parameters)==null?void 0:b.docs)==null?void 0:S.source}}};var x,C,y;d.parameters={...d.parameters,docs:{...(x=d.parameters)==null?void 0:x.docs,source:{originalSource:`({
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
}`,...(y=(C=d.parameters)==null?void 0:C.docs)==null?void 0:y.source}}};var j,v,W;p.parameters={...p.parameters,docs:{...(j=p.parameters)==null?void 0:j.docs,source:{originalSource:`({
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
}`,...(W=(v=p.parameters)==null?void 0:v.docs)==null?void 0:W.source}}};var U,E,I;l.parameters={...l.parameters,docs:{...(U=l.parameters)==null?void 0:U.docs,source:{originalSource:`({
  touch,
  lang,
  dir,
  prefersColorScheme
}) => {
  return renderLoading(touch, lang, dir, prefersColorScheme);
}`,...(I=(E=l.parameters)==null?void 0:E.docs)==null?void 0:I.source}}};var M,P,H;c.parameters={...c.parameters,docs:{...(M=c.parameters)==null?void 0:M.docs,source:{originalSource:`({
  touch,
  lang,
  title,
  dir,
  prefersColorScheme
}) => {
  return renderError(touch, lang, title, dir, prefersColorScheme);
}`,...(H=(P=c.parameters)==null?void 0:P.docs)==null?void 0:H.source}}};var L,z,D;u.parameters={...u.parameters,docs:{...(L=u.parameters)==null?void 0:L.docs,source:{originalSource:`({
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
}`,...(D=(z=u.parameters)==null?void 0:z.docs)==null?void 0:D.source}}};var F,N,T;g.parameters={...g.parameters,docs:{...(F=g.parameters)==null?void 0:F.docs,source:{originalSource:`({
  touch,
  lang,
  title,
  dir,
  prefersColorScheme
}) => {
  return renderDisambiguation(touch, lang, title, dir, prefersColorScheme);
}`,...(T=(N=g.parameters)==null?void 0:N.docs)==null?void 0:T.source}}};var q,O,R;h.parameters={...h.parameters,docs:{...(q=h.parameters)==null?void 0:q.docs,source:{originalSource:`({
  touch,
  lang,
  dir,
  prefersColorScheme
}) => {
  return renderOffline(touch, lang, dir, prefersColorScheme);
}`,...(R=(O=h.parameters)==null?void 0:O.docs)==null?void 0:R.source}}};const X=["StandardWithManyImages","StandardWithFewImages","Standard","Loading","Error","Disambiguation","DisambiguationWithNoExtract","Offline"];export{u as Disambiguation,g as DisambiguationWithNoExtract,c as Error,l as Loading,h as Offline,p as Standard,d as StandardWithFewImages,m as StandardWithManyImages,X as __namedExportsOrder,V as default};
