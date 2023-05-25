let cuentas = [
    { nombre: "Mali", saldo: 200, numcuenta: 12345, contrasena: "3acda7e8c913e5d8958e2399afb470fe"},
    { nombre: "Gera", saldo: 290, numcuenta: 23456, contrasena: "b16972e4dd0505e7f213e109d8433634"},
    { nombre: "Maui", saldo: 67 , numcuenta: 34567, contrasena: "7b41a372b6588179e4730be2061a9e6e"}
  ];
  
let arreglousuario = "";

  function autenticarse(){
    let cuenta = document.getElementById("cuenta").value; 
    let contrasena = document.getElementById("contrasena").value; 

    if (cuenta != ""){
      if (contrasena != ""){
        if(validarusuario(cuenta,contrasena)){
          alert("Autenticacion Exitosa");
          mostraropcionescuentavalidada();
        }
        else{
          alert("Cuenta y contrasena erronea");
        }
      }
      else{
        alert("Debe introducir una contrasena");
        document.getElementById("contrasena").focus();
      }
    }
    else{
      alert("Debe introducir una cuenta");
      document.getElementById("cuenta").focus();
    }
  }

  function validarusuario(cuenta,contrasena){
    let usuariovalido = false;
    let md5contrasena = CryptoJS.MD5(contrasena.toString());
    
    arreglousuario = cuentas.find(({numcuenta}) => numcuenta == cuenta);
    usuariovalido = false;
    if(arreglousuario != undefined)
      if(arreglousuario["contrasena"]==md5contrasena)
        usuariovalido=true;
      else
        usuariovalido=false;
    return usuariovalido;
  }

  function mostraropcionescuentavalidada(){
      let divprincipal = document.getElementById("principal");
      divprincipal.style.display = "none";
      let divprincipalautenticado = document.getElementById("principal-autenticado");
      divprincipalautenticado.style.display = "block";
      let nombreautenticado = document.getElementById("nombreautenticado");
      nombreautenticado.textContent = arreglousuario["nombre"];


  }
  


