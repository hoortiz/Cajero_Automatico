let cuentas = [
    { nombre: "Mali", saldo: 200, numcuenta: 12345, contrasena: "3acda7e8c913e5d8958e2399afb470fe"},
    { nombre: "Gera", saldo: 290, numcuenta: 23456, contrasena: "b16972e4dd0505e7f213e109d8433634"},
    { nombre: "Maui", saldo: 67 , numcuenta: 34567, contrasena: "7b41a372b6588179e4730be2061a9e6e"},
    { nombre: "Henrry", saldo: 690 , numcuenta: 45678, contrasena: "f745877f1dac393d8adb37b1d7eaed91"}
  ];
  
let arreglousuario = "";
let cuenta = ""; 

function autenticarse(){
  cuenta = document.getElementById("cuenta").value; 
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
  
function consultarsaldo(){
  let saldo = document.getElementById("saldoconsultado");
  saldo.textContent = arreglousuario["saldo"];
  document.getElementById("divsaldo").style.display = "flex";
}

function ingresarmonto(){
  arreglousuario = cuentas.find(({numcuenta}) => numcuenta == cuenta);
  let montoaingresar = document.getElementById("montoaingresar").value;
  
  if(montoaingresar>=0){
      montoaingresar = parseInt(montoaingresar);
      let saldoactual =  parseInt(arreglousuario["saldo"]);
      let montoingresadototal =  montoaingresar+saldoactual;
      let posicioncuentas = cuentas.findIndex(({numcuenta}) => numcuenta == cuenta);
      if (montoingresadototal<=990){
      cuentas[posicioncuentas].saldo=montoingresadototal;
      document.getElementById("montoaingresar").value="";
      consultarsaldo();
    }
    else{
      alert("No puede superar el saldo de $990");
      document.getElementById("montoaingresar").value="";
    }
  }
  else{
    alert("No puede agregar saldo negativo");
    document.getElementById("montoaingresar").value="";
  }
}

function retirarmonto(){
  arreglousuario = cuentas.find(({numcuenta}) => numcuenta == cuenta);
  let montoaretirar = document.getElementById("montoaretirar").value;

  if(montoaretirar>=0){
      montoaretirar = parseInt(montoaretirar);
      let saldoactual =  parseInt(arreglousuario["saldo"]);
      let montoretiradototal =  saldoactual-montoaretirar;
      let posicioncuentas = cuentas.findIndex(({numcuenta}) => numcuenta == cuenta);
      if (montoretiradototal>=10){
      cuentas[posicioncuentas].saldo=montoretiradototal;
      document.getElementById("montoaretirar").value="";
      consultarsaldo();
    }
    else{
      alert("No puede tener saldo inferior a $10");
      document.getElementById("montoaretirar").value="";
    }
  }
  else{
    alert("No puede retirar saldo negativo");
    document.getElementById("montoaretirar").value="";
  }
}

function salir(){
  arreglousuario = "";
  cuenta = "";
  let divprincipal = document.getElementById("principal");
  divprincipal.style.display = "block";
  let divprincipalautenticado = document.getElementById("principal-autenticado");
  divprincipalautenticado.style.display = "none";
  document.getElementById("saldoconsultado").textContent="";
  document.getElementById("divsaldo").style.display = "none";
  document.getElementById("montoaingresar").value = "";
  document.getElementById("montoaretirar").value = "";
  document.getElementById("cuenta").value = "";
  document.getElementById("contrasena").value = "";
}

