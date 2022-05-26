const btnSearch = document.querySelector("#btn-search");
const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`

const generatePokemonPromises = () => Array(10).fill().map((_, index)=> 
    fetch(getPokemonUrl(index + 1)).then(response => response.json()))

const generateHTML = pokemons => pokemons.reduce((accumulator, {name, id, types, abilities}) =>{
        const elementTypes = types.map(typeInfo => typeInfo.type.name)
        const elementAbilities = abilities.map(abilityInfo => abilityInfo.ability.name);

        accumulator += `
        <li class="card ${elementTypes[0]} list-group-item ">
        <h2 class="card-title" ${id} . <br> Nome:  ${name}</h2><br>
        <p class="card-subtitle">
            <strong>Habilidade:</strong>    
              ${elementAbilities.join(' | ')}
        </p>
        <p class="card-subtitle"><strong>Tipo:</strong> ${elementTypes.join(' | ')}</p>
        </li>
        `
        return accumulator
}, '')

const insertPokemonsIntoPage = pokemons => {
    const ul = document.querySelector('[data-js="pokedex"]')
    ul.innerHTML = pokemons
}


const pokemonPromises = generatePokemonPromises()

Promise.all(pokemonPromises)
    .then(generateHTML)
    .then(insertPokemonsIntoPage)

    

btnSearch.addEventListener("click", filterList);

function filterList() {
  let auxDisplayAlert = 0;
  const searchInput = document.querySelector("#search-input");
  const filter = searchInput.value.toLowerCase();
  const listItems = document.querySelectorAll(".list-group-item");

  listItems.forEach((item) => {
    let text = item.textContent;

    if (text.toLowerCase().includes(filter.toLowerCase())) {
      item.style.display = "";
    } else {
        auxDisplayAlert++;
        item.style.display = "none";
      }
    });
  
    if (listItems.length == auxDisplayAlert) {
      alert("Não achou nada!");
    }
  }