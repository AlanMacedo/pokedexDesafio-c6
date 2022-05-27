
const btnSearch = document.querySelector("#btn-search");
const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`

const generatePokemonPromises = () => Array(10).fill().map((_, index)=> 
    fetch(getPokemonUrl(index + 1)).then(response => response.json()))

const generateHTML = pokemons => pokemons.reduce((accumulator, {name, types, abilities}) =>{
        const elementTypes = types.map(typeInfo => typeInfo.type.name)
        const elementAbilities = abilities.map(abilityInfo => abilityInfo.ability.name);

        accumulator += `
        <li class="card list-group-item ">
        <h2 class="card-title">${name}</h2><br>
        <p class="card-subtitle">
            <strong>HABILIDADE:</strong>
              <span class="ability">${elementAbilities.join(" - ")}</span>
        </p>
        <p class="card-subtitle"><strong>TIPO:</strong>
        <span class="type">${elementTypes.join(" - ")}</span></p>
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
    let text = item.firstElementChild.textContent;

    if (text.toLowerCase().includes(filter.toLowerCase())) {
      item.style.display = "";
    } else {
        auxDisplayAlert++;
        item.style.display = "none";
      }
    });
  
    if (listItems.length == auxDisplayAlert) {
      alert("Pokémon não encontrado!");
    }
  }
  function downloadCSV(csv, filename) {
    var csvFile;
    var downloadLink;
  
    csvFile = new Blob([csv], { type: "text/csv" });
    downloadLink = document.createElement("a");
    downloadLink.download = filename;
    downloadLink.href = window.URL.createObjectURL(csvFile);
    downloadLink.style.display = "none";
  
    document.body.appendChild(downloadLink);
    downloadLink.click();
  }
  
  function exportTableToCSV(filename) {
    var csv = [];
    var rows = document.querySelectorAll(".card");
    var nodeNames = document.querySelectorAll(".card-title");
    var nodeAbilities = document.querySelectorAll(".ability");
    var nodeTypes = document.querySelectorAll(".type");
    csv.push("NOME | HABILIDADE | TIPO");
  
    for (let i = 0; i < rows.length; i++) {
      const name = nodeNames[i].innerHTML;
      const ability = nodeAbilities[i].innerHTML;
      const type = nodeTypes[i].innerHTML;
  
      if (rows[i].style.display !== "none") {
        var arr = name.concat(" | ", ability, " | ", type);
        csv.push(arr);
      }
    }
  
    csv.length == 0 ? csv.push("Ops.. não encontrei nada!") : "";
  
    downloadCSV(csv.join("\n"), filename);
  }