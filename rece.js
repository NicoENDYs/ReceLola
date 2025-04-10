const contenedor = document.getElementById("cartas");
let DDBB = window.localStorage;


function convertirABase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file);
    });
}






function añadir() {
    const modalElement = document.getElementById("miModal");
    const modalInstance = new bootstrap.Modal(modalElement);
    modalInstance.show();
}





async function guardar() {
    let titulo = document.getElementById('titulo').value;
    let descrip = document.getElementById('descrip').value;
    let costo = document.getElementById('costo').value;
    let precio = document.getElementById('precio').value;
    let imagenInput = document.getElementById('imagen').files[0];

    if (!titulo || !descrip || !costo || !precio || !imagenInput) {
        alert('Por favor, completa todos los campos y selecciona una imagen.');
        return;
    }
    let imagenBase64 = await convertirABase64(imagenInput);
    let receta = {
        titulo: titulo,
        descripcion: descrip,
        imagen: imagenBase64,
        costo: costo,
        precio: precio
    };
    let recetasGuardadas = JSON.parse(DDBB.getItem("recetas")) || [];
    recetasGuardadas.push(receta);
    DDBB.setItem("recetas", JSON.stringify(recetasGuardadas));
    let insert = `
        <div class="card mb-3" style="max-width: 700px">
            <div class="row g-0">
                <div class="col-md-4">
                    <img src="${receta.imagen}" class="img-fluid rounded-start" alt="Imagen de la receta" />
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">${receta.titulo}</h5>
                        <p class="card-text">${receta.descripcion}</p>
                        <p class="card-text">
                            <small class="text-muted">Costo de fabricación: ${receta.costo}</small>
                        </p>
                        <p class="card-text">
                            <small class="text-muted">Precio de venta: ${receta.precio}</small>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    `;

    contenedor.innerHTML += insert;
    document.getElementById('titulo').value = '';
    document.getElementById('descrip').value = '';
    document.getElementById('costo').value = '';
    document.getElementById('precio').value = '';
    document.getElementById('imagen').value = '';

    const modalElement = document.getElementById("miModal");
    const modalInstance = bootstrap.Modal.getInstance(modalElement);
    modalInstance.hide();
}







function cargarRecetas() {
    let recetasGuardadas = JSON.parse(DDBB.getItem("recetas")) || [];
    recetasGuardadas.forEach(receta => {
        let insert = `
            <div class="card mb-3" style="max-width: 700px">
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src="${receta.imagen}" class="img-fluid rounded-start" alt="Imagen de la receta" />
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${receta.titulo}</h5>
                            <p class="card-text">${receta.descripcion}</p>
                            <p class="card-text">
                                <small class="text-muted">Costo de fabricación: ${receta.costo}</small>
                            </p>
                            <p class="card-text">
                                <small class="text-muted">Precio de venta: ${receta.precio}</small>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        `;

        contenedor.innerHTML += insert;
    });
}
cargarRecetas();







function buscar() {
    const termino = document.getElementById('buscarReceta').value.toLowerCase();
    const recetasGuardadas = JSON.parse(DDBB.getItem("recetas")) || [];

    const Filtro = recetasGuardadas.filter(receta => 
        receta.titulo.toLowerCase().includes(termino) ||
        receta.descripcion.toLowerCase().includes(termino)
    );
    
    contenedor.innerHTML = '';
    Filtro.forEach(receta => {
        let insert = `
            <div class="card mb-3" style="max-width: 700px">
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src="${receta.imagen}" class="img-fluid rounded-start" alt="Imagen de la receta" />
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${receta.titulo}</h5>
                            <p class="card-text">${receta.descripcion}</p>
                            <p class="card-text">
                                <small class="text-muted">Costo de fabricación: ${receta.costo}</small>
                            </p>
                            <p class="card-text">
                                <small class="text-muted">Precio de venta: ${receta.precio}</small>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        `;

        contenedor.innerHTML += insert;
    });
    if (recetasFiltradas.length === 0) {
        contenedor.innerHTML = '<p class="text-center">No se encontraron recetas con ese término.</p>';
    }
}