import type {PageHeaderAPI} from "~/utlis/PageHeaderAPI";
import auBoutDeLaLaisse from "~/utlis/spectacle/au-bout-de-la-laisse";
import chapitresDeLaChute from "~/utlis/spectacle/chapitres-de-la-chute";
import choc from "~/utlis/spectacle/choc";
import dansLeDecorDe from "~/utlis/spectacle/dans-le-decor-de";
import disperses from "~/utlis/spectacle/disperses";
import famille from "~/utlis/spectacle/famille";
import gnocchi from "~/utlis/spectacle/gnocchi";
import laGrosseDeprime from "~/utlis/spectacle/la-grosse-deprime";
import lesEnfantsDuRhone from "~/utlis/spectacle/les-enfants-du-rhone";
import murerLaPeur from "~/utlis/spectacle/murer-la-peur";
import quandViendraLaVague from "~/utlis/spectacle/quand-viendra-la-vague";
import madameDe from "~/utlis/spectacle/madame-de";
import quasimodoAuxMiroirs from "~/utlis/spectacle/quasimodo-aux-miroirs";
import queerCripBecoming from "~/utlis/spectacle/queer-crip-becoming";
import smoke from "~/utlis/spectacle/smoke";

export const _routes: { [key: string]: PageHeaderAPI } = {
    'chapitres-de-la-chute':     chapitresDeLaChute,
    'quand-viendra-la-vague':    quandViendraLaVague,
    'les-enfants-du-rhone':      lesEnfantsDuRhone,

    'dans-le-decor-de':          dansLeDecorDe,
    'gnocchi':                   gnocchi,
    'smoke':                     smoke,
    'madame-de':                 madameDe,
    'queer-crip-becoming':       queerCripBecoming,
    'disperses':                 disperses,
    'murer-la-peur':             murerLaPeur,
    'famille':                   famille,
    'choc':                      choc,
    'quasimodo-aux-miroirs':     quasimodoAuxMiroirs,
    'la-grosse-deprime':         laGrosseDeprime,
    'au-bout-de-la-laisse':      auBoutDeLaLaisse,
}
