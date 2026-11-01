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

})();
