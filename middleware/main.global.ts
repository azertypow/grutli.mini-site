// middleware/global.ts
import {useAppNewsletterIsOpen} from "~/composables/cmsData";

export default defineNuxtRouteMiddleware((to, from) => {

    if( to.query.newsletter === 'true' ) {
        useAppNewsletterIsOpen().value = true
    }

})
