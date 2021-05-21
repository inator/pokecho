import Head from 'next/head';
import React from 'react';

import { getGamesData } from "../lib/games";

export async function getStaticProps() {
    const allGamesData = getGamesData();
    return {
        props: {
            allGamesData,
        },
    };
}


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            game: this.props.gamesData[0].id,
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.setState({ game: e.target.value });
    }

    render() {
        return (
            <div>
                <Head>
                    <title>Pokécho</title>
                    <meta name="description" content="Pokémon search engine" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>
    
    
                <h1>Pokécho</h1>
                <label for="games">Game: </label>
                <select id="games" onChange={this.handleChange}>
                    {this.props.gamesData.map(({ id, name }) => (
                        <option value={id}>{name}</option>
                    ))}
                </select>
                <br />
                <label for="search">Search: </label>
                <input type="text" id="search"></input>
    
                <div>{this.state.game}</div>
            </div>
        );
    }
}


export default function Test({ allGamesData }) {
    return <App gamesData={allGamesData} />
}