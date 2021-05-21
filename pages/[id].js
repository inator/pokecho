import { getAllGameIDs, getGameData } from "../lib/games"


export async function getStaticPaths() {
    const paths = getAllGameIDs()
    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({ params }) {
    const gameData = getGameData(params.id)
    return {
        props: {
            gameData
        }
    }
}


export default function Game({ gameData }) {
    return (
        <div>
            {gameData.name}
        </div>
    )
}