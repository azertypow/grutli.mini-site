export function formatDate(stringDate: string): string {

    const startDate = new Date(stringDate.replace(" ", "T"))

    const options: Intl.DateTimeFormatOptions = {
        month: 'long',
        day: 'numeric'
    }
    const formatter = new Intl.DateTimeFormat('fr-FR', options)

    return formatter.format(startDate)
}

export function formatTime(time: string): string {
    const [hours, minutes] = time.split(':').map(Number);

    const formattedHours = hours.toString();
    const formattedMinutes = minutes.toString().padStart(2, '0');

    if (formattedMinutes === '00') {
        return `${formattedHours}h`;
    } else {
        return `${formattedHours}h${formattedMinutes}`;
    }
}

export function formatDate_byDay(stringDate: string): string {

    const startDate = new Date(stringDate.replace(" ", "T"))

    const options: Intl.DateTimeFormatOptions = {
        weekday: 'long',
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
