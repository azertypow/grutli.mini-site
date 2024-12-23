import type {SiteInfo} from "~/utlis/ApiCmsTypes";

export const useSiteInfo: () => Ref<null | SiteInfo> = () => {
    return useState('useSiteInfo', () => null )
}

export const useFalkIsActive: () => Ref<boolean> = () => {
    return useState('useFalkIsActive', () => false )
}

// watch(useFalkIsActive, (value) => {
//     value ?
//         document.body.classList.add('nuxt-watch-falk-is-active')
//         : document.body.classList.remove('nuxt-watch-falk-is-active')
// })
