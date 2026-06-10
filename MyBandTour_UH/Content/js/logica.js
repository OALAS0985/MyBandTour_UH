
function CrearConcierto() {

    let cod = document.getElementById('txtCodigo').value;
    let ban = document.getElementById('txtBanda').value;
    let gen = document.getElementById('txtGenero').value;
    let fec = document.getElementById('txtFecha').value;
    let hor = document.getElementById('txtHora').value;
    let pai = document.getElementById('txtPais').value;
    let dir = document.getElementById('txtDireccion').value;

    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: '/Conciertos/InsertarConcierto',
        data: { 'codigo': cod, "banda": ban, "genero": gen, "fecha": fec, "hora": hor, "pais": pai, "direccion": dir },
        success: function (respuesta) {

            if (parseInt(respuesta.Codigo) > 0) {
                alert('Concierto Creado con éxito');
            }
            else {
                alert('El concierto no se puede crear, intentelo nuevamente')
            }

        },
        error: function (error) {
            alert('Ha ocurrido un error, inténtelo de nuevo')
        }
    });
}

function EjecutarEliminarConcierto() {
    let cod = document.getElementById('codigoConcierto').value;
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: '/Conciertos/EliminarConciertos',
        data: { 'codigo': cod },
        success: function (respuesta) {
            if (cod=="") {
                alert('Digite el código de concierto a eliminar')
            }
          
            else {
                alert('Concierto eliminado con éxito')
            }
            

        },
        error: function (error) {
            alert('Ha ocurrido un error, inténtelo de nuevo')
        }
    });

}




function EjecutarConsultaConciertos() {
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: '/Conciertos/ConsultarConciertos',
        data: {},
        success: function (respuesta) {
            let cuerpoTabla1 = document.getElementById('bodyTabla');
            cuerpoTabla1.innerHTML = '';
            for (let i = 0; i < respuesta.Lista.length; i++) {
                let fila = cuerpoTabla1.insertRow();
                let id = fila.insertCell(0);
                id.innerHTML = respuesta.Lista[i].Id;
                let codigo = fila.insertCell(1);
                codigo.innerHTML = respuesta.Lista[i].Codigo;
                let banda = fila.insertCell(2);
                banda.innerHTML = respuesta.Lista[i].Banda;
                let genero = fila.insertCell(3);
                genero.innerHTML = respuesta.Lista[i].Genero;
                let fecha = fila.insertCell(4);
                fecha.innerHTML = respuesta.Lista[i].Fecha;
                let hora = fila.insertCell(5);
                hora.innerHTML = respuesta.Lista[i].Hora;
                let pais = fila.insertCell(6);
                pais.innerHTML = respuesta.Lista[i].Pais;
                let direccion = fila.insertCell(7);
                direccion.innerHTML = respuesta.Lista[i].Direccion;

            }

        },
        error: function (error) {
            alert('Ha ocurrido un error, inténtelo de nuevo')
        }
    });

}


function EjecutarBuscaConciertos() {
    let nombre = document.getElementById('nombre').value;
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: '/Conciertos/BuscarConciertos',
        data: { 'banda': nombre },
        success: function (respuesta) {

            if (nombre=="") {
                alert('Ha ocurrido un error, inténtelo de nuevo')
            }
            else {
                let cuerpoTabla1 = document.getElementById('bodyTabla');
                cuerpoTabla1.innerHTML = '';
                for (let i = 0; i < respuesta.Lista.length; i++) {
                    let fila = cuerpoTabla1.insertRow();
                    let id = fila.insertCell(0);
                    id.innerHTML = respuesta.Lista[i].Id;
                    let codigo = fila.insertCell(1);
                    codigo.innerHTML = respuesta.Lista[i].Codigo;
                    let banda = fila.insertCell(2);
                    banda.innerHTML = respuesta.Lista[i].Banda;
                    let genero = fila.insertCell(3);
                    genero.innerHTML = respuesta.Lista[i].Genero;
                    let fecha = fila.insertCell(4);
                    fecha.innerHTML = respuesta.Lista[i].Fecha;
                    let hora = fila.insertCell(5);
                    hora.innerHTML = respuesta.Lista[i].Hora;
                    let pais = fila.insertCell(6);
                    pais.innerHTML = respuesta.Lista[i].Pais;
                    let direccion = fila.insertCell(7);
                    direccion.innerHTML = respuesta.Lista[i].Direccion;

                }
            }
            

        },
        error: function (error) {
            alert('Ha ocurrido un error, inténtelo de nuevo')
        }
    });

}


function EjecutarLogin() {

    let usu = document.getElementById('txtUsuario').value;
    let pass = document.getElementById('txtPassword').value;


    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: '/Conciertos/ValidarLogin',
        data: { 'usuario': usu, "contrasena": pass },
        success: function (respuesta) {
            if (respuesta.Estado == 'Autenticado') {
                window.location.replace('/Conciertos/Dashboard');
            }
            else {
                alert('Usuario o contraseña invalido.')
            }

        },
        error: function (error) {
            alert('Ha ocurrido un error, inténtelo de nuevo')
        }
    });

}

function CerrarSesion() {



    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: '/Conciertos/Logout',
        data: {},
        success: function (respuesta) {
            if (respuesta.Estado == 'Sesion Cerrada') {
                window.location.replace('/Conciertos/Login');
            }
            else {
                alert('No se pudo cerrar sesion')
            }

        },
        error: function (error) {
            alert('Ha ocurrido un error, inténtelo de nuevo')
        }
    });
}

