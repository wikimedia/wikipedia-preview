import{s as c,m as o,b as p}from"./fullscreen-gS-pzY0b.js";const m=(e,i)=>{const d=document.createElement("div");return d.classList.add("wikipediapreview-gallery-row"),e.forEach(r=>{const a=document.createElement("div");a.classList.add("wikipediapreview-gallery-image"),a.style.backgroundImage=`url(${r.thumb})`,a.addEventListener("click",s=>{const v=s.target.style.backgroundImage.slice(4,-1).replace(/"/g,"");c(e,v,i.lang,i.dir)}),d.appendChild(a)}),d},n=(e,i="")=>`
		<div class="wikipediapreview-header">
			${i?`<div class="wikipediapreview-header-image" style="${`background-image:url('${i}');background-size:cover;`}"></div>`:""}
			<div class="wikipediapreview-header-wordmark${i?" wikipediapreview-header-wordmark-with-image":""} wikipediapreview-header-wordmark-${e}"></div>
			<div class="wikipediapreview-header-closebtn"></div>
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
`.trim(),l=(e,i,d)=>`<a href="${p(e,i,d)}" target="_blank" class="wikipediapreview-cta-readonwiki">${o(e,"read-on-wiki")}</a>`,t=(e,i,d,r,a,s)=>`
		<div class="wikipediapreview ${i?"mobile":""} ${s==="light"?"":"dark"}" lang="${e}" dir="${d}">
			${r}
			${a}
		</div>
	`.trim(),g=(e,i,d,r)=>{const a=i.imgUrl,s=`
			<div class="wikipediapreview-body">
				${i.extractHtml}
				<div class="wikipediapreview-gallery">
				</div>
			</div>
			<div class="wikipediapreview-footer">
				<span class="wikipediapreview-footer-cta wikipediapreview-footer-cta-readmore">${o(e,"continue-reading")}</span>
				<a href="${p(e,i.title,d)}" class="wikipediapreview-footer-cta wikipediapreview-footer-cta-readonwiki" target="_blank">${o(e,"read-more")}</a>
			</div>
		`.trim();return t(e,d,i.dir,n(e,a),s,r)},b=(e,i,d,r)=>{const a=`
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
	`.trim();return t(i,e,d,n(i),a,r)},y=(e,i,d,r,a)=>{const s=`<span>${o(i,"preview-error-message")}</span>`,v=l(i,d,e);return t(i,e,r,n(i),w("error",s,v),a)},u=(e,i,d,r,a)=>{const s=`<span>${o(i,"preview-disambiguation-message",d)}</span>`,v=l(i,d,e);return t(i,e,r,n(i),w("disambiguation",s,v),a)},$=(e,i,d,r)=>{const a=`<span>${o(i,"preview-offline-message")}</span>`,s=`<a>${o(i,"preview-offline-cta")}</a>`;return t(i,e,d,n(i),w("offline",a,s),r)};export{b as a,y as b,u as c,$ as d,m as g,g as r};
