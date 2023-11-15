import{s as c,m as s,b as w}from"./fullscreen-349b14a8.js";const m=(e,i)=>{const d=document.createElement("div");return d.classList.add("wikipediapreview-gallery-row"),e.forEach(a=>{const r=document.createElement("div");r.classList.add("wikipediapreview-gallery-image"),r.style.backgroundImage=`url(${a.thumb})`,r.addEventListener("click",o=>{const l=o.target.style.backgroundImage.slice(4,-1).replace(/"/g,"");c(e,l,i.lang,i.dir)}),d.appendChild(r)}),d};const v=(e,i="")=>`
		<div class="wikipediapreview-header">
			${i?`<div class="wikipediapreview-header-image" style="${`background-image:url('${i}');background-size:cover;`}"></div>`:""}
			<div class="wikipediapreview-header-wordmark${i?" wikipediapreview-header-wordmark-with-image":""} wikipediapreview-header-wordmark-${e}"></div>
			<div class="wikipediapreview-header-closebtn"></div>
		</div>
`.trim(),t=(e,i,d)=>`
		<div class="wikipediapreview-body wikipediapreview-body-${e}">
			<div class="wikipediapreview-body-message">
				<div class="wikipediapreview-body-icon"></div>
					${i}
			</div>
			<div class="wikipediapreview-body-action">
				${d}
			</div>
		</div>
`.trim(),n=(e,i,d,a,r)=>`
		<div class="wikipediapreview ${i?"mobile":""}" lang="${e}" dir="${d}">
			${a}
			${r}
		</div>
	`.trim(),g=(e,i,d)=>{const a=i.imgUrl,r=`
			<div class="wikipediapreview-body">
				${i.extractHtml}
				<div class="wikipediapreview-gallery">
				</div>
			</div>
			<div class="wikipediapreview-footer">
				<span class="wikipediapreview-footer-cta wikipediapreview-footer-cta-readmore">${s(e,"continue-reading")}</span>
				<a href="${w(e,i.title,d)}" class="wikipediapreview-footer-cta wikipediapreview-footer-cta-readonwiki" target="_blank">${s(e,"read-more")}</a>
			</div>
		`.trim();return n(e,d,i.dir,v(e,a),r)},b=(e,i,d)=>{const a=`
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
	`.trim();return n(i,e,d,v(i),a)},p=(e,i,d)=>`<a href="${w(e,i,d)}" target="_blank" class="wikipediapreview-cta-readonwiki">${s(e,"read-on-wiki")}</a>`,y=(e,i,d,a)=>{const r=`<span>${s(i,"preview-error-message")}</span>`,o=p(i,d,e);return n(i,e,a,v(i),t("error",r,o))},u=(e,i,d,a)=>{const r=`<span>${s(i,"preview-disambiguation-message",d)}</span>`,o=p(i,d,e);return n(i,e,a,v(i),t("disambiguation",r,o))},$=(e,i,d)=>{const a=`<span>${s(i,"preview-offline-message")}</span>`,r=`<a>${s(i,"preview-offline-cta")}</a>`;return n(i,e,d,v(i),t("offline",a,r))};export{b as a,y as b,u as c,$ as d,m as g,g as r};
//# sourceMappingURL=preview-c7691c17.js.map
