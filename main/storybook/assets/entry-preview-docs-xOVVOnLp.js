import"./doctrine-h9SWtg8o.js";const{combineParameters:g}=__STORYBOOK_MODULE_PREVIEW_API__;var A=(r=>(r.JAVASCRIPT="JavaScript",r.FLOW="Flow",r.TYPESCRIPT="TypeScript",r.UNKNOWN="Unknown",r))(A||{}),E=r=>{let{component:e,argTypes:a,parameters:{docs:s={}}}=r,{extractArgTypes:o}=s,d=o&&e?o(e):{};return d?g(d,a):a},D="storybook/docs",O=`${D}/snippet-rendered`,p=(r=>(r.AUTO="auto",r.CODE="code",r.DYNAMIC="dynamic",r))(p||{});const{useEffect:l,addons:u}=__STORYBOOK_MODULE_PREVIEW_API__;function I(r){var s;let e=(s=r==null?void 0:r.parameters.docs)==null?void 0:s.source,a=r==null?void 0:r.parameters.__isArgsStory;return(e==null?void 0:e.type)===p.DYNAMIC?!1:!a||(e==null?void 0:e.code)||(e==null?void 0:e.type)===p.CODE}var c=(r,e)=>{var d,i;let a=r(),s=(i=(d=e==null?void 0:e.parameters.docs)==null?void 0:d.source)!=null&&i.excludeDecorators?e.originalStoryFn(e.args,e):a,o;return I(e)||(typeof s=="string"?o=s:s instanceof Element&&(o=s.outerHTML)),l(()=>{let{id:_,unmappedArgs:n}=e;o&&u.getChannel().emit(O,{id:_,args:n,source:o})}),a},y=[c],T={docs:{story:{inline:!0},source:{type:p.DYNAMIC,language:"html",code:void 0,excludeDecorators:void 0}}},N=[E];export{N as argTypesEnhancers,y as decorators,T as parameters};