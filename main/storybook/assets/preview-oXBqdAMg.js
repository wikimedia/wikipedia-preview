import{s as c,m as v,b as p}from"./fullscreen-HCG6UcmK.js";const m=(e,i)=>{const d=document.createElement("div");return d.classList.add("wikipediapreview-gallery-row"),e.forEach(r=>{const a=document.createElement("div");a.classList.add("wikipediapreview-gallery-image"),a.style.backgroundImage=`url(${r.thumb})`,a.addEventListener("click",s=>{const o=s.target.style.backgroundImage.slice(4,-1).replace(/"/g,"");c(e,o,i.lang,i.dir)}),d.appendChild(a)}),d},t=(e,i,d="")=>`
		<div class="wikipediapreview-header">
			${d?`<div class="wikipediapreview-header-image" style="${`background-image:url('${d}');background-size:cover;`}"></div>`:""}
			<div class="wikipediapreview-header-wordmark${d?" wikipediapreview-header-wordmark-with-image":""} wikipediapreview-header-wordmark-${e}"></div>
			${i?'<div class="wikipediapreview-header-closebtn"></div>':""}
		</div>
`.trim(),w=(e,i,d)=>`
		<div class="wikipediapreview-body wikipediapreview-body-${e}">
			<div class="wikipediapreview-body-message">
				<div class="wikipediapreview-body-icon"></div>
					${i}
			</div>
			<div class="wikipediapreview-body-action">
				${d}
			</div>
		</div>
`.trim(),l=(e,i,d)=>`<a href="${p(e,i,d)}" target="_blank" class="wikipediapreview-cta-readonwiki">${v(e,"read-on-wiki")}</a>`,n=(e,i,d,r,a,s)=>{const o=s==="detect"?"":`wikipediapreview-${s}-theme`;return`
		<div class="wikipediapreview ${i?"mobile":""} ${o}" lang="${e}" dir="${d}">
			${r}
			${a}
		</div>
	`.trim()},g=(e,i,d,r)=>{const a=i.imgUrl,s=`
			<div class="wikipediapreview-body">
				${i.extractHtml}
				<div class="wikipediapreview-gallery">
				</div>
			</div>
			<div class="wikipediapreview-footer">
				<span class="wikipediapreview-footer-cta wikipediapreview-footer-cta-readmore">${v(e,"continue-reading")}</span>
				<a href="${p(e,i.title,d)}" class="wikipediapreview-footer-cta wikipediapreview-footer-cta-readonwiki" target="_blank">${v(e,"read-more")}</a>
			</div>
		`.trim();return n(e,d,i.dir,t(e,d,a),s,r)},b=(e,i,d,r)=>{const a=`
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
	`.trim();return n(i,e,d,t(i,e),a,r)},y=(e,i,d,r,a)=>{const s=`<span>${v(i,"preview-error-message")}</span>`,o=l(i,d,e);return n(i,e,r,t(i,e),w("error",s,o),a)},$=(e,i,d,r,a)=>{const s=`<span>${v(i,"preview-disambiguation-message",d)}</span>`,o=l(i,d,e);return n(i,e,r,t(i,e),w("disambiguation",s,o),a)},u=(e,i,d,r)=>{const a=`<span>${v(i,"preview-offline-message")}</span>`,s=`<a>${v(i,"preview-offline-cta")}</a>`;return n(i,e,d,t(i,e),w("offline",a,s),r)};export{b as a,y as b,$ as c,u as d,m as g,g as r};
