const characterListDiv = document.getElementById('character-list');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

let prevUrl = null;
let nextUrl = null;

//Funcion Principal
const CargarPersonajes = async (url) => {

    const PersonajeResponse = await fetch(url);
    const PersonajeData = await PersonajeResponse.json();
    const personajes = PersonajeData.results;
    
    prevUrl = PersonajeData.previous;
    nextUrl = PersonajeData.next;

  
    characterListDiv.innerHTML = '';
    personajes.forEach((personaje) => {
        // sacar ID desde la URL
        const splits = personaje.url.split('/');
        const id = splits[splits.length - 2];
        characterListDiv.innerHTML += `
        <div class="bg-gray-800 rounded-2xl shadow-md p-4 hover:scale-105 hover:shadow-xl transition duration-300 cursor-pointer">
            <img class="w-28 h-28 mx-auto" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${id}.png">
            <h2 class="mt-3 text-yellow-400 text-lg font-bold text-center capitalize">${personaje.name}<p class=" text-blue-300">${personaje.gender}</p></h2>
            

        </div>
        `;
    });

};

prevBtn.addEventListener('click', () => {

    if(prevUrl){
        CargarPersonajes(prevUrl);
    }

});

nextBtn.addEventListener('click', () => {

    if(nextUrl){
        CargarPersonajes(nextUrl);
    }

});

CargarPersonajes('https://swapi.py4e.com/api/people/');