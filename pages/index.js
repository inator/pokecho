import Head from 'next/head';
import React, { Fragment, useState, useEffect } from 'react';

import { getGamesData } from "../lib/games";
import { processQuery } from "../lib/search";

export async function getStaticProps() {
    const allGamesData = getGamesData();
    return {
        props: {
            allGamesData,
        },
    };
}

export default function Pokecho({ allGamesData }) {
    const [gameID, setGameID] = useState(allGamesData[0].id);
    const [game, setGame] = useState(allGamesData.find(gameData => gameData.id === gameID));
    const [search, setSearch] = useState("");

    useEffect(() => {
        setGame(allGamesData.find(gameData => gameData.id === gameID));
    }), [gameID];

    return (
        <Fragment>
            <Head>
                <title>Pokécho</title>
                <meta name="description" content="Pokémon search engine" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <h1>Pokécho</h1>
            <label for="games">Game: </label>
            <select id="games" onChange={e => setGameID(e.target.value)}>
                {allGamesData.map(({ id, name }) => (
                    <option value={id}>{name}</option>
                ))}
            </select>
            <br />
            <label for="search">Search: </label>
            <input type="text" id="search" onChange={e => setSearch(e.target.value.toLowerCase())}></input>

            <div>{gameID /*debugging*/}</div>

            <div>
                {processQuery(game, search)}
            </div>
        </Fragment>
    );
}