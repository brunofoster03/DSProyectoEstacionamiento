import React, { useEffect, useState } from 'react'
import './Login.css';
import 'moment/locale/es'
var numeral = require('numeral');
var moment = require('moment');


export default function Login() {
  const [insertarplaza, setInsertarplaza] = useState([])
  const [datosnopagoinvitado, setDatosnopagoinvitado] = useState([])
  const [mensualidad, setMensualidad] = useState(5000)
  const [datosnopagousuario, setDatosnopagousuario] = useState([])
  const [datosnopagototal, setDatosnopagototal] = useState([{
    Patente: '',
    Plaza: '',
    Entrada: '-',
    Salida: '-',
    Estado: '',
    Total: '',
  }])
  const [listadepatentes, setListadepatentes] = useState([])
  const [listadni, setListadni] = useState([])
  const [nopagoinvitado, setNopagoinvitado] = useState([])
  const [selectinvitado, setSelectinvitado] = useState('')
  const [listavisitas ,setListavisitas] = useState([])
  const [preciohora, setPreciohora] = useState(1000)
  const [nopagousuario, setNopagousuario] = useState([])
    const actualizarinvitado = ({target}) => {
      setSelectinvitado(target.value)     
    }
    useEffect(() => {
      datosnopago()
      datosnopagous()
    },[selectinvitado])
    useEffect(() => {
    setDatosnopagototal(datosnopagousuario.concat(datosnopagoinvitado))
    },[datosnopagoinvitado, datosnopagousuario])
    const datosnopago = () => {
      fetch('http://localhost:9000/api/nopagoinvitadomenu/' + selectinvitado)
      .then(res => res.json())
      .then(res => setDatosnopagoinvitado(res))
    }
    const datosnopagous = () => {
      fetch('http://localhost:9000/api/nopagousuariomenu/' + selectinvitado)
      .then(res => res.json())
      .then(res => setDatosnopagousuario(res))
    }
  const listanopago = () => {
    fetch('http://localhost:9000/api/nopagoinvitado')
    .then(res => res.json())
    .then(res => setNopagoinvitado(res))
  } 
  const listanopagousuario = () => {
    fetch('http://localhost:9000/api/nopagousuario')
    .then(res => res.json())
    .then(res => setNopagousuario(res))
  }
  useEffect(() => {
    fetch('http://localhost:9000/api/datosinvitado')
    .then(res => res.json())
    .then(res => setDatosinvitado(res))
    colorEstadoInvitado()
  },)
  const [datosinvitado, setDatosinvitado] = useState([])
  const infoInvitado = () => {
    fetch('http://localhost:9000/api/datosinvitado')
    .then(res => res.json())
    .then(res => setDatosinvitado(res))
  }
  const colorEstadoInvitado = () => {
    if((datosinvitado.map(dat => dat.Estado)) == 'No pago'){
      document.getElementsByClassName('estadoinvitado')[0].style.color = 'red';
      document.getElementsByClassName('invitadomenuboton')[0].style.background = 'rgb(255, 107, 107)'
    }else{
      document.getElementsByClassName('estadoinvitado')[0].style.color = 'lime';
      document.getElementsByClassName('invitadomenuboton')[0].style.background = 'rgb(110, 255, 65)'
    }
  }
  const aplicarTurnos = () => {
    let inicio = (datoslogin.Entrada).toString()
    let turnos = parseInt(datoslogin.Salida)
    let nuevoinicio;
    let nuevofin;
    datoslogin.Total = (preciohora * turnos)
    while(turnos != 0){
      if(inicio.toString().slice(-2) == '30'){
        nuevoinicio = (parseInt(inicio.toString().slice(0,2)) + 2).toString()
        nuevofin = '00'
      }else if(inicio.toString().slice(-2) == '00'){
        nuevoinicio = (parseInt(inicio.toString().slice(0,2)) + 1).toString()
        nuevofin = '30'
      }
      turnos -= 1
      inicio = nuevoinicio + nuevofin
      if(inicio.toString() == '2400'){
        inicio = '0000'
      }else if(inicio.toString() == '2430'){
        inicio = '0030'
      }else if(inicio.toString() == '2500'){
        inicio = '0100'
      }
      inicio = inicio.toString().length == 3 ? '0' + inicio : inicio;

    }
    inicio = inicio.toString().slice(0,2) + ':' + inicio.toString().slice(-2)
    datoslogin.Salida = inicio
  }



  const [error, setError] = useState('')
  const [actualizador, setActualizador] = useState(0)
  const [verificadortimerbool, setVerificadortimerbool] = useState(false)
      setTimeout(() => {
        if(verificadortimerbool == true){
        setActualizador(actualizador + 1)
        }
      }, 10);
  const [datoslogin, setDatoslogin] = useState({
    Usuario: '',
    Patente: '',
    Rol: ''
  })
  const [value, setValue] = useState('')
  const handleTurnosChange = ({target}, e) => {
    if(target.value.charAt(target.value.length -1) == '.'){
      return false;
  }else if(target.value >= 0){
      setValue(target.value)
      setActualizador(actualizador + 1)
      setDatoslogin({
        ...datoslogin, 
        Salida: target.value,
      })  
    }
  }
  useEffect(() => {
    if(datoslogin.Rol == 'Usuario'){
      const api = () => {
        fetch('http://localhost:9000/api/usuario/' + datoslogin.Usuario + '/' + datoslogin.Rol + '/' + datoslogin.Patente)
        .then(res => res.json())
        .then(res => setUsuario(res))
        }
        api()
    }else if(datoslogin.Rol == 'Encargado'){
      const api = () => {
        fetch('http://localhost:9000/api/encargado/' + datoslogin.Usuario + '/' + datoslogin.Contraseña)
        .then(res => res.json())
        .then(res => setEncargado(res))
        }
        api()
    }
  },[actualizador])
  useEffect(() => {
    const patentes = () => {
      fetch('http://localhost:9000/api/listapatentes')
      .then(res => res.json())
      .then(res => setListadepatentes(res.map(res => res.Patente)))
    }
    patentes()
  },)
  const [infousuario, setInfousuario] = useState([])
  const [usuario, setUsuario] = useState([])
  const [encargado, setEncargado] = useState([])
  const handleSubmit = (e) => {
    e.preventDefault()
    if(datoslogin.Usuario == 'admin' && datoslogin.Contraseña == 'sinclave'){
      document.getElementsByClassName('menulogin')[0].style.animation = 'cerrar 0.2s forwards';
      document.getElementsByClassName('contenedoradmin')[0].style.animation = 'abrir 0.1s forwards';
    }else{
      if(datoslogin.Rol != 'Invitado' && datoslogin.Patente == '' || datoslogin.Usuario == ''){
        setError('Datos incorrectos')
        document.getElementsByClassName('contenedorerror')[0].style.animation = 'error 0.3s forwards';
        setTimeout(() => {
          document.getElementsByClassName('contenedorerror')[0].style.animation = 'errorback 0.3s forwards';
        }, 2000);
      }else{
        if(datoslogin.Rol == 'Usuario' && listadepatentes.includes((datoslogin.Patente).toUpperCase())){
          document.getElementsByClassName('menulogin')[0].style.animation = 'cerrar 0.2s forwards';
          document.getElementsByClassName('contenedorroles')[0].style.animation = 'abrir 0.1s forwards';
          document.getElementsByClassName('contusuario')[0].style.animation = 'abrirconts 0.5s forwards';
          setVerificadortimerbool(false)
          const datosUsuario = () => {
            fetch('http://localhost:9000/api/usuariologin/' + datoslogin.Patente)
            .then(res => res.json())
            .then(res => setInfousuario(res))
          }
          datosUsuario()
          setDatoslogin({
            Usuario: '',
            Patente: '',
            Rol: ''
          })
        }else if(datoslogin.Rol == 'Encargado' && datoslogin.Usuario == encargado[0].Usuario && datoslogin.Contraseña == encargado[0].Contraseña){
          document.getElementsByClassName('menulogin')[0].style.animation = 'cerrar 0.2s forwards';
          document.getElementsByClassName('contenedorroles')[0].style.animation = 'abrir 0.1s forwards';
          document.getElementsByClassName('contencargado')[0].style.animation = 'abrirconts 0.5s forwards';
          document.getElementsByClassName('selectpatente')[0].selectedIndex = 0;
          const patentes = () => {
            fetch('http://localhost:9000/api/listapatentes')
            .then(res => res.json())
            .then(res => setListadepatentes(res.map(res => res.Patente)))
          }
          patentes()
          const listavisitas = () => {
            fetch('http://localhost:9000/api/listadevisitas')
            .then(res => res.json())
            .then(res => setListavisitas(res))
          }
          listavisitas()
          setVerificadortimerbool(false)
          listanopago()
          listanopagousuario()
          setDatoslogin({
            Usuario: '',
            Contraseña: '',
            Rol: ''
          })
          setDatosnopagototal([{
            Patente: '',
            Plaza: '',
            Entrada: '',
            Salida: '',
            Estado: '',
            Total: '',
          }])
        }
      }
    } 
  }
  useEffect(() => {
    const precioinvitado = () => {
      fetch('http://localhost:9000/api/getprecioinvitado')
      .then(res => res.json())
      .then(res => setPreciohora(res.map(pre => pre.Precioinvitado)))
    }
    precioinvitado()
    const mensualidad = () => {
      fetch('http://localhost:9000/api/getmensualidad')
      .then(res => res.json())
      .then(res => setMensualidad(res.map(pre => pre.Mensualidad)))
    }
  },[])
  const handleSubmitInvitado = (e) => {
      e.preventDefault()
      if(datoslogin.Patente == '' || datoslogin.Entrada == '' || datoslogin.Salida == '' || datoslogin.Salida == '0'){
        setError('Datos incorrectos')
        document.getElementsByClassName('contenedorerror')[0].style.animation = 'error 0.3s forwards';
        setTimeout(() => {
          document.getElementsByClassName('contenedorerror')[0].style.animation = 'errorback 0.3s forwards';
        }, 2000);
      }else if(parseInt(datoslogin.Salida) > 10){
        setError('Demasiados turnos. Límite: 10')
        document.getElementsByClassName('contenedorerror')[0].style.animation = 'error 0.3s forwards';
        setTimeout(() => {
          document.getElementsByClassName('contenedorerror')[0].style.animation = 'errorback 0.3s forwards';
        }, 2000);
      }else{
        aplicarTurnos()
        delete datoslogin.Nombre
        delete datoslogin.Apellido
        delete datoslogin.Marca
        delete datoslogin.Modelo
        delete datoslogin.Direccion
        delete datoslogin.Telefono
        delete datoslogin.Usuario
        delete datoslogin.Contraseña
        delete datoslogin.DNI
        delete datoslogin.Horario
        delete datoslogin.Rol
        delete datoslogin.PatenteBorrar
        datoslogin.Entrada = (datoslogin.Entrada).toString().slice(0,2) + ':' + (datoslogin.Entrada).toString().slice(-2)
        datoslogin.Patente = (datoslogin.Patente).toString().toUpperCase()
        datoslogin.Dia = moment().format('L').slice(0,2)
        datoslogin.Mes = moment().format('L').slice(3,5)
        datoslogin.Año = moment().format('L').slice(6,10)
        const cargarInvitado = () => {
          delete datoslogin.Rol
          const requestInit = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(datoslogin)
          }
          fetch('http://localhost:9000/api/crearinvitado', requestInit)
          .then(res => res.json())
          .then(res => console.log(res))
        }
        cargarInvitado()
        const ponerPlaza = () => {
          const requestInit = {
            method: 'PUT'
          }
          fetch('http://localhost:9000/api/plazainvitado/' + insertarplaza[0].Identificador + '/' + datoslogin.Patente, requestInit)
          .then(res => res.json())
          .then(res => console.log(res))
        }
        ponerPlaza()
        const actualizarPlaza = () => {
          const requestInit = {
            method: 'PUT'
          }
          fetch('http://localhost:9000/api/actualizarplaza/'+ 'Ocupado' + '/' + insertarplaza[0].Identificador, requestInit)
          .then(res => res.json())
          .then(res => console.log(res))
        }
        actualizarPlaza()
        const visita = () => {
          const requestInit = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              Patente: datoslogin.Patente,
              Dia: moment().format('L').slice(0,2),
              Mes: moment().format('L').slice(3,5),
              Año: moment().format('L').slice(6,10)
            })
          }
          fetch('http://localhost:9000/api/anadirvisita', requestInit)
          .then(res => res.json())
          .then(res => console.log(res))
        }
        visita()
        infoInvitado()
        colorEstadoInvitado()
        document.getElementsByClassName('menubotones')[0].style.animation = 'abrir 0.5s forwards';
        document.getElementsByClassName('menuinvitado')[0].style.animation = 'cerrar 0.2s forwards';
        document.getElementsByClassName('menulogin')[0].style.animation = 'cerrar 0.2s forwards';
        document.getElementsByClassName('contenedorroles')[0].style.animation = 'abrir 0.1s forwards';
        document.getElementsByClassName('continvitado')[0].style.animation = 'abrirconts 0.5s forwards';
        setVerificadortimerbool(false)
        setDatoslogin({
          Usuario: '',
          Patente: '',
          Rol: ''
        })
      }
  }
  const handleChange = (e) => {
    setDatoslogin({
      ...datoslogin, 
      [e.target.name]: e.target.value,
    })
  }
  const abrirUsuarioLogin = () => {
    document.getElementsByClassName('menubotones')[0].style.animation = 'cerrar 0.2s forwards';
    document.getElementsByClassName('menuusuario')[0].style.animation = 'abrir 0.5s forwards';
    document.getElementsByClassName('inputpatenteusuario')[0].value = '';
    setVerificadortimerbool(true)
    setDatoslogin({
      Usuario: 'sinusuario',
      Rol: 'Usuario'
    })
  }
  const abrirEncargadoLogin = () => {
    document.getElementsByClassName('menubotones')[0].style.animation = 'cerrar 0.2s forwards';
    document.getElementsByClassName('menuencargado')[0].style.animation = 'abrir 0.5s forwards';
    document.getElementsByClassName('inputencargado')[0].value = '';
    document.getElementsByClassName('inputpatenteencargado')[0].value = '';
    setVerificadortimerbool(true) 
    setDatoslogin({
      Rol: 'Encargado'
    })
  }
  const abrirInvitadoLogin = () => {
    document.getElementsByClassName('menubotones')[0].style.animation = 'cerrar 0.2s forwards';
    document.getElementsByClassName('menuinvitado')[0].style.animation = 'abrir 0.5s forwards';
    document.getElementsByClassName('inputpatenteinvitado')[0].value = '';
    document.getElementsByClassName('inputentradainvitado')[0].value = '';
    setVerificadortimerbool(true)
    setValue('')
    setDatoslogin({
      Rol: 'Invitado',
      Entrada: '',
      Salida: '',
    })
    const seleccionarPlaza = () => {
      fetch('http://localhost:9000/api/seleccionarplaza')
      .then(res => res.json())
      .then(res => setInsertarplaza(res))
    }
    seleccionarPlaza()
  }
  const volverAtras = () => { 
    setDatoslogin({
      Usuario: '',
      Patente: '',
      Rol: '',
      Entrada: '',
      Salida: '',
      Total: ''
    })
    setVerificadortimerbool(false)
    if(document.getElementsByClassName('menuusuario')[0].style.animation == '0.5s ease 0s 1 normal forwards running abrir'){
      document.getElementsByClassName('menuusuario')[0].style.animation = 'cerrar 0.2s forwards';
      document.getElementsByClassName('menubotones')[0].style.animation = 'abrir 0.5s forwards';
      document.getElementsByClassName('contusuario')[0].style.animation = 'cerrar 0.2s forwards';
    }else if(document.getElementsByClassName('menuencargado')[0].style.animation == '0.5s ease 0s 1 normal forwards running abrir'){
      document.getElementsByClassName('menuencargado')[0].style.animation = 'cerrar 0.2s forwards';
      document.getElementsByClassName('menubotones')[0].style.animation = 'abrir 0.5s forwards';  
    }else if(document.getElementsByClassName('menuinvitado')[0].style.animation == '0.5s ease 0s 1 normal forwards running abrir'){
      document.getElementsByClassName('menuinvitado')[0].style.animation = 'cerrar 0.2s forwards';
      document.getElementsByClassName('menubotones')[0].style.animation = 'abrir 0.5s forwards';
    }
    if(document.getElementsByClassName('contenedorroles')[0].style.animation == '0.1s ease 0s 1 normal forwards running abrir'){
      document.getElementsByClassName('contenedorroles')[0].style.animation = 'cerrar 0.2s forwards';
      document.getElementsByClassName('contencargado')[0].style.animation = '';
      document.getElementsByClassName('menulogin')[0].style.animation = 'abrir 0.5s forwards';
      document.getElementsByClassName('usuariosencargado')[0].style.animation = '';
      document.getElementsByClassName('escanearstickerencargado')[0].style.animation = '';
      document.getElementsByClassName('historialencargado')[0].style.animation = '';
      document.getElementsByClassName('pagosencargado')[0].style.animation = '';
      document.getElementsByClassName('solapausuarios')[0].style.background = 'rgb(21,21,21)';
      document.getElementsByClassName('solapaescanearsticker')[0].style.background = 'rgb(21,21,21)';
      document.getElementsByClassName('solapahistorial')[0].style.background = 'rgb(21,21,21)'; 
      document.getElementsByClassName('solapapagos')[0].style.background = 'rgb(21,21,21)'; 
    }
    if(document.getElementsByClassName('contenedoradmin')[0].style.animation == '0.1s ease 0s 1 normal forwards running abrir'){
      document.getElementsByClassName('contenedoradmin')[0].style.animation = 'cerrar 0.2s forwards';
      document.getElementsByClassName('menulogin')[0].style.animation = 'abrir 0.5s forwards';
      document.getElementsByClassName('encargadosadmin')[0].style.animation = '';
      document.getElementsByClassName('pisosadmin')[0].style.animation = '';
      document.getElementsByClassName('informesadmin')[0].style.animation = '';
      document.getElementsByClassName('solapaencargados')[0].style.background = 'rgb(21,21,21)';
      document.getElementsByClassName('solapapisos')[0].style.background = 'rgb(21,21,21)';
      document.getElementsByClassName('solapainformes')[0].style.background = 'rgb(21,21,21)'; 
    }
  }
  const irseInvitado = () => {
    infoInvitado()
    if((datosinvitado.map(dat => dat.Estado)) == 'No pago'){
      document.getElementsByClassName('conterrorinvitadosalir')[0].style.animation = 'abrir 0.5s forwards';
      setTimeout(() => {
        document.getElementsByClassName('conterrorinvitadosalir')[0].style.animation = 'cerrar 0.2s forwards';
      }, 8000);
    }else{
      document.getElementsByClassName('contenedorroles')[0].style.animation = 'cerrar 0.2s forwards';
      document.getElementsByClassName('menulogin')[0].style.animation = 'abrir 0.5s forwards';
      document.getElementsByClassName('continvitado')[0].style.animation = 'cerrar 0.2s forwards';
      const liberarPlaza = () => {
        const requestInit = {
          method: 'PUT'
        }
        fetch('http://localhost:9000/api/actualizarplaza/'+ 'Libre' + '/' + insertarplaza[0].Identificador, requestInit)
        .then(res => res.json())
        .then(res => console.log(res))
      }
      liberarPlaza()
    }
  }
  const handleSubmitPagos = (e) => {
    e.preventDefault()
    if(datosnopagototal.map(dat => dat.Entrada)[0] == '-' && datosnopagototal.map(dat => dat.Salida)[0] == '-'){
      const requestInit = {
        method: 'PUT'
      }
      fetch('http://localhost:9000/api/actualizarestadousuario/' + 'Pago' + '/' + selectinvitado, requestInit)
      .then(res => res.json())
      .then(res => console.log(res))
      document.getElementsByClassName('selectpatente')[0].remove(document.getElementsByClassName('selectpatente')[0].selectedIndex)
      document.getElementsByClassName('selectpatente')[0].selectedIndex = 0;
      setDatosnopagototal([{
        Patente: '',
        Plaza: '',
        Entrada: '',
        Salida: '',
        Estado: '',
        Total: '',
      }])
    }else{
      const requestInit = {
        method: 'PUT'
      }
      fetch('http://localhost:9000/api/actualizarestadoinvitado/' + 'Pago' + '/' + selectinvitado, requestInit)
      .then(res => res.json())
      .then(res => console.log(res))
      document.getElementsByClassName('selectpatente')[0].selectedIndex = 0;
      setDatosnopagototal([{
        Patente: '',
        Plaza: '',
        Entrada: '',
        Salida: '',
        Estado: '',
        Total: '',
      }])
    }
    if(datosnopagototal[0].Patente != ''){
    document.getElementsByClassName('infopagoscobros')[0].style.animation = 'abrir 0.5s forwards';
    setTimeout(() => {
      document.getElementsByClassName('infopagoscobros')[0].style.animation = 'cerrar 0.2s forwards';
    }, 1000);
    }
  }
  const [pisoactualizador, setPisoactualizador] = useState(0)
  const [habilito, setHabilito] = useState(['No','No','No','No','No','No','No','No','No','No','No','No'])
  useEffect(() => {
    const subsuelo3 = () => {
    fetch('http://localhost:9000/api/habilitaciones/' + '-3')
    .then(res => res.json())
    .then(res => setHabilito(habilito, habilito[0] = res.map(res => res.Habilitado)[0]))
    }
    subsuelo3()
    const subsuelo2 = () => {
      fetch('http://localhost:9000/api/habilitaciones/' + '-2')
      .then(res => res.json())
      .then(res => setHabilito(habilito, habilito[1] = res.map(res => res.Habilitado)[0]))
      }
    subsuelo2()
    const subsuelo1 = () => {
      fetch('http://localhost:9000/api/habilitaciones/' + '-1')
      .then(res => res.json())
      .then(res => setHabilito(habilito, habilito[2] = res.map(res => res.Habilitado)[0]))
      }
    subsuelo1()
    const piso1 = () => {
      fetch('http://localhost:9000/api/habilitaciones/' + '1')
      .then(res => res.json())
      .then(res => setHabilito(habilito, habilito[3] = res.map(res => res.Habilitado)[0]))
      }
      piso1()
    const piso2 = () => {
      fetch('http://localhost:9000/api/habilitaciones/' + '2')
      .then(res => res.json())
      .then(res => setHabilito(habilito, habilito[4] = res.map(res => res.Habilitado)[0]))
      }
      piso2()
    const piso3 = () => {
      fetch('http://localhost:9000/api/habilitaciones/' + '3')
      .then(res => res.json())
      .then(res => setHabilito(habilito, habilito[5] = res.map(res => res.Habilitado)[0]))
      }
      piso3()
    const piso4 = () => {
      fetch('http://localhost:9000/api/habilitaciones/' + '4')
      .then(res => res.json())
      .then(res => setHabilito(habilito, habilito[6] = res.map(res => res.Habilitado)[0]))
      }
      piso4()
    const piso5 = () => {
      fetch('http://localhost:9000/api/habilitaciones/' + '5')
      .then(res => res.json())
      .then(res => setHabilito(habilito, habilito[7] = res.map(res => res.Habilitado)[0]))
      }
      piso5()
    const piso6 = () => {
      fetch('http://localhost:9000/api/habilitaciones/' + '6')
      .then(res => res.json())
      .then(res => setHabilito(habilito, habilito[8] = res.map(res => res.Habilitado)[0]))
      }
      piso6()
    const piso7 = () => {
      fetch('http://localhost:9000/api/habilitaciones/' + '7')
      .then(res => res.json())
      .then(res => setHabilito(habilito, habilito[9] = res.map(res => res.Habilitado)[0]))
      }
      piso7()
    const piso8 = () => {
      fetch('http://localhost:9000/api/habilitaciones/' + '8')
      .then(res => res.json())
      .then(res => setHabilito(habilito, habilito[10] = res.map(res => res.Habilitado)[0]))
      }
      piso8()
    const piso9 = () => {
      fetch('http://localhost:9000/api/habilitaciones/' + '9')
      .then(res => res.json())
      .then(res => setHabilito(habilito, habilito[11] = res.map(res => res.Habilitado)[0]))
      }
      piso9()                     
  },[pisoactualizador])
  const [plazas, setPlazas] = useState([])
  const [plazasM3, setPlazasM3] = useState([])
  const [plazasM2, setPlazasM2] = useState([])
  const [plazasM1, setPlazasM1] = useState([])
  const [plazasP1, setPlazasP1] = useState([])
  const [plazasP2, setPlazasP2] = useState([])
  const [plazasP3, setPlazasP3] = useState([])
  const [plazasP4, setPlazasP4] = useState([])
  const [plazasP5, setPlazasP5] = useState([])
  const [plazasP6, setPlazasP6] = useState([])
  const [plazasP7, setPlazasP7] = useState([])
  const [plazasP8, setPlazasP8] = useState([])
  const [plazasP9, setPlazasP9] = useState([])
  const [prueba, setPrueba] = useState([])
  useEffect(() => {
    const subsuelo3 = () => {
      fetch('http://localhost:9000/api/plazasocupadas/' + '-3')
      .then(res => res.json())
      .then(res => setPlazasM3(res.map(res => res.Estado)))
      }
      subsuelo3()
      const subsuelo2 = () => {
        fetch('http://localhost:9000/api/plazasocupadas/' + '-2')
        .then(res => res.json())
        .then(res => setPlazasM2(res.map(res => res.Estado)))
        }
      subsuelo2()
      const subsuelo1 = () => {
        fetch('http://localhost:9000/api/plazasocupadas/' + '-1')
        .then(res => res.json())
        .then(res => setPlazasM1(res.map(res => res.Estado)))
        }
      subsuelo1()
      const piso1 = () => {
        fetch('http://localhost:9000/api/plazasocupadas/' + '1')
        .then(res => res.json())
        .then(res => setPlazasP1(res.map(res => res.Estado)))
        }
        piso1()
      const piso2 = () => {
        fetch('http://localhost:9000/api/plazasocupadas/' + '2')
        .then(res => res.json())
        .then(res => setPlazasP2(res.map(res => res.Estado)))
        }
        piso2()
      const piso3 = () => {
        fetch('http://localhost:9000/api/plazasocupadas/' + '3')
        .then(res => res.json())
        .then(res => setPlazasP3(res.map(res => res.Estado)))
        }
        piso3()
      const piso4 = () => {
        fetch('http://localhost:9000/api/plazasocupadas/' + '4')
        .then(res => res.json())
        .then(res => setPlazasP4(res.map(res => res.Estado)))
        }
        piso4()
      const piso5 = () => {
        fetch('http://localhost:9000/api/plazasocupadas/' + '5')
        .then(res => res.json())
        .then(res => setPlazasP5(res.map(res => res.Estado)))
        }
        piso5()
      const piso6 = () => {
        fetch('http://localhost:9000/api/plazasocupadas/' + '6')
        .then(res => res.json())
        .then(res => setPlazasP6(res.map(res => res.Estado)))
        }
        piso6()
      const piso7 = () => {
        fetch('http://localhost:9000/api/plazasocupadas/' + '7')
        .then(res => res.json())
        .then(res => setPlazasP7(res.map(res => res.Estado)))
        }
        piso7()
      const piso8 = () => {
        fetch('http://localhost:9000/api/plazasocupadas/' + '8')
        .then(res => res.json())
        .then(res => setPlazasP8(res.map(res => res.Estado)))
        }
        piso8()
      const piso9 = () => {
        fetch('http://localhost:9000/api/plazasocupadas/' + '9')
        .then(res => res.json())
        .then(res => setPlazasP9(res.map(res => res.Estado)))
        }
        piso9()
  },/*[pisoactualizador]*/)
  useEffect(() => {
    document.getElementById('m3-1').style.background = plazasM3[0] == 'Ocupado' ? 'red' : 'lime';
    document.getElementById('m3-2').style.background = plazasM3[1] == 'Ocupado' ? 'red' : 'lime';
    document.getElementById('m3-3').style.background = plazasM3[2] == 'Ocupado' ? 'red' : 'lime';
    document.getElementById('m3-4').style.background = plazasM3[3] == 'Ocupado' ? 'red' : 'lime';
    document.getElementById('m3-5').style.background = plazasM3[4] == 'Ocupado' ? 'red' : 'lime';
    document.getElementById('m3-6').style.background = plazasM3[5] == 'Ocupado' ? 'red' : 'lime';
    document.getElementById('m3-7').style.background = plazasM3[6] == 'Ocupado' ? 'red' : 'lime';
    document.getElementById('m3-8').style.background = plazasM3[7] == 'Ocupado' ? 'red' : 'lime';
    document.getElementById('m3-9').style.background = plazasM3[8] == 'Ocupado' ? 'red' : 'lime';
    document.getElementById('m3-10').style.background = plazasM3[9] == 'Ocupado' ? 'red' : 'lime';
    document.getElementById('m2-1').style.background = plazasM2[0] == 'Ocupado' ? 'red' : 'lime';
    document.getElementById('m2-2').style.background = plazasM2[1] == 'Ocupado' ? 'red' : 'lime';
    document.getElementById('m2-3').style.background = plazasM2[2] == 'Ocupado' ? 'red' : 'lime';
    document.getElementById('m2-4').style.background = plazasM2[3] == 'Ocupado' ? 'red' : 'lime';
    document.getElementById('m2-5').style.background = plazasM2[4] == 'Ocupado' ? 'red' : 'lime';
    document.getElementById('m2-6').style.background = plazasM2[5] == 'Ocupado' ? 'red' : 'lime';
    document.getElementById('m2-7').style.background = plazasM2[6] == 'Ocupado' ? 'red' : 'lime';
    document.getElementById('m2-8').style.background = plazasM2[7] == 'Ocupado' ? 'red' : 'lime';
    document.getElementById('m2-9').style.background = plazasM2[8] == 'Ocupado' ? 'red' : 'lime';
    document.getElementById('m2-10').style.background = plazasM2[9] == 'Ocupado' ? 'red' : 'lime';
    document.getElementById('m1-1').style.background = plazasM1[0] == 'Ocupado' ? 'red' : 'lime';
    document.getElementById('m1-2').style.background = plazasM1[1] == 'Ocupado' ? 'red' : 'lime';
    document.getElementById('m1-3').style.background = plazasM1[2] == 'Ocupado' ? 'red' : 'lime';
    document.getElementById('m1-4').style.background = plazasM1[3] == 'Ocupado' ? 'red' : 'lime';
    document.getElementById('m1-5').style.background = plazasM1[4] == 'Ocupado' ? 'red' : 'lime';
    document.getElementById('m1-6').style.background = plazasM1[5] == 'Ocupado' ? 'red' : 'lime';
    document.getElementById('m1-7').style.background = plazasM1[6] == 'Ocupado' ? 'red' : 'lime';
    document.getElementById('m1-8').style.background = plazasM1[7] == 'Ocupado' ? 'red' : 'lime';
    document.getElementById('m1-9').style.background = plazasM1[8] == 'Ocupado' ? 'red' : 'lime';
    document.getElementById('m1-10').style.background = plazasM1[9] == 'Ocupado' ? 'red' : 'lime';
    document.getElementById('p1-1').style.background = plazasP1[0] == 'Ocupado' ? 'red' : 'lime';
    document.getElementById('p1-2').style.background = plazasP1[1] == 'Ocupado' ? 'red' : 'lime';
    document.getElementById('p1-3').style.background = plazasP1[2] == 'Ocupado' ? 'red' : 'lime';
    document.getElementById('p1-4').style.background = plazasP1[3] == 'Ocupado' ? 'red' : 'lime';
    document.getElementById('p1-5').style.background = plazasP1[4] == 'Ocupado' ? 'red' : 'lime';
    document.getElementById('p1-6').style.background = plazasP1[5] == 'Ocupado' ? 'red' : 'lime';
    document.getElementById('p1-7').style.background = plazasP1[6] == 'Ocupado' ? 'red' : 'lime';
    document.getElementById('p1-8').style.background = plazasP1[7] == 'Ocupado' ? 'red' : 'lime';
    document.getElementById('p1-9').style.background = plazasP1[8] == 'Ocupado' ? 'red' : 'lime';
    document.getElementById('p1-10').style.background = plazasP1[9] == 'Ocupado' ? 'red' : 'lime';
    document.getElementById('p2-1').style.background = plazasP2[0] == 'Ocupado' ? 'red' : 'lime';
    document.getElementById('p2-2').style.background = plazasP2[1] == 'Ocupado' ? 'red' : 'lime';
    document.getElementById('p2-3').style.background = plazasP2[2] == 'Ocupado' ? 'red' : 'lime';
    document.getElementById('p2-4').style.background = plazasP2[3] == 'Ocupado' ? 'red' : 'lime';
    document.getElementById('p2-5').style.background = plazasP2[4] == 'Ocupado' ? 'red' : 'lime';
    document.getElementById('p2-6').style.background = plazasP2[5] == 'Ocupado' ? 'red' : 'lime';
    document.getElementById('p2-7').style.background = plazasP2[6] == 'Ocupado' ? 'red' : 'lime';
    document.getElementById('p2-8').style.background = plazasP2[7] == 'Ocupado' ? 'red' : 'lime';
    document.getElementById('p2-9').style.background = plazasP2[8] == 'Ocupado' ? 'red' : 'lime';
    document.getElementById('p2-10').style.background = plazasP2[9] == 'Ocupado' ? 'red' : 'lime';
    document.getElementById('p3-1').style.background = plazasP3[0] == 'Ocupado' ? 'red' : 'lime';
    document.getElementById('p3-2').style.background = plazasP3[1] == 'Ocupado' ? 'red' : 'lime';
    document.getElementById('p3-3').style.background = plazasP3[2] == 'Ocupado' ? 'red' : 'lime';
    document.getElementById('p3-4').style.background = plazasP3[3] == 'Ocupado' ? 'red' : 'lime';
    document.getElementById('p3-5').style.background = plazasP3[4] == 'Ocupado' ? 'red' : 'lime';
    document.getElementById('p3-6').style.background = plazasP3[5] == 'Ocupado' ? 'red' : 'lime';
    document.getElementById('p3-7').style.background = plazasP3[6] == 'Ocupado' ? 'red' : 'lime';
    document.getElementById('p3-8').style.background = plazasP3[7] == 'Ocupado' ? 'red' : 'lime';
    document.getElementById('p3-9').style.background = plazasP3[8] == 'Ocupado' ? 'red' : 'lime';
    document.getElementById('p3-10').style.background = plazasP3[9] == 'Ocupado' ? 'red' : 'lime';
    document.getElementById('p4-1').style.background = plazasP4[0] == 'Ocupado' ? 'red' : 'lime';
    document.getElementById('p4-2').style.background = plazasP4[1] == 'Ocupado' ? 'red' : 'lime';
    document.getElementById('p4-3').style.background = plazasP4[2] == 'Ocupado' ? 'red' : 'lime';
    document.getElementById('p4-4').style.background = plazasP4[3] == 'Ocupado' ? 'red' : 'lime';
    document.getElementById('p4-5').style.background = plazasP4[4] == 'Ocupado' ? 'red' : 'lime';
    document.getElementById('p4-6').style.background = plazasP4[5] == 'Ocupado' ? 'red' : 'lime';
    document.getElementById('p4-7').style.background = plazasP4[6] == 'Ocupado' ? 'red' : 'lime';
    document.getElementById('p4-8').style.background = plazasP4[7] == 'Ocupado' ? 'red' : 'lime';
    document.getElementById('p4-9').style.background = plazasP4[8] == 'Ocupado' ? 'red' : 'lime';
    document.getElementById('p4-10').style.background = plazasP4[9] == 'Ocupado' ? 'red' : 'lime';
    document.getElementById('p5-1').style.background = plazasP5[0] == 'Ocupado' ? 'red' : 'lime';
    document.getElementById('p5-2').style.background = plazasP5[1] == 'Ocupado' ? 'red' : 'lime';
    document.getElementById('p5-3').style.background = plazasP5[2] == 'Ocupado' ? 'red' : 'lime';
    document.getElementById('p5-4').style.background = plazasP5[3] == 'Ocupado' ? 'red' : 'lime';
    document.getElementById('p5-5').style.background = plazasP5[4] == 'Ocupado' ? 'red' : 'lime';
    document.getElementById('p5-6').style.background = plazasP5[5] == 'Ocupado' ? 'red' : 'lime';
    document.getElementById('p5-7').style.background = plazasP5[6] == 'Ocupado' ? 'red' : 'lime';
    document.getElementById('p5-8').style.background = plazasP5[7] == 'Ocupado' ? 'red' : 'lime';
    document.getElementById('p5-9').style.background = plazasP5[8] == 'Ocupado' ? 'red' : 'lime';
    document.getElementById('p5-10').style.background = plazasP5[9] == 'Ocupado' ? 'red' : 'lime';
    document.getElementById('p6-1').style.background = plazasP6[0] == 'Ocupado' ? 'red' : 'lime';
    document.getElementById('p6-2').style.background = plazasP6[1] == 'Ocupado' ? 'red' : 'lime';
    document.getElementById('p6-3').style.background = plazasP6[2] == 'Ocupado' ? 'red' : 'lime';
    document.getElementById('p6-4').style.background = plazasP6[3] == 'Ocupado' ? 'red' : 'lime';
    document.getElementById('p6-5').style.background = plazasP6[4] == 'Ocupado' ? 'red' : 'lime';
    document.getElementById('p6-6').style.background = plazasP6[5] == 'Ocupado' ? 'red' : 'lime';
    document.getElementById('p6-7').style.background = plazasP6[6] == 'Ocupado' ? 'red' : 'lime';
    document.getElementById('p6-8').style.background = plazasP6[7] == 'Ocupado' ? 'red' : 'lime';
    document.getElementById('p6-9').style.background = plazasP6[8] == 'Ocupado' ? 'red' : 'lime';
    document.getElementById('p6-10').style.background = plazasP6[9] == 'Ocupado' ? 'red' : 'lime';
    document.getElementById('p7-1').style.background = plazasP7[0] == 'Ocupado' ? 'red' : 'lime';
    document.getElementById('p7-2').style.background = plazasP7[1] == 'Ocupado' ? 'red' : 'lime';
    document.getElementById('p7-3').style.background = plazasP7[2] == 'Ocupado' ? 'red' : 'lime';
    document.getElementById('p7-4').style.background = plazasP7[3] == 'Ocupado' ? 'red' : 'lime';
    document.getElementById('p7-5').style.background = plazasP7[4] == 'Ocupado' ? 'red' : 'lime';
    document.getElementById('p7-6').style.background = plazasP7[5] == 'Ocupado' ? 'red' : 'lime';
    document.getElementById('p7-7').style.background = plazasP7[6] == 'Ocupado' ? 'red' : 'lime';
    document.getElementById('p7-8').style.background = plazasP7[7] == 'Ocupado' ? 'red' : 'lime';
    document.getElementById('p7-9').style.background = plazasP7[8] == 'Ocupado' ? 'red' : 'lime';
    document.getElementById('p7-10').style.background = plazasP7[9] == 'Ocupado' ? 'red' : 'lime';
    document.getElementById('p8-1').style.background = plazasP8[0] == 'Ocupado' ? 'red' : 'lime';
    document.getElementById('p8-2').style.background = plazasP8[1] == 'Ocupado' ? 'red' : 'lime';
    document.getElementById('p8-3').style.background = plazasP8[2] == 'Ocupado' ? 'red' : 'lime';
    document.getElementById('p8-4').style.background = plazasP8[3] == 'Ocupado' ? 'red' : 'lime';
    document.getElementById('p8-5').style.background = plazasP8[4] == 'Ocupado' ? 'red' : 'lime';
    document.getElementById('p8-6').style.background = plazasP8[5] == 'Ocupado' ? 'red' : 'lime';
    document.getElementById('p8-7').style.background = plazasP8[6] == 'Ocupado' ? 'red' : 'lime';
    document.getElementById('p8-8').style.background = plazasP8[7] == 'Ocupado' ? 'red' : 'lime';
    document.getElementById('p8-9').style.background = plazasP8[8] == 'Ocupado' ? 'red' : 'lime';
    document.getElementById('p8-10').style.background = plazasP8[9] == 'Ocupado' ? 'red' : 'lime';
    document.getElementById('p9-1').style.background = plazasP9[0] == 'Ocupado' ? 'red' : 'lime';
    document.getElementById('p9-2').style.background = plazasP9[1] == 'Ocupado' ? 'red' : 'lime';
    document.getElementById('p9-3').style.background = plazasP9[2] == 'Ocupado' ? 'red' : 'lime';
    document.getElementById('p9-4').style.background = plazasP9[3] == 'Ocupado' ? 'red' : 'lime';
    document.getElementById('p9-5').style.background = plazasP9[4] == 'Ocupado' ? 'red' : 'lime';
    document.getElementById('p9-6').style.background = plazasP9[5] == 'Ocupado' ? 'red' : 'lime';
    document.getElementById('p9-7').style.background = plazasP9[6] == 'Ocupado' ? 'red' : 'lime';
    document.getElementById('p9-8').style.background = plazasP9[7] == 'Ocupado' ? 'red' : 'lime';
    document.getElementById('p9-9').style.background = plazasP9[8] == 'Ocupado' ? 'red' : 'lime';
    document.getElementById('p9-10').style.background = plazasP9[9] == 'Ocupado' ? 'red' : 'lime';

  },[plazasM3, plazasM2, plazasM1, plazasP1, plazasP2, plazasP3, plazasP4, plazasP5, plazasP6, plazasP7, plazasP8, plazasP9])
  const solapaAdmin = ({target}) => {
    if(target.className == 'solapaencargados'){
      document.getElementsByClassName('solapaencargados')[0].style.background = 'rgb(51,51,51)';
      document.getElementsByClassName('solapapisos')[0].style.background = 'rgb(21,21,21)';
      document.getElementsByClassName('solapainformes')[0].style.background = 'rgb(21,21,21)';
      document.getElementsByClassName('encargadosadmin')[0].style.animation = 'abrir 0.2s forwards';
      document.getElementsByClassName('pisosadmin')[0].style.animation = '';
      document.getElementsByClassName('informesadmin')[0].style.animation = '';
      document.getElementsByClassName('selectencadmin')[0].selectedIndex = 0; 
      const listadedni = () => {
        fetch('http://localhost:9000/api/listadni')
        .then(res => res.json())
        .then(res => setListadni(res.map(res => res.DNI)))
      }
      listadedni()
    }else if(target.className == 'solapapisos'){
      document.getElementsByClassName('solapapisos')[0].style.background = 'rgb(51,51,51)';
      document.getElementsByClassName('solapaencargados')[0].style.background = 'rgb(21,21,21)';           
      document.getElementsByClassName('solapainformes')[0].style.background = 'rgb(21,21,21)'; 
      document.getElementsByClassName('pisosadmin')[0].style.animation = 'abrir 0.2s forwards';
      document.getElementsByClassName('encargadosadmin')[0].style.animation = '';
      document.getElementsByClassName('informesadmin')[0].style.animation = '';
      setPisoactualizador(pisoactualizador + 1)
      for(let i = 0 ; i < 12 ; i++){
        if(habilito[i] == 'No'){
          document.getElementById(i).style.color = 'red';
        }else{
          document.getElementById(i).style.color = 'lime';
        }
      }
      setDatoslogin({
        Nombre: '',
        Apellido: '',
        Contraseña: '',
        Usuario: '',
        DNI: '',
        Horario: '',
      })
    }else if(target.className == 'solapainformes'){
      document.getElementsByClassName('solapainformes')[0].style.background = 'rgb(51,51,51)';
      document.getElementsByClassName('solapaencargados')[0].style.background = 'rgb(21,21,21)';           
      document.getElementsByClassName('solapapisos')[0].style.background = 'rgb(21,21,21)'; 
      document.getElementsByClassName('informesadmin')[0].style.animation = 'abrir 0.5s forwards';
      document.getElementsByClassName('pisosadmin')[0].style.animation = '';
      document.getElementsByClassName('encargadosadmin')[0].style.animation = '';
      document.getElementsByClassName('gananciasdiariasinforme')[0].style.visibility = 'hidden';
      document.getElementsByClassName('gananciasmensualesinforme')[0].style.visibility = 'hidden';
      document.getElementsByClassName('visitasdiariasinforme')[0].style.visibility = 'hidden';
      document.getElementsByClassName('visitasmensualesinforme')[0].style.visibility = 'hidden';
      document.getElementsByClassName('morososinforme')[0].style.visibility = 'hidden';

      const gananciasdiarias = () => {
        fetch('http://localhost:9000/api/gananciasdiarias')
        .then(res => res.json())
        .then(res => setGananciasdiarias(res))
      }
      const gananciasmensuales = () => {
        fetch('http://localhost:9000/api/gananciasmensuales')
        .then(res => res.json())
        .then(res => setGananciasmensuales(res))
      }
      const visitasdiarias = () => {
        fetch('http://localhost:9000/api/visitasdiarias')
        .then(res => res.json())
        .then(res => setVisitasdiarias(res))
      }
      const visitasmensuales = () => {
        fetch('http://localhost:9000/api/visitasmensuales')
        .then(res => res.json())
        .then(res => setVisitasmensuales(res))
      }
      const morosos = () => {
        fetch('http://localhost:9000/api/morosos')
        .then(res => res.json())
        .then(res => setMorosos(res))
      }
      gananciasdiarias()
      gananciasmensuales()
      visitasdiarias()
      visitasmensuales()
      morosos()
    }
  }
  const solapaEncargado = ({target}) => {
    if(target.className == 'solapapagos'){
      document.getElementsByClassName('solapapagos')[0].style.background = 'rgb(51,51,51)';
      document.getElementsByClassName('solapausuarios')[0].style.background = 'rgb(21,21,21)';
      document.getElementsByClassName('solapaescanearsticker')[0].style.background = 'rgb(21,21,21)';
      document.getElementsByClassName('solapahistorial')[0].style.background = 'rgb(21,21,21)';        
      document.getElementsByClassName('pagosencargado')[0].style.animation = 'abrir 0.5s forwards';
      document.getElementsByClassName('usuariosencargado')[0].style.animation = '';
      document.getElementsByClassName('escanearstickerencargado')[0].style.animation = '';
      document.getElementsByClassName('historialencargado')[0].style.animation = '';
    }else if(target.className == 'solapausuarios'){
      document.getElementsByClassName('solapausuarios')[0].style.background = 'rgb(51,51,51)';
      document.getElementsByClassName('solapapagos')[0].style.background = 'rgb(21,21,21)';           
      document.getElementsByClassName('solapaescanearsticker')[0].style.background = 'rgb(21,21,21)'; 
      document.getElementsByClassName('solapahistorial')[0].style.background = 'rgb(21,21,21)';
      document.getElementsByClassName('usuariosencargado')[0].style.animation = 'abrir 0.5s forwards';
      document.getElementsByClassName('pagosencargado')[0].style.animation = '';
      document.getElementsByClassName('escanearstickerencargado')[0].style.animation = '';
      document.getElementsByClassName('historialencargado')[0].style.animation = '';
      setDatoslogin({
        Nombre: '',
        Apellido: '',
        Patente: '',
        Marca: '',
        Modelo: '',
        Direccion: '',
        Telefono: ''
      })
    }else if(target.className == 'solapahistorial'){
      document.getElementsByClassName('solapahistorial')[0].style.background = 'rgb(51,51,51)';
      document.getElementsByClassName('solapapagos')[0].style.background = 'rgb(21,21,21)';           
      document.getElementsByClassName('solapausuarios')[0].style.background = 'rgb(21,21,21)'; 
      document.getElementsByClassName('solapaescanearsticker')[0].style.background = 'rgb(21,21,21)';
      document.getElementsByClassName('historialencargado')[0].style.animation = 'abrir 0.5s forwards';
      document.getElementsByClassName('usuariosencargado')[0].style.animation = '';
      document.getElementsByClassName('pagosencargado')[0].style.animation = '';
      document.getElementsByClassName('escanearstickerencargado')[0].style.animation = '';
      const listavisitas = () => {
        fetch('http://localhost:9000/api/listadevisitas')
        .then(res => res.json())
        .then(res => setListavisitas(res))
      }
      listavisitas()
    }else if(target.className == 'solapaescanearsticker'){
      document.getElementsByClassName('solapaescanearsticker')[0].style.background = 'rgb(51,51,51)';
      document.getElementsByClassName('solapapagos')[0].style.background = 'rgb(21,21,21)';           
      document.getElementsByClassName('solapausuarios')[0].style.background = 'rgb(21,21,21)'; 
      document.getElementsByClassName('solapahistorial')[0].style.background = 'rgb(21,21,21)';
      document.getElementsByClassName('escanearstickerencargado')[0].style.animation = 'abrir 0.5s forwards';
      document.getElementsByClassName('usuariosencargado')[0].style.animation = '';
      document.getElementsByClassName('pagosencargado')[0].style.animation = '';
      document.getElementsByClassName('historialencargado')[0].style.animation = '';
    }
  }
  const seleccionarPlaza = () => {
    fetch('http://localhost:9000/api/seleccionarplaza')
    .then(res => res.json())
    .then(res => setInsertarplaza(res))
  }
  const [errorUsuariosencargado,setErrorUsuariosencargado] = useState('')
  const handleSubmitUsuarios = (e) => {
    e.preventDefault()
    delete datoslogin.Rol
    delete datoslogin.Usuario
    delete datoslogin.PatenteBorrar
    delete datoslogin.Contraseña
    delete datoslogin.DNI 
    delete datoslogin.Horario
    datoslogin.Plaza = insertarplaza[0].Identificador
    const actualizarPlaza = () => {
      const requestInit = {
        method: 'PUT'
      }
      fetch('http://localhost:9000/api/actualizarplaza/'+ 'Ocupado' + '/' + insertarplaza[0].Identificador, requestInit)
      .then(res => res.json())
      .then(res => console.log(res))
    }
    actualizarPlaza()
    if(datoslogin.Nombre == '' || datoslogin.Apellido == '' || datoslogin.Patente == '' || datoslogin.Marca == '' || datoslogin.Modelo == '' || datoslogin.Direccion == '' || datoslogin.Telefono == ''){
      setErrorUsuariosencargado('Campos vacios')
      document.getElementsByClassName('patenteduplicada')[0].style.animation = 'patdup 0.5s forwards';
      setTimeout(() => {
        document.getElementsByClassName('patenteduplicada')[0].style.animation = 'patdupback 0.2s forwards';
      }, 2000);
    }else if(listadepatentes.includes(datoslogin.Patente)){
      setErrorUsuariosencargado('Patente ya exitente')
      document.getElementsByClassName('patenteduplicada')[0].style.animation = 'patdup 0.5s forwards';
      setTimeout(() => {
        document.getElementsByClassName('patenteduplicada')[0].style.animation = 'patdupback 0.2s forwards';
      }, 2000);
    }else{
    const requestInit = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(datoslogin)
    }
    fetch('http://localhost:9000/api/postusuario', requestInit)
    .then(res => res.json())
    .then(res => console.log(res))
    setDatoslogin({
      Usuario: '',
      Patente: '',
      Rol: ''
    })
    document.getElementsByClassName('inputusuariosenc')[0].value = '';
    document.getElementsByClassName('inputusuariosenc')[1].value = '';
    document.getElementsByClassName('inputusuariosenc')[2].value = '';
    document.getElementsByClassName('inputusuariosenc')[3].value = '';
    document.getElementsByClassName('inputusuariosenc')[4].value = '';
    document.getElementsByClassName('inputusuariosenc')[5].value = '';
    document.getElementsByClassName('inputusuariosenc')[6].value = '';
    }
  }
  const estadoPago = () => {
    datoslogin.Estado = ''
    fetch('http://localhost:9000/api/estadodelpago/' + datoslogin.Patente)
    .then(res => res.json())
    .then(res => datoslogin.Estado = (res.map(res => res.Estado)).toString())
  }
  const handleSubmitSticker = (e) => {
    e.preventDefault()
    if(listadepatentes.includes((datoslogin.Patente).toUpperCase())){
      if(datoslogin.Patente != '' && datoslogin.Estado == 'Pago'){
        document.getElementsByClassName('inputsticker')[0].value = '';
      setErrorUsuariosencargado('Checkeo correcto')
      document.getElementsByClassName('labelsticker')[0].style.animation = 'patdup 0.5s forwards';
      setTimeout(() => {
        document.getElementsByClassName('labelsticker')[0].style.animation = 'patdupback 0.2s forwards';
      }, 2000);
      const visita = () => {
        const listavisitas = () => {
          fetch('http://localhost:9000/api/listadevisitas')
          .then(res => res.json())
          .then(res => setListavisitas(res))
        }
        const requestInit = {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            Patente: (datoslogin.Patente).toUpperCase(),
            Dia: moment().format('L').slice(0,2),
            Mes: moment().format('L').slice(3,5),
            Año: moment().format('L').slice(6,10)
          })
        }
        fetch('http://localhost:9000/api/anadirvisita', requestInit)
        .then(res => res.json())
        .then(res => console.log(res))
        .then(listavisitas())
      }
      visita()
      datoslogin.Patente = ''
    }else{
      setErrorUsuariosencargado('Usuario debe mensualidad')
      document.getElementsByClassName('labelsticker')[0].style.animation = 'patdup 0.5s forwards';
      setTimeout(() => {
        document.getElementsByClassName('labelsticker')[0].style.animation = 'patdupback 0.2s forwards';
      }, 2000);
    }
    }else{
      setErrorUsuariosencargado('Usuario inexistente')
      document.getElementsByClassName('labelsticker')[0].style.animation = 'patdup 0.5s forwards';
      setTimeout(() => {
        document.getElementsByClassName('labelsticker')[0].style.animation = 'patdupback 0.2s forwards';
      }, 2000);
    }
  }
  const borrarUsuario = (e) => {
    e.preventDefault()
    if(datoslogin.PatenteBorrar == ''){
      document.getElementsByClassName('errorborrarusuario')[0].style.animation = 'error 0.5s forwards';
      setTimeout(() => {
        document.getElementsByClassName('errorborrarusuario')[0].style.animation = 'errorback 0.2s forwards';
      }, 2000);
    }else if(listadepatentes.includes(datoslogin.PatenteBorrar)){
    const requestInit = {
      method: 'DELETE'
    }
    fetch('http://localhost:9000/api/borrarusuario/' + datoslogin.PatenteBorrar, requestInit)
    .then(res => res.json())
    .then(res => console.log(res))
    .then(datoslogin.PatenteBorrar = '')
    document.getElementsByClassName('inputborrarusuario')[0].value= '';
  }else{
    document.getElementsByClassName('errorborrarusuario')[0].style.animation = 'error 0.5s forwards';
    setTimeout(() => {
      document.getElementsByClassName('errorborrarusuario')[0].style.animation = 'errorback 0.2s forwards';
    }, 2000);
    }
  }
  const handleSubmitEncargados = (e) => {
    e.preventDefault()
    delete datoslogin.Patente
    delete datoslogin.Mes
    delete datoslogin.Entrada
    delete datoslogin.Salida
    delete datoslogin.Plaza
    delete datoslogin.Total
    if(datoslogin.Usuario == '' || datoslogin.Contraseña == '' || datoslogin.Nombre == '' || datoslogin.Apellido == '' || datoslogin.DNI == '' || datoslogin.Horario == ''){
      setErrorUsuariosencargado('Campos vacios')
      document.getElementsByClassName('errorencadmin')[0].style.animation = 'patdup 0.5s forwards';
      setTimeout(() => {
        document.getElementsByClassName('errorencadmin')[0].style.animation = 'patdupback 0.2s forwards';
      }, 2000);
    }else if(listadni.includes(datoslogin.DNI)){
      setErrorUsuariosencargado('DNI ya exitente')
      document.getElementsByClassName('errorencadmin')[0].style.animation = 'patdup 0.5s forwards';
      setTimeout(() => {
        document.getElementsByClassName('errorencadmin')[0].style.animation = 'patdupback 0.2s forwards';
      }, 2000);
    }else{
      datoslogin.Rol = 'Encargado'
    const requestInit = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(datoslogin)
    }
    fetch('http://localhost:9000/api/postencargado', requestInit)
    .then(res => res.json())
    .then(res => console.log(res))
    setDatoslogin({
      Usuario: '',
      Patente: '',
      Rol: ''
    })
    document.getElementsByClassName('selectencadmin')[0].selectedIndex = 0;
    document.getElementsByClassName('inputencadmin')[0].value = '';
    document.getElementsByClassName('inputencadmin')[1].value = '';
    document.getElementsByClassName('inputencadmin')[2].value = '';
    document.getElementsByClassName('inputencadmin')[3].value = '';
    document.getElementsByClassName('inputencadmin')[4].value = '';
    document.getElementsByClassName('inputencadmin')[5].value = '';
    }
  }
  const deslizarPosiciones = ({target}) => {
      document.getElementsByClassName(document.getElementById(target.id).nextSibling.className)[0].style.animation = 'plazasabrir 0.3s forwards';
  }
  const deslizarPosiciones2 = ({target}) => {
    document.getElementsByClassName(document.getElementById(target.id).nextSibling.className)[0].style.animation = 'plazasabrir2 0.3s forwards';
}
  const explotarDeslizar = ({target}) => {
      document.getElementsByClassName(document.getElementById(target.id).nextSibling.className)[0].style.animation = '';
  }
  const changeHabilitacion = ({target}) => {
    const changePisoHab = () => {
      const requestInit = {
        method: 'PUT'
      }
      let opcionhab = target.style.color == 'red' ? 'Si' : 'No';
      fetch('http://localhost:9000/api/habilitarpiso/' + opcionhab + '/' + target.textContent, requestInit)
      .then(res => res.json())
      .then(res => console.log(res))
    }
    changePisoHab()
    target.style.color = target.style.color == 'red' ? 'lime' : 'red';
  }
  const [gananciasdiarias, setGananciasdiarias] = useState([]);
  const [gananciasmensuales, setGananciasmensuales] = useState([]);
  const [visitasdiarias, setVisitasdiarias] = useState([]);
  const [visitasmensuales, setVisitasmensuales] = useState([]);
  const [morosos, setMorosos] = useState([]);
  const solapasInformes = ({target}) => {
    if(target.className == 'gananciasdiarias'){
      document.getElementsByClassName('gananciasdiariasinforme')[0].style.visibility = 'visible';
      document.getElementsByClassName('gananciasmensualesinforme')[0].style.visibility = 'hidden';
      document.getElementsByClassName('visitasdiariasinforme')[0].style.visibility = 'hidden';
      document.getElementsByClassName('visitasmensualesinforme')[0].style.visibility = 'hidden';
      document.getElementsByClassName('morososinforme')[0].style.visibility = 'hidden';
    }else if(target.className == 'gananciasmensuales'){
      document.getElementsByClassName('gananciasdiariasinforme')[0].style.visibility = 'hidden';
      document.getElementsByClassName('gananciasmensualesinforme')[0].style.visibility = 'visible';
      document.getElementsByClassName('visitasdiariasinforme')[0].style.visibility = 'hidden';
      document.getElementsByClassName('visitasmensualesinforme')[0].style.visibility = 'hidden';
      document.getElementsByClassName('morososinforme')[0].style.visibility = 'hidden';
    }else if(target.className == 'visitasdiarias'){
      document.getElementsByClassName('gananciasdiariasinforme')[0].style.visibility = 'hidden';
      document.getElementsByClassName('gananciasmensualesinforme')[0].style.visibility = 'hidden';
      document.getElementsByClassName('visitasdiariasinforme')[0].style.visibility = 'visible';
      document.getElementsByClassName('visitasmensualesinforme')[0].style.visibility = 'hidden';
      document.getElementsByClassName('morososinforme')[0].style.visibility = 'hidden';
    }else if(target.className == 'visitasmensuales'){
      document.getElementsByClassName('gananciasdiariasinforme')[0].style.visibility = 'hidden';
      document.getElementsByClassName('gananciasmensualesinforme')[0].style.visibility = 'hidden';
      document.getElementsByClassName('visitasdiariasinforme')[0].style.visibility = 'hidden';
      document.getElementsByClassName('visitasmensualesinforme')[0].style.visibility = 'visible';
      document.getElementsByClassName('morososinforme')[0].style.visibility = 'hidden';
    }else if(target.className == 'morosos'){
      document.getElementsByClassName('gananciasdiariasinforme')[0].style.visibility = 'hidden';
      document.getElementsByClassName('gananciasmensualesinforme')[0].style.visibility = 'hidden';
      document.getElementsByClassName('visitasdiariasinforme')[0].style.visibility = 'hidden';
      document.getElementsByClassName('visitasmensualesinforme')[0].style.visibility = 'hidden';
      document.getElementsByClassName('morososinforme')[0].style.visibility = 'visible';
    }
  }
  const handleSubmitPrecioinvitado = (e) => {
    e.preventDefault()
    setPreciohora(datoslogin.Precioinvitado)
    const cargarprecio = () => {
      const requestInit = {
        method: 'PUT',
      }
      fetch('http://localhost:9000/api/precioinvitado/' + datoslogin.Precioinvitado, requestInit)
      .then(res => res.json())
      .then(res => console.log(res))
    }
    cargarprecio()
    document.getElementsByClassName('inputprecioinvitado')[0].value = '';
    setDatoslogin({
      Precioinvitado: ''
    })
  }
  const handleSubmitMensualidad = (e) => {
    e.preventDefault()
    setMensualidad(datoslogin.Mensualidad)
    const cargarprecio = () => {
      const requestInit = {
        method: 'PUT',
      }
      fetch('http://localhost:9000/api/mensualidad/' + datoslogin.Mensualidad, requestInit)
      .then(res => res.json())
      .then(res => console.log(res))
    }
    cargarprecio()
    document.getElementsByClassName('inputmensualidad')[0].value = '';
    setDatoslogin({
      Mensualidad: ''
    })
  }
  return (  
    <>
    <div className='contenedorlogin'>
      <div className='menulogin'>
        <div className='menubotones'>
          <label className='ingresolabel'>Ingreso</label>
          <button onClick={abrirUsuarioLogin} className='usuarioboton'>Usuario</button>
          <button onClick={abrirEncargadoLogin} className='encargadoboton'>Encargado</button>
          <button onClick={abrirInvitadoLogin} className='invitadoboton'>Invitado</button>
        </div>
        <div className='contenedorerror'>
          <img className='errorimg' src={require('../Imagenes/Error.png')}/>
          <label className='errorlabel'>{error}</label>
        </div>
        <div className='menuusuario'>
          <img className='flechaatras' onClick={volverAtras} src={require('../Imagenes/FlechaAtras.png')}/>
          <label className='usuariolabel'>Usuario</label>
          <form onSubmit={handleSubmit} className='formusuario'>
            <input onChange={handleChange} name='Patente' className='inputpatenteusuario' autoComplete='off' placeholder='Patente'/>
            <label className='labelinputpatente'>Patente</label>
            <button type='submit' className='buttonusuario'>Ingresar</button>
          </form>
        </div>
        <div className='menuencargado'>
        <img className='flechaatras' onClick={volverAtras} src={require('../Imagenes/FlechaAtras.png')}/>
          <label className='encargadolabel'>Encargado</label>
          <form onSubmit={handleSubmit} className='formencargado'>
            <input onChange={handleChange} name='Usuario' className='inputencargado' autoComplete='off' placeholder='Usuario'/>
            <label className='labelinputencargado'>Usuario</label>
            <input onChange={handleChange} name='Contraseña' className='inputpatenteencargado' autoComplete='off' placeholder='Contraseña'/>
            <label className='labelinputpatenteencargado'>Contraseña</label>
            <button type='submit' className='buttonencargado'>Ingresar</button>
          </form>
        </div> 
        <div className='menuinvitado'>
        <img className='flechaatras' onClick={volverAtras} src={require('../Imagenes/FlechaAtras.png')}/>
          <label className='invitadolabel'>Invitado</label>
          <form onSubmit={handleSubmitInvitado} className='forminvitado'>
            <input onChange={handleChange} name='Patente' className='inputpatenteinvitado' autoComplete='off' placeholder='Patente'/>
            <label className='labelinputpatenteinvitado'>Patente</label>
            <select onChange={handleChange} name='Entrada' className='inputentradainvitado' autoComplete='off' placeholder='Hora de entrada'>
            <option value='0000'>00:00</option><option value='0030'>00:30</option><option value='0100'>01:00</option><option value='0130'>01:30</option><option value='0200'>02:00</option><option value='0230'>02:30</option><option value='0300'>03:00</option><option value='0330'>03:30</option><option value='0400'>04:00</option><option value='0430'>04:30</option><option value='0500'>05:00</option><option value='0530'>05:30</option><option value='0600'>06:00</option><option value='0630'>06:30</option><option value='0700'>07:00</option><option value='0730'>07:30</option><option value='0800'>08:00</option><option value='0830'>08:30</option><option value='0900'>09:00</option><option value='0930'>09:30</option><option value='1000'>10:00</option><option value='1030'>10:30</option><option value='1100'>11:00</option><option value='1130'>11:30</option>
            <option value='1200'>12:00</option><option value='1230'>12:30</option><option value='1300'>13:00</option><option value='1330'>13:30</option><option value='1400'>14:00</option><option value='1430'>14:30</option><option value='1500'>15:00</option><option value='1530'>15:30</option><option value='1600'>16:00</option><option value='1630'>16:30</option><option value='1700'>17:00</option><option value='1730'>17:30</option><option value='1800'>18:00</option><option value='1830'>18:30</option><option value='1900'>19:00</option><option value='1930'>19:30</option><option value='2000'>20:00</option><option value='2030'>20:30</option><option value='2100'>21:00</option><option value='2130'>21:30</option><option value='2200'>22:00</option><option value='2230'>22:30</option><option value='2300'>23:00</option><option value='2330'>23:30</option>
            </select>
            <label className='labelinputentradainvitado'>Hora de entrada</label>
            <input type='tel' min='0' onChange={handleTurnosChange} value={value} name='Salida' className='inputsalidainvitado' autoComplete='off' placeholder='Turnos (x1:30hs)'/>
            <label className='labelinputsalidainvitado'>Turnos</label>
            <button onMouseOver={infoInvitado()} type='submit' className='buttoninvitado'>Ingresar</button>
          </form>
        </div>
      </div>
      {/* //////////////////////////////////////////////////////////////// */}
      <div className='contenedorroles'>
        <div className='contusuario'>
          <img className='xsalir' onClick={volverAtras} src={require('../Imagenes/Xsalir.png')}/>
          <div className='qrusuario'>
            <img className='qr1' src={require('../Imagenes/QR.png')}/>
          </div>
          <div className='lugarhorausuario'>
            <label className='titulodatosusuario'>DATOS</label>
            <div className='plazausuario'><label>Plaza: </label><label>{infousuario.map(inf => inf.Plaza)}</label></div>
            <div className='entradausuario'><label>Mensualidad: </label><label>{(numeral(mensualidad).format('0,0')).replace(",",".")}</label></div>
            <div className='salidausuario'><label>Estado: </label><label>{infousuario.map(inf => inf.Estado)}</label></div>
          </div>
        </div>
        <div className='contencargado'>
          <div className='solapasencargado'>
            <div onClick={solapaEncargado} className='solapapagos'>Pagos</div>
            <div onClick={solapaEncargado} className='solapausuarios'>Usuario</div>
            <div onClick={solapaEncargado} className='solapahistorial'>Historial</div>
            <div onClick={solapaEncargado} className='solapaescanearsticker'>Sticker</div>
          </div>
          <img className='xsalir' onClick={volverAtras} src={require('../Imagenes/Xsalir.png')}/>
          <div className='pagosencargado'>
            <label className='labelpagos'>PAGOS</label>
            <div className='selectpago'>
              <label className='infopagoscobros'>Cobrado</label>
              <form onSubmit={handleSubmitPagos} className='formpagosinvitado'>   
                <select onChange={actualizarinvitado} name='Patente' className='selectpatente'>
                  <option selected disabled>Patentes</option>
                  {nopagoinvitado.map(nop => (
                    <>
                    <option>{nop.Patente}</option>
                    </>
                    ))}
                  {nopagousuario.map(nop => (
                    <>
                    <option>{nop.Patente}</option>
                    </>
                  ))}
                </select>
                <button type='submit' className='cobrarinvitado'>Cobrar</button>
              </form>
            </div>
            <div className='datosnopago'>
              {datosnopagototal.map(sel => (
                <>
                  <div><label>Patente: </label><label>{sel.Patente}</label></div>
                  <div><label>Plaza: </label><label>{sel.Plaza}</label></div>
                  <div><label>Entrada: </label><label>{sel.Entrada = sel.Entrada == undefined ? '-' : sel.Entrada}</label></div>
                  <div><label>Salida: </label><label>{sel.Salida = sel.Salida == undefined ? '-' : sel.Salida}</label></div>
                  <div><label>Total $: </label><label>{sel.Total = sel.Total == undefined ? (numeral(mensualidad).format('0,0')).replace(",",".") : sel.Total}</label></div>
                </> 
              ))}
            </div>
          </div>
          {/* //////////////////////// */}
          <div className='usuariosencargado'>
            <label className='patenteduplicada'>{errorUsuariosencargado}</label>
            <form className='formborrarusuario' onSubmit={borrarUsuario}>
              <input onChange={handleChange} name='PatenteBorrar' className='inputborrarusuario' type='text' placeholder='Patente' autoComplete='off'/>
              <button type='submit' className='borrarusuariosencargado'>Borrar</button>
              <label className='errorborrarusuario'>Usuario inexistente</label>
            </form>
            <label className='labelusuariostit'>CREAR USUARIOS</label>
            <form onSubmit={handleSubmitUsuarios} className='formusuariosenc'>
              <div>
              <input onChange={handleChange} className='inputusuariosenc' name='Nombre' autoComplete='off' placeholder='Nombre'/>
              <label className='labelusuariosenc'>Nombre</label>
              <input onChange={handleChange} className='inputusuariosenc' name='Apellido' autoComplete='off' placeholder='Apellido'/>
              <label className='labelusuariosenc'>Apellido</label>
              <input onChange={handleChange} className='inputusuariosenc' name='Patente' autoComplete='off' placeholder='Patente'/>
              <label className='labelusuariosenc'>Patente</label>
              <input onChange={handleChange} className='inputusuariosenc' name='Marca' autoComplete='off' placeholder='Marca'/>
              <label className='labelusuariosenc'>Marca</label>
              </div>
              <div>
              <input onChange={handleChange} className='inputusuariosenc' name='Modelo' autoComplete='off' placeholder='Modelo'/>
              <label className='labelusuariosenc'>Modelo</label>
              <input onChange={handleChange} className='inputusuariosenc' name='Direccion' autoComplete='off' placeholder='Dirección'/>
              <label className='labelusuariosenc'>Dirección</label>
              <input onChange={handleChange} className='inputusuariosenc' name='Telefono' autoComplete='off' placeholder='Teléfono'/>
              <label className='labelusuariosenc'>Teléfono</label>
              <button onMouseOver={seleccionarPlaza} type='submit' className='buttonusuariosenc'>Cargar</button>
              </div>
            </form>
          </div>
          {/* /////////////////////////////////// */}
              <div className='historialencargado'>
                <div className='dataviewhistorial'>
                  <div>
                    <h2 className='historialt1'>Fecha</h2>
                    <h2 className='historialt1'>Patente</h2>
                  </div>
                  
                  {listavisitas.map(lis => (
                    <div>
                    <label>{lis.Dia + '/' + lis.Mes + '/' + lis.Año}</label>
                    <label>{lis.Patente}</label>
                    </div>
                  ))}
                </div>
              </div>
          {/* /////////////////////////////////// */}
            <div className='escanearstickerencargado'>
              <label className='labelsticker'>{errorUsuariosencargado}</label>
              <div className='sticker'>
                <form onSubmit={handleSubmitSticker}>
                  <input onChange={handleChange} name='Patente' className='inputsticker' placeholder='patente' autoComplete='off'/>
                  <button onMouseOver={estadoPago} type='submit' className='buttonsticker'>Escanear</button>  
                </form>
                <label className='stickerlinea1'>-------------------------------</label>
                <img className='qr2' src={require('../Imagenes/QR.png')}/>
                <label className='stickerlinea2'>-------------------------------</label>
              </div>

            </div>
        </div>
        <div className='continvitado'>
          <div className='conterrorinvitadosalir'>
            <label>Debes acercarte al encargado de turno para abonar tu estadía antes de salir.</label>
          </div>
          <div className='continvitadobotones'>
            <div className='qrinvitado'>
              <img className='qr1' src={require('../Imagenes/QR.png')}/>
              <label className='estadoinvitado'>{datosinvitado.map(dat => dat.Estado)}</label>
              <label className='precioinvitado'>${datosinvitado.map(pre => pre.Total)}</label>
            </div>
            <div className='datosinvitado'>
              <label className='titulodatosinvitado'>DATOS</label>
              <div className='plazainvitado'><label>Plaza: </label><label>{insertarplaza.map(ins => ins.Identificador)}</label></div>
              <div className='entradainvitado'><label>Entrada: </label><label>{datosinvitado.map(dat => dat.Entrada)}</label></div>
              <div className='salidainvitado'><label>Salida: </label><label>{datosinvitado.map(dat => dat.Salida)}</label></div>
              <button onMouseOver={infoInvitado} onClick={irseInvitado} className='invitadomenuboton'>Salir</button>
            </div>
          </div>
        </div>
      </div> 
      <div className='contenedoradmin'>
        <div className='accionesadmin'>
          <label>ACCIONES</label>
            <form onSubmit={handleSubmitPrecioinvitado} className='formprecioinvitado'>
              <input onChange={handleChange} className='inputprecioinvitado' name='Precioinvitado' autoComplete='off' placeholder='Precio 1:30'/>
              <label className='labelprecioinvitado'>Precio 1:30</label>
              <button className='buttonprecioinvitado' type='submit'>Establecer</button>
            </form>
            <form onSubmit={handleSubmitMensualidad} className='formmensualidad'>
              <input onChange={handleChange} className='inputmensualidad' name='Mensualidad' autoComplete='off' placeholder='Mensualidad'/>
              <label className='labelmensualidad'>Mensualidad</label>
              <button className='buttonmensualidad' type='submit'>Establecer</button>
            </form>
        </div>
      <img className='xsalir xsaliradmin' onClick={volverAtras} src={require('../Imagenes/Xsalir.png')}/>
        <div className='solapasadmin'>
          <div onClick={solapaAdmin} className='solapaencargados'>Encargados</div>
          <div onClick={solapaAdmin} className='solapapisos'>Pisos</div>
          <div onClick={solapaAdmin} className='solapainformes'>Informes</div>
        </div>
        {/* ////////////////////////// */}
        <div className='encargadosadmin'>
          <label className='errorencadmin'>{errorUsuariosencargado}</label>
          <label className='labelusuariostit'>CREAR ENCARGADO</label>
            <form onSubmit={handleSubmitEncargados} className='formencadmin'>
              <div>
              <input onChange={handleChange} className='inputencadmin' name='Usuario' autoComplete='off' placeholder='Usuario'/>
              <label className='labelencadmin'>Usuario</label>
              <input onChange={handleChange} className='inputencadmin' name='Contraseña' autoComplete='off' placeholder='Contraseña'/>
              <label className='labelencadmin'>Contraseña</label>
              <input onChange={handleChange} className='inputencadmin' name='Nombre' autoComplete='off' placeholder='Nombre'/>
              <label className='labelencadmin'>Nombre</label>
              <input onChange={handleChange} className='inputencadmin' name='Apellido' autoComplete='off' placeholder='Apellido'/>
              <label className='labelencadmin'>Apellido</label>
              </div>
              <div>
              <input onChange={handleChange} className='inputencadmin' name='DNI' autoComplete='off' placeholder='DNI'/>
              <label className='labelencadmin'>DNI</label>
              <select onChange={handleChange} className='inputencadmin selectencadmin'>
                <option disabled>Horario</option>
                <option value='Mañana'>Mañana</option>
                <option value='Tarde'>Tarde</option>
                <option value='Noche'>Noche</option>
              </select>
              {/* <input onChange={handleChange} className='inputencadmin' name='Horario' autoComplete='off' placeholder='Horario'/> */}
              <label className='labelencadmin'>Horario</label>
              <button onMouseOver={seleccionarPlaza} type='submit' className='buttonencadmin'>Cargar</button>
              </div>
            </form>
        </div>
        {/* ///////////////////////// */}
        <div className='pisosadmin'>
          <div className='pisos'>
              <div onClick={changeHabilitacion} onMouseOver={deslizarPosiciones} onMouseLeave={explotarDeslizar} id='0' className='sub3'>-3</div>
              <div className='plazasM3'><label id='m3-1'>1</label><label id='m3-2'>2</label><label id='m3-3'>3</label><label id='m3-4'>4</label><label id='m3-5'>5</label><label id='m3-6'>6</label><label id='m3-7'>7</label><label id='m3-8'>8</label><label id='m3-9'>9</label><label id='m3-10'>10</label></div>
              <div onClick={changeHabilitacion} onMouseOver={deslizarPosiciones} onMouseLeave={explotarDeslizar} id='1' className='sub2'>-2</div>
              <div className='plazasM2'><label id='m2-1'>1</label><label id='m2-2'>2</label><label id='m2-3'>3</label><label id='m2-4'>4</label><label id='m2-5'>5</label><label id='m2-6'>6</label><label id='m2-7'>7</label><label id='m2-8'>8</label><label id='m2-9'>9</label><label id='m2-10'>10</label></div>
              <div onClick={changeHabilitacion} onMouseOver={deslizarPosiciones} onMouseLeave={explotarDeslizar} id='2' className='sub1'>-1</div>
              <div className='plazasM1'><label id='m1-1'>1</label><label id='m1-2'>2</label><label id='m1-3'>3</label><label id='m1-4'>4</label><label id='m1-5'>5</label><label id='m1-6'>6</label><label id='m1-7'>7</label><label id='m1-8'>8</label><label id='m1-9'>9</label><label id='m1-10'>10</label></div>
              <div onClick={changeHabilitacion} onMouseOver={deslizarPosiciones} onMouseLeave={explotarDeslizar} id='3' className='pis1'>1</div>
              <div className='plazasP1'><label id='p1-1'>1</label><label id='p1-2'>2</label><label id='p1-3'>3</label><label id='p1-4'>4</label><label id='p1-5'>5</label><label id='p1-6'>6</label><label id='p1-7'>7</label><label id='p1-8'>8</label><label id='p1-9'>9</label><label id='p1-10'>10</label></div>
              <div onClick={changeHabilitacion} onMouseOver={deslizarPosiciones} onMouseLeave={explotarDeslizar} id='4' className='pis2'>2</div>
              <div className='plazasP2'><label id='p2-1'>1</label><label id='p2-2'>2</label><label id='p2-3'>3</label><label id='p2-4'>4</label><label id='p2-5'>5</label><label id='p2-6'>6</label><label id='p2-7'>7</label><label id='p2-8'>8</label><label id='p2-9'>9</label><label id='p2-10'>10</label></div>
              <div onClick={changeHabilitacion} onMouseOver={deslizarPosiciones} onMouseLeave={explotarDeslizar} id='5' className='pis3'>3</div>
              <div className='plazasP3'><label id='p3-1'>1</label><label id='p3-2'>2</label><label id='p3-3'>3</label><label id='p3-4'>4</label><label id='p3-5'>5</label><label id='p3-6'>6</label><label id='p3-7'>7</label><label id='p3-8'>8</label><label id='p3-9'>9</label><label id='p3-10'>10</label></div>
            </div>
            <div className='pisos'> 
              <div onClick={changeHabilitacion} onMouseOver={deslizarPosiciones2} onMouseLeave={explotarDeslizar} id='6' className='pis4'>4</div>
              <div className='plazasP4'><label id='p4-10'>10</label><label id='p4-9'>9</label><label id='p4-8'>8</label><label id='p4-7'>7</label><label id='p4-6'>6</label><label id='p4-5'>5</label><label id='p4-4'>4</label><label id='p4-3'>3</label><label id='p4-2'>2</label><label id='p4-1'>1</label></div>
              <div onClick={changeHabilitacion} onMouseOver={deslizarPosiciones2} onMouseLeave={explotarDeslizar} id='7' className='pis5'>5</div>
              <div className='plazasP5'><label id='p5-10'>10</label><label id='p5-9'>9</label><label id='p5-8'>8</label><label id='p5-7'>7</label><label id='p5-6'>6</label><label id='p5-5'>5</label><label id='p5-4'>4</label><label id='p5-3'>3</label><label id='p5-2'>2</label><label id='p5-1'>1</label></div>
              <div onClick={changeHabilitacion} onMouseOver={deslizarPosiciones2} onMouseLeave={explotarDeslizar} id='8' className='pis6'>6</div>
              <div className='plazasP6'><label id='p6-10'>10</label><label id='p6-9'>9</label><label id='p6-8'>8</label><label id='p6-7'>7</label><label id='p6-6'>6</label><label id='p6-5'>5</label><label id='p6-4'>4</label><label id='p6-3'>3</label><label id='p6-2'>2</label><label id='p6-1'>1</label></div>
              <div onClick={changeHabilitacion} onMouseOver={deslizarPosiciones2} onMouseLeave={explotarDeslizar} id='9' className='pis7'>7</div>
              <div className='plazasP7'><label id='p7-10'>10</label><label id='p7-9'>9</label><label id='p7-8'>8</label><label id='p7-7'>7</label><label id='p7-6'>6</label><label id='p7-5'>5</label><label id='p7-4'>4</label><label id='p7-3'>3</label><label id='p7-2'>2</label><label id='p7-1'>1</label></div>
              <div onClick={changeHabilitacion} onMouseOver={deslizarPosiciones2} onMouseLeave={explotarDeslizar} id='10' className='pis8'>8</div>
              <div className='plazasP8'><label id='p8-10'>10</label><label id='p8-9'>9</label><label id='p8-8'>8</label><label id='p8-7'>7</label><label id='p8-6'>6</label><label id='p8-5'>5</label><label id='p8-4'>4</label><label id='p8-3'>3</label><label id='p8-2'>2</label><label id='p8-1'>1</label></div>
              <div onClick={changeHabilitacion} onMouseOver={deslizarPosiciones2} onMouseLeave={explotarDeslizar} id='11' className='pis9'>9</div>
              <div className='plazasP9'><label id='p9-10'>10</label><label id='p9-9'>9</label><label id='p9-8'>8</label><label id='p9-7'>7</label><label id='p9-6'>6</label><label id='p9-5'>5</label><label id='p9-4'>4</label><label id='p9-3'>3</label><label id='p9-2'>2</label><label id='p9-1'>1</label></div>
          </div>
        </div>
        {/* ////////////////////////// */}
        <div className='informesadmin'>
          <div className='opcionesinformesadmin'>
            <button onClick={solapasInformes} className='gananciasdiarias'>Ganancias diarias</button>
            <button onClick={solapasInformes} className='gananciasmensuales'>Ganancias mensuales</button>
            <button onClick={solapasInformes} className='visitasdiarias'>Visitas diarias</button>
            <button onClick={solapasInformes} className='visitasmensuales'>Visitas mensuales</button>
            <button onClick={solapasInformes} className='morosos'>Morosos</button>
          </div>
          <div className='viewinformesadmin'>
            <div className='gananciasdiariasinforme'>
            <div className='titulosadmin'>
              <label className='historialt1'>Fecha</label>
              <label className='historialt1'>Ganancia</label>
              </div>
              {gananciasdiarias.map(gan => (
                <div>
                <label>{gan.Dia + '/' + gan.Mes + '/' + gan.Año}</label>
                <label>{(numeral(parseFloat(gan.Ganancia)).format('0,0')).replace(",",".")}</label>
                </div>
              ))}
            </div>
            <div className='gananciasmensualesinforme'>
            <div className='titulosadmin'>
              <label className='historialt1'>Fecha</label>
              <label className='historialt1'>Ganancia</label>
              </div>
              {gananciasmensuales.map(gan => (
                <div>
                <label>{gan.Mes + '/' + gan.Año}</label>
                <label>{(numeral(parseFloat(gan.Ganancia)).format('0,0')).replace(",",".")}</label>
                </div>
              ))}
            </div>
            <div className='visitasdiariasinforme'>
              <div className='titulosadmin'>
              <label className='historialt1'>Fecha</label>
              <label className='historialt1'>Visitas</label>
              </div>
              {visitasdiarias.map(vis => (
                <div>
                <label>{vis.Dia + '/' + vis.Mes + '/' + vis.Año}</label>
                <label>{vis.Visitas}</label>
                </div>
              ))}
            </div>
            <div className='visitasmensualesinforme'>
            <div className='titulosadmin'>
              <label className='historialt1'>Fecha</label>
              <label className='historialt1'>Visitas</label>
              </div>
              {visitasmensuales.map(vis => (
                <div>
                <label>{vis.Mes + '/' + vis.Año}</label>
                <label>{vis.Visitas}</label>
                </div>
              ))}
            </div>
            <div className='morososinforme'>
            <div className='titulosadmin'>
              <label className='historialt1'>Patente</label>
              <label className='historialt1'>Estado</label>
              </div>
              {morosos.map(mor => (
                <div>
                <label>{mor.Patente}</label>
                <label>{mor.Estado}</label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
