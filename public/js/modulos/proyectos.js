import axios from 'axios';
import Swal from 'sweetalert2';

const btnEliminar = document.querySelector('#eliminar-proyecto');

if (btnEliminar) {
    btnEliminar.addEventListener('click', e => {

        const urlProyecto = e.target.dataset.proyectoUrl;
        
        Swal.fire({
            title: 'Desea eliminar este proyecto?',
            text: "Un proyecto eliminado no se puede recuperar!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, borrar!',
            cancelButtonText: 'No, Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {

                const url = `${location.origin}/proyectos/${urlProyecto}`;

                axios.delete(url, { params: { url: urlProyecto } })
                    .then(response => {

                        // 200: OK
                        Swal.fire(
                            response.data.message,
                            'El proyecto se ha eliminado.',
                            'success'
                        ).then(() => window.location.href = '/');
                    })
                    .catch(err => {

                        // 400: Not found
                        Swal.fire(
                            'Oppss!',
                            'No se pudo eliminar el proyecto.',
                            'danger'
                        ).then(() => window.location.href = '/');
                    });

            }
        });

    });
}

export default btnEliminar;