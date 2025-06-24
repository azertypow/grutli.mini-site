declare global {
    interface Window {
        dataLayer: any[];
        gtag: (...args: any[]) => void;
    }
}

export function ga4_page_view({page_path, page_title, page_location}: {
    page_path: string,
    page_title: string,
    page_location: string
}) {
    if (typeof window.gtag === 'function') {

        // console.log(
        //     "\npage_path", page_path,
        //     "\npage_title", page_title,
        //     "\npage_location", page_location,
        // )
        window.gtag('event', 'page_view', {
            page_path: page_path,
            page_title: page_title,
            page_location: page_location
        })
    }
}
