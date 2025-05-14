export type ApiCmsPageSpectacle = {
    childrenDetails: ApiSimplePage_ChildDetails[];
    cover: ApiCmsImage[];
    pageContent: {
        content: {
            title: string,
            eventtitle: string[],
            eventinfo: string,
            externalticketservicelink: string,
            externalticketservicename: string,
            datestart: string
            dateend: string
            iscover: "true" | "false",
            showinhome: "true" | "false",
            cover: string,
            places: string,
            company: ApiCmsCompany[],
            linked_spectacle: string,
            peoples: string,
            htmlcontent: ApiHTMLContent_Blocks[],
            htmlcontent_falk: ApiHTMLContent_Blocks[],
            details: string,
            htmldetails: ApiHTMLContent_Blocks[],
            uuid: string
            season: string
            list_of_dates: ApiCmsPageSpectacle_listOfDates[]
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
}

export interface ApiCmsPageSpectacle_listOfDates {
    list_of_dates_date: string
    list_of_dates_hour: string
    list_of_dates_ticket_link: string
    list_of_dates_is_relax: "false" | "true"
    id: string
}


export type ApiCmsCompany = {
    authors_name: string,
        authors_link: string,
        id: string //string number
}


export interface SiteInfo {
    "page-simple": SiteInfoPageSimple[];
    spectacles: Spectacle[];
}

export interface SiteInfoPageSimple {
    cover: ApiCmsImage[];
    pageContent: PageContent;
    children: PageChildren[]
}

export interface PageContent {
    content: PageContentDetails;
    dateend: string
    datestart: string
    showincalendar: "true" | "false"
    translations: any[];
    children: string[];
    files: any[];
    id: string;
    mediaUrl: string;
    mediaRoot: string;
    num: number;
    parent: string | null;
    slug: string;
    template: Record<string, any>;
    uid: string;
    uri: string;
    url: string;
}

export interface PageChildren {
    title: string,
    showinnavigation: "true" | "false",
    showinhome: "true" | "false",
    parent: {
        title: string,
        showinnavigation: "true" | "false",
        showinhome: "true" | "false",
        slug: string
        uid:  string
        uri:  string
        url:  string
    },
    slug:   string
    uid:    string
    uri:    string
    url:    string
}

export interface PageContentDetails {
    title: string;
    showincalendar?: "true" | "false",
    datestart?: string,
    dateend?: string,
    showinnavigation: 'true' | 'false'; // Probablement un boolean représenté en string ("true" / "false").
    showinhome: 'true' | 'false';
    content: string
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
    photographer: string | null;
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
    eventtitle: string[];
    eventinfo: string,
    externalticketservicelink: string,
    externalticketservicename: string,
    datestart: string
    dateend: string
    iscover: 'true' | 'false'
    showinhome: "true" | "false",
    cover: string;
    places: string;
    company: ApiCmsCompany[];
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
        showincalendar?: "true" | "false",
        datestart?: string,
        dateend?: string,
        templatewith_3_coll?: "true" | "false",
        showinnavigation: string;
        showinhome: string;
        content: (SectionBlockContent | SectionBlockLinkToEvent) []
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

export type ApiSimplePage_ChildDetails_PageContent = {
    content: {
        title: string;
        showinnavigation: 'true' | 'false';
        showinhome: 'true' | 'false';
        content: string
        uuid: string;
        season: string
    };
    translations: any[];
    children: string[];
    files: any[];
    id: string;
    mediaUrl: string;
    mediaRoot: string;
    num: number;
    parent: string | null;
    slug: string;
    template: Record<string, any>;
    uid: string;
    uri: string;
    url: string;
}

export type SectionBlockContent = {
    content: {
        titre: "Contact",
        htmlcontent: ApiHTMLContent_Blocks[],
        htmlcontent_falk: ApiHTMLContent_Blocks[],
    },
    id: string,
    isHidden: boolean,
    type: "section-block-content"
}


export type SectionBlockLinkToEvent = {
    content: {
        titre: string,
        linked_spectacle: string // slug: "gnocchi-a-meyrin"
    },
    id: string,
    isHidden: false,
    type: "section-block-link-to-event"
}

type ApiHTMLContent = {
    id: string;
    isHidden: boolean;
}

export type ApiHTMLContent_text = ApiHTMLContent & {
    type: 'text';
    content: {
        text: string;
    }
}

export type ApiHTMLContent_link = ApiHTMLContent & {
    type: 'link'
    content: {
        text: string
        link: string
    }
}


export type ApiHTMLContent_textWithTitle = ApiHTMLContent & {
    type: 'textWithTitle';
    content: {
        text: string;
    }
}

export type ApiHTMLContent_video = ApiHTMLContent & {
    content: {
        url: string,
        credit: string,
        title: string
    },
    type: "video"
}

export type ApiHTMLContent_quote = ApiHTMLContent & {
    content: {
        text: string /**html string*/
        citation: string /**html string: "<em>L’Arbre-Monde</em>, Richard Powers"*/
    },
    id: string,
    isHidden: boolean,
    type: "quote"
}

export type ApiHTMLContent_break = ApiHTMLContent & {
    type: "break"
}



export type ApiHTMLContent_image = ApiHTMLContent & {
    type: 'image';
    content: {
        image: string[];
    };
    images?: Array<{
        caption: string | null;
        alt: string | null;
        link: string | null;
        photographer: string | null;
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

export type ApiHTMLContent_imageGallery = ApiHTMLContent & {
    type: 'imageGallery';
    content: {
        title: string
        image: string[];
    };
    images: {
        caption: string | null;
        alt: string | null;
        link: string | null;
        photographer: string | null;
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
    }[];
}

export type ApiHTMLContent_Blocks =
    ApiHTMLContent_text
    | ApiHTMLContent_link
    | ApiHTMLContent_textWithTitle
    | ApiHTMLContent_image
    | ApiHTMLContent_imageGallery
    | ApiHTMLContent_video
    | ApiHTMLContent_quote
    | ApiHTMLContent_break

export type ApiSimplePage = {
    pageContent: ApiSimplePage_PageContent;
    childrenDetails?: ApiSimplePage_ChildDetails[];
};

export type ApiSimplePage_ChildDetails = {
    cover: any[];
    pageContent: ApiSimplePage_ChildDetails_PageContent;
};

export type ApiPlaces = {
    value: {
        title: string,
        slug: string
    }[]
}


export type ApiNews = {
    value: ApiNewsItem[]
}

export type ApiNewsItem = {
    text: string,
    link: string,
    id: string,
    show: 'true' | 'false',
}

export type ApiSeasons = {
    value: ApiSeasons_value[]
}

export type ApiSeasons_value = {
    content: ApiSeasons_value_content
    translations: any[ ],
    children: any[ ],
    files: any[ ],
    id: string
    mediaUrl: string
    mediaRoot: string
    num: number,
    parent: string
    slug: string
    template: { }
    uid: string
    uri: string
    url: string
}

export type ApiSeasons_value_content = {
    dateinformation: string
    statut: "a-venir" | "en-cours" | "passe"
    title: string
    uuid: string
}
