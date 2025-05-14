import type {ApiCmsPageSpectacle, ApiNews, ApiPlaces, ApiSeasons, ApiSimplePage, SiteInfo} from "~/utlis/ApiCmsTypes";

const apiBaseUrl = 'https://grutli-dev-admin.sdrvl.ch'
// const apiBaseUrl = 'http://localhost:8000'

export async function fetchSiteInfo(): Promise<SiteInfo | null> {
    const url = apiBaseUrl + '/site-info.json'

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Ajoute une validation si nécessaire pour t'assurer que `data` correspond bien au type attendu
        return data as SiteInfo;
    } catch (error) {
        console.error("Failed to fetch site info:", error);
        return null;
    }
}

export async function fetchPage(slugParams: string | string[]): Promise<ApiSimplePage | null> {

    const slug: string = Array.isArray(slugParams) ?
        slugParams.join('/')
        : slugParams

    const url = apiBaseUrl + '/' + slug.replace(/\/$/, "") + '.json'

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        return data as ApiSimplePage;
    } catch (error) {
        console.error("Failed to fetch site info:", error);
        return null;
    }
}

export async function fetchPageSpectacle(slug: string): Promise<ApiCmsPageSpectacle | null> {
    return await fetchPage(['spectacles', slug]) as unknown as ApiCmsPageSpectacle | null
}

export async function fetchPlacesInfo(): Promise<ApiPlaces | null> {
    const url = apiBaseUrl + '/places.json'

    const response = await fetch(url)

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json() as ApiPlaces
}

export async function fetchNews(): Promise<ApiNews | null> {
    const url = apiBaseUrl + '/news.json'

    const response = await fetch(url)

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json() as ApiNews
}

export async function fetchSeasons(): Promise<ApiSeasons> {
    const url = apiBaseUrl + '/saisons.json'

    const response = await fetch(url)

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json() satisfies ApiSeasons
}

export async function fetchSpectaclesBySeason(season: string) {
    const url = apiBaseUrl + '/spectacles.json'

    const response = await fetch(url)

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json()

    const spectacles: ApiCmsPageSpectacle[] = data.childrenDetails

    return spectacles.filter(item => item.pageContent.content.season === season)
}

export function groupeSpectacleBySeasons() {

}
