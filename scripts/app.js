// ID's

let randBtn =document.getElementById("randBtn");
let favBtn = document.getElementById("favBtn");
let pokeSearch = document.getElementById("pokeSearch");
let searchBtn = document.getElementById("searchBtn");
let pokeImg = document.getElementById("pokeImg");
// let pokeEvo = document.getElementById("pokeEvo");
// let pokeInfo = document.getElementById("pokeInfo");
// let pokeType = document.getElementById("pokeType");
// let pokeLocal = document.getElementById("pokeLocal");
// let pokeAblity
// let pokeBio = document.getElementById("pokeBio");
// let pokeMoves = document.getElementById("pokeMoves");
// let pokeStats = document.getElementById("pokeStats");
let data = "";
// let pokemon = "";

// API Call

const pokemonApi = async (pokemon) => {
    pokeSearch.value = "";
    const promise = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    const data = await promise.json();
    // console.log(data);
    // return data;

    // Image
    pokeImg.src = data.sprites.other["official-artwork"].front_default;

    // Moves
    const moveArray = data.moves.map(move => move.move.name);
    pokeMoves.innerText = "Moves: " + moveArray.join(", ");

    // Stats


    // Evolution


    // Name / Number
    pokeInfo.innerText = data.name;


    // Type
    const typeArray = data.types.map(type => type.type.name);
    pokeType.innerText = "Type: " + typeArray.join(", ");

    // Location

    const locationPromise = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}/encounters`);
    const location = await locationPromise.json();
        if(location.length > 0){
            let randomLocation = Math.floor(Math.random() * location.length);
            pokeLocal.textContent = `Location: ${(location[randomLocation].location_area.name).replaceAll("-", " ")}`;
        }else{
            pokeLocal.textContent = "Location: N/A";
        }

    // Abilities
    const abilityArray = data.abilities.map(ability => ability.ability.name);
    pokeAbility.innerText = "Abilities: " + abilityArray.join(", ");

    // Bio





}

// Search button and random button

searchBtn.addEventListener('click', () => {
    pokeSearch.value ?pokemonApi(pokeSearch.value): alert("That's not a vaild Pokemon name.")
});

// pokeSearch.addEventListener('keypress', (e) => {
//     if(e.key === 'Enter'){
//         pokeType.innerHTML = "";
//         pokemonApi(pokeSearch.value.toLowerCase());
//     }
// });

randBtn.addEventListener("click", () => {
    let random = Math.floor(Math.random() * 649) + 1;
    pokemonApi(random);
  });

//   pokeImg.addEventListener("click", () => {
//     shiny ? ((shiny = false), (pokeImg.src = data.sprites.other["official-artwork"].front_shiny)) : ((shiny = true), (pokeImg.src = data.sprites.other["official-artwork"].front_default));
//   });








//  https://pokeapi.co/api/v2/pokemon/