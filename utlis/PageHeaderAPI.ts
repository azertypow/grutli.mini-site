import type {ParsedContent} from "@nuxt/content";

export interface PageHeaderAPI extends ParsedContent{
    headerTitle: string
    headerPeoplesIntro: string[]
    headerType: string
    headerPeoples: string[]
    headerProduction: string
    headerCoproduction: string
    headerSoutiens: string[]
    headerImageLeft: string
    headerDate: string
}
