const elPokemonName = document.querySelector('.pokemon_name');
const elPokemonNumber = document.querySelector('.pokemon_number');
const elPokemonImage = document.querySelector('.pokemon_image');
const elPokemonType = document.querySelector('.type_pokemon');
const elPokemonHeight = document.querySelector('.height_pokemon');
const elPokemonWeight = document.querySelector('.weight_pokemon');

const elDetails_pokemon = document.querySelector('.details_pokemon');
const elText_pokemon = document.querySelector('.text_pokemon');
const elForm = document.querySelector('.form');
const elInputPokemon = document.querySelector('.input_search');

const elButtonPrev = document.querySelector('.btn-prev');
const elButtonNext = document.querySelector('.btn-next');

let idPokemon = 1;

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (APIResponse.status === 200) {
        const data = await APIResponse.json()

        return data;   
    }
}

const renderPokemon = async (pokemon) => {
    elPokemonName.innerHTML = 'Loading...'
    elText_pokemon.classList.remove('text_animation_3s');
    elDetails_pokemon.classList.remove('text_animation_1s');

    const data = await fetchPokemon(pokemon);
    
    if (data) {
        elPokemonImage.style.display = 'block';
        elPokemonName.innerHTML = data.name;
        elPokemonNumber.innerHTML = data.id;
        
        let urlImage = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];

        // Caso não encontre a gif no caminho padrão, busca em um caminho alternativo a imagem estática
        if (!urlImage) {
            urlImage = data['sprites']['versions']['generation-v']['black-white']['front_default'];
        }
        
        elPokemonImage.src = urlImage;
        
        // Variável global para salvar o pokemon atual
        idPokemon = data.id;

        elPokemonType.innerHTML = 'Type: ' + data['types']['0']['type']['name'];
        elPokemonHeight.innerHTML = 'Height: ' + data['height'] * 10 + ' cm';
        elPokemonWeight.innerHTML = 'Weight: ' + data['weight'] / 10 + ' kg';

        elInputPokemon.value = '';

        elText_pokemon.classList.add('text_animation_3s');
        elDetails_pokemon.classList.add('text_animation_1s');
    } else {
        elPokemonName.innerHTML = 'Not found :('
        elPokemonNumber.innerHTML = '';
        elPokemonImage.style.display = 'none';
    }
}

elForm.addEventListener('submit', (event) =>{
    event.preventDefault();

    renderPokemon(elInputPokemon.value.toLowerCase());
})

elButtonPrev.addEventListener('click', (event) =>{
    if (idPokemon-1 >= 1) {
        renderPokemon(idPokemon - 1);    
    }    
})

elButtonNext.addEventListener('click', (event) =>{
    renderPokemon(idPokemon + 1);
})

renderPokemon(idPokemon);