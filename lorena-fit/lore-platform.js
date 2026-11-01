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


/* Selector inline en la sección 06, sin modal ni CTA duplicados. */
(()=>{
 "use strict";
 const root=document.getElementById("inlineQuiz");
 if(!root)return;
 const questions=[
  ["¿Qué te gustaría priorizar hoy?",["Empezar o volver a entrenar","Desarrollar fuerza y constancia","Encontrar una rutina que se adapte a mis tiempos","Participar de un reto acompañada"]],
  ["¿Cómo venís entrenando?",["Estoy empezando","Estoy retomando después de una pausa","Ya entreno con cierta frecuencia"]],
  ["¿Cuánto tiempo solés tener para una sesión?",["Hasta 20 minutos","Entre 20 y 35 minutos","Más de 35 minutos","Varía según el día"]],
  ["¿Qué elementos tenés disponibles en casa?",["Prefiero comenzar sin equipamiento","Tengo colchoneta o elementos básicos","Tengo bandas o mancuernas","Puedo conseguir el material que indique el programa"]]
 ];
 const answers=[-1,-1,-1,-1];let step=0;
 const esc=s=>String(s).replace(/[&<>"']/g,ch=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]));
 function render(){
  if(step===questions.length){
   const goal=answers[0];
   const title=goal===1?"Explorá los programas de fuerza":goal===3?"Conocé los retos grupales":goal===2?"Buscá una rutina compatible con tus tiempos":"Empezá por un programa de iniciación";
   root.innerHTML='<span class="lore-quiz-step">ORIENTACIÓN COMPLETADA</span><h3>'+esc(title)+'</h3><p>Esta orientación comercial es ilustrativa. Lore deberá validar qué programa corresponde según objetivo, experiencia, tiempo y equipamiento. Revisá las características de cada propuesta antes de decidir.</p><div class="lore-quiz-actions"><button type="button" data-quiz-inline="restart">Volver a responder</button><a href="#lpProgramas" class="lore-quiz-primary">Explorar programas ↗</a></div>';
   return;
  }
  const [question,options]=questions[step];
  root.innerHTML='<div class="lore-quiz-inline-head"><span class="lore-quiz-step">PREGUNTA '+(step+1)+' DE 4</span><div class="lore-quiz-progress"><span style="width:'+((step+1)*25)+'%"></span></div></div><h3>'+esc(question)+'</h3><div class="lore-quiz-choices" role="group" aria-label="Opciones de la pregunta '+(step+1)+'">'+options.map((o,i)=>'<button type="button" data-quiz-inline-choice="'+i+'" aria-pressed="'+(answers[step]===i)+'" class="'+(answers[step]===i?'selected':'')+'">'+esc(o)+'</button>').join("")+'</div><div class="lore-quiz-actions">'+(step===0?'<span class="lore-quiz-start">Elegí una opción para continuar</span>':'<button type="button" data-quiz-inline="back">← Anterior</button>')+'<button type="button" class="lore-quiz-primary" data-quiz-inline="next" '+(answers[step]===-1?'disabled':'')+'>'+(step===3?'Ver orientación':'Continuar')+' →</button></div><p class="lore-quiz-privacy">No se recopilan ni guardan las respuestas.</p>';
 }
 root.addEventListener("click",e=>{
  const choice=e.target.closest("[data-quiz-inline-choice]");
  if(choice){answers[step]=Number(choice.dataset.quizInlineChoice);render();return}
  const action=e.target.closest("[data-quiz-inline]");
  if(!action)return;
  switch(action.dataset.quizInline){
   case "next":if(step<4&&answers[step]>=0){step++;render()}break;
   case "back":step=Math.max(0,step-1);render();break;
   case "restart":answers.fill(-1);step=0;render();break;
  }
 });
 render();
})();


/* Carrusel de reels: controles accesibles y contador sincronizado con scroll manual */
(()=>{
 const rail=document.getElementById("lpReelsRail");
 if(!rail)return;
 const cards=[...rail.querySelectorAll(".lp-ig-tile")];
 const controls=rail.parentElement.querySelector(".lp-reels-controls");
 const prev=controls?.querySelector(".lp-reels-prev"),next=controls?.querySelector(".lp-reels-next"),counter=controls?.querySelector(".lp-reels-counter");
 if(!prev||!next||!counter||!cards.length)return;
 function current(){const x=rail.getBoundingClientRect().left;let closest=0,best=Infinity;cards.forEach((card,i)=>{const distance=Math.abs(card.getBoundingClientRect().left-x);if(distance<best){best=distance;closest=i}});return closest}
 function update(){const i=current();counter.textContent=(i+1)+" / "+cards.length;prev.disabled=i===0;next.disabled=i===cards.length-1}
 function go(delta){const i=Math.max(0,Math.min(cards.length-1,current()+delta));rail.scrollTo({left:cards[i].offsetLeft-cards[0].offsetLeft,behavior:window.matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth"});counter.textContent=(i+1)+" / "+cards.length;prev.disabled=i===0;next.disabled=i===cards.length-1}
 prev.addEventListener("click",()=>go(-1));next.addEventListener("click",()=>go(1));
 let frame=0;rail.addEventListener("scroll",()=>{if(frame)return;frame=requestAnimationFrame(()=>{frame=0;update()})},{passive:true});
 addEventListener("resize",update,{passive:true});
 update();
})();


/* Comparador audiovisual aislado de las demás demostraciones. */
(()=>{
 const block=document.getElementById("videos");
 if(!block)return;
 const buttons=[...block.querySelectorAll("[data-provider]")];
 const panels=[...block.querySelectorAll("[data-media-panel]")];
 function select(key,scroll=false){
  buttons.forEach(btn=>{const active=btn.dataset.provider===key;btn.classList.toggle("active",active);btn.setAttribute("aria-pressed",String(active));btn.querySelector(".media-tab-action").textContent=active?"Seleccionado ✓":"Ver detalles ↓"});
  panels.forEach(panel=>panel.hidden=panel.dataset.mediaPanel!==key);
  if(scroll&&window.matchMedia("(max-width: 700px)").matches)block.querySelector("#mediaInfo").scrollIntoView({behavior:"smooth",block:"start"});
 }
 buttons.forEach(btn=>btn.addEventListener("click",()=>select(btn.dataset.provider,true)));
 const students=block.querySelector("#bunnyStudents"),hours=block.querySelector("#bunnyHours"),storage=block.querySelector("#bunnyStorage");
 const fmt=v=>"USD "+v.toFixed(2).replace(".",",");
 function update(){
  if(!students||!hours||!storage)return;
  const s=+students.value,h=+hours.value,g=+storage.value;
  const gb=s*h;const traffic=gb*0.005;const store=g*0.01;const total=Math.max(1,traffic+store);
  block.querySelector("#bunnyStudentsValue").textContent=s;
  block.querySelector("#bunnyHoursValue").textContent=h+" h";
  block.querySelector("#bunnyStorageValue").textContent=g+" GB";
  block.querySelector("#bunnyTransfer").textContent=gb+" GB";
  block.querySelector("#bunnyTrafficCost").textContent=fmt(traffic);
  block.querySelector("#bunnyStorageCost").textContent=fmt(store);
  block.querySelector("#bunnyTotal").textContent=fmt(total);
 }
 [students,hours,storage].forEach(el=>el?.addEventListener("input",update));
 select("youtube");update();
})();
