export function formatDate(stringDate: string): string {

    const startDate = new Date(stringDate.replace(" ", "T"))

    const options: Intl.DateTimeFormatOptions = {
        month: 'long',
        day: 'numeric'
    }
    const formatter = new Intl.DateTimeFormat('fr-FR', options)

    return formatter.format(startDate)
}

export function formatDateStartAndDateEndToString(startDate: string, endDate: string): string {
    const startDateString = formatDate(startDate)
    const endDateString = formatDate(endDate)

    if (startDateString === endDateString) return startDateString

    return `${startDateString} - ${endDateString}`
}
