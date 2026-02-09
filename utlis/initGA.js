export function initGA() {
    try {
        window.dataLayer = window.dataLayer || [];
        window.gtag = function (){dataLayer.push(arguments);}
        window.gtag('js', new Date());

        window.gtag('config', 'G-9GBY66SS82');
    } catch (e) {
        console.warn("Google Analytics n'a pas pu être initialisé", error);
    }
}
