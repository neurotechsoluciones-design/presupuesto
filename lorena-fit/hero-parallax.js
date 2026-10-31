/* Lore Hernando · parallax discreto del hero, sin recortar la foto */
(()=>{
 "use strict";
 const hero=document.querySelector("#inicio.hero-v4");
 const image=hero?.querySelector(".hero-v4-photo");
 if(!hero||!image)return;
 const desktop=window.matchMedia("(min-width: 601px)");
 const reduced=window.matchMedia("(prefers-reduced-motion: reduce)");
 let raf=0;
 function draw(){
   raf=0;
   if(reduced.matches||!desktop.matches){image.style.transform="none";return}
   const stage=hero.querySelector(".hero-v4-media");
   if(!stage)return;
   const bounds=stage.getBoundingClientRect();
   const vh=window.innerHeight||document.documentElement.clientHeight;
   if(bounds.bottom<=0||bounds.top>=vh)return;
   // Factor entre -1 y 1 alrededor del centro de la ventana.
   const fraction=(vh/2-(bounds.top+bounds.height/2))/(vh/2+bounds.height/2);
   const dy=Math.max(-16,Math.min(16,Math.round(fraction*16*10)/10));
   // La banda de seguridad vertical de 24px evita cortar la imagen.
   image.style.transform="translate3d(0,"+dy+"px,0)";
 }
 function schedule(){if(!raf)raf=requestAnimationFrame(draw)}
 addEventListener("scroll",schedule,{passive:true});
 addEventListener("resize",schedule,{passive:true});
 if(desktop.addEventListener)desktop.addEventListener("change",schedule);
 if(reduced.addEventListener)reduced.addEventListener("change",schedule);
 schedule();
})();
