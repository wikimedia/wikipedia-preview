var w=Object.defineProperty,b=Object.defineProperties;var y=Object.getOwnPropertyDescriptors;var r=Object.getOwnPropertySymbols;var j=Object.prototype.hasOwnProperty,W=Object.prototype.propertyIsEnumerable;var m=(a,i,e)=>i in a?w(a,i,{enumerable:!0,configurable:!0,writable:!0,value:e}):a[i]=e,n=(a,i)=>{for(var e in i||(i={}))j.call(i,e)&&m(a,e,i[e]);if(r)for(var e of r(i))W.call(i,e)&&m(a,e,i[e]);return a},t=(a,i)=>b(a,y(i));import"./utils-C4HRmcQa.js";import{s as k}from"./fullscreen-CQTlddIK.js";const C={title:"Gallery",argTypes:{touch:{name:"Mobile",control:"boolean"},lang:{name:"Language",control:"select",options:["en","fr","hi","ks","he"]},dir:{name:"Direction",control:"inline-radio",options:["ltr","rtl"]}},args:{touch:!1,lang:"en",dir:"ltr"}},p=({lang:a,dir:i})=>{const e=document.createElement("div"),o="selected";return k([{caption:"Wikipedia logo",thumb:o,src:"https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Wikipedia-logo-v2.svg/225px-Wikipedia-logo-v2.svg.png",title:"File:Wikipedia-logo-v2.png"},{caption:"Wikipedia Homepage",thumb:"https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Wikipedia_Main_Page.png/960px-Wikipedia_Main_Page.png",src:"https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Wikipedia_Main_Page.png/960px-Wikipedia_Main_Page.png",title:"File:Wikipedia_Main_Page.png"},{caption:"Wikipedia originally developed from another encyclopedia project called Nupedia",thumb:"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Nupedia_logo_and_wordmark.png/480px-Nupedia_logo_and_wordmark.png",src:"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Nupedia_logo_and_wordmark.png/480px-Nupedia_logo_and_wordmark.png",title:"File:Nupedia_logo_and_wordmark.png"},{caption:"The Wikipedia Page on December 17, 2001",thumb:"https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/English_Wikipedia_main_page_20011217.jpg/480px-English_Wikipedia_main_page_20011217.jpg",src:"https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/English_Wikipedia_main_page_20011217.jpg/480px-English_Wikipedia_main_page_20011217.jpg",title:"File:English_Wikipedia_main_page_20011217.jpg"},{caption:void 0,thumb:"https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Muizz_Street_-_Egypt.jpg/640px-Muizz_Street_-_Egypt.jpg",title:"File:Muizz_Street_-_Egypt.jpg"},{caption:void 0,thumb:"https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Porphyrogenetus.jpg/111px-Porphyrogenetus.jpg",title:"File:Porphyrogenetus.jpg"},{caption:"Cylindrical ivory casket, Siculo-Arabic, Hunt Museum",thumb:"https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Cylindrical_Ivory_Casket.jpg/640px-Cylindrical_Ivory_Casket.jpg",src:"https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Cylindrical_Ivory_Casket.jpg/640px-Cylindrical_Ivory_Casket.jpg",title:"File:Cylindrical_Ivory_Casket.jpg"}],o,a,i,e),e},d=({lang:a,dir:i})=>{const e=document.createElement("div"),o="selected";return k([{title:"error.jpg",thumb:o},{title:"error.jpg"}],o,a,i,e),e};var l,g,s;p.parameters=t(n({},p.parameters),{docs:t(n({},(l=p.parameters)==null?void 0:l.docs),{source:n({originalSource:`({
  lang,
  dir
}) => {
  const container = document.createElement('div');
  const selectedThumb = 'selected';
  const mediaItems = [{
    caption: 'Wikipedia logo',
    thumb: selectedThumb,
    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Wikipedia-logo-v2.svg/225px-Wikipedia-logo-v2.svg.png',
    title: 'File:Wikipedia-logo-v2.png'
  }, {
    caption: 'Wikipedia Homepage',
    thumb: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Wikipedia_Main_Page.png/960px-Wikipedia_Main_Page.png',
    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Wikipedia_Main_Page.png/960px-Wikipedia_Main_Page.png',
    title: 'File:Wikipedia_Main_Page.png'
  }, {
    caption: 'Wikipedia originally developed from another encyclopedia project called Nupedia',
    thumb: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Nupedia_logo_and_wordmark.png/480px-Nupedia_logo_and_wordmark.png',
    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Nupedia_logo_and_wordmark.png/480px-Nupedia_logo_and_wordmark.png',
    title: 'File:Nupedia_logo_and_wordmark.png'
  }, {
    caption: 'The Wikipedia Page on December 17, 2001',
    thumb: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/English_Wikipedia_main_page_20011217.jpg/480px-English_Wikipedia_main_page_20011217.jpg',
    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/English_Wikipedia_main_page_20011217.jpg/480px-English_Wikipedia_main_page_20011217.jpg',
    title: 'File:English_Wikipedia_main_page_20011217.jpg'
  }, {
    caption: undefined,
    thumb: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Muizz_Street_-_Egypt.jpg/640px-Muizz_Street_-_Egypt.jpg',
    title: 'File:Muizz_Street_-_Egypt.jpg'
  }, {
    caption: undefined,
    thumb: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Porphyrogenetus.jpg/111px-Porphyrogenetus.jpg',
    title: 'File:Porphyrogenetus.jpg'
  }, {
    caption: 'Cylindrical ivory casket, Siculo-Arabic, Hunt Museum',
    thumb: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Cylindrical_Ivory_Casket.jpg/640px-Cylindrical_Ivory_Casket.jpg',
    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Cylindrical_Ivory_Casket.jpg/640px-Cylindrical_Ivory_Casket.jpg',
    title: 'File:Cylindrical_Ivory_Casket.jpg'
  }];
  showFullscreenGallery(mediaItems, selectedThumb, lang, dir, container);
  return container;
}`},(s=(g=p.parameters)==null?void 0:g.docs)==null?void 0:s.source)})});var c,_,u;d.parameters=t(n({},d.parameters),{docs:t(n({},(c=d.parameters)==null?void 0:c.docs),{source:n({originalSource:`({
  lang,
  dir
}) => {
  const container = document.createElement('div');
  const selectedThumb = 'selected';
  const mediaItems = [{
    title: 'error.jpg',
    thumb: selectedThumb
  }, {
    title: 'error.jpg'
  }];
  showFullscreenGallery(mediaItems, selectedThumb, lang, dir, container);
  return container;
}`},(u=(_=d.parameters)==null?void 0:_.docs)==null?void 0:u.source)})});const F=["Fullscreen","Error"];export{d as Error,p as Fullscreen,F as __namedExportsOrder,C as default};
