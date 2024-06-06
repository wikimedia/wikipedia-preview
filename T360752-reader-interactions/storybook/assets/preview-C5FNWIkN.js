import{b as t,m as v}from"./utils-Bfdsm8b3.js";const w=(e,i,d="")=>`
		<div class="wikipediapreview-header">
			${d?`<div class="wikipediapreview-header-image" style="${`background-image:url('${d}');background-size:cover;`}"></div>`:""}
			<div class="wikipediapreview-header-wordmark${d?" wikipediapreview-header-wordmark-with-image":""} wikipediapreview-header-wordmark-${e}"></div>
			${i?'<div class="wikipediapreview-header-closebtn"></div>':""}
		</div>
`.trim(),p=(e,i,d)=>`
		<div class="wikipediapreview-body wikipediapreview-body-${e}">
			<div class="wikipediapreview-body-message">
				<div class="wikipediapreview-body-icon"></div>
					${i}
			</div>
			<div class="wikipediapreview-body-action">
				${d}
			</div>
		</div>
`.trim(),n=(e,i,d)=>`<a href="${t(e,i,d)}" target="_blank" class="wikipediapreview-footer-link-cta">${v(e,"read-on-wiki")}</a>`,c=(e="ltr")=>e==="ltr"?`
			<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12">
				<path fill="#36C" fill-rule="evenodd" d="M11 1H6l2.148 2.144-4.15 4.15.707.708 4.15-4.15L11 6V1ZM4 3H2a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V8H8v2H2V4h2V3Z" clip-rule="evenodd"/>
			</svg>
		`.trim():`
		<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12">
			<path fill="#36C" fill-rule="evenodd" d="M1 1h5L3.852 3.144l4.15 4.15-.707.708-4.15-4.15L1 6V1Zm7 2h2a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V8h1v2h6V4H8V3Z" clip-rule="evenodd"/>
		</svg>
	`.trim(),l=(e,i,d,r,a,s)=>{const o=s==="detect"?"":`wikipediapreview-${s}-theme`;return`
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
							${c(i.dir)}
						</a>
					</div>
				</div>
				<div class="wikipediapreview-gallery"></div>
				<div class="wikipediapreview-scroll-cue"></div>
			</div>
		`.trim();return l(e,d,i.dir,w(e,d,a),s,r)},g=(e,i,d,r)=>{const a=`
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
	`.trim();return l(i,e,d,w(i,e),a,r)},b=(e,i,d,r,a)=>{const s=`<span>${v(i,"preview-error-message")}</span>`,o=n(i,d,e);return l(i,e,r,w(i,e),p("error",s,o),a)},$=(e,i,d,r,a)=>{const s=`<span>${v(i,"preview-disambiguation-message",d)}</span>`,o=n(i,d,e);return l(i,e,r,w(i,e),p("disambiguation",s,o),a)},y=(e,i,d,r)=>{const a=`<span>${v(i,"preview-offline-message")}</span>`,s=`<a>${v(i,"preview-offline-cta")}</a>`;return l(i,e,d,w(i,e),p("offline",a,s),r)};export{g as a,b,$ as c,y as d,m as r};
