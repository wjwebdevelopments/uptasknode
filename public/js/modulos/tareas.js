const tareas = document.querySelector("#listado-pendientes");

if ( tareas ) {

  tareas.addEventListener('click', e => {

    if (e.target.classList.contains('icofont-check-circled')) {
      const icono = e.target;
      const idTarea = icono.parentElement.parentElement.dataset.tarea;

      console.log(idTarea)
    }

    if (e.target.classList.contains('icofont-ui-delete')) {
      console.log('Eliminando tarea')
    }

  })

}

export default tareas;
