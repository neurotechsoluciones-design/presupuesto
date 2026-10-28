/* LORENA FIT · demostraciones de la propuesta, sin pagos ni bases de datos reales */
(()=>{
"use strict";
const $=(s,base=document)=>base.querySelector(s);
const $$=(s,base=document)=>[...base.querySelectorAll(s)];
const reduceMotion=window.matchMedia("(prefers-reduced-motion: reduce)");
const behavior=()=>reduceMotion.matches?"auto":"smooth";
const toast=$("#toast");
let toastTimer=null;
function notify(message){toast.textContent=message;toast.classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove("show"),3600)}
const nav=$("#mainNav"),menuBtn=$("#menuBtn");
menuBtn.addEventListener("click",()=>{const open=nav.classList.toggle("open");document.body.classList.toggle("menu-open",open);menuBtn.setAttribute("aria-expanded",String(open));menuBtn.setAttribute("aria-label",open?"Cerrar menú":"Abrir menú")});
$$("a",nav).forEach(a=>a.addEventListener("click",()=>{nav.classList.remove("open");menuBtn.setAttribute("aria-expanded","false");document.body.classList.remove("menu-open")}));
function reading(){const d=document.documentElement;const total=d.scrollHeight-innerHeight;$("#readingLine").style.width=(total>0?Math.max(0,Math.min(100,scrollY/total*100)):0)+"%"}
window.addEventListener("scroll",reading,{passive:true});reading();
const programs=[
 {name:"Empezar de nuevo",duration:"21 días",mode:"Reto grupal",desc:"Un reto con sesiones organizadas por días y acompañamiento coordinado en WhatsApp.",sessions:"Días organizados por un recorrido",includes:"Videos, guías, hábitos y acceso al grupo cuando corresponda"},
 {name:"Fuerza +40",duration:"4 semanas",mode:"A tu ritmo",desc:"Un ejemplo de entrenamiento de fuerza para mujeres que desean organizar sus sesiones y avanzar cuando quieran.",sessions:"Semanas y sesiones de fuerza",includes:"Videos, materiales de apoyo y seguimiento de lecciones"},
 {name:"Reset de septiembre",duration:"Campaña especial",mode:"Promoción estacional",desc:"Un ejemplo de campaña con oferta específica, página de venta propia y disponibilidad definida por Lorena.",sessions:"Programa que Lorena configure",includes:"Precio promocional, guía y acceso al contenido comprado"},
 {name:"Movimiento consciente",duration:"6 semanas",mode:"A tu ritmo",desc:"Un programa de seis semanas con rutinas organizadas para recorrer desde el celular.",sessions:"Sesiones organizadas por semanas",includes:"Videos, guías PDF y continuidad del progreso"},
 {name:"Mes de la Madre",duration:"Campaña especial",mode:"Promoción estacional",desc:"Una propuesta especial para fechas comerciales, con enlace compartible y promoción configurable.",sessions:"Programa que Lorena configure",includes:"Página de venta, cupones y acceso por compra"},
 {name:"Reto de verano",duration:"Edición de temporada",mode:"Reto grupal",desc:"Una edición de temporada que reúne a un grupo de alumnas en fechas coordinadas.",sessions:"Entrenamientos ordenados por días",includes:"Videos, PDFs y enlace al grupo de acompañamiento"}
];
let selectedProgram=0;
const rail=$("#programRail"),cardEls=$$(".program-card",rail);
let visibleCards=cardEls.slice(),interactionPause=false,activeSlide=0,programmaticScroll=false;
function currentIndex(){return activeSlide}
function updateSlider(){if(!visibleCards.length){$("#slideCount").textContent="00 / 00";$("#prevProgram").disabled=true;$("#nextProgram").disabled=true;return}activeSlide=Math.max(0,Math.min(visibleCards.length-1,activeSlide));$("#slideCount").textContent=String(activeSlide+1).padStart(2,"0")+" / "+String(visibleCards.length).padStart(2,"0");$("#prevProgram").disabled=activeSlide===0;$("#nextProgram").disabled=activeSlide===visibleCards.length-1}
function slideTo(index,smooth=true){if(!visibleCards.length)return;activeSlide=Math.max(0,Math.min(visibleCards.length-1,index));const card=visibleCards[activeSlide];const left=card.offsetLeft-visibleCards[0].offsetLeft;programmaticScroll=true;rail.scrollTo({left,behavior:smooth?behavior():"auto"});updateSlider();setTimeout(()=>programmaticScroll=false,smooth?700:80)}
let filter="todos";
$$(".filter").forEach(btn=>btn.addEventListener("click",()=>{filter=btn.dataset.filter;cardEls.forEach(card=>{card.hidden=filter!=="todos"&&card.dataset.type!==filter});visibleCards=cardEls.filter(card=>!card.hidden);$$(".filter").forEach(b=>{const active=b===btn;b.classList.toggle("active",active);b.setAttribute("aria-pressed",String(active))});activeSlide=0;rail.scrollLeft=0;updateSlider();interactionPause=true;setTimeout(()=>interactionPause=false,6000)}));
$("#prevProgram").addEventListener("click",()=>{interactionPause=true;slideTo(currentIndex()-1);setTimeout(()=>interactionPause=false,6000)});
$("#nextProgram").addEventListener("click",()=>{interactionPause=true;slideTo(currentIndex()+1);setTimeout(()=>interactionPause=false,6000)});
rail.addEventListener("scroll",()=>requestAnimationFrame(()=>{if(!programmaticScroll&&visibleCards.length){const max=rail.scrollWidth-rail.clientWidth;if(rail.scrollLeft>=max-8){activeSlide=visibleCards.length-1}else if(rail.scrollLeft<=8){activeSlide=0}else{const step=(visibleCards[1]?.offsetLeft-visibleCards[0]?.offsetLeft)||300;activeSlide=Math.min(visibleCards.length-1,Math.max(0,Math.round(rail.scrollLeft/step)))}updateSlider()}}),{passive:true});
rail.addEventListener("mouseenter",()=>interactionPause=true);
rail.addEventListener("mouseleave",()=>interactionPause=false);
rail.addEventListener("focusin",()=>interactionPause=true);
rail.addEventListener("focusout",()=>interactionPause=false);
rail.addEventListener("touchstart",()=>interactionPause=true,{passive:true});
rail.addEventListener("touchend",()=>setTimeout(()=>interactionPause=false,4500),{passive:true});
if(!reduceMotion.matches)setInterval(()=>{if(interactionPause||document.hidden||!visibleCards.length)return;const rect=rail.getBoundingClientRect();if(rect.bottom<0||rect.top>innerHeight)return;const i=currentIndex();slideTo(i+1>=visibleCards.length?0:i+1)},5200);
updateSlider();
const modalBackdrop=$("#programModal"),modalTitle=$("#modalTitle"),modalDesc=$("#modalDesc"),modalAttrs=$("#modalAttributes");
let modalInvoker=null;
function openModal(index,invoker){selectedProgram=index;modalInvoker=invoker;const p=programs[index];modalTitle.textContent=p.name;modalDesc.textContent=p.desc;modalAttrs.innerHTML="";[["Duración",p.duration],["Modalidad",p.mode],["Organización",p.sessions],["Incluye",p.includes]].forEach(([a,b])=>{const box=document.createElement("div");const label=document.createElement("small");label.textContent=a;const strong=document.createElement("strong");strong.textContent=b;box.append(label,strong);modalAttrs.append(box)});modalBackdrop.hidden=false;document.body.style.overflow="hidden";$("#closeModal").focus()}
function closeModal(){modalBackdrop.hidden=true;document.body.style.overflow="";if(modalInvoker)modalInvoker.focus()}
$$("[data-open-program]").forEach(btn=>btn.addEventListener("click",()=>openModal(Number(btn.dataset.openProgram),btn)));
$("#closeModal").addEventListener("click",closeModal);
modalBackdrop.addEventListener("click",e=>{if(e.target===modalBackdrop)closeModal()});
window.addEventListener("keydown",e=>{if(e.key==="Escape"&&!modalBackdrop.hidden)closeModal();if(e.key==="Tab"&&!modalBackdrop.hidden){const focusables=$$('button:not([disabled]),a[href]',modalBackdrop);const first=focusables[0],last=focusables[focusables.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}}});
$("#modalDemo").addEventListener("click",()=>{closeModal();renderSite("checkout");$("#sitio").scrollIntoView({behavior:behavior()})});

/* The full website showroom: demo-only state, no credentials, network or payments */
const root=$("#siteDemoRoot");
const sitePhotos=[
 "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=850&q=83",
 "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=850&q=83",
 "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?auto=format&fit=crop&w=850&q=83",
 "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=850&q=83",
 "https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=850&q=83",
 "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=850&q=83"
];
let demoScreen="home",demoFilter="todos",demoPay="mp",demoResult="approved",demoDay=0,completedDays=new Set(),demoBought=new Set([1]),demoShowIntro=true;
const sitePrograms=programs;
const esc=(s)=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const fakeBtn=(act,label,secondary=false)=>'<button type="button" class="sd-btn'+(secondary?" secondary":"")+'" data-action="'+act+'">'+label+'</button>';
function demoCard(i){
  const p=sitePrograms[i];
  return '<button type="button" class="sd-program" data-program-demo="'+i+'"><img src="'+sitePhotos[i]+'" alt="Fotografía ilustrativa de entrenamiento" loading="lazy"><div><small>'+esc(p.duration.toUpperCase())+' · '+esc(p.mode.toUpperCase())+'</small><strong>'+esc(p.name)+'</strong><em>Conocer el programa ↗</em></div></button>';
}
function homeView(){
  return '<div class="sd-site-hero"><div><span class="sd-eyebrow">MOVIMIENTO PARA TU NUEVA ETAPA</span><h3 class="sd-h1">La fuerza de<br><em>elegirte.</em></h3><p class="sd-p">Entrenamientos pensados para mujeres +40. Elegí tu programa, empezá cuando corresponda y seguí cada sesión a tu ritmo.</p><div>'+fakeBtn("catalog","Explorar programas ↗")+'</div></div><div class="sd-site-hero-photo" role="img" aria-label="Ejemplo de imagen editorial de entrenamiento"></div></div><div class="sd-highlight"><span>FUERZA Y MOVIMIENTO</span><span>PROGRAMAS POR DÍAS</span><span>ACCESO DESDE EL CELULAR</span></div><div class="sd-container"><div class="sd-mini-head"><div><span class="sd-eyebrow">ELEGÍ TU RECORRIDO</span><h3 class="sd-h2">Un programa para cada etapa.</h3></div><button type="button" data-action="catalog">Ver todos ↗</button></div><div class="sd-cards">'+[0,1,3].map(demoCard).join("")+'</div></div>';
}
function catalogView(){
 const f=[["todos","Todos"],["grupal","Retos grupales"],["individual","A tu ritmo"],["especial","Campañas"]];
 let ids=[];
 // Explicit categories avoid guessing from labels
 ids=[0,1,2,3,4,5].filter(i=>demoFilter==="todos"||({0:"grupal",1:"individual",2:"especial",3:"individual",4:"especial",5:"grupal"}[i])===demoFilter);
 return '<div class="sd-container"><span class="sd-eyebrow">TODOS TUS PROGRAMAS</span><h3 class="sd-h1">Elegí tu manera<br><em>de moverte.</em></h3><p class="sd-p">Retos de 21 días, programas de cuatro y seis semanas y nuevas campañas. Todos organizados, todos dentro de la misma plataforma.</p><div class="sd-toolbar">'+f.map(([id,label])=>'<button type="button" class="sd-filter'+(demoFilter===id?" active":"")+'" data-demo-filter="'+id+'">'+label+'</button>').join("")+'</div><div class="sd-cards">'+ids.map(demoCard).join("")+'</div><p class="sd-p" style="margin-top:20px;font-size:11px">Programas ilustrativos: Lorena podrá crear y administrar nuevos cursos desde el panel.</p></div>';
}
function detailView(){
 const p=sitePrograms[selectedProgram],photo=sitePhotos[selectedProgram];
 return '<div class="sd-container"><div class="sd-detail"><img src="'+photo+'" alt="Fotografía ilustrativa de '+esc(p.name)+'"><div><span class="sd-eyebrow">CONOCÉ TU PROGRAMA</span><h3 class="sd-h1">'+esc(p.name)+'</h3><p class="sd-p">'+esc(p.desc)+'</p><div class="sd-tagrow"><span class="sd-tag">'+esc(p.duration)+'</span><span class="sd-tag">'+esc(p.mode)+'</span><span class="sd-tag">Videos y guías</span></div><div class="sd-info"><strong>Organización</strong><span>'+esc(p.sessions)+'</span></div><div class="sd-info"><strong>Materiales</strong><span>Videos y PDFs</span></div><div class="sd-info"><strong>Acceso</strong><span>Según pago y modalidad</span></div><div class="sd-price">Precio definido por Lorena</div><div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:17px">'+fakeBtn("checkout","Quiero este programa ↗")+fakeBtn("catalog","Ver otros",true)+'</div><p class="sd-p" style="font-size:10px;margin-top:16px">Los nombres y contenidos son ejemplos. El precio no está definido en esta demostración.</p></div></div></div>';
}
function checkoutView(){
 const p=sitePrograms[selectedProgram];
 return '<div class="sd-container"><span class="sd-eyebrow">COMPRA DE DEMOSTRACIÓN · SIN PAGOS REALES</span><h3 class="sd-h1">Tu programa está<br><em>a un paso.</em></h3><div class="sd-form-layout"><div class="sd-panel"><h3>Datos de inscripción</h3><p class="sd-p">Así se organizarán los datos de compra. No ingreses información personal en esta demostración.</p><div class="sd-field"><label>Nombre</label><div class="sd-faux-input">Nombre de alumna · ejemplo</div></div><div class="sd-field"><label>Correo electrónico</label><div class="sd-faux-input">alumna@ejemplo.com · ficticio</div></div><h3 style="margin-top:24px">Elegí cómo pagar</h3><button type="button" class="sd-pay-option'+(demoPay==="mp"?" active":"")+'" data-pay="mp"><span>'+(demoPay==="mp"?"●":"○")+'</span><div><strong>Mercado Pago</strong><small>Compra aprobada → acceso automático al curso.</small></div></button><button type="button" class="sd-pay-option'+(demoPay==="transfer"?" active":"")+'" data-pay="transfer"><span>'+(demoPay==="transfer"?"●":"○")+'</span><div><strong>Transferencia bancaria</strong><small>Se verifica la acreditación antes de otorgar acceso.</small></div></button></div><aside class="sd-panel"><h3>Tu resumen</h3><div class="sd-info"><strong>Programa</strong><span>'+esc(p.name)+'</span></div><div class="sd-info"><strong>Duración</strong><span>'+esc(p.duration)+'</span></div><div class="sd-info"><strong>Importe</strong><span>A definir por Lorena</span></div><p class="sd-checkout-note">Esta compra es exclusivamente ilustrativa. No hay una cuenta real ni un pago real.</p><div style="margin-top:20px">'+fakeBtn("finish",demoPay==="mp"?"Simular pago aprobado ✓":"Simular transferencia enviada ↗")+'</div></aside></div></div>';
}
function resultView(){
 const approved=demoResult==="approved";
 return '<div class="sd-container sd-success"><div class="sd-success-icon" style="'+(!approved?"background:#f4e0e8;color:#982d63":"")+'">'+(approved?"✓":"◷")+'</div><span class="sd-eyebrow">RESULTADO SIMULADO</span><h3 class="sd-h1">'+(approved?'¡Ya tenés acceso!':'Recibimos tu solicitud.')+'</h3><p class="sd-p">'+(approved?'Un pago elegible aprobado por Mercado Pago habilitaría automáticamente el curso. Ya podés explorar cómo se vería «Mis programas».':'Una transferencia directa no se habilita automáticamente: Lorena debe confirmar la acreditación antes de dar acceso al curso.')+'</p>'+fakeBtn(approved?"account":"catalog",approved?"Ir a Mis programas ↗":"Volver a programas")+'</div>';
}
function signupView(){
 return '<div class="sd-login"><span class="sd-eyebrow">CREAR MI CUENTA · DEMOSTRACIÓN</span><h3 class="sd-h1">Tu espacio<br><em>empieza acá.</em></h3><p class="sd-p">En la plataforma real el registro se vinculará a la compra y a los programas adquiridos.</p><div class="sd-panel"><h3>Crear una cuenta</h3><div class="sd-field"><label>Nombre y apellido</label><div class="sd-faux-input">María Ejemplo</div></div><div class="sd-field"><label>Correo electrónico</label><div class="sd-faux-input">alumna@ejemplo.com</div></div><div class="sd-field"><label>Contraseña</label><div class="sd-faux-input">•••••••• · datos ficticios</div></div><p class="sd-p" style="font-size:10px">Esta maqueta no acepta datos personales ni crea cuentas auténticas.</p>'+fakeBtn("login","Continuar al ingreso ↗")+'</div></div>';
}
function loginView(){
 return '<div class="sd-login"><span class="sd-eyebrow">TU ESPACIO PERSONAL</span><h3 class="sd-h1">Volvé a<br><em>moverte.</em></h3><p class="sd-p">En la web final las alumnas ingresarán con una cuenta. Para explorar esta propuesta, no hace falta usar un correo ni una contraseña real.</p><div class="sd-panel"><h3>Ingresá a tu espacio</h3><div class="sd-field"><label>Correo de ejemplo</label><div class="sd-faux-input">alumna@ejemplo.com</div></div><div class="sd-field"><label>Contraseña</label><div class="sd-faux-input">•••••••• (demostración)</div></div>'+fakeBtn("account","Entrar con una alumna ficticia ↗")+'<p class="sd-p" style="font-size:10px;margin-top:15px">Ningún dato se envía ni se almacena.</p></div></div>';
}
function accountView(){
 const ids=[...demoBought];
 return '<div class="sd-container"><div class="sd-account-head"><div><span class="sd-eyebrow">MI CUENTA · PERFIL DE DEMOSTRACIÓN</span><h3 class="sd-h1">Tus programas,<br><em>siempre a mano.</em></h3><p class="sd-p">Elegí uno de tus entrenamientos y retomá donde lo dejaste.</p></div><button type="button" class="sd-btn secondary" data-action="catalog">+ Ver más programas</button></div><div class="sd-my-programs">'+ids.map(i=>'<div class="sd-account-card"><img src="'+sitePhotos[i]+'" alt="Programa de ejemplo"><div><small>INSCRIPCIÓN DE DEMOSTRACIÓN</small><strong>'+esc(sitePrograms[i].name)+'</strong><div class="sd-mini-progress"><i style="width:'+((i===selectedProgram?completedDays.size:0)/7*100)+'%"></i></div><button type="button" data-resume="'+i+'">Continuar entrenamiento ↗</button></div></div>').join("")+'</div><p class="sd-p" style="margin-top:22px;font-size:11px">La alumna también podrá consultar sus compras y acceder a los materiales de cada programa.</p></div>';
}
const sampleDays=["Activación y movilidad","Fuerza de piernas","Movilidad y respiración","Tren superior","Hábitos en movimiento","Fuerza combinada","Cierre de semana"];
function lessonView(){
 const p=sitePrograms[selectedProgram];
 return '<div class="sd-container"><span class="sd-eyebrow">MI PROGRAMA · '+esc(p.name.toUpperCase())+'</span><h3 class="sd-h1">Un día.<br><em>Un entrenamiento.</em></h3><div class="sd-lessons-layout"><div><div class="sd-lesson-video"><img src="https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=900&q=80" alt="Pantalla de entrenamiento ilustrativa"><button data-action="play" type="button" aria-label="Simular reproducción de video">▶</button></div><h3 class="sd-h2" style="margin:20px 0 10px">Día '+String(demoDay+1).padStart(2,"0")+' · '+esc(sampleDays[demoDay])+'</h3><p class="sd-p">Rutina guiada en video con instrucciones y recursos que Lorena podrá incorporar a cada sesión.</p><div class="sd-lesson-actions">'+fakeBtn("completed",completedDays.has(demoDay)?"Desmarcar completada ↺":"Marcar como completada ✓")+fakeBtn("pdf","Consultar guía PDF",true)+'</div><p class="sd-p" style="font-size:10px;margin-top:20px">Los retos grupales podrán incluir un botón de acceso a su grupo de WhatsApp, según la edición contratada.</p></div><aside class="sd-lesson-list"><span class="sd-eyebrow">SEMANA 01 · TU RECORRIDO</span><p class="sd-p">'+completedDays.size+' de 7 lecciones completadas en esta demostración</p><div class="sd-mini-progress"><i style="width:'+(completedDays.size/7*100)+'%"></i></div>'+sampleDays.map((d,i)=>'<button class="'+(demoDay===i?"active":"")+'" type="button" data-day="'+i+'"><span>Día '+String(i+1).padStart(2,"0")+' · '+esc(d)+'</span><span>'+(completedDays.has(i)?"✓":"→")+'</span></button>').join("")+'<p class="sd-p" style="font-size:10px;margin:15px 0">Los días se presentan en orden, sin bloqueo automático por fecha.</p></aside></div></div>';
}
function methodView(){return '<div class="sd-container"><div class="sd-system-method"><div class="sd-method-photo" role="img" aria-label="Fotografía ilustrativa de entrenamiento"></div><div><span class="sd-eyebrow">CONOCÉ EL ENFOQUE DE LORENA</span><h3 class="sd-h1">Fuerza.<br><em>Movimiento.</em><br>Hábitos.</h3><p class="sd-p">Una forma de organizar los programas para que cada mujer conozca su objetivo, vea qué necesita y sepa qué sesión sigue. La propuesta se apoya en la experiencia de Lorena y su público de mujeres +40.</p><div class="sd-method-values"><div>01 · Programas con propósito claro</div><div>02 · Entrenamientos organizados</div><div>03 · Acompañamiento si corresponde</div></div>'+fakeBtn("catalog","Explorar los programas ↗")+'</div></div></div>'}
function supplementView(){return '<div class="sd-container"><div class="sd-supplements"><div aria-label="Visual editorial ilustrativo de suplementación"></div><div><span class="sd-eyebrow">BIENESTAR Y RECOMENDACIONES</span><h3 class="sd-h1">Todo lo que<br><em>acompaña tu rutina.</em></h3><p class="sd-p">Además de sus entrenamientos, Lorena podrá presentar las categorías de suplementación que comercializa, como colágeno y tecnología de salud, con información y enlaces hacia la tienda de su proveedor.</p><div class="sd-tagrow"><span class="sd-tag">Colágeno</span><span class="sd-tag">Productos relacionados</span><span class="sd-tag">Enlaces externos</span></div><p class="sd-p">La compra del suplemento se realiza fuera de esta web. No forma parte del carrito de cursos.</p>'+fakeBtn("catalog","Volver a los programas ↗",true)+'</div></div></div>'}
function renderSite(screen,{preserveScroll=false}={}){
 demoScreen=screen;
 const views={home:homeView,catalog:catalogView,detail:detailView,checkout:checkoutView,result:resultView,login:loginView,account:accountView,signup:signupView,lesson:lessonView,method:methodView,supplements:supplementView};
 root.innerHTML=(views[screen]||homeView)();
 $$('[data-screen]').forEach(btn=>{const active=btn.dataset.screen===screen;btn.classList.toggle("active",active);if(btn.matches(".showroom-guide button"))btn.setAttribute("aria-current",active?"step":"false")});
 if(!preserveScroll)window.setTimeout(()=>{const box=$("#sitio");if(box&&box.getBoundingClientRect().top<-60)box.scrollIntoView({behavior:behavior(),block:"start"})},10);
}
document.addEventListener("click",e=>{
 const target=e.target.closest("[data-screen],[data-action],[data-program-demo],[data-demo-filter],[data-pay],[data-day],[data-resume]");
 if(!target||!target.closest(".showroom"))return;
 if(target.dataset.screen){renderSite(target.dataset.screen);return}
 if(target.dataset.programDemo!==undefined){selectedProgram=+target.dataset.programDemo;renderSite("detail");return}
 if(target.dataset.demoFilter){demoFilter=target.dataset.demoFilter;renderSite("catalog",{preserveScroll:true});return}
 if(target.dataset.pay){demoPay=target.dataset.pay;renderSite("checkout",{preserveScroll:true});return}
 if(target.dataset.day!==undefined){demoDay=+target.dataset.day;renderSite("lesson",{preserveScroll:true});return}
 if(target.dataset.resume!==undefined){selectedProgram=+target.dataset.resume;renderSite("lesson");return}
 if(target.dataset.action){
  const a=target.dataset.action;
  if(["home","catalog","detail","checkout","account","lesson","login","signup","method","supplements"].includes(a)){renderSite(a);return}
  if(a==="finish"){demoResult=demoPay==="mp"?"approved":"pending";if(demoResult==="approved")demoBought.add(selectedProgram);renderSite("result");return}
  if(a==="play"){notify("El reproductor funcionará con el proveedor elegido; esta es una demostración.");return}
  if(a==="pdf"){notify("Las guías PDF se vincularán a cada lección en la web definitiva.");return}
  if(a==="completed"){if(completedDays.has(demoDay))completedDays.delete(demoDay);else completedDays.add(demoDay);renderSite("lesson",{preserveScroll:true});notify("Progreso actualizado en la demostración.");return}
 }
});
renderSite("home",{preserveScroll:true});

/* Admin dashboard concept — no real data */
const admin=$("#adminContent");
const adminState={programas:[["Reto 21 días","Programa de ejemplo"],["Fuerza +40","Programa de ejemplo"],["Reset de septiembre","Campaña de ejemplo"]],lecciones:[["Semana 01 · Día 01","Video"],["Semana 01 · Día 02","Video"],["Guía de hábitos","PDF"]],ventas:[["Compra por Mercado Pago","Acceso habilitado"],["Transferencia directa","Verificación manual"]],promociones:[["Campaña Mes de la Madre","Oferta configurable"],["Reset de septiembre","Cupón o precio especial"]]};
let adminTab="programas";
const adminTitles={programas:"Mis programas",lecciones:"Lecciones y contenidos",ventas:"Pedidos e inscripciones",promociones:"Campañas y promociones"};
const adminActions={programas:"Crear programa de ejemplo",lecciones:"Agregar contenido de ejemplo",ventas:"Simular recorrido de compra",promociones:"Crear promoción de ejemplo"};
function renderAdmin(){admin.innerHTML="";const top=document.createElement("div");top.className="overline";top.textContent="VISTA CONCEPTUAL DE ADMINISTRACIÓN";const heading=document.createElement("h3");heading.textContent=adminTitles[adminTab];admin.append(top,heading);adminState[adminTab].forEach(([a,b])=>{const row=document.createElement("div");row.className="dash-row";const l=document.createElement("span");l.textContent=a;const r=document.createElement("span");r.textContent=b;row.append(l,r);admin.appendChild(row)});const action=document.createElement("button");action.className="dash-btn";action.type="button";action.textContent="+ "+adminActions[adminTab];admin.appendChild(action);action.addEventListener("click",()=>{if(adminTab==="ventas"){renderSite("checkout");$("#sitio").scrollIntoView({behavior:behavior()});return}const labels={programas:"Nombre del nuevo programa de ejemplo",lecciones:"Nombre de la nueva lección de ejemplo",promociones:"Nombre de la campaña de ejemplo"};const value=window.prompt(labels[adminTab],"Nuevo contenido");if(value&&value.trim()){adminState[adminTab].push([value.trim().slice(0,65),"Agregado en demo"]);renderAdmin();notify("Agregado únicamente a esta demostración")}});$$("[data-admin]").forEach(b=>{const active=b.dataset.admin===adminTab;b.classList.toggle("active",active);b.setAttribute("aria-pressed",String(active))})}
$$("[data-admin]").forEach(b=>b.addEventListener("click",()=>{adminTab=b.dataset.admin;renderAdmin()}));renderAdmin();
/* Video hosting choices & bounded cost estimate */
let media="youtube",students=30,hours=7,storage=20;
const providers={
 youtube:{name:"YouTube no listado",desc:"Lorena puede subir sus videos a su canal y mostrarlos dentro de las lecciones sin pagar por almacenamiento ni reproducciones.",facts:["Sin cargo directo por subir o reproducir videos.","Es compatible con reproductores insertados en las lecciones.","Un enlace no listado se puede reenviar a cualquier persona.","Los videos largos requieren funciones intermedias habilitadas; las políticas de uso comercial deben respetarse."],notice:"No equivale a almacenamiento privado de clases pagas. Es una alternativa para evaluar de acuerdo con la forma de comercialización de los contenidos."},
 drive:{name:"Google Drive",desc:"Los videos y PDFs se guardan en Drive y pueden insertarse en las lecciones de Tutor LMS.",facts:["Puede utilizar el espacio disponible en su cuenta.","Es sencillo para organizar los archivos originales y guías.","Compartir por enlace no garantiza privacidad.","Los permisos, las cookies y el uso intensivo pueden limitar reproducciones."],notice:"Recomendable como repositorio de archivos y alternativa experimental de reproducción; requiere una prueba real con las alumnas previstas."},
 bunny:{name:"Bunny Stream · modalidad Volume",desc:"Un servicio audiovisual especializado, con reproductor adaptable y precio en función del almacenamiento y las visualizaciones.",facts:["Los videos se reproducen dentro de la misma web.","Es posible configurar restricciones de acceso más específicas.","Se cobra por almacenamiento y transferencia, con un mínimo mensual.","Conviene probar el desempeño desde Argentina antes de elegir Volume."],notice:"Cálculo orientativo; no es una oferta del proveedor ni sustituye una cotización. La calidad, región, impuestos y tráfico real pueden cambiar el costo."}
};
function renderMedia(){const d=providers[media];const box=$("#mediaInfo");box.innerHTML="";const left=document.createElement("div");left.innerHTML='<span class="overline">QUÉ IMPLICA ESTA OPCIÓN</span><h3></h3><p></p><ul></ul><div class="media-notice"></div>';left.querySelector("h3").textContent=d.name;left.querySelector("p").textContent=d.desc;d.facts.forEach(f=>{const li=document.createElement("li");li.textContent=f;left.querySelector("ul").appendChild(li)});left.querySelector(".media-notice").textContent=d.notice;box.appendChild(left);const right=document.createElement("div");right.className="media-calc";if(media!=="bunny"){right.innerHTML='<strong>Costo audiovisual directo de esta opción</strong><div class="calc-result"></div><p class="fineprint"></p>';right.querySelector(".calc-result").textContent=media==="youtube"?"Sin abono":"Según espacio";right.querySelector(".fineprint").textContent=media==="youtube"?"YouTube no cobra por subir o reproducir videos. No resuelve las restricciones de privacidad y uso comercial.":"La cuenta puede ser gratuita dentro de la cuota disponible; planes pagos según almacenamiento contratado. La distribución comercial no está garantizada.";box.appendChild(right)}else{right.innerHTML='<strong>Calculá un escenario de uso mensual</strong><label>Alumnas activas <b id="cStudents"></b><input id="cStudentsInput" type="range" min="1" max="200" step="1"></label><label>Horas vistas por alumna <b id="cHours"></b><input id="cHoursInput" type="range" min="1" max="20" step="1"></label><label>GB almacenados <b id="cStorage"></b><input id="cStorageInput" type="range" min="5" max="100" step="5"></label><div class="calc-result" id="videoCost"></div><p class="fineprint">Simulación: 1 GB reproducido por hora, USD 0,005/GB de distribución Volume + USD 0,01/GB almacenado, mínimo USD 1/mes. Sin impuestos.</p>';box.appendChild(right);const a=$("#cStudentsInput"),b=$("#cHoursInput"),c=$("#cStorageInput");a.value=students;b.value=hours;c.value=storage;function calc(){students=+a.value;hours=+b.value;storage=+c.value;$("#cStudents").textContent=students;$("#cHours").textContent=hours+" h";$("#cStorage").textContent=storage+" GB";const amount=Math.max(1,students*hours*.005+storage*.01);$("#videoCost").textContent="USD "+amount.toFixed(2)+"/mes"}[a,b,c].forEach(x=>x.addEventListener("input",calc));calc()}$$("[data-provider]").forEach(b=>{const active=b.dataset.provider===media;b.classList.toggle("active",active);b.setAttribute("aria-pressed",String(active))})}
$$("[data-provider]").forEach(btn=>btn.addEventListener("click",()=>{media=btn.dataset.provider;renderMedia()}));renderMedia();
/* CTA: no unverified address or phone is assumed */
$("#copyMessage").addEventListener("click",async()=>{const msg="Hola, equipo NeuroTech. Quiero avanzar con la propuesta de Lorena Fit para la plataforma de programas de entrenamiento. ¿Podemos coordinar los próximos pasos?";try{if(navigator.clipboard&&window.isSecureContext){await navigator.clipboard.writeText(msg);notify("Mensaje copiado. Podés pegarlo en WhatsApp o correo.");return}}catch(e){}window.prompt("Copiá este mensaje para contactar a NeuroTech:",msg)});
})();
