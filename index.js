//SE GUARDA PERSONAJES SELECCIONADOS PARA COMPARARLOS
let personajesSeleccionados = [];
const comparisonSection = document.getElementById('comparison-section');
const comparisonTable = document.getElementById('comparison-table');
const clearComparisonBtn = document.getElementById('clear-comparison');



const characterListDiv = document.getElementById('character-list');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

let personajes = [];
let paginaActual = 1;
const personajesPorPagina = 20;

// Mostrar personajes de la página actual
const mostrarPagina = () => {

    const inicio = (paginaActual - 1) * personajesPorPagina
    const fin = inicio + personajesPorPagina;

    const personajesPagina = personajes.slice(inicio, fin);

    characterListDiv.innerHTML = '';

    personajesPagina.forEach((personaje) => {

        characterListDiv.innerHTML += `
        <div
            class="bg-gray-800 rounded-2xl shadow-md p-4 hover:scale-105 hover:shadow-xl transition duration-300 cursor-pointer"
            onclick="irDetalle(${personaje.id})"
        >

            <img
                class="w-full h-72 mx-auto object-contain rounded-xl"
                src="${personaje.image}"
                alt="${personaje.name}"
            >

            <h2 class="mt-3 text-yellow-400 text-lg font-bold text-center">
                ${personaje.name}
            </h2>

            <p class="text-blue-300 text-center">
                ${personaje.gender}
            </p>

            <button
            class="mt-3 w-full bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-2 rounded-xl"
            onclick="event.stopPropagation(); seleccionarPersonaje(${personaje.id})">
             Seleccionar
            </button>

        </div>
        `;
    });

    prevBtn.disabled = paginaActual === 1;
    nextBtn.disabled = fin >= personajes.length;
};

// Ir a detalle
const irDetalle = (id) => {
    window.location.href = `detalle/?id=${id}`;
};


const seleccionarPersonaje = (id) => {
    const personaje = personajes.find(
        p => p.id === id
    );
    const yaExiste =
        personajesSeleccionados.some(
            p => p.id === id
        );
    if (yaExiste) {
        alert('Este personaje ya fue seleccionado');
        return;
    }
    if (personajesSeleccionados.length >= 2) {
        alert('Solo puedes comparar 2 personajes');
        return;
    }
    personajesSeleccionados.push(personaje);
    if (personajesSeleccionados.length === 2) {
        mostrarComparacion();
    }
};


//MOSTRAR COMPARACION
const mostrarComparacion = () => {

    const p1 = personajesSeleccionados[0];
    const p2 = personajesSeleccionados[1];

    comparisonSection.classList.remove('hidden');

    comparisonTable.innerHTML = `
    
    <div class="overflow-x-auto">

        <table class="w-full bg-gray-900 text-white rounded-xl overflow-hidden">

            <thead>

                <tr class="bg-yellow-500 text-black">

                    <th class="p-3">Dato</th>
                    <th class="p-3">${p1.name}</th>
                    <th class="p-3">${p2.name}</th>

                </tr>

            </thead>

            <tbody>

                <tr>
                    <td class="border p-3">Imagen</td>

                    <td class="border p-3">
                        <img
                            src="${p1.image}"
                            class="h-40 mx-auto object-contain"
                        >
                    </td>

                    <td class="border p-3">
                        <img
                            src="${p2.image}"
                            class="h-40 mx-auto object-contain"
                        >
                    </td>
                </tr>

                <tr>
                    <td class="border p-3">Altura</td>
                    <td class="border p-3">${p1.height}</td>
                    <td class="border p-3">${p2.height}</td>
                </tr>

                <tr>
                    <td class="border p-3">Peso</td>
                    <td class="border p-3">${p1.mass}</td>
                    <td class="border p-3">${p2.mass}</td>
                </tr>

                <tr>
                    <td class="border p-3">Género</td>
                    <td class="border p-3">${p1.gender}</td>
                    <td class="border p-3">${p2.gender}</td>
                </tr>

                <tr>
                    <td class="border p-3">Especie</td>
                    <td class="border p-3">${p1.species}</td>
                    <td class="border p-3">${p2.species}</td>
                </tr>

                <tr>
                    <td class="border p-3">Planeta</td>
                    <td class="border p-3">${p1.homeworld}</td>
                    <td class="border p-3">${p2.homeworld}</td>
                </tr>

            </tbody>

        </table>

    </div>
    `;
};

//BOTON LIMPIAR
clearComparisonBtn.addEventListener('click', () => {

    personajesSeleccionados = [];

    comparisonSection.classList.add('hidden');

    comparisonTable.innerHTML = '';

});



// Cargar personajes
const cargarPersonajes = async () => {

    const response = await fetch(
        'https://akabab.github.io/starwars-api/api/all.json'
    );

    personajes = await response.json();

    mostrarPagina();
};

// Botón anterior
prevBtn.addEventListener('click', () => {

    if (paginaActual > 1) {
        paginaActual--;
        mostrarPagina();
    }

});

// Botón siguiente
nextBtn.addEventListener('click', () => {

    const totalPaginas = Math.ceil(
        personajes.length / personajesPorPagina
    );

    if (paginaActual < totalPaginas) {
        paginaActual++;
        mostrarPagina();
    }

});

cargarPersonajes();