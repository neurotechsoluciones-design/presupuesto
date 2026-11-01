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
["FUERZA +40","Concepto estratégico de Lore Hernando. Todavía no es un programa aprobado ni comercializado por Lorena."],
["RENOVÁ TU ENERGÍA","Se realizaron experiencias en Valle Grande, San Rafael. Próximas fechas por confirmar."]
];
sec.querySelectorAll("[data-acc-info]").forEach(button=>button.addEventListener("click",()=>{const i=Number(button.dataset.accInfo),d=accDetails[i];if(!d||!accDialog)return;sec.querySelector("#lpAccDialogTitle").textContent=d[0];sec.querySelector("#lpAccDialogText").textContent=d[1];accDialog.showModal()}));
sec.querySelector("#lpAccClose")?.addEventListener("click",()=>accDialog.close());
if(accordions.length)openAcc(0);


/* Carrusel radial de accesorios, sin dependencias externas. */
const radial=sec.querySelector(".lp-radial");
if(radial){
 const cards=[...radial.querySelectorAll(".lp-radial-card")],counter=radial.querySelector(".lp-radial-count"),n=cards.length;
 let selected=0,startX=null,dragX=0,dragId=null;
 const wrap=i=>((i%n)+n)%n;
 function renderRadial(){
  const w=cards[0].offsetWidth,mobile=radial.clientWidth<700,step=mobile?26:23,radius=w*(mobile?1.55:2.6);
  cards.forEach((card,i)=>{
   let d=wrap(i-selected);if(d>n/2)d-=n;
   const a=d*step*Math.PI/180,near=Math.max(0,1-Math.abs(d));
   const x=Math.sin(a)*radius,y=(1-Math.cos(a))*radius-near*w*.1;
   card.style.transform="translate("+x.toFixed(1)+"px,"+y.toFixed(1)+"px) rotate("+(d*step).toFixed(1)+"deg) scale("+(1+near*.045)+")";
   card.style.zIndex=String(100-Math.round(Math.abs(d)*12));
   card.classList.toggle("is-visible",Math.abs(d)<=2);
   card.setAttribute("aria-hidden",String(Math.abs(d)>2));
  });
  counter.textContent=String(selected+1).padStart(2,"0")+" / "+String(n).padStart(2,"0");
 }
 const go=direction=>{selected=wrap(selected+direction);renderRadial()};
 radial.querySelector(".lp-radial-next").addEventListener("click",()=>go(1));
 radial.querySelector(".lp-radial-prev").addEventListener("click",()=>go(-1));
 radial.addEventListener("keydown",e=>{if(e.key==="ArrowRight"||e.key==="ArrowLeft"){e.preventDefault();go(e.key==="ArrowRight"?1:-1)}});
 radial.addEventListener("pointerdown",e=>{if(e.target.closest("button"))return;startX=e.clientX;dragX=0;dragId=e.pointerId;radial.setPointerCapture?.(e.pointerId)});
 radial.addEventListener("pointermove",e=>{if(startX!==null)dragX=e.clientX-startX});
 const release=()=>{if(startX!==null&&Math.abs(dragX)>35)go(dragX<0?1:-1);startX=null;dragX=0;dragId=null};
 radial.addEventListener("pointerup",release);radial.addEventListener("pointercancel",release);
 if("ResizeObserver"in window)new ResizeObserver(renderRadial).observe(radial);else window.addEventListener("resize",renderRadial);
 renderRadial();
}
})();
