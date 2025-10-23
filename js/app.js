/* app.js - comportamentos gerais */
document.addEventListener('DOMContentLoaded', function(){
  // apply masks
  if(window.applyMasks) applyMasks();

  // set year in footers
  var years = document.querySelectorAll('#year, #year2, #year3');
  years.forEach(function(el){ if(el) el.textContent = new Date().getFullYear(); });

  // mobile menu toggle
  var btn = document.getElementById('btn-mobile-menu');
  var menu = document.getElementById('menu-list');
  if(btn && menu){
    btn.addEventListener('click', function(){
      var open = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', !open);
      menu.classList.toggle('open');
    });
  }

  // form handling with native validation plus custom checks
  var form = document.getElementById('form-cadastro');
  if(form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      var messages = document.getElementById('form-messages');
      messages.textContent = '';

      // HTML5 validity
      if(!form.checkValidity()){
        form.reportValidity();
        messages.textContent = 'Por favor, corrija os campos em destaque.';
        messages.className = 'error';
        return;
      }

      // custom CPF validation
      var cpfEl = document.getElementById('cpf');
      if(cpfEl && !validators.cpfIsValid(cpfEl.value)){
        messages.textContent = 'CPF inválido.';
        messages.className = 'error';
        cpfEl.focus();
        return;
      }

      // tudo ok - salvar no localStorage (simulação)
      var data = new FormData(form);
      var obj = {};
      data.forEach((v,k)=> obj[k]=v);
      var list = JSON.parse(localStorage.getItem('cadastros')||'[]');
      list.push(obj);
      localStorage.setItem('cadastros', JSON.stringify(list, null, 2));

      messages.textContent = 'Cadastro enviado com sucesso! Agradecemos seu apoio.';
      messages.className = 'success';
      form.reset();
    });
  }

  // optional: load saved cadastros to console for dev
  if(window.location.pathname.endsWith('cadastro.html')){
    try {
      console.log('Cadastros salvos:', JSON.parse(localStorage.getItem('cadastros')||'[]'));
    } catch(e){}
  }
});