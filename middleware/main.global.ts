// middleware/global.ts
import {useAppNewsletterIsOpen} from "~/composables/cmsData";

export default defineNuxtRouteMiddleware((to, from) => {

    if( useRoute().query.newsletter === 'true' ) {
        useAppNewsletterIsOpen().value = true
    }

})
