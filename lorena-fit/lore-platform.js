/* Lore Hernando: navegación por experiencias, galería y animaciones */
(()=>{"use strict";
const sec=document.querySelector("#sitio.lore-platform");if(!sec)return;
const tabs=[...sec.querySelectorAll("[data-lp-tab]")];
function activate(tab,focus=false){tabs.forEach(t=>{const on=t===tab;t.setAttribute("aria-selected",String(on));t.tabIndex=on?0:-1;const p=sec.querySelector("#lpPanel"+t.dataset.lpTab);if(p)p.hidden=!on});if(focus)tab.focus()}
tabs.forEach((tab,index)=>{tab.addEventListener("click",()=>activate(tab));tab.addEventListener("keydown",e=>{if(!["ArrowRight","ArrowLeft","Home","End"].includes(e.key))return;e.preventDefault();const n=e.key==="Home"?0:e.key==="End"?tabs.length-1:(index+(e.key==="ArrowRight"?1:-1)+tabs.length)%tabs.length;activate(tabs[n],true)})});
const reduced=window.matchMedia("(prefers-reduced-motion: reduce)");
const video=sec.querySelector(".lp-video-frame video");
if(video){const sync=()=>{if(reduced.matches)video.pause();else video.play().catch(()=>{})};reduced.addEventListener?.("change",sync);sync()}
const blocks=[...sec.querySelectorAll(".lp-reveal")];
if(!reduced.matches&&"IntersectionObserver" in window){const io=new IntersectionObserver(items=>{items.forEach(item=>{if(item.isIntersecting){item.target.classList.add("lp-visible");item.target.classList.remove("lp-pending");io.unobserve(item.target)}})},{rootMargin:"0px 0px 5% 0px",threshold:.05});blocks.forEach(el=>{el.classList.add("lp-pending");io.observe(el)})}


const accordions=[...sec.querySelectorAll(".lp-acc-program")];
function openAcc(index,focus=false){
 accordions.forEach((item,i)=>{const on=i===index;item.classList.toggle("is-open",on);const tab=item.querySelector(".lp-acc-tab"),panel=item.querySelector(".lp-acc-detail");tab.setAttribute("aria-expanded",String(on));if(on)panel.removeAttribute("inert");else panel.setAttribute("inert","")});
 if(focus)accordions[index]?.querySelector(".lp-acc-tab")?.focus()
}
accordions.forEach((item,index)=>{const tab=item.querySelector(".lp-acc-tab");
 tab.addEventListener("click",()=>openAcc(index));
 tab.addEventListener("keydown",e=>{const forward=["ArrowRight","ArrowDown"].includes(e.key),back=["ArrowLeft","ArrowUp"].includes(e.key);if(!forward&&!back&&!["Home","End"].includes(e.key))return;e.preventDefault();const target=e.key==="Home"?0:e.key==="End"?accordions.length-1:(index+(forward?1:-1)+accordions.length)%accordions.length;openAcc(target,true)})
});
const accDialog=sec.querySelector("#lpAccDialog");
const accDetails=[
["NUTRIFIT MUJERES","En ediciones anteriores duró tres semanas. Modalidad, contenido, precio y próximas fechas por confirmar."],
["NUTRIFIT EXPRESS","Edición histórica online. Clases, soporte y fechas vigentes por confirmar."],
["FUERZA +40","Concepto estratégico de MASFITT. Todavía no es un programa aprobado ni comercializado por Lorena."],
["RENOVÁ TU ENERGÍA","Se realizaron experiencias en Valle Grande, San Rafael. Próximas fechas por confirmar."]
];
sec.querySelectorAll("[data-acc-info]").forEach(button=>button.addEventListener("click",()=>{const i=Number(button.dataset.accInfo),d=accDetails[i];if(!d||!accDialog)return;sec.querySelector("#lpAccDialogTitle").textContent=d[0];sec.querySelector("#lpAccDialogText").textContent=d[1];accDialog.showModal()}));
sec.querySelector("#lpAccClose")?.addEventListener("click",()=>accDialog.close());
if(accordions.length)openAcc(0);

})();
