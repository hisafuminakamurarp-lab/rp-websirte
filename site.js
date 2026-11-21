/* ROCK PTARMIGAN — shared behaviour (header state, menu, mobile CTA) */
(function(){
  var header=document.querySelector('header');
  var nav=document.querySelector('header nav');
  var btn=document.querySelector('.menu-btn');

  // header: solid background after scrolling
  function onScroll(){
    if(header) header.classList.toggle('scrolled',window.scrollY>40);
    if(cta) cta.classList.toggle('show',window.scrollY>window.innerHeight*0.6);
  }

  // menu: label, aria state, scroll lock (inline onclick toggles .open first)
  function syncMenu(){
    if(!nav||!btn) return;
    var open=nav.classList.contains('open');
    btn.textContent=open?'CLOSE':'MENU';
    btn.setAttribute('aria-expanded',open?'true':'false');
    document.body.classList.toggle('nav-lock',open);
  }
  if(btn&&nav){
    btn.setAttribute('aria-label','メニューを開閉');
    btn.setAttribute('aria-expanded','false');
    btn.addEventListener('click',syncMenu);
    nav.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){setTimeout(syncMenu,0)})});
    document.addEventListener('keydown',function(e){
      if(e.key==='Escape'&&nav.classList.contains('open')){nav.classList.remove('open');syncMenu();btn.focus()}
    });
  }

  // mobile sticky CTA (not on the contact page itself)
  var cta=null;
  if(!document.getElementById('form-body')){
    cta=document.createElement('div');
    cta.className='m-cta';
    cta.innerHTML='<a class="primary" href="contact.html">無料相談を申し込む →</a><a href="tel:0367668441">電話する</a>';
    document.body.appendChild(cta);
  }

  window.addEventListener('scroll',onScroll,{passive:true});
  onScroll();
})();
