const hbs = require('hbs');
const fs = require('fs');

hbs.registerHelper("listOfer", () => {
    listaCursos = require('./../cursostdea.json');
    let texto = ""
    var i=0;
    listaCursos.forEach(curso => {
        if (curso.estado === "Disponible") {
            texto += `
            <div class="accordion-item">
                <h2 class="accordion-header" id="one${i}">
                    <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#two${i}" aria-expanded="true" aria-controls="two${i}">
                        <strong>Curso de ${curso.nombre}</strong>&nbsp; valor:$${curso.valor}
                    </button>
                </h2>
                <div id="two${i}" class="accordion-collapse collapse" aria-labelledby="one${i}" data-bs-parent="#accordionExample">
                    <div class="accordion-body">
                        <strong>Modalidad:</strong>&nbsp; ${curso.modalidad}.<br>
                        <strong>Descripción:</strong>&nbsp; ${curso.descripcion}.<br><br>
                        <button type="button" class="btn btn-outline-success" data-toggle="modal" data-target="#myModal${i}">Inscribirme</button>
                    </div>
                </div>
            </div>
      
            <div class="modal fade" id="myModal${i}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Diligencie sus Datos</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">

                            <form action="/inscripcion" method="post">
                                Curso a Matricular
                                <select name="idCurso" id="idCurso">
                                    <option value="${curso.id}">${curso.nombre}</option>
                                </select>
                                <br><br>
                                <br><br>
                                <input type="text" name="nombre" placeholder="Nombre" required><br><br>
                                <input type="number" name="cedula"  placeholder="Cedula" required><br><br>
                                <input type="number" name="telefono"  placeholder="Telefono" required><br><br>
                                <input type="email" name="correo"  placeholder="Correo" required><br><br>
                                <br><br>
                                <button>Matricular</button>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">salir</button>
                        </div>
                    </div>
                </div>
            </div>`
            i+=1;
        }
    });
    return texto;
});

hbs.registerHelper("inscribirse", (ced, nom, correo, telefono, idcurso) => {
    if (nom) {
        listaCursos = require('./../cursostdea.json');
        let curso = listaCursos.find(elemento => elemento.id == idcurso);
        let listaInscritos = require('./../listaInscritos.json');
        let duplicado = listaInscritos.find(elemento => elemento.cedula == ced & elemento.curso == curso.id);
        if (duplicado) {
            var respuesta = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                            Ya se encuentra inscrito en el curso de ${curso.nombre}.
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>`
        } else {
            let ConCursos = listaInscritos.find(elemento => elemento.cedula == ced);
            if (ConCursos) {
                idcurso = parseInt(idcurso);
                ConCursos.cursos.push(idcurso);
                let datos = JSON.stringify(listaInscritos);
                fs.writeFile('src/listaInscritos.json', datos, (err) => {
                    if (err) throw (err);
                    console.log("Nuevo curso agregado")
                });
                var respuesta = `<div class="alert alert-success alert-dismissible fade show" role="alert">
                                Se le ha matriculado el curso ${curso.nombre} a ${ConCursos.nombre}
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                            </div>`
                curso.estInscritos = curso.estInscritos + 1;
                let data = JSON.stringify(listaCursos);
                fs.writeFile('src/cursostdea.json', data, (err) => {
                    if (err) throw (err);
                });
            } else {
                let nuevoInscrito = {
                    nombre: nom,
                    cedula: ced,
                    correo: correo,
                    telefono: telefono,
                    cursos: []
                }
                idcurso = parseInt(idcurso);
                nuevoInscrito.cursos.push(idcurso);
                listaInscritos.push(nuevoInscrito);
                let datos = JSON.stringify(listaInscritos);
                fs.writeFile('src/listaInscritos.json', datos, (err) => {
                    if (err) throw (err);
                    console.log("Nuevo matriculado")
                });

                var respuesta = `<div class="alert alert-info alert-dismissible fade show" role="alert">
                                    Usted ha sido matriculado en el curso ${curso.nombre}.
                                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                            </div>`

                curso.estInscritos = curso.estInscritos + 1;
                let data = JSON.stringify(listaCursos);
                fs.writeFile('src/cursostdea.json', data, (err) => {
                    if (err) throw (err);
                });
            }
        }

        return respuesta;
    }

});


 