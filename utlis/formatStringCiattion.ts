export function formatTitle(input: string): string {
    return input.replace(/^([^,]+),/, "<em>$1</em>,")
}
