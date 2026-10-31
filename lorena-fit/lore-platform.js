/* Lore Hernando · filtros de la demostración, sin compras ni suscripciones */
(()=>{"use strict";
 const sec=document.querySelector("#sitio.lore-platform");if(!sec)return;
 const filters=[...sec.querySelectorAll(".lp-filter")];
 filters.forEach(btn=>btn.addEventListener("click",()=>{
  const value=btn.dataset.filter;
  filters.forEach(other=>other.setAttribute("aria-pressed",String(other===btn)));
  sec.querySelectorAll(".lp-program").forEach(card=>{card.hidden=value!=="todos"&&card.dataset.type!==value});
 }));
 const video=sec.querySelector(".lp-video-frame video");
 if(video){
  const reduced=window.matchMedia("(prefers-reduced-motion: reduce)");
  const update=()=>{if(reduced.matches)video.pause();else video.play().catch(()=>{})};
  reduced.addEventListener?.("change",update);
  update();
 }
})();
