export function getFirstPath(path: string): string | null {
    try {
        // const parsedUrl = new URL(url)
        const segments = path.split('/')
        return segments.length > 1 ? segments[1] : null
    } catch (e) {
        return null
    }
}
