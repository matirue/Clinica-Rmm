Tengo hecho 2 pipe y 1 directiva

turnos:
colleccion turnos donde esta el alta con especialista, fecha, hora y su estado
turnos = {
    especialista: saraza,
    paciente: saraza,
    fecha: 2021-05-25,
    hora: 18:00,
    estado: RECHAZADO,
}

coleccion cancelar turnos donde esta el paciente, especialista, coleccion de turno, fecha y hora de baja y su estado

estadosTurnos = {
    especialista: "saraza",
    paciente: "saraza",
    fecha: 2021-05-25,
    hora: 18:00,
    estado: "ACEPTADO",
    turno: "saraza",
    comentario?: "motivo del rechazo, cancelacion o comentario/reseña en caso de que haya"
    diagnostico?: "diagnostico del medico en caso de que haya"
}

Modificar para que se vea responsive para celular

1 solo click para sacar turno: 10
2 click para sacar turno: 8
NO USAR TABLE: Chequear si funca ul li
para sacar turno mostrar todos los medicos de una para elegir los horarios con 2 click

Para sprint 3:
modificar alta:
mostrar TODOS los especialistas
1) listado con 1 boton por cada profesional por c/u de sus especialidades, si el medico tiene varias especialidades muestro un listado de
ese medico con las distintas especialidades, apellido, foto de perfil
2) cuando selecciono uno permite listar en otro componente botones,
cada boton muestra fecha y hora ordenado por fecha
el texto del boton puede tener un pipe donde acorte el texto
3) abajo se tiene un listado de fav button con todas las especialidades con imagenes distintas, solamente para especialidades predeterminadas, nuevas especialidades se agregan
con foto por defecto, este mismo componente de listado de especialidades (ngfor y button) filtra el listado especialistas para sacar turno


en seleccion de disponibilidad
lunes a sabado
rango de horario con slider
inicio y candidad de horar
que calcule la cantidad de turnos por dia y especialidad
sin calendar, sin select ni datetime picker
con slider selecciono candidad de turnos
//HECHO

Corregir de sprint 2
La reseña es una descripcion del turno que se debe mostrar en historia clinica
agregar 3 valores dinamicos para la historia clinica
para el alta
distinta fotos del profesional y por cada una, detalle de especialidad



Para sprint 3:
cuando el especialista ingresa, en la parte de sus pacientes:
mostrar los pacientes con card de bootstrap con detalle de las ultimas 3 atenciones
y un boton que acceda a la historia clinica
//HECHO


Mi perfil administrador:
* [X] ~~*Descargar excel con los datos de los turnos que tomo y con quien los tomo.*~~ [2021-06-09]

y para el perfil de usuario MI PERFIL los pacientes pueden descargar un PDF
* [X] ~~*de todas las atenciones hechas por ESPECIALIDAD (historial de turno por especialidad)*~~ [2021-06-09]
//HECHO


* [X] ~~*Pasarle un profesional a un pipe y mostrar solo nombre y apellido para responsive se puede usar el template de pricing o jumbotron*~~ [2021-06-09]

* [X] ~~*botones en el navbar y no en el toggle logged*~~ [2021-06-09]

* [ ] Animaciones de pagina desde abajo