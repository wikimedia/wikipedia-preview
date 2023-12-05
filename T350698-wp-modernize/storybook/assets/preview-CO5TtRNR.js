import{s as c,m as s,b as w}from"./fullscreen-W6aIuEFT.js";const m=(e,i)=>{const d=document.createElement("div");return d.classList.add("wikipediapreview-gallery-row"),e.forEach(r=>{const a=document.createElement("div");a.classList.add("wikipediapreview-gallery-image"),a.style.backgroundImage=`url(${r.thumb})`,a.addEventListener("click",o=>{const l=o.target.style.backgroundImage.slice(4,-1).replace(/"/g,"");c(e,l,i.lang,i.dir)}),d.appendChild(a)}),d},v=(e,i="")=>`
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
`.trim(),n=(e,i,d,r,a)=>`
		<div class="wikipediapreview ${i?"mobile":""}" lang="${e}" dir="${d}">
			${r}
			${a}
		</div>
	`.trim(),g=(e,i,d)=>{const r=i.imgUrl,a=`
			<div class="wikipediapreview-body">
				${i.extractHtml}
				<div class="wikipediapreview-gallery">
				</div>
			</div>
			<div class="wikipediapreview-footer">
				<span class="wikipediapreview-footer-cta wikipediapreview-footer-cta-readmore">${s(e,"continue-reading")}</span>
				<a href="${w(e,i.title,d)}" class="wikipediapreview-footer-cta wikipediapreview-footer-cta-readonwiki" target="_blank">${s(e,"read-more")}</a>
			</div>
		`.trim();return n(e,d,i.dir,v(e,r),a)},b=(e,i,d)=>{const r=`
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
	`.trim();return n(i,e,d,v(i),r)},p=(e,i,d)=>`<a href="${w(e,i,d)}" target="_blank" class="wikipediapreview-cta-readonwiki">${s(e,"read-on-wiki")}</a>`,y=(e,i,d,r)=>{const a=`<span>${s(i,"preview-error-message")}</span>`,o=p(i,d,e);return n(i,e,r,v(i),t("error",a,o))},u=(e,i,d,r)=>{const a=`<span>${s(i,"preview-disambiguation-message",d)}</span>`,o=p(i,d,e);return n(i,e,r,v(i),t("disambiguation",a,o))},$=(e,i,d)=>{const r=`<span>${s(i,"preview-offline-message")}</span>`,a=`<a>${s(i,"preview-offline-cta")}</a>`;return n(i,e,d,v(i),t("offline",r,a))};export{b as a,y as b,u as c,$ as d,m as g,g as r};
//# sourceMappingURL=preview-CO5TtRNR.js.map
