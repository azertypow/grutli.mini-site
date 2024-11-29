import type {ParsedContent} from "@nuxt/content";

export interface PageHeaderAPI extends ParsedContent{
    title: string,
    headerDate: string,
    peoples: string[],
    headerImageLeft: string,
    headerImageRight: string,
    headerColor: string,
    textColor: string,
    ticketUrl: string,
}
