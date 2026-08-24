const menuBtn=document.getElementById("menuBtn"),nav=document.getElementById("navMenu");
menuBtn?.addEventListener("click",()=>{const open=nav.classList.toggle("open");menuBtn.setAttribute("aria-expanded",open)});
document.querySelectorAll("#navMenu a").forEach(a=>a.addEventListener("click",()=>{nav.classList.remove("open");menuBtn.setAttribute("aria-expanded","false")}));

const lightbox=document.getElementById("lightbox"),lightImg=document.getElementById("lightboxImg");
document.querySelectorAll(".gallery-card").forEach(item=>{
  item.addEventListener("click",()=>{
    lightImg.src=item.dataset.img;
    lightImg.alt=item.dataset.alt||"Clinic image";
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden","false");
    document.body.style.overflow="hidden";
  });
});
function closeLightbox(){
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden","true");
  lightImg.src="";
  document.body.style.overflow="";
}
document.getElementById("closeLightbox")?.addEventListener("click",closeLightbox);
lightbox?.addEventListener("click",e=>{if(e.target===lightbox)closeLightbox()});
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeLightbox()});

/* ===== FINAL CAROUSEL BEHAVIOUR ===== */
(function(){
  const gallery=document.querySelector(".gallery-v2");
  const galleryNext=document.querySelector(".gallery-next");
  const galleryPrev=document.querySelector(".gallery-prev");
  if(gallery){
    const moveGallery=(dir)=>{
      const card=gallery.querySelector(".gallery-card");
      if(!card)return;
      gallery.scrollBy({left:dir*(card.getBoundingClientRect().width+16),behavior:"smooth"});
    };
    galleryNext?.addEventListener("click",()=>moveGallery(1));
    galleryPrev?.addEventListener("click",()=>moveGallery(-1));

    let galleryTimer=setInterval(()=>moveGallery(1),4200);
    gallery.addEventListener("mouseenter",()=>clearInterval(galleryTimer));
    gallery.addEventListener("mouseleave",()=>galleryTimer=setInterval(()=>moveGallery(1),4200));
    gallery.addEventListener("touchstart",()=>clearInterval(galleryTimer),{passive:true});
    gallery.addEventListener("touchend",()=>galleryTimer=setInterval(()=>moveGallery(1),4200),{passive:true});
  }

  const reviews=document.querySelector(".review-grid");
  const dots=[...document.querySelectorAll(".review-dots span")];
  if(reviews && dots.length){
    const updateDots=()=>{
      const index=Math.round(reviews.scrollLeft/reviews.clientWidth);
      dots.forEach((dot,i)=>dot.classList.toggle("active",i===Math.min(index,dots.length-1)));
    };
    reviews.addEventListener("scroll",updateDots,{passive:true});
  }
})();

/* ===== STICKY NAVBAR + SCROLL DIRECTION EFFECT ===== */
(function(){
  const header=document.querySelector(".header");
  if(!header)return;
  let lastY=window.scrollY||0,ticking=false;
  function update(){
    const y=window.scrollY||0;
    header.classList.toggle("nav-scrolled",y>20);
    header.classList.remove("scroll-up","scroll-down");
    if(y>lastY+2)header.classList.add("scroll-down");
    else if(y<lastY-2)header.classList.add("scroll-up");
    lastY=y;ticking=false;
  }
  window.addEventListener("scroll",()=>{if(!ticking){requestAnimationFrame(update);ticking=true;}},{passive:true});
  update();
})();

/* ===== GUARANTEED FIXED NAVBAR HEIGHT ===== */
(function(){
  const header=document.querySelector(".header");
  if(!header)return;
  function setHeaderHeight(){
    document.body.style.paddingTop=header.getBoundingClientRect().height+"px";
  }
  setHeaderHeight();
  window.addEventListener("resize",setHeaderHeight,{passive:true});
  if(document.fonts&&document.fonts.ready)document.fonts.ready.then(setHeaderHeight);
})();
