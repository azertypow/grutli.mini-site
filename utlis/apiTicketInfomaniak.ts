const API_TOKEN = '19bc2fe7b6886578505d76e5ad76bff5'

export async function apiTicketInfomaniak_fetchEvents(params?: {[key: string]: string}): Promise<ApiTicketInfomaniak_event[]> {
    const url = new URL("https://etickets.infomaniak.com/api/shop/events")

    if(params) {
        // Ajouter les paramètres à l'URL
        Object.entries(params).forEach(([key, value]) => {
            url.searchParams.append(key, value.toString())
        })
    }

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                key: API_TOKEN,
                "Content-Type": "application/json",
            },
        })

        if (!response.ok) {
            throw new Error(`Erreur API: ${response.status} - ${response.statusText}`)
        }

        return await response.json()
    } catch (error) {
        console.error("Erreur lors de la récupération des événements:", error)
        throw error
    }
}


export type ApiTicketInfomaniak_event = {
    "date_id": number,
    "event_id": number,
    "period_id": number,
    "name": string,
    "description": string,
    "start": string,
    "date": string,
    "end": null,
    "opening_doors": string,
    "closing_doors": null,
    "date_full_text": string,
    "category": string,
    "category_id": number,
    "relative_days_before_sale": null,
    "schedule_publication_leprogramme_datetime": null,
    "schedule_publication_leprogramme_date": null,
    "schedule_publication_leprogramme_hour": null,
    "schedule_sale_impact_event_pass": boolean,
    "schedule_sale_date": null,
    "status": string,
    "status_label": {
        "force_display": false,
        "level": string,
        "value": string,
        "color": string,
        "color_hex": string
    },
    "capacity": null,
    "has_hall": boolean,
    "import_id": null,
    "event_import_id": null,
    "hall_disposition_id": null,
    "has_zone": boolean,
    "nb_dates": null,
    "contact_tracing": boolean,
    "stream": null,
    "quota_date": number,
    "status_portal_id": number,
    "minimum_age": number,
    "duration_in_minutes": number,
    "website": null,
    "ytb": null,
    "authors": {
        "author_id": number,
        "name": string,
        "wikipedia_url": null,
        "id": number,
        "pivot": {
            "event_id": number,
            "author_id": number
        }
    }[],
    "distribution": [],
    "group_event_id": number,
    "portal": string,
    "portal_horizontal": string,
    "portal_horizontal_big": string,
    "portal_link_preview": string,
    "portal_link": string,
    "thumbnail": string,
    "address": {
        "id": number,
        "title": string,
        "street": string,
        "number": string,
        "zipcode": string,
        "city": string,
        "custom": null,
        "country": string,
        "country_id": number,
        "google": {
            "title": null,
            "place_id": null,
            "latitude": null,
            "longitude": null
        }
    }
}
