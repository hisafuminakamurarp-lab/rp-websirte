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
    var isRecruit=!!document.getElementById('position');
    cta.innerHTML=isRecruit
      ? '<a class="primary" href="contact.html?type=recruit">エントリーする →</a><a href="tel:0367668441">電話で問い合わせ</a>'
      : '<a class="primary" href="contact.html">無料相談を申し込む →</a><a href="tel:0367668441">電話する</a>';
    document.body.appendChild(cta);
  }


  // five-capital tabs (recruit page)
  document.querySelectorAll('.ct').forEach(function(box){
    var tabs=[].slice.call(box.querySelectorAll('.ct-tab'));
    function select(t,focus){
      tabs.forEach(function(x){
        var on=x===t;
        x.setAttribute('aria-selected',on?'true':'false');
        x.tabIndex=on?0:-1;
        var p=document.getElementById(x.getAttribute('aria-controls'));
        if(p) p.hidden=!on;
      });
      if(focus) t.focus();
    }
    tabs.forEach(function(t,i){
      t.addEventListener('click',function(){select(t)});
      t.addEventListener('keydown',function(e){
        if(e.key==='ArrowRight'||e.key==='ArrowDown'){e.preventDefault();select(tabs[(i+1)%tabs.length],true)}
        if(e.key==='ArrowLeft'||e.key==='ArrowUp'){e.preventDefault();select(tabs[(i-1+tabs.length)%tabs.length],true)}
      });
    });
  });

  window.addEventListener('scroll',onScroll,{passive:true});
  onScroll();

  // deep links (service.html#job-change etc.): align after web fonts settle the layout
  if(location.hash.length>1){
    var target=document.getElementById(decodeURIComponent(location.hash.slice(1)));
    if(target){
      var ready=(document.fonts&&document.fonts.ready)?document.fonts.ready:Promise.resolve();
      ready.then(function(){requestAnimationFrame(function(){target.scrollIntoView({behavior:'instant',block:'start'})})});
    }
  }
})();
