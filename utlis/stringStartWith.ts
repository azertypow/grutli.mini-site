export function stringStartWith(stringToTest: string, arrayOfPatterns: string[]): boolean {
    return arrayOfPatterns
        .some((pattern: string) =>
            stringToTest.startsWith(pattern)
        )
}
