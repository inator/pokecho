export function processQuery(game, query) { //right now only works for pokemon
    //each subquery is a different filter, separated by spaces
    const subqueries = query.split(" ").map(subquery => {
        if (subquery.includes("=")) {//is exactly
            return subquery = subquery.split("=").push(true);
        } else if (subquery.includes(":")) {//includes
            return subquery = subquery.split(":").push(false);
        } else { //default case, no tag indicates searching for name
            return subquery = ["name", subquery, false];
        }
    })
    /*subqueries now take the following format:
        [ "tag to search by", "search string", whether or not to be strict ]
    */

    //only worries about pokemon for now
    let pokemonArray = Object.values(game.pokemon);
    subqueries.forEach(subquery => { //iterate over each subquery to filter the pokemon list more and more
        switch (subquery[0]) { //tag to search by
            case "name": pokemonArray = filterPokemonByName(pokemonArray, subquery[1], subquery[2]);
        }
    })
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