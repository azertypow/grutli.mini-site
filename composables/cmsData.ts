import type {
    ApiNews,
    ApiNewsItem,
    ApiPlaces,
    ApiSeasons, ApiSeasons_value,
    ApiSimplePage_ChildDetails,
    SiteInfo
} from "~/utlis/ApiCmsTypes";

export const useSiteInfo: () => Ref<null | SiteInfo> = () => {
    return useState('useSiteInfo', () => null )
}

export const usePlacesInfo: () => Ref<null | ApiPlaces> = () => {
    return useState('usePlacesInfo', () => null )
}

export const useNews: () => Ref<null | AppNewsItem[]> = () => {
    return useState('useNews', () => null )
}

export const useMenuIsOpen: () => Ref<boolean> = () => {
    return useState('useMenuIsOpen', () => true )
}

export const useShowCookieBanner: () => Ref<boolean> = () => {
    return useState('useShowCookieBanner', () => true )
}

export type AppNewsItem = ApiNewsItem & {
    isOpen: boolean
}

export const useFalkIsActive: () => Ref<boolean> = () => {
    return useState('useFalkIsActive', () => false )
}

export const useCurrentPageForNavLinks: () => Ref<{slug: string, title: string} | null> = () => {
    return useState('useCurrentPageForNavLinks', () => null )
}

export const useParentSubPageForNavLinks: () => Ref<ApiSimplePage_ChildDetails[]  | null> = () => {
    return useState('useParentSubPageForNavLinks', () => null )
}

export const useChildrenDetailsForNavLinks: () => Ref<ApiSimplePage_ChildDetails[]  | null> = () => {
    return useState('useChildrenDetailsForNavLinks', () => null )
}

export const useWindowIsScrollToBottom: () => Ref<boolean> = () => {
    return useState('useWindowIsScrollToBottom', () => false )
}

export const useAppContentIsLoaded: () => Ref<boolean> = () => {
    return useState('useAppContentIsLoaded', () => false )
}

export const useAppNewsletterIsOpen:() => Ref<boolean> = () => {
    return useState('useAppNewsletterIsOpen', () => false )
}

export const useAppSeasons: () => Ref<ApiSeasons | null> = () => useState('useAppSeasons', () => null)

export const useAppSeasons_active: () => Ref<ApiSeasons_value[] | null> = () => useState('useAppSeasons_active', () => null)

export const useWindowsWidthIsSmallerThan1200pxCSSBreakpoint: () => Ref<boolean> = () => useState('useWindowsWidthIsSmallerThan1200pxCSSBreakpoint', () => true)
