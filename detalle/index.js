const characterDetailDiv = document.getElementById('character-detail');

const params = new URLSearchParams(window.location.search);
const id = params.get('id');

const cargarPersonajeDetalle = async () => {

    const response = await fetch(
        'https://akabab.github.io/starwars-api/api/all.json'
    );

    const personajes = await response.json();

    const personaje = personajes.find(
        p => p.id == id
    );

    console.log(personaje);

    let afiliacionesHtml = '';

    personaje.affiliations.forEach((afiliacion) => {

        afiliacionesHtml += `
        <div class="bg-blue-700 text-white text-center rounded-md p-2">
            ${afiliacion}
        </div>
        `;

    });

    characterDetailDiv.innerHTML = `
    
    <div class="bg-gray-900 rounded-2xl p-6 shadow-xl">
        <img
            class="w-full h-[500px] mx-auto object-contain"
            src="${personaje.image}"
            alt="${personaje.name}"
        >
    </div>

    <div class="bg-gray-900 rounded-2xl p-6 shadow-xl text-white">

        <div class="grid grid-cols-2">
            <h1 class="text-3xl font-bold text-yellow-400">
                ${personaje.name}
            </h1>

            <p class="text-right text-2xl text-gray-400">
                #${personaje.id}
            </p>
        </div>

        <div class="mt-5 bg-blue-800 p-4 rounded-xl grid grid-cols-2">

            <div>
                <p class="text-center text-sm text-gray-300">Altura</p>
                <p class="text-center text-xl font-bold">${personaje.height} m</p>
            </div>

            <div>
                <p class="text-center text-sm text-gray-300">Peso</p>
                <p class="text-center text-xl font-bold">${personaje.mass} kg</p>
            </div>

        </div>

        <div class="mt-5 bg-blue-800 p-4 rounded-xl grid grid-cols-2">

            <div>
                <p class="text-center text-sm text-gray-300">Género</p>
                <p class="text-center text-lg font-bold">${personaje.gender}</p>
            </div>

            <div>
                <p class="text-center text-sm text-gray-300">Planeta</p>
                <p class="text-center text-lg font-bold">${personaje.homeworld}</p>
            </div>

        </div>

        <div class="mt-5 bg-blue-800 p-4 rounded-xl grid grid-cols-2">

            <div>
                <p class="text-center text-sm text-gray-300">Especie</p>
                <p class="text-center text-lg font-bold">${personaje.species}</p>
            </div>

            <div>
                <p class="text-center text-sm text-gray-300">Nacimiento</p>
                <p class="text-center text-lg font-bold">${personaje.bornLocation || 'Desconocido'}</p>
            </div>

        </div>

        <div class="mt-5">
            <p class=" font-bold text-yellow-400 mb-2">
                Afiliaciones
            </p>

            <div class="grid grid-cols-2 gap-2">
                ${afiliacionesHtml}
            </div>
        </div>

    </div>
    `;
};

cargarPersonajeDetalle();