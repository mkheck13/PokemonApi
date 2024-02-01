// ID's

let randBtn =document.getElementById("randBtn");
let favBtn = document.getElementById("favBtn");
let pokeSearch = document.getElementById("pokeSearch");
let searchBtn = document.getElementById("searchBtn");
let pokeImg = document.getElementById("pokeImg");
let pokeEvo = document.getElementById("pokeEvo");
let data;

// Load on refresh and page load
document.addEventListener('DOMContentLoaded', function() {
    pokemonApi(1);
});

// API Call
const pokemonApi = async (pokemon) => {
    pokeSearch.value = "";
    const promise = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    const data = await promise.json();



    // Image
    pokeImg.src = data.sprites.other["official-artwork"].front_default;

    // Moves
    const moveArray = data.moves.map(move => move.move.name);
    pokeMoves.innerText = "Moves: " + moveArray.join(", ");

    // Stats
    pokeHp.textContent = `HP- ${data.stats[0].base_stat}`;
    pokeAtk.textContent = `ATK- ${data.stats[1].base_stat}`;
    pokeDef.textContent = `DEF- ${data.stats[2].base_stat}`;
    pokeSpAtk.textContent = `SP. ATK- ${data.stats[3].base_stat}`;
    pokeSpDef.textContent = `SP. DEF- ${data.stats[4].base_stat}`;
    pokeSpd.textContent = `SPD- ${data.stats[5].base_stat}`;
    


    // Evolution

    // const evoGet = await fetch(`${data.species.url}`);
    // const evoData = await evoGet.json();

    // const evoChain = await fetch(`${evoData.evolution_chain.url}`);
    // const evoChainData = await evoChain.json();

    // if(evoChainData.chain.evoles_to.length === 0){
    //     pokeEvo.textContent = "N/A";
    // }else{
    //     const evoArr = [evoChainData.chain.species.name];

    //     const seeEvos = chain => {
    //         if (chain.evoles_to.length === 0){
    //             return;
    //         }else{
    //             chain.evoles_to.forEach(evo => {
    //                 evoArr.push(evo.species.name);
    //                 seeEvos(evo);
    //             });
    //         }
    //     };
    //     seeEvos(evoChainData.chain);
    //     pokeEvo.textContent = evoArr.join(" > ");
    // }



    // Name / Number
    pokeInfo.innerText = data.name;

    pokeNum.innerText = data.id.toString().padStart(3, '0');

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

searchBtn.addEventListener('click', async () => {
    if( pokeSearch.value){
        currentPokemon = await pokemonApi(pokeSearch.value.toLowerCase());
    }
});

pokeSearch.addEventListener('keydown', async (event) => {
    if (pokeSearch.value) {
        if (event.key === 'Enter') {
            currentPokemon = await pokemonApi(event.target.value.toLowerCase());
        }
    }
});



randBtn.addEventListener("click", async () => {
    let random = Math.floor(Math.random() * 649) + 1;
    pokemonApi(random);
  });

//   pokeImg.addEventListener("click", () => {
//     shiny ? ((shiny = false), (pokeImg.src = data.sprites.other["official-artwork"].front_shiny)) : ((shiny = true), (pokeImg.src = data.sprites.other["official-artwork"].front_default));
//   });








//  https://pokeapi.co/api/v2/pokemon/