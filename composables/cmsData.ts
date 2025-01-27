import type {ApiNews, ApiNewsItem, ApiPlaces, SiteInfo} from "~/utlis/ApiCmsTypes";

export const useSiteInfo: () => Ref<null | SiteInfo> = () => {
    return useState('useSiteInfo', () => null )
}

export const usePlacesInfo: () => Ref<null | ApiPlaces> = () => {
    return useState('usePlacesInfo', () => null )
}

export const useNews: () => Ref<null | AppNewsItem[]> = () => {
    return useState('useNews', () => null )
}

export type AppNewsItem = ApiNewsItem & {
    isOpen: boolean
}

export const useFalkIsActive: () => Ref<boolean> = () => {
    return useState('useFalkIsActive', () => false )
}
