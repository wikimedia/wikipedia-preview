import{b as t,m as v,g as l}from"./utils-Wq5dk-Oe.js";const p=(e,i="")=>`
		<div class="wikipediapreview-header">
			${i?`<div class="wikipediapreview-header-image" style="${`background-image:url('${i}');background-size:cover;`}"></div>`:""}
			<div class="wikipediapreview-header-wordmark wikipediapreview-header-wordmark-${e}"></div>
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
`.trim(),c=(e,i,d)=>`<a href="${t(e,i,d)}" target="_blank" class="wikipediapreview-footer-link-cta">${v(e,"read-on-wiki")}</a>`,n=(e,i,d,r,a,s)=>{const o=s==="detect"?"":`wikipediapreview-${s}-theme`;return`
		<div class="wikipediapreview ${i?"mobile":""} ${o}" lang="${e}" dir="${d}">
			${r}
			${a}
		</div>
	`.trim()},m=(e,i,d,r)=>{const a=i.imgUrl,s=`
			<div class="wikipediapreview-body">
				${i.extractHtml}
				<div class="wikipediapreview-footer">
					<div class="wikipediapreview-footer-link">
						<a href="${t(e,i.title,d)}"
							class="wikipediapreview-footer-link-cta" target="_blank"
							>
							${v(e,"read-more")}
							${l(i.dir)}
						</a>
					</div>
				</div>
				<div class="wikipediapreview-gallery"></div>
				<div class="wikipediapreview-scroll-cue"></div>
			</div>
		`.trim();return n(e,d,i.dir,p(e,a),s,r)},b=(e,i,d,r)=>{const a=`
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
	`.trim();return n(i,e,d,p(i),a,r)},g=(e,i,d,r,a)=>{const s=`<span>${v(i,"preview-error-message")}</span>`,o=c(i,d,e);return n(i,e,r,p(i),w("error",s,o),a)},$=(e,i,d,r,a)=>{const s=`<span>${v(i,"preview-disambiguation-message",d)}</span>`,o=c(i,d,e);return n(i,e,r,p(i),w("disambiguation",s,o),a)},y=(e,i,d,r)=>{const a=`<span>${v(i,"preview-offline-message")}</span>`,s=`<a>${v(i,"preview-offline-cta")}</a>`;return n(i,e,d,p(i),w("offline",a,s),r)};export{b as a,g as b,$ as c,y as d,m as r};
