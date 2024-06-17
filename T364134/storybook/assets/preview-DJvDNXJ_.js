import{b as l,m as v,g as c}from"./utils-C9HMKbAi.js";const p=(e,i,d="")=>`
		<div class="wikipediapreview-header">
			${d?`<div class="wikipediapreview-header-image" style="${`background-image:url('${d}');background-size:cover;`}"></div>`:""}
			<div class="wikipediapreview-header-wordmark wikipediapreview-header-wordmark-${e}"></div>
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
`.trim(),t=(e,i,d)=>`<a href="${l(e,i,d)}" target="_blank" class="wikipediapreview-footer-link-cta">${v(e,"read-on-wiki")}</a>`,n=(e,i,d,r,a,s)=>{const o=s==="detect"?"":`wikipediapreview-${s}-theme`;return`
		<div class="wikipediapreview ${i?"mobile":""} ${o}" lang="${e}" dir="${d}">
			${r}
			${a}
		</div>
	`.trim()},m=(e,i,d,r)=>{const a=i.imgUrl,s=`
			<div class="wikipediapreview-body">
				${i.extractHtml}
				<div class="wikipediapreview-footer">
					<div class="wikipediapreview-footer-link">
						<a href="${l(e,i.title,d)}"
							class="wikipediapreview-footer-link-cta" target="_blank"
							>
							${v(e,"read-more")}
							${c(i.dir,"#36C")}
						</a>
					</div>
				</div>
				<div class="wikipediapreview-gallery"></div>
				<div class="wikipediapreview-scroll-cue"></div>
			</div>
		`.trim();return n(e,d,i.dir,p(e,d,a),s,r)},b=(e,i,d,r)=>{const a=`
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
	`.trim();return n(i,e,d,p(i,e),a,r)},g=(e,i,d,r,a)=>{const s=`<span>${v(i,"preview-error-message")}</span>`,o=t(i,d,e);return n(i,e,r,p(i,e),w("error",s,o),a)},$=(e,i,d,r,a)=>{const s=`<span>${v(i,"preview-disambiguation-message",d)}</span>`,o=t(i,d,e);return n(i,e,r,p(i,e),w("disambiguation",s,o),a)},y=(e,i,d,r)=>{const a=`<span>${v(i,"preview-offline-message")}</span>`,s=`<a>${v(i,"preview-offline-cta")}</a>`;return n(i,e,d,p(i,e),w("offline",a,s),r)};export{b as a,g as b,$ as c,y as d,m as r};
