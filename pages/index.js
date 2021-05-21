import Head from 'next/head';
import React, { useState } from 'react';

import { getGamesData } from "../lib/games";

export async function getStaticProps() {
    const allGamesData = getGamesData();
    return {
        props: {
            allGamesData,
        },
    };
}

export default function Test({ allGamesData }) {
    const [game, setGame] = useState(allGamesData[0].id);

    return (
        <div>
            <Head>
                <title>Pokécho</title>
                <meta name="description" content="Pokémon search engine" />
                <link rel="icon" href="/favicon.ico" />
            </Head>


            <h1>Pokécho</h1>
            <label for="games">Game: </label>
            <select id="games" onChange={e => setGame(e.target.value)}>
                {allGamesData.map(({ id, name }) => (
                    <option value={id}>{name}</option>
                ))}
            </select>
            <br />
            <label for="search">Search: </label>
            <input type="text" id="search"></input>

            <div>{game}</div>
        </div>
    );
}