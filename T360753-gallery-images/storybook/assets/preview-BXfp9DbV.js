import{b as p,m as v,g as c}from"./utils-4nBuDEj7.js";const k=e=>{const i=document.createElement("div");return i.classList.add("wikipediapreview-gallery-row"),e&&e.forEach(d=>{const r=document.createElement("div");r.classList.add("wikipediapreview-gallery-image"),r.style.backgroundImage=`url(${d.thumb})`,i.appendChild(r)}),i.outerHTML},m=e=>e&&e.length<3?"":`<div class="wikipediapreview-gallery">${k(e)}</div>`,n=(e,i,d="",r=[])=>{const a=d!==""&&r.length>0&&r.length<3,s=d||r[0]&&r[0].thumb;return`
		<div class= "wikipediapreview-header ${a?"":"wikipediapreview-header-no-thumb"}">
			${a?`<div class="wikipediapreview-header-image" style="${`background-image:url('${s}');background-size:cover;`}"></div>`:""}
			<div class="wikipediapreview-header-wordmark wikipediapreview-header-wordmark-${e}"></div>
			${i?'<div class="wikipediapreview-header-closebtn"></div>':""}
		</div>
`.trim()},l=(e,i,d)=>`
		<div class="wikipediapreview-body wikipediapreview-body-${e}">
			<div class="wikipediapreview-body-message">
				<div class="wikipediapreview-body-icon"></div>
					${i}
			</div>
			<div class="wikipediapreview-body-action">
				${d}
			</div>
		</div>
`.trim(),w=(e,i,d)=>`<a href="${p(e,i,d)}" target="_blank" class="wikipediapreview-footer-link-cta">${v(e,"read-on-wiki")}</a>`,t=(e,i,d,r,a,s)=>{const o=s==="detect"?"":`wikipediapreview-${s}-theme`;return`
		<div class="wikipediapreview ${i?"mobile":""} ${o}" lang="${e}" dir="${d}">
			${r}
			${a}
		</div>
	`.trim()},b=(e,i,d,r)=>{const a=i.imgUrl,s=`
			${m(i.media)}
			<div class="wikipediapreview-body">
				${i.extractHtml}
				<div class="wikipediapreview-footer">
					<div class="wikipediapreview-footer-link">
						<a href="${p(e,i.title,d)}"
							class="wikipediapreview-footer-link-cta" target="_blank"
							>
							${v(e,"read-more")}
							${c(i.dir)}
						</a>
					</div>
				</div>
				<div class="wikipediapreview-scroll-cue"></div>
			</div>
		`.trim();return t(e,d,i.dir,n(e,d,a,i.media),s,r)},y=(e,i,d,r)=>{const a=`
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
	`.trim();return t(i,e,d,n(i,e),a,r)},$=(e,i,d,r,a)=>{const s=`<span>${v(i,"preview-error-message")}</span>`,o=w(i,d,e);return t(i,e,r,n(i,e),l("error",s,o),a)},u=(e,i,d,r,a)=>{const s=`<span>${v(i,"preview-disambiguation-message",d)}</span>`,o=w(i,d,e);return t(i,e,r,n(i,e),l("disambiguation",s,o),a)},f=(e,i,d,r)=>{const a=`<span>${v(i,"preview-offline-message")}</span>`,s=`<a>${v(i,"preview-offline-cta")}</a>`;return t(i,e,d,n(i,e),l("offline",a,s),r)};export{y as a,$ as b,u as c,f as d,b as r};
