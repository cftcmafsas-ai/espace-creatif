(function(){
  "use strict";
  var MUSIC_URL="https://mon-espace-musique.rodolphetorres.workers.dev/";
  function ready(fn){if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",fn,{once:true});else fn();}
  ready(function(){

    var widgetStyle=document.createElement("style");
    widgetStyle.id="bleu-pro-music-widget-style";
    widgetStyle.textContent=`
      .bp-brand-lockup{display:flex;align-items:center;gap:10px;flex:none;color:var(--site-text,#315575);text-decoration:none;font-weight:750;letter-spacing:.025em}
      .bp-brand-logo{width:100%!important;height:100%!important;max-width:150px!important;max-height:128px!important;object-fit:contain;border-radius:0!important;filter:drop-shadow(0 3px 6px rgba(48,91,127,.12))}
      .bp-brand-name{font-size:clamp(16px,2vw,20px);white-space:nowrap;color:var(--site-text,#315575)}
      nav a[data-music-open]{white-space:nowrap}
      .music-float{position:fixed!important;right:20px!important;bottom:18px!important;top:auto!important;z-index:10010!important;display:grid!important;place-items:center!important;width:54px!important;height:54px!important;padding:0!important;border:1px solid var(--site-border,#c8deef)!important;border-radius:50%!important;background:linear-gradient(135deg,var(--site-soft,#e5f2fb),var(--site-accent,#c6e1f3))!important;color:var(--site-text,#315575)!important;font-size:27px!important;line-height:1!important;box-shadow:0 10px 28px rgba(48,91,127,.18)!important;cursor:pointer!important}
      .music-float{background:linear-gradient(135deg,var(--site-soft,#e5f2fb),var(--site-accent,#c6e1f3))!important;color:var(--site-text,#315575)!important;border:1px solid var(--site-border,#c8deef)!important}
      .music-float:hover{transform:translateY(-2px);filter:brightness(1.05)}
      .music-modal[hidden]{display:none!important}
      .music-modal{position:fixed!important;inset:0!important;z-index:10020!important;display:grid!important;place-items:center!important;padding:14px!important}
      .music-backdrop{position:absolute!important;inset:0!important;width:100%!important;height:100%!important;border:0!important;border-radius:0!important;background:rgba(35,67,100,.5)!important;backdrop-filter:blur(3px);cursor:pointer}
      .music-modal-card{position:relative!important;z-index:2!important;width:min(650px,100%)!important;max-height:92dvh!important;overflow:auto!important;padding:0!important;border:1px solid var(--site-border,#cfe3f3)!important;border-radius:24px!important;background:linear-gradient(145deg,var(--site-card,#fff),var(--site-soft,#e2f0fb))!important;color:var(--site-text,#315575)!important;box-shadow:0 20px 60px rgba(20,77,142,.3)!important}
      .music-modal-head{display:flex!important;align-items:center!important;justify-content:space-between!important;gap:12px!important;padding:14px 18px!important;background:linear-gradient(90deg,var(--site-soft,#dceefa),var(--site-card,#fff))!important;border-bottom:1px solid var(--site-border,#c6e2fb)!important}
      .music-modal-head h2{margin:0!important;color:var(--site-text,#315575)!important;font:700 clamp(1.4rem,4vw,2rem)/1.2 Georgia,serif!important}
      .music-modal-head h2 span{margin-right:8px;color:var(--site-accent,#4f9bd0)}
      .music-close{display:grid!important;place-items:center!important;flex:0 0 42px!important;width:42px!important;height:42px!important;padding:0!important;border:0!important;border-radius:50%!important;background:var(--site-accent,#8fc7eb)!important;color:#fff!important;font-size:30px!important;line-height:1!important;cursor:pointer!important}
      .music-modal-subtitle{text-align:center;margin:14px 18px;color:var(--site-muted,#718da5);font:italic 1.2rem Georgia,serif}
      .music-popup-intro{display:grid;grid-template-columns:150px 1fr;gap:20px;align-items:center;margin:14px 18px;padding:12px;background:var(--site-card,#fff);border:1px solid var(--site-border,#d2e5f5);border-radius:16px}
      .music-popup-intro img{display:block;width:150px;height:150px;object-fit:cover;border-radius:10px}
      .music-popup-intro p{margin:0;padding:12px;color:var(--site-text,#315575);text-align:center;font:italic 500 clamp(1.15rem,3vw,1.8rem)/1.3 Georgia,serif}
      .music-popup-intro small{font-size:.82em;color:var(--site-muted,#718da5)}
      .music-modal-slogan{margin:14px 20px 0;padding:12px 0;border-top:1px solid var(--site-border,#c6e2f5);border-bottom:1px solid var(--site-border,#c6e2f5);color:var(--site-text,#315575);text-align:center;font:italic 500 1.2rem Georgia,serif}
      .music-modal-slogan span{display:block;margin-top:5px;color:var(--site-accent,#4f9bd0);font-size:1.6rem}
      .music-modal-footer{display:flex;justify-content:center;padding:16px}
      .music-modal-link{display:inline-block;padding:11px 24px;border:1px solid var(--site-border,#b3d8f2);border-radius:999px;background:linear-gradient(135deg,var(--site-soft,#dceefa),var(--site-accent,#9fc9e9));color:var(--site-text,#315575);font-weight:650;text-decoration:none}
      .music-modal-link:hover{filter:brightness(.98)}
      body.music-modal-open{overflow:hidden}
      @media(max-width:760px){.bp-brand-logo{height:78px!important;max-width:78px!important}.music-float{right:14px!important;bottom:16px!important;width:50px!important;height:50px!important}.music-modal{padding:8px!important}.music-modal-card{max-height:94dvh!important;border-radius:18px!important}.music-popup-intro{grid-template-columns:94px 1fr;gap:8px;margin:10px;padding:8px}.music-popup-intro img{width:94px;height:94px}.music-popup-intro p{font-size:1.1rem;padding:6px}.music-modal-slogan{font-size:1.05rem;margin:10px 12px 0}}
    `;
    document.head.appendChild(widgetStyle);

    var header=document.querySelector(".brand-header")||document.querySelector("body>header");
    var logo=header&&header.querySelector("a img");
    if(logo){
      logo.alt="Logo R — Rodolphe Torres Tirado";
      logo.classList.add("bp-brand-logo");
      /* Le logo fourni dans les fichiers BLEU PRO est conservé tel quel. */
    }

    var opener=document.createElement("button");
    opener.type="button";opener.className="music-float";opener.textContent="♫";
    opener.setAttribute("aria-label","Ouvrir Mon Espace Musique");
    opener.setAttribute("aria-haspopup","dialog");opener.setAttribute("aria-controls","music-modal");opener.setAttribute("aria-expanded","false");
    document.body.appendChild(opener);

    var modal=document.createElement("div");
    modal.id="music-modal";modal.className="music-modal";modal.hidden=true;
    modal.setAttribute("role","dialog");modal.setAttribute("aria-modal","true");modal.setAttribute("aria-labelledby","music-modal-title");
    modal.innerHTML='<button class="music-backdrop" type="button" data-music-close aria-label="Fermer la fenêtre musicale"></button><section class="music-modal-card"><header class="music-modal-head"><h2 id="music-modal-title"><span aria-hidden="true">♫</span> Mon Espace Musique</h2><button class="music-close" type="button" data-music-close aria-label="Fermer">×</button></header><p class="music-modal-subtitle">Écoutez et découvrez ma musique</p><div class="music-popup-intro"><img alt="Illustration de l’univers musical de Rodolphe"><p>Rodolphe Torres Tirado<br><small>Mes créations musicales</small></p></div><div class="music-modal-slogan">Retrouvez mon univers musical<span>♫</span></div><div class="music-modal-footer"><a class="music-modal-link" href="'+MUSIC_URL+'" target="_blank" rel="noopener noreferrer">Accéder à ma playlist ↗</a></div></section>';
    document.body.appendChild(modal);
    var album=modal.querySelector(".music-popup-intro img");
    fetch("./assets/reference-album.b64").then(function(r){if(!r.ok)throw new Error("album");return r.text();})
      .then(function(data){album.src="data:image/webp;base64,"+data.trim();}).catch(function(){});

    var openers=[opener].concat(Array.prototype.slice.call(document.querySelectorAll("[data-music-open]")));
    var lastFocus=null;
    function open(){lastFocus=document.activeElement;modal.hidden=false;document.body.classList.add("music-modal-open");openers.forEach(function(el){el.setAttribute("aria-expanded","true");});modal.querySelector(".music-close").focus();}
    function close(){modal.hidden=true;document.body.classList.remove("music-modal-open");openers.forEach(function(el){el.setAttribute("aria-expanded","false");});if(lastFocus&&lastFocus.focus)lastFocus.focus();}
    openers.forEach(function(el){el.addEventListener("click",function(e){e.preventDefault();open();});});
    modal.querySelectorAll("[data-music-close]").forEach(function(el){el.addEventListener("click",close);});
    document.addEventListener("keydown",function(e){if(!modal.hidden&&e.key==="Escape")close();});
  });
})();