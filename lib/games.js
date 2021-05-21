import fs from "fs"
import path from "path"

const gamesDirectory = path.join(process.cwd(), "games")

export function getGamesData() {
    const fileNames = fs.readdirSync(gamesDirectory)
    return fileNames.map(fileName => {
        const id = fileName.replace(/\.json$/, "")

        const fullPath = path.join(gamesDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, "utf8")

        const jsonResult = JSON.parse(fileContents)

        return {
            id,
            ...jsonResult
        }
    })
}

export function getAllGameIDs() {
    const fileNames = fs.readdirSync(gamesDirectory)
    return fileNames.map(fileName => {
        return {
            params: {
                id: fileName.replace(/\.json$/, "")
            }
        }
    })
}

export function getGameData(id) {
    const fullPath = path.join(gamesDirectory, `${id}.json`)
    const fileContents = fs.readFileSync(fullPath, "utf8")

    const jsonResult = JSON.parse(fileContents)

    return {
        id,
        ...jsonResult
    }
}