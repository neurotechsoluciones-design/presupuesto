/* DEMO de plataforma Lore · no habilita cobros ni registro real */
(()=>{"use strict";
const sec=document.querySelector("#sitio.lore-platform");if(!sec)return;
const filterButtons=[...sec.querySelectorAll(".lp-filter")];
filterButtons.forEach(btn=>btn.addEventListener("click",()=>{
 const val=btn.dataset.filter;
 filterButtons.forEach(b=>b.setAttribute("aria-pressed",String(b===btn)));
 sec.querySelectorAll(".lp-program").forEach(card=>{card.hidden=val!=="todos"&&card.dataset.type!==val});
}));
const modal=document.querySelector("#lpTrialModal");if(!modal)return;
const triggers=sec.querySelectorAll("[data-lp-trial]");
const close=modal.querySelector(".lp-modal-close");
const dismiss=modal.querySelector("[data-lp-dismiss]");
let opened=false,previous=null;
const storageKey="lore-trial-popup-v1";
function hasSeen(){try{return sessionStorage.getItem(storageKey)==="1"}catch{return false}}
function markSeen(){try{sessionStorage.setItem(storageKey,"1")}catch{}}
function open(e){if(e)e.preventDefault();if(modal.hidden===false)return;previous=document.activeElement;modal.hidden=false;opened=true;document.body.style.overflow="hidden";modal.querySelector(".lp-modal-close")?.focus();markSeen()}
function hide(){modal.hidden=true;document.body.style.overflow="";previous?.focus?.()}
triggers.forEach(el=>el.addEventListener("click",open));
close?.addEventListener("click",hide);dismiss?.addEventListener("click",e=>{e.preventDefault();hide()});
modal.addEventListener("click",e=>{if(e.target===modal)hide()});
modal.addEventListener("keydown",e=>{if(e.key==="Escape")hide();if(e.key!=="Tab")return;const focusables=[...modal.querySelectorAll("a[href],button:not([disabled])")];if(!focusables.length)return;const first=focusables[0],last=focusables.at(-1);if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}});
const observer=new IntersectionObserver(entries=>{if(entries.some(x=>x.isIntersecting)){observer.disconnect();setTimeout(()=>{if(!hasSeen()&&!opened&&document.visibilityState==="visible")open()},8000)}},{threshold:.24});
observer.observe(sec);
const video=sec.querySelector(".lp-video-frame video");if(video){if(window.matchMedia("(prefers-reduced-motion: reduce)").matches)video.pause();else video.play().catch(()=>{});}
})();
