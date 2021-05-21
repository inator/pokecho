export function processQuery(game, query) { //right now only works for pokemon
    //each subquery is a different filter, separated by spaces
    const subqueries = query.split(" ").map(subquery => {
        if (subquery.includes("=")) {//is exactly
            subquery = subquery.split("=");
            subquery.push(true);
            return subquery;
        } else if (subquery.includes(":")) {//includes
            subquery = subquery.split(":");
            subquery.push(false);
            return subquery;
        } else { //default case, no tag indicates searching for name
            return subquery = ["name", subquery.replace(/[^0-9a-z ]/g, "").replace(/ +/g, "-"), false];
        }
    })
    /*subqueries now take the following format:
        [ "tag to search by", "search string", whether or not to be strict ]
    */

    //only worries about pokemon for now
    let pokemonArray = Object.values(game.pokemon);
    subqueries.forEach(subquery => { //iterate over each subquery to filter the pokemon list more and more
        switch (subquery[0]) { //tag to search by
            case "ability": pokemonArray = filterPokemonByAbility(pokemonArray, subquery[1], subquery[2]); break;
            case "name": pokemonArray = filterPokemonByName(pokemonArray, subquery[1], subquery[2]); break;
            case "type": pokemonArray = filterPokemonByType(pokemonArray, subquery[1], subquery[2]); break;
        }
    })

    //debugging
    /*return subqueries.map(subquery => (
        <div>{subquery[0]} {subquery[1]} {subquery[2].toString()}</div>
    ))*/

    return pokemonArray.map(pokemon => ( //each pokemon is also an array
        pokemon.map(({ name }) => (
            <div>{name}</div>
        ))
    ))
}


function filterPokemonByName(pokemonArray, query, strict) {
    return pokemonArray.map(pokemon => ( //each pokemon is also an array
        // filter out the forms with that meet the criteria
        pokemon.filter(pokemon => pokemon.name.toLowerCase().includes(query))
    ))
}

function filterPokemonByAbility(pokemonArray, query, strict) {
    return pokemonArray.map(pokemon => ( //each pokemon is also an array
        // filter out the forms with that meet the criteria
        pokemon.filter(pokemon => pokemon.abilities.includes(query))
    ))
}

function filterPokemonByType(pokemonArray, query, strict) {
    return pokemonArray.map(pokemon => ( //each pokemon is also an array
        // filter out the forms with that meet the criteria
        pokemon.filter(pokemon => pokemon.types.includes(query))
    ))
}