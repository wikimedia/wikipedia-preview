import{b as p,m as o,g as c}from"./utils-frCCr3mL.js";const k=e=>{const i=document.createElement("div");return i.classList.add("wikipediapreview-gallery-row"),e&&e.forEach(d=>{const r=document.createElement("div");r.classList.add("wikipediapreview-gallery-image"),r.style.backgroundImage=`url(${d.thumb})`,i.appendChild(r)}),i.outerHTML},m=e=>e&&e.length<3?"":`<div class="wikipediapreview-gallery">${k(e)}</div>`,n=(e,i="",d=[])=>{const r=i!==""&&d.length>0&&d.length<3,a=i||d[0]&&d[0].thumb;return`
		<div class= "wikipediapreview-header ${r?"":"wikipediapreview-header-no-thumb"}">
			${r?`<div class="wikipediapreview-header-image" style="${`background-image:url('${a}');background-size:cover;`}"></div>`:""}
			<div class="wikipediapreview-header-wordmark wikipediapreview-header-wordmark-${e}"></div>
			<div class="wikipediapreview-header-closebtn"></div>
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
`.trim(),w=(e,i,d)=>`<a href="${p(e,i,d)}" target="_blank" class="wikipediapreview-footer-link-cta">${o(e,"read-on-wiki")}</a>`,t=(e,i,d,r,a,s)=>{const v=s==="detect"?"":`wikipediapreview-${s}-theme`;return`
		<div class="wikipediapreview ${i?"mobile":""} ${v}" lang="${e}" dir="${d}">
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
							${o(e,"read-more")}
							${c(i.dir,"#36C")}
						</a>
					</div>
				</div>
				<div class="wikipediapreview-scroll-cue"></div>
			</div>
		`.trim();return t(e,d,i.dir,n(e,a,i.media),s,r)},u=(e,i,d,r)=>{const a=`
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
	`.trim();return t(i,e,d,n(i),a,r)},y=(e,i,d,r,a)=>{const s=`<span>${o(i,"preview-error-message")}</span>`,v=w(i,d,e);return t(i,e,r,n(i),l("error",s,v),a)},$=(e,i,d,r,a)=>{const s=`<span>${o(i,"preview-disambiguation-message",d)}</span>`,v=w(i,d,e);return t(i,e,r,n(i),l("disambiguation",s,v),a)},h=(e,i,d,r)=>{const a=`<span>${o(i,"preview-offline-message")}</span>`,s=`<a>${o(i,"preview-offline-cta")}</a>`;return t(i,e,d,n(i),l("offline",a,s),r)};export{u as a,y as b,$ as c,h as d,b as r};
