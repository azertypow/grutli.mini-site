function normalizeDate(dateString: string): Date {

    dateString = dateString.replace(" ", "T")

    if (dateString.includes('T') || dateString.includes(' ')) {
        return new Date(dateString)
    } else {
        // Ajouter l'heure de midi pour éviter les problèmes de fuseau horaire
        return new Date(dateString + 'T12:00:00')
    }
}

export function formatDate(stringDate: string): string {

    const startDate = new Date(normalizeDate(stringDate))

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

    const startDate = new Date(normalizeDate(stringDate))

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
