export function getYoutubeVideoIDFromUrl(url: string): string | null {
    return new URL(url).searchParams.get('v')
}
