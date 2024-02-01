const saveToLocalStorage = (pokemon) =>{
    // favorites will get the current values in local storage
    // AKA saves the array in favorites
    let favorites = getlocalStorage();

    // if the name is already included in the local storage we will not push into favorites
    if(!favorites.includes(pokemon)){
        favorites.push(pokemon);
    }

    // JSON.stringify insures what ever we save into local storage is a string
    localStorage.setItem("Favorites", JSON.stringify(favorites));
}

const getlocalStorage = () => {

    // getting our values from local storage
    let localStorageData = localStorage.getItem("Favorites");

    // we check if that data is null if so we return an empty array
    if(localStorageData === null){
        return [];
    }

    // we return an array of local storage
    return JSON.parse(localStorageData);

}

const removeFromLocalStorage = (pokemon) =>{

    // we're saving local storage data into favorites variable
    let favorites = getlocalStorage();

    // we're finding the index of our parameter (digimon)
    let namedIndex = favorites.indexOf(pokemon);

    // remove the name from th array using the .splice method
    favorites.splice(namedIndex, 1);
    
    // we set our new mutated favorites array inside our local storage
    localStorage.setItem("favorites", JSON.stringify(favorites));
    
}

export {saveToLocalStorage, getlocalStorage, removeFromLocalStorage};