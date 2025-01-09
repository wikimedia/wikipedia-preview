import{a as G,l as B,m as v,c as J,d as ae,s as ce,e as _,f as ue,h as V,g as de,i as me}from"./utils-DjpPWVTf.js";const ge=(e,t,n=!0)=>{const i=new XMLHttpRequest;i.open("GET",e),i.send(),i.addEventListener("load",()=>{const s=n?JSON.parse(i.responseText):i.responseText;t(s)}),i.addEventListener("error",()=>{t(!1,i.status)})},P={},w=(e,t,n,i=!0,s=ge)=>{if(P[e]!==void 0){n(P[e]);return}s(e,(r,c)=>{r?n(P[e]=t(r)):n(!1,c)},i)},pe=e=>e.split("#")[0],fe=(e,t,n,i=w)=>{const r=J(e,{action:"query",prop:"extracts|pageimages",exsentences:4,explaintext:1,exsectionformat:"plain",piprop:"thumbnail",pilimit:1,titles:t})+"&"+G();i(r,c=>{const a=c.query.pages[Object.keys(c.query.pages)[0]];return a.extract?{title:t,extractHtml:"<p>"+a.extract+"</p>",imgUrl:a.thumbnail?a.thumbnail.source:null,dir:ae(e),type:"standard"}:!1},n)},ye=(e,t,n,i=w)=>{const s=`https://${e}.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(t)}?${G()}`;i(s,(r,c)=>r?r.type==="standard"||r.type==="disambiguation"?{title:r.titles.canonical,extractHtml:ce(r.extract_html),imgUrl:r.thumbnail?r.thumbnail.source:null,dir:r.dir,type:r.type}:r.type==="no-extract"&&r.description?{title:r.titles.canonical,extractHtml:"<p>"+r.description+"</p>",imgUrl:r.thumbnail?r.thumbnail.source:null,dir:r.dir,type:"standard"}:(B(v(e,"preview-console-error-message",t,e),r),!1):(B(v(e,"preview-console-error-message",t,e),c),!1),n)},he=e=>{if(!e)return null;const t=["script","meta","style","figure","table","sup.mw-ref","sup.reference",".pcs-collapse-table-container",".thumb",".hatnote","[ role='navigation' ]","#pcs-edit-section-add-title-description"].join(",");for(const n of e.querySelectorAll(t))n.remove();for(const n of e.querySelectorAll("a"))n.outerHTML=n.innerHTML;for(const n of e.querySelectorAll("p"))n.innerHTML=n.innerHTML.replace(/\s\(.*?class=".*?(ext-phonos|IPA).*?".*?\)/g,"");return e.innerText.trim()===""?null:e.outerHTML},ve=e=>{const t=e.querySelector('meta[property="mw:leadImage"]');if(!t)return null;const n=t.getAttribute("content").split("/"),i=decodeURIComponent(n[n.length-1]),s=e.querySelector('a[href*="'+i+'"]');if(!s)return null;const r=s.querySelector("span[data-src]");if(r)return r.getAttribute("data-src");const c=s.querySelector("img[src]");return c?c.getAttribute("src"):null},$e=(e,t,n,i=w)=>{const s=`https://${e}.wikipedia.org/api/rest_v1/page/mobile-html/${encodeURIComponent(t)}?${G()}`;i(s,(r,c)=>{if(!r)return B(v(e,"preview-console-error-message",t,e),c),!1;const a=new DOMParser().parseFromString(r,"text/html"),m=ve(a);return{sections:Array.from(a.querySelectorAll("section")).map(d=>{const p=d.querySelector("h2, h3, h4, h5, h6"),$=p?p.id:t,y=p?p.tagName.toLowerCase():"h2",h=d.querySelector("figure span.mw-file-element"),A=h?h.getAttribute("data-src"):m,L=he(d.querySelector("p"));return L?{id:$,level:y,imgUrl:A,extractHtml:L}:null}).filter(d=>d),dir:a.body.getAttribute("dir")}},n,!1)},be=(e,t,n,i,s)=>{$e(e,t,r=>{for(const c of r.sections)if(c.id===n){i({title:t+"#"+n,extractHtml:c.extractHtml,imgUrl:c.imgUrl,dir:r.dir,type:"standard"});return}i(!1)},s)},xe=(e,t,n,i=w)=>{const[s,r]=t.split("#");return r?be(e,s,r,n,i):t.indexOf(":")===-1?ye(e,t,n,i):fe(e,t,n,i)},Se=(e,t,n,i=w)=>{t=pe(t);const s=`https://${e}.wikipedia.org/api/rest_v1/page/media-list/${encodeURIComponent(t)}`;i(s,r=>(r.items||[]).reduce((m,u)=>{if(u.showInGallery&&u.type==="image"){const d=u&&u.srcset&&`https:${u.srcset[0].src}`,p={caption:u.caption&&u.caption.text.trim(),thumb:d,title:u.title};return m.concat(p)}return m},[]),n)},We=(e,t,n)=>{let i={};xe(e,t,s=>{s===!1?i={...i,extractHtml:!1}:i={...i,...s},i.media&&n(i)}),Se(e,t,s=>{i={...i,media:s},i.extractHtml!==void 0&&n(i)})},qe=(e,t,n,i=w)=>{const s={action:"query",prop:"imageinfo",iiextmetadatafilter:"LicenseShortName|ImageDescription|Artist",iiextmetadatalanguage:e,iiextmetadatamultilang:1,iiurlwidth:V().width,iiurlheight:V().height,iiprop:"url|extmetadata",titles:t},r=J(e,s);i(r,c=>{const m=c.query.pages[0].imageinfo;if(!m)return{};const{Artist:u,ImageDescription:d,LicenseShortName:p}=m[0].extmetadata,$=u&&_(u.value),y=d&&_(typeof d.value=="string"&&d.value||d.value[e]||d.value[Object.keys(d.value)[0]]),h=m[0].thumburl;return{author:$,description:y,license:p&&p.value,filePage:ue(m[0].descriptionshorturl),bestFitImageUrl:h}},n)},O=1,Q=2,E=()=>window.innerWidth,U=()=>window.innerHeight,l={screenX:null,originalMarginLeft:null,currentMarginLeft:null,originalTransition:null,imgOriginalTransition:null,durationStart:null,translateX:0,translateY:0,clientX:null,clientY:null,imageRect:{}},g=[];let M=-1,T=!1;const R=e=>e.target.nodeName==="IMG"?e.target:e.target.querySelector("img"),K=e=>e?Number(e.slice(e.indexOf("scale")+6,-1)):O,we=e=>{const n=/translate3d\((?<x>.*?)px, (?<y>.*?)px, (?<z>.*?)px/.exec(e);return n?`translate3d(${n.groups.x}px, ${n.groups.y}px, 0px)`:`translate3d(${l.translateX}px, ${l.translateY}px, 0px)`},k=(e,t)=>{const i=[`${t}-item-caption`,`${t}-item-caption-expand-cue`,`${t}-item-caption-text`,`${t}-item-attribution`,`${t}-button`].find(s=>e.target.className.indexOf(s)>-1);return e.pointerType!=="touch"||i},Y=()=>T,j=e=>e.naturalHeight<=e.naturalWidth,Le=e=>e.naturalWidth+50<E(),F=()=>g.length,Me=(e,t=null)=>{const n={},i=()=>t.clientY>e.naturalHeight&&!j(e)?e.naturalHeight:t.clientY;return g.length===2?(n.x=(g[0].clientX+g[1].clientX)/2,n.y=(g[0].clientY+g[1].clientY)/2):(n.x=t.clientX,n.y=i()),n},ee=(e,t)=>{const n=Me(e,t);return j(e)?n.y=n.y-e.naturalHeight:Le(e)&&(n.x=e.naturalWidth/2,n.y=e.naturalHeight/2),`${n.x}px ${n.y}px`},Ee=e=>{for(let t=0;t<g.length;t++)if(g[t].pointerId===e.pointerId){g.splice(t,1);break}},te=e=>{e&&(e.style.transition=l.imgOriginalTransition,e.style.transform=`scale(${O})`,T=!1,l.translateX=0,l.translateY=0)},Te=e=>{const t=R(e);l.clientX=null,l.clientY=null,l.translateX=0,l.translateY=0,t.style.transformOrigin=ee(t,e),Y()?(t.style.transform=`scale(${O})`,T=!1):(t.style.transform=`scale(${Q})`,T=!0)},Xe=e=>{const t=R(e);if(!t)return;const n=t.getBoundingClientRect();if(l.imageRect.top=n.top,l.imageRect.bottom=n.bottom,l.imageRect.left=n.left,l.imageRect.right=n.right,g.length<1){const i=window.getComputedStyle(t);l.imgOriginalTransition=i.transition}g.push(e)},Ie=e=>{const t=R(e),n=t.style.transform,i=.01,s=.4;let r=K(n);const c=we(n);for(let a=0;a<g.length;a++)if(e.pointerId===g[a].pointerId){g[a]=e;break}if(g.length===2){const a=Math.abs(g[0].clientX-g[1].clientX),m=Math.abs(g[0].clientY-g[1].clientY),u=Math.sqrt(Math.pow(a,2)+Math.pow(m,2));M>0&&(t.style.transformOrigin=ee(t),t.style.transition="unset",u>M&&(T=!0,r+i<Q&&(r+=i,t.style.transform=`${c} scale(${r})`)),u<M&&(r-i>O+s?(r-=i,t.style.transform=`${c} scale(${r})`):te(t))),M=u}},Re=(e,t,n,i,s)=>{const r=R(e);if(!r)return;const c=r.style.transform,a=K(c),m=E()/8,u=E()-m,d=j(r)?U()/4:U()/8,p=U()-d,$=80;r.style.transition="unset",(!l.clientX||!l.clientY)&&(l.clientX=e.clientX,l.clientY=e.clientY);const y=l.translateX+(e.clientX-l.clientX),h=l.translateY+(e.clientY-l.clientY),A=h-l.translateY>=0,L=y-l.translateX>=0,re=()=>{const H=l.imageRect.left<m&&L||l.imageRect.right>u&&!L,oe=l.imageRect.top<d&&A||l.imageRect.bottom>p&&!A;return H&&oe},se=()=>{l.imageRect.top=l.imageRect.top+(h-l.translateY),l.imageRect.bottom=l.imageRect.bottom+(h-l.translateY),l.imageRect.left=l.imageRect.left+(y-l.translateX),l.imageRect.right=l.imageRect.right+(y-l.translateX),l.translateX=y,l.translateY=h,l.clientX=e.clientX,l.clientY=e.clientY},le=Math.abs(y)-Math.abs(l.translateX)>$;if(re())se(),r.style.transform=`translate3d(${y}px, ${h}px, 0px) scale(${a})`;else if(le){const H=s==="ltr"&&y<0||s==="rtl"&&y>0;!H&&n[i-1]?t(-1):H&&n[i+1]&&t(1)}},Ae=e=>{const t=R(e);t&&(t.style.transition=l.imgOriginalTransition),Ee(e),l.clientX=null,l.clientY=null,g.length<2&&(M=-1)},He=(e,t,n)=>{const i=window.getComputedStyle(t);l.durationStart=Date.now(),l.screenX=e.clientX,l.originalMarginLeft=+i[n].slice(0,-2),l.currentMarginLeft=+i[n].slice(0,-2),l.originalTransition=i.transition,t.style.transition="unset"},Ye=(e,t,n,i)=>{const r=e.clientX-l.screenX;l.currentMarginLeft=l.originalMarginLeft+r*(i==="ltr"?1:-1),t.style[n]=l.currentMarginLeft+"px",e.preventDefault()},Ce=(e,t,n,i,s)=>{const r=l.originalMarginLeft-l.currentMarginLeft,c=Date.now()-l.durationStart;Math.abs(r/E())>.4||c<=300&&Math.abs(r)>5?n(r>0?1:-1):t.style[i]=-E()*s+"px"};let W=[];const N=(e,t,n,i=void 0)=>{e.addEventListener(t,n,i),W.push([e,t,n,i])},Oe=()=>{W.forEach(e=>{const[t,n,i,s]=e;t.removeEventListener(n,i,s)}),W=[]};let f=0,S="",X,C,q;const I=()=>window.innerWidth,o="wp-gallery-fullscreen-slider",Pe=(e,t,n,i=[],s="")=>{const r=i.map(()=>`
		<div class="${o}-item">
				<div class="${o}-item-loading">
						<div class="${o}-item-loading-spinner">
								<div class="${o}-item-loading-spinner-animation">
										<div class="${o}-item-loading-spinner-animation-bounce"></div>
								</div>
						</div>
						<div class="${o}-item-loading-text">${v(e,"gallery-loading-still")}</div>
				</div>
				<div class="${o}-item-loading-error">
					<div class="${o}-item-loading-error-text">${v(e,"gallery-loading-error")}</div>
					<div class="${o}-item-loading-error-refresh">${v(e,"gallery-loading-error-refresh")}</div>
				</div>
		</div>
		`.trim()).join("");return i.some((c,a)=>c.thumb===s?(f=a,!0):!1),S=t,X=e,C=i,q=n,`
		<div class="${o}" style="${S==="ltr"?"margin-left":"margin-right"}:-${f*I()}px">
				<div class="${o}-button previous"></div>
				<div class="${o}-button next"></div>
				${r}
		</div>
		`.trim()},Ue=e=>{const t=e.author?e.author:v(X,"gallery-unknown-author"),n=e.filePage;return`
		<div class="${o}-item-attribution">
			<div class="${o}-item-attribution-info">
				<bdi class="${o}-item-attribution-info-author">${t} (${e.license})</bdi>
				<a href="${n}" class="${o}-item-attribution-info-link" target="_blank">${v(X,"gallery-attribution-learnmore")} ${de()}</a>
			</div>
		</div>
	`.trim()},ie=(e,t=!1)=>{const n=e.querySelector(`.${o}-item-caption`),i=e.querySelector(`.${o}-item-caption-expand-cue`),s=e.querySelector(".expanded");i&&s||t&&i?(i.classList.remove("expanded"),n.style.maxHeight="95px"):i&&(i.classList.add("expanded"),n.style.maxHeight="241px")},ne=(e,t=!1)=>{const n=e.querySelector("img"),i=e.querySelector(`.${o}-item-loading`),s=e.querySelector(`.${o}-item-loading-error`),r=e.querySelector(`.${o}-item-caption`);function c(){n.naturalWidth>0&&n.naturalHeight>0?r.style.visibility="visible":requestAnimationFrame(c)}if(c(),t&&(q.querySelector(`.${o}`).querySelectorAll(`.${o}-item`).forEach(u=>{const d=u.querySelector("img"),p=u.querySelector(`.${o}-item-caption`),$=u.querySelector(`.${o}-item-attribution`);d&&u.removeChild(d),p&&u.removeChild(p),$&&u.removeChild($)}),b(0,!0),i.style.visibility="visible",s.style.visibility="hidden"),n.complete)i.style.visibility="hidden",s.style.visibility="hidden",n.style.visibility="visible";else{const a=e.querySelector(`.${o}-item-loading-text`),m=setTimeout(()=>{a.style.visibility="visible"},5e3);n.addEventListener("load",()=>{i.style.visibility="hidden",s.style.visibility="hidden",a.style.visibility="hidden",clearTimeout(m)}),n.addEventListener("error",()=>{const u=e.querySelector(`.${o}-item-loading-error-refresh`);if(i.style.visibility="hidden",n.style.visibility="hidden",!me()){const d=e.querySelector(`.${o}-item-loading-error-text`);d.innerText=v(X,"gallery-loading-error-offline"),s.classList.add("offline")}s.style.visibility="visible",clearTimeout(m),u.addEventListener("click",()=>{ne(e,!0)})})}r.addEventListener("click",()=>{ie(e)})},z=(e,t=!1)=>{const s=q.querySelector(`.${o}`).querySelectorAll(`.${o}-item`)[e];s&&qe(X,C[e].title,r=>{const c=s.querySelector("img"),a=s.querySelector(`.${o}-item-attribution`);if(!c){const u=r.description?r.description:C[e].caption?C[e].caption:"",p=`<div class="${o}-item-caption">
						${(I()<400&&u.length>128?!0:I()>400&&u.length>142)?`<div class="${o}-item-caption-expand-cue"></div>`:""}
						<div class="${o}-item-caption-text"><bdi>${u}</bdi></div>
					</div>`;s.insertAdjacentHTML("beforeend",`<div class="${o}-item-img"><img src="${r.bestFitImageUrl} ${t?"?timestamp="+Date.now():""}"/>${p}</div>`),ne(s)}a||s.insertAdjacentHTML("beforeend",Ue(r))})},b=(e=1,t=!1)=>{const n=q.querySelector(`.${o}`),i=n.querySelectorAll(`.${o}-item`),s=n.querySelector(".next"),r=n.querySelector(".previous"),c=f+e,a=i[c],m=i[f].querySelector("img");a&&(ie(i[f],!0),f+=e,s.style.visibility=f===i.length-1?"hidden":"visible",r.style.visibility=f===0?"hidden":"visible",te(m),z(f,t),z(f+1,t),z(f-1,t)),n.style[S==="ltr"?"marginLeft":"marginRight"]=-I()*f+"px";const u=q.querySelector(".wp-gallery-fullscreen-counter");u.textContent=f+1+"/"+i.length},D=()=>{b(-1)},ke=()=>{const e=q.querySelector(`.${o}`),t=S==="ltr"?"marginLeft":"marginRight",n=e.querySelectorAll(`.${o}-item`);e.addEventListener("pointerdown",i=>{k(i,o)||(Xe(i),F()===1&&!Y()&&He(i,e,t))}),e.addEventListener("pointermove",i=>{k(i,o)||(F()>1?Ie(i):Y()?Re(i,b,n,f,S):Ye(i,e,t,S))}),e.addEventListener("pointerout",i=>{k(i,o)||(e.style.transition=l.originalTransition,F()===1&&!Y()&&Ce(i,e,b,t,f),Ae(i))})},Fe=()=>{q.querySelector(".wp-gallery-fullscreen").classList.toggle("wp-gallery-fullscreen-focus-mode")},ze=()=>{const e=q.querySelector(`.${o}`),t=e.querySelectorAll(`.${o}-item`),n=e.querySelector(".next"),i=e.querySelector(".previous");let s=!1;b(0),ke(),e.addEventListener("click",a=>{(a.target.className===`${o}-item`||a.target.tagName==="IMG")&&(s?(clearTimeout(s),s=null,Te(a)):s=setTimeout(()=>{s=null,Fe()},300))});const r=function(a){a.style.transition="unset",a.style.marginLeft=-f*I()+"px"};let c;N(window,"resize",()=>{const a=document.querySelector("."+o);r(a),clearTimeout(c),c=setTimeout(()=>{a.style.removeProperty("transition")},100)}),t.length===1?(i.style.visibility="hidden",n.style.visibility="hidden"):(n.addEventListener("click",()=>{b()}),i.addEventListener("click",()=>{D()}),N(window,"keydown",({key:a})=>{switch(a){case"ArrowRight":case"Right":S==="ltr"?b():D();break;case"ArrowLeft":case"Left":S==="ltr"?D():b();break}}))},x="wp-gallery-fullscreen",De=(e,t)=>`
		<div class="${x}" lang="${e}" dir="${t}">
			<div class="${x}-close"></div>
			<div class="${x}-counter"></div>
			<div class="${x}-main"></div>
		</div>
	`.trim(),Z=e=>{const t=e.querySelector(`.${x}`);e.removeChild(t),Oe()},Ne=(e,t,n,i,s=document.body)=>{if(s.querySelector(`.${x}`))return;s.insertAdjacentHTML("beforeend",De(n,i)),s.querySelector(`.${x}-main`).insertAdjacentHTML("beforeend",Pe(n,i,s,e,t)),s.querySelector(`.${x}-close`).addEventListener("click",()=>{Z(s)}),N(window,"keydown",({key:c})=>{(c==="Escape"||c==="Esc")&&Z(s)}),ze()};export{$e as g,We as r,Ne as s};