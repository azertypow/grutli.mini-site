export type ApiCmsPageSpectacle = {
    childrenDetails: ApiSimplePage_ChildDetails[];
    cover: ApiCmsImage[];
    pageContent: {
        content: {
            title: string,
            eventtitle: string,
            iscover: string,
            cover: string,
            places: string,
            company: string,
            linked_spectacle: string,
            peoples: string,
            htmlcontent: ApiHTMLContent[],
            htmlcontent_falk: ApiHTMLContent[],
            details: string,
            htmldetails: ApiHTMLContent[],
            uuid: string
        },
        translations: [],
        children: [],
        files: [],
        id: string,
        mediaUrl: string,
        mediaRoot: string,
        num: number,
        parent: string,
        slug: string,
        template: {},
        uid: string,
        uri: string,
        url: string
    };
};


export interface SiteInfo {
    "page-simple": PageSimple[];
    spectacles: Spectacle[];
}

export interface PageSimple {
    cover: ApiCmsImage[];
    pageContent: PageContent;
}

export interface PageContent {
    content: PageContentDetails;
    translations: any[]; // Si les traductions ont une structure spécifique, remplace `any` par le type exact.
    children: string[];
    files: any[]; // Idem ici, remplace `any` si les fichiers ont une structure spécifique.
    id: string;
    mediaUrl: string;
    mediaRoot: string;
    num: number;
    parent: string | null;
    slug: string;
    template: Record<string, any>; // Si le template est un objet spécifique, précise ses propriétés.
    uid: string;
    uri: string;
    url: string;
}

export interface PageContentDetails {
    title: string;
    showinnavigation: 'true' | 'false'; // Probablement un boolean représenté en string ("true" / "false").
    showinhome: 'true' | 'false';
    htmlcontent: string;
    htmlcontent_falk: string;
    uuid: string;
}

export interface Spectacle {
    cover: ApiCmsImage[];
    pageContent: SpectaclePageContent;
}

export interface ApiCmsImage {
    caption: string;
    alt: string;
    link: string | null;
    photoCredit: string | null;
    url: string;
    mediaUrl: string;
    width: number;
    height: number;
    resize: Resize;
}

export interface Resize {
    tiny: string;
    small: string;
    reg: string;
    large: string;
    xxl: string;
}

export interface SpectaclePageContent {
    content: SpectacleContentDetails;
    translations: any[];
    children: any[];
    files: string[];
    id: string;
    mediaUrl: string;
    mediaRoot: string;
    num: number;
    parent: string;
    slug: string;
    template: Record<string, any>;
    uid: string;
    uri: string;
    url: string;
}

export interface SpectacleContentDetails {
    title: string;
    eventtitle: string;
    iscover: string; // Probablement un boolean représenté en string.
    cover: string;
    places: string;
    company: string;
    linked_spectacle: string;
    peoples: string;
    htmlcontent: string;
    htmlcontent_falk: string;
    details: string;
    htmldetails: string;
    uuid: string;
}


// ---
// simple page
// ---

export type ApiSimplePage_PageContent = {
    content: {
        title: string;
        showinnavigation: string;
        showinhome: string;
        htmlcontent: ApiHTMLContent[];
        htmlcontent_falk: ApiHTMLContent[];
        uuid: string;
    };
    translations: any[]; // Modifiez à un type précis si nécessaire
    children: string[];
    files: any[]; // Modifiez à un type précis si nécessaire
    id: string;
    mediaUrl: string;
    mediaRoot: string;
    num: number;
    parent: string | null;
    slug: string;
    template: Record<string, any>; // Modifiez à un type précis si nécessaire
    uid: string;
    uri: string;
    url: string;
};

export type ApiHTMLContent = {
    content: {
        text?: string;
        image?: string[];
    };
    id: string;
    isHidden: boolean;
    type: 'textWithTitle' | 'image' | 'text';
    images?: Array<{
        caption: string | null;
        alt: string | null;
        link: string | null;
        photoCredit: string | null;
        url: string;
        mediaUrl: string;
        width: number;
        height: number;
        resize: {
            tiny: string;
            small: string;
            reg: string;
            large: string;
            xxl: string;
        };
    }>;
}

export type ApiSimplePage_ChildDetails = {
    cover: any[]; // Modifiez à un type précis si nécessaire
    pageContent: ApiSimplePage_PageContent;
};

export type ApiSimplePage = {
    pageContent: ApiSimplePage_PageContent;
    childrenDetails: ApiSimplePage_ChildDetails[];
};
