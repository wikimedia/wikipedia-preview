import{b as t,m as v}from"./utils-76TmjRdJ.js";const p=(e,i,d="")=>`
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
`.trim(),l=(e,i,d)=>`<a href="${t(e,i,d)}" target="_blank" class="wikipediapreview-footer-link-cta">${v(e,"read-on-wiki")}</a>`,w=(e,i,d,r,a,s)=>{const o=s==="detect"?"":`wikipediapreview-${s}-theme`;return`
		<div class="wikipediapreview ${i?"mobile":""} ${o}" lang="${e}" dir="${d}">
			${r}
			${a}
		</div>
	`.trim()},k=(e,i,d,r)=>{const a=i.imgUrl,s=`
			<div class="wikipediapreview-body">
				${i.extractHtml}
				<div class="wikipediapreview-footer">
					<div class="wikipediapreview-footer-link">
						<a href="${t(e,i.title,d)}" class="wikipediapreview-footer-link-cta" target="_blank">${v(e,"read-more")}</a>
					</div>
					<div class="wikipediapreview-footer-icon"></div>
				</div>
				<div class="wikipediapreview-gallery">
				</div>
			</div>
		`.trim();return w(e,d,i.dir,p(e,d,a),s,r)},m=(e,i,d,r)=>{const a=`
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
	`.trim();return w(i,e,d,p(i,e),a,r)},b=(e,i,d,r,a)=>{const s=`<span>${v(i,"preview-error-message")}</span>`,o=l(i,d,e);return w(i,e,r,p(i,e),n("error",s,o),a)},g=(e,i,d,r,a)=>{const s=`<span>${v(i,"preview-disambiguation-message",d)}</span>`,o=l(i,d,e);return w(i,e,r,p(i,e),n("disambiguation",s,o),a)},$=(e,i,d,r)=>{const a=`<span>${v(i,"preview-offline-message")}</span>`,s=`<a>${v(i,"preview-offline-cta")}</a>`;return w(i,e,d,p(i,e),n("offline",a,s),r)};export{m as a,b,g as c,$ as d,k as r};
