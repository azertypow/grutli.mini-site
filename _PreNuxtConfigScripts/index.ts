import { writeFile } from "fs/promises"
import {fetchSiteInfo} from "../utlis/apiCmsFetch.ts";
import type {SiteInfo} from "../utlis/ApiCmsTypes.ts";


async function main() {
    const pageData: SiteInfo | null = await fetchSiteInfo()

    if( pageData === null ) return

    const arrayOfRoutes: string[] = [
        ...pageData.spectacles.map(spectacle => spectacle.pageContent.uri),
        ...pageData["page-simple"].flatMap(page => {

            return [
                page.pageContent.uri,
                ...page.children.map(value => value.uri),
            ]
        }),
    ]

    console.log( arrayOfRoutes )

    const fileContent = `// Généré automatiquement\n\nexport const generatedRoutes: string[] = ${JSON.stringify(arrayOfRoutes, null, 2)};`

    try {
        // Écrire dans le fichier TypeScript
        await writeFile("./generatedRoutes.ts", fileContent)
        console.log("Routes enregistrées dans 'generatedRoutes.ts'")
    } catch (error) {
        console.error("Erreur lors de l'enregistrement du fichier :", error)
    }
}
main()
