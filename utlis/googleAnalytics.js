export function initGoogleAnalytics() {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function (){dataLayer.push(arguments);}
    window.gtag('js', new Date());

    window.gtag('config', 'G-9GBY66SS82');
}
