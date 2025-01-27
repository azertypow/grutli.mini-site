import type {ApiPlaces, SiteInfo} from "~/utlis/ApiCmsTypes";

export const useSiteInfo: () => Ref<null | SiteInfo> = () => {
    return useState('useSiteInfo', () => null )
}

export const usePlacesInfo: () => Ref<null | ApiPlaces> = () => {
    return useState('usePlacesInfo', () => null )
}

export const useFalkIsActive: () => Ref<boolean> = () => {
    return useState('useFalkIsActive', () => false )
}

export const useMenuIsOpen: () => Ref<boolean> = () => {
    return useState('useMenuIsOpen', () => false )
}
