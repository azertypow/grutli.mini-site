import {apiBaseUrl} from "~/utlis/apiCmsFetch";

const api = "http://localhost:8000/api/query"
// const api = `${apiBaseUrl}/api/query`


export type KQLResponse = {
    code: number,
    result: [],
    status: string
}

export async function getContentByKQL(query: string, select?: {[key: string]: boolean | string}): Promise<KQLResponse> {
    const headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
    }

    const response = await fetch(api, {
        method: "POST",
        body: JSON.stringify({
            query: query,
            select: select,
        }),
        headers,
    })

    if (response.ok) {
        return await response.json() satisfies KQLResponse
    } else {
        throw new Error(`Failed to fetch data: ${response.statusText}`)
    }
}

export type KQL_season = {
    title: string,
    slug: string,
    statut: "en-cours" | "a-venir" | "passe",
    [keys: string]: string | boolean
}

type loadSeasonsProps = {
    dataToReturn: {[keys: string]: string | boolean}
}

type loadSeasonsResponse = {
    seasons: KQL_season[]
    status: 'ok' | 'error'
    error: unknown
}

export async function loadSeasons(props: loadSeasonsProps = {dataToReturn: {}}): Promise<loadSeasonsResponse> {
    try {
        const seasons = await getContentByKQL(
            "site.find('saisons').childrenAndDrafts",
            {
                ...{
                    title: true,
                    slug: true,
                    statut: true,
                }, ...props.dataToReturn
            },
        )

        return {
            error: null,
            seasons: seasons.result,
            status: 'ok',
        }
    } catch (error) {
        return {
            error,
            status: 'error',
            seasons: [],
        }
    }
}

export async function getSpectaclesBySeasons(seasons: []) {

    const toReturn = []

    for (const season of seasons) {
        toReturn.push( await getContentByKQL(`site.find('spectacles').children.filterBy('season', '${season.slug}')`) )
    }

    return toReturn
}
