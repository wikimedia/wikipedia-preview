import{s as k,m as v,b as p}from"./fullscreen-CFQrsoni.js";const g=(e,i)=>{const d=document.createElement("div");return d.classList.add("wikipediapreview-gallery-row"),e.forEach(r=>{const a=document.createElement("div");a.classList.add("wikipediapreview-gallery-image"),a.style.backgroundImage=`url(${r.thumb})`,a.addEventListener("click",s=>{const o=s.target.style.backgroundImage.slice(4,-1).replace(/"/g,"");k(e,o,i.lang,i.dir)}),d.appendChild(a)}),d},t=(e,i,d="")=>`
		<div class="wikipediapreview-header">
			${d?`<div class="wikipediapreview-header-image" style="${`background-image:url('${d}');background-size:cover;`}"></div>`:""}
			<div class="wikipediapreview-header-wordmark${d?" wikipediapreview-header-wordmark-with-image":""} wikipediapreview-header-wordmark-${e}"></div>
			${i?'<div class="wikipediapreview-header-closebtn"></div>':""}
		</div>
`.trim(),n=(e,i,d)=>`
		<div class="wikipediapreview-body wikipediapreview-body-${e}">
			<div class="wikipediapreview-body-message">
				<div class="wikipediapreview-body-icon"></div>
					${i}
			</div>
			<div class="wikipediapreview-body-action">
				${d}
			</div>
		</div>
`.trim(),l=(e,i,d)=>`<a href="${p(e,i,d)}" target="_blank" class="wikipediapreview-cta-readonwiki">${v(e,"read-on-wiki")}</a>`,w=(e,i,d,r,a,s,o=!0)=>{const c=s==="detect"?"":`wikipediapreview-${s}-theme`;return`
		<div class="wikipediapreview ${i?"mobile":""} ${c}" lang="${e}" dir="${d}">
			${r}
			${a}
			${!i&&o?'<div class="wikipediapreview-arrow"></div>':""}
		</div>
	`.trim()},b=(e,i,d,r,a)=>{const s=i.imgUrl,o=`
			<div class="wikipediapreview-body">
				${i.extractHtml}
				<div class="wikipediapreview-gallery">
				</div>
			</div>
			<div class="wikipediapreview-footer">
				<span class="wikipediapreview-footer-cta wikipediapreview-footer-cta-readmore">${v(e,"continue-reading")}</span>
				<a href="${p(e,i.title,d)}" class="wikipediapreview-footer-cta wikipediapreview-footer-cta-readonwiki" target="_blank">${v(e,"read-more")}</a>
			</div>
		`.trim();return w(e,d,i.dir,t(e,d,s),o,r,a)},y=(e,i,d,r)=>{const a=`
		<div class="wikipediapreview-body wikipediapreview-body-loading">
			<div class="wikipediapreview-body-loading-line larger"></div>
			<div class="wikipediapreview-body-loading-line medium"></div>
			<div class="wikipediapreview-body-loading-line larger"></div>
			<div class="wikipediapreview-body-loading-line medium"></div>
			<div class="wikipediapreview-body-loading-line smaller"></div>
			<div class="wikipediapreview-body-loading-line larger"></div>
			<div class="wikipediapreview-body-loading-line medium"></div>
			<div class="wikipediapreview-body-loading-line larger"></div>
			<div class="wikipediapreview-body-loading-line medium"></div>
			<div class="wikipediapreview-body-loading-line smaller"></div>
		</div>
		<div class="wikipediapreview-footer-loading"></div>
	`.trim();return w(i,e,d,t(i,e),a,r)},$=(e,i,d,r,a)=>{const s=`<span>${v(i,"preview-error-message")}</span>`,o=l(i,d,e);return w(i,e,r,t(i,e),n("error",s,o),a)},u=(e,i,d,r,a)=>{const s=`<span>${v(i,"preview-disambiguation-message",d)}</span>`,o=l(i,d,e);return w(i,e,r,t(i,e),n("disambiguation",s,o),a)},f=(e,i,d,r)=>{const a=`<span>${v(i,"preview-offline-message")}</span>`,s=`<a>${v(i,"preview-offline-cta")}</a>`;return w(i,e,d,t(i,e),n("offline",a,s),r)};export{y as a,$ as b,u as c,f as d,g,b as r};
