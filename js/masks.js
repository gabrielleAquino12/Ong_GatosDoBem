/* masks.js - máscaras simples sem libs */
(function(){
  function setCursorPos(pos, el){
    el.setSelectionRange(pos,pos);
  }

  function mask(o, f){
    setTimeout(function(){
      var v = f(o.value);
      o.value = v;
    }, 1);
  }

  function cpfMask(v){
    v = v.replace(/\D/g,'').slice(0,11);
    v = v.replace(/(\d{3})(\d)/,'$1.$2');
    v = v.replace(/(\d{3})(\d)/,'$1.$2');
    v = v.replace(/(\d{3})(\d{1,2})$/,'$1-$2');
    return v;
  }

  function telMask(v){
    v = v.replace(/\D/g,'').slice(0,11);
    if(v.length <= 10){
      v = v.replace(/(\d{2})(\d{4})(\d{0,4})/,'($1) $2-$3');
    } else {
      v = v.replace(/(\d{2})(\d{5})(\d{0,4})/,'($1) $2-$3');
    }
    return v;
  }

  function cepMask(v){
    v = v.replace(/\D/g,'').slice(0,8);
    v = v.replace(/(\d{5})(\d{1,3})/,'$1-$2');
    return v;
  }

  window.applyMasks = function(){
    var cpf = document.getElementById('cpf');
    var tel = document.getElementById('telefone');
    var cep = document.getElementById('cep');
    if(cpf) cpf.addEventListener('input', function(){ this.value = cpfMask(this.value); });
    if(tel) tel.addEventListener('input', function(){ this.value = telMask(this.value); });
    if(cep) cep.addEventListener('input', function(){ this.value = cepMask(this.value); });
  };

  // export small validators
  window.validators = {
    cpfIsValid: function(cpfStr){
      var s = cpfStr.replace(/\D/g,'');
      if(s.length !== 11 || /^(\d)\1+$/.test(s)) return false;
      var calc = function(t){
        var sum = 0;
        for(var i=0;i<t;i++) sum += parseInt(s[i]) * ((t+1)-i);
        var res = (sum * 10) % 11;
        return (res === 10) ? 0 : res;
      };
      return calc(9) === parseInt(s[9]) && calc(10) === parseInt(s[10]);
    }
  };

})();