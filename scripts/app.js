import { saveToLocalStorage, getlocalStorage, removeFromLocalStorage } from "./localstorage.js";

// ID's

let randBtn =document.getElementById("randBtn");
let favBtn = document.getElementById("favBtn");
let pokeSearch = document.getElementById("pokeSearch");
let searchBtn = document.getElementById("searchBtn");
let pokeImg = document.getElementById("pokeImg");
let pokeEvo = document.getElementById("pokeEvo");
let evolutions = document.getElementById("evolutions");
let data;
let getFavBtn = document.getElementById("getFavBtn");
let getFavDiv = document.getElementById("getFavDiv");

let shinyBtn = document.getElementById("shinyBtn");

// Load on refresh and page load
document.addEventListener('DOMContentLoaded', function() {
    pokemonApi(1);
});

// API Call
const pokemonApi = async (pokemon) => {

    pokeEvo.innerHTML= "";

    pokeSearch.value = "";
    const promise = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    data = await promise.json();



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


    // Evolution

    const evoGet = await fetch(`${data.species.url}`);
    const evoData = await evoGet.json();
    

    const evoChain = await fetch(`${evoData.evolution_chain.url}`);
    const evoChainData = await evoChain.json();
    

    if (evoChainData.chain.evoles_to.length === 0) {
        pokeEvo.textContent = "N/A";
    }else{
        const evoArr = [evoChainData.chain.species.name];

        const seeEvos = (chain) => {
             if(chain.evoles_to.length === 0)return;
                chain.evoles_to.forEach(evo => {
                    evoArr.push(evo.species.name);
                    seeEvos(evo);
                });
        };
        seeEvos(evoChainData.chain);
        console.log(evoArr);
        for(let i = 0; i <evoArr.length; i++){
            evoCall(evoArr[i]);
            console.log(evoArr[i]);
        }

        if(evoArr.length > 4){
            evolutions.classList.toggle("lg:h-[450px]");
            evolutions.classList.toggle("lg:h-80");
            evolutions.classList.toggle("md:h-[1750px]");
            evolutions.classList.toggle("md:h-[750px]");
        }else if(evoArr.length <= 4 && evolutions.classList.contains("lg:h-[450px]")){
            evolutions.classList.remove("lg:h-[450px]");
            evolutions.classList.toggle("lg:h-80");
            evolutions.classList.remove("md:h-[1750px]");
            evolutions.classList.toggle("md:h-[750px]");
        }
        
    }

    async function evoCall(name){
        const evoProm = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        const evoData = await evoProm.json();

        evoImg.src = evoData.sprites.other["showdown"].front_default;
            evoImg.className = "mx-auto w-28 h-28 pb-3";
            evoDiv.className = "mt-10";
            evoDiv.appendChild(evoImg);
            evoDiv.appendChild(evoName);
            evoName.textContent = evoData.name.toUpperCase();
            evolutionChart.appendChild(evoDiv);
    }





   
}

// Search button and random button

searchBtn.addEventListener('click', async () => {
    if( pokeSearch.value){
        currentPokemon = await pokemonApi(pokeSearch.value.toLowerCase());
    }
});

// pokeSearch.addEventListener('keydown', async (event) => {
//     if (pokeSearch.value) {
//         if (event.key === 'Enter') {
//             currentPokemon = await pokemonApi(event.target.value.toLowerCase());
//         }
//     }
// });

randBtn.addEventListener("click", async () => {
    let random = Math.floor(Math.random() * 649) + 1;
    pokemonApi(random);
  });

// Shiny Button

shinyBtn.addEventListener('click', () => {
    if (pokeImg.src == data.sprites.other['official-artwork'].front_default) {
        shinyBtn.textContent = 'shiny form'
        pokeImg.src = data.sprites.other['official-artwork'].front_shiny;
        // console.log("shiny");
    }
    else {
        shinyBtn.textContent = 'normal form'
        pokeImg.src = data.sprites.other['official-artwork'].front_default;
        // console.log("normal");
    }
})







favBtn.addEventListener('click', ()=> {
    saveToLocalStorage(pokemon[0].name);

})

getFavBtn.addEventListener('click', ()=>{
    // this retrives our data from local storage and stores it into favorites variable.
    let favorites = getlocalStorage();

    // clears div so the array dsplay will not repeat
    getFavDiv.textContent = "";

    // map though each element in our array
    favorites.map(pokeName => {

        // we're creating a p tag dynamically
        let p = document.createElement('p');

        //setting its text content to digiName
        p.textContent = pokeName;
        // classname replaces all classes with our new classes
        p.className = "text-lg font-medium text-gray-900 dark:text-white"

        // creating a button dynamically
        let button = document.createElement('button');

        button.type = "button"
        button.textContent = "X";
        // classlist allows us to be a little more concise it doesnt replace the classes
        button.classList.add(        
        "text-gray-400",
        "bg-transparent",
        "hover:bg-gray-200",
        "hover:text-gray-900",
        "rounded-lg",
        "text-sm",
        "w-8",
        "h-8",
        "justify-end",
        "dark:hover:bg-gray-600",
        "dark:hover:text-white"
        );

        // creating an eventlistener for our button which removes diginame from our favorites
        button.addEventListener('click', ()=> {
            removeFromLocalStorage(pokeName);
            p.remove();
        })

        // appending our button to our p-tag
        p.append(button);

        // appending our p-tag to our favoritesdiv
        getFavDiv.append(p);
    })


})








//  https://pokeapi.co/api/v2/pokemon/