import type {ApiSimplePage, SiteInfo} from "~/utlis/ApiCmsTypes";

const apiBaseUrl = 'https://grutli-admin.sdrvl.ch'

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

    const url = apiBaseUrl + '/' + slug + '.json'

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
