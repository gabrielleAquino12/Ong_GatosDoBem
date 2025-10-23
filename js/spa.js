// spa.js (simplificado)
(function(){
  const routes = {
    '': () => fetch('partials/home.html').then(r => r.text()),
    '#projetos': () => fetch('partials/projetos.html').then(r => r.text()),
    '#cadastro': () => fetch('partials/cadastro.html').then(r => r.text()),
  };

  function load(){
    const hash = location.hash;
    const loader = routes[hash] || routes[''];
    loader().then(html => {
      document.querySelector('main').innerHTML = html;
      // re-apply masks and JS after injecting content:
      if(window.applyMasks) applyMasks();
    });
  }

  window.addEventListener('hashchange', load);
  window.addEventListener('DOMContentLoaded', load);
})();