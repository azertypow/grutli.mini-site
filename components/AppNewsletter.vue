<template>
    <div class="v-app-newsletter"
         :class="{
          'v-app-newsletter--ok': subscriberApiStatus === 'ok',
          'v-app-newsletter--error': subscriberApiStatus === 'error',
         }"
    >
      <div class="v-app-newsletter__overlay"
           @click="useAppNewsletterIsOpen().value = false"
      />
      <div class="v-app-newsletter__wrap v-transition-opacity__translate">
        <div class="v-app-newsletter__wrap__header">
          <h1 class="v-app-newsletter__wrap__header__title">Inscription à nos actualités</h1>
        </div>

        <form class="v-app-newsletter__wrap__form"
              :class="{
                'v-app-newsletter__wrap__form--sending': subscriberApiStatus === 'sending',
              }"
              @submit.prevent="handleSubmit"
        >
          <template v-if="subscriberApiStatus !== 'ok'">
            <div style="
                    display: flex;
                    flex-direction: column;
                    gap: .25rem;
                    margin-bottom: 1rem;
                  ">
              <label for="email"
                     style="
                      display: block;
                      text-align: center;
                      font-weight: 600;
                      font-size: .8rem;
                     "
              >Votre adresse courriel</label>
              <input
                      id="email"
                      type="email"
                      v-model="form.email"
                      placeholder="votre@email.com"
                      style="
                        display: block;
                        font-size: var(--app-font-size);
                        padding: .25rem;
                        border-radius: 1rem;
                        border: solid 1px;
                      "
              />
            </div>

            <div style="
                    display: flex;
                    flex-direction: column;
                    gap: .5rem;
                    margin-bottom: 1rem;
                    justify-content: center;
                    align-items: center;
                  ">
              <label style="
                      display: block;
                      text-align: center;
                      font-weight: 600;
                      font-size: .8rem;
                     "
              >Pour recevoir les informations&nbsp;:</label>

              <div style="max-width: 15rem; width: 100%; display: flex; flex-direction: column; gap: .5rem;">
                <div v-for="group in listOfNewsletterGroups" :key="group.name"
                     style="
                      display: flex;
                      flex-direction: row;
                      gap: .25rem;
                      align-items: center;
                    "
                >
                  <input
                          type="checkbox"
                          :value="group.name"
                          v-model="form.groups"
                  />
                  <label v-html="group.text"/>
                </div>
              </div>
            </div>
          </template>

          <p class="v-app-newsletter__msg">
            <template v-if="subscriberApiMessage" >{{ subscriberApiMessage }}</template>
            <template v-else>&nbsp;</template>
          </p>

          <div style="display: flex; width: 100%; justify-content: center; align-items: center;">
            <template v-if="subscriberApiStatus !== 'ok'">
              <div class="v-app-newsletter__wrap__form__submit app-button-grey"
                     v-if="subscriberApiStatus === 'sending'"
              >attendre</div>
              <input class="v-app-newsletter__wrap__form__submit app-button-grey"
                     v-else
                     type="submit"
                     value="je m'inscris"
              />
            </template>
          </div>

        </form>
      </div>

    </div>
</template>





<script setup lang="ts">
type SubscriptionResponse = {
    error: unknown,
    message: string,
    status: 'ok' | 'error'
}


/**
 * This type defines the distinct names value of newsletters
 * that can be used within the newsletter service.
 */
type NewsLetterValues =
    "Site - Tout public"
    | "Site - Relax"
    | "Site - BdC"
    | "Site - École"
    | "Site - Programmatrices"

type NewsLetterGroupes = {
    name: NewsLetterValues,
    text: string,
}[]

type SubscriberDataToSend = {
    email: string,
    groups: NewsLetterGroupes,
}

const listOfNewsletterGroups = [
    {
        name: "Site - Tout public",
        text: "sur la saison",
    },
    {
        name: "Site - Relax",
        text: "sur les mesures d’accessibilité",
    },
    {
        name: "Site - BdC",
        text: "sur le Bureau des Compagnies<br>(destiné aux artistes)",
    },
    {
        name: "Site - École",
        text: "sur l’offre pour les écoles",
    },
    {
        name: "Site - Programmatrices",
        text: "sur la diffusion des spectacles<br>(destiné à la profession)"
    },
] satisfies NewsLetterGroupes

const subscriberApiMessage = ref('')
const subscriberApiStatus: Ref<'ok' | 'error' | 'sending' | null> = ref(null)

const form = ref<SubscriberDataToSend>({
    email: '',
    groups: [],
});

const handleSubmit = async () => {
    subscriberApiMessage.value = 'Envoi en cours...'
    subscriberApiStatus.value = 'sending'

    const subscriptionResponse = await requestSubscription()

    subscriberApiMessage.value = subscriptionResponse.message
    subscriberApiStatus.value = subscriptionResponse.status

    if( subscriptionResponse.status === 'ok' ) {
        form.value.email = ''
        form.value.groups = []
    }

    console.info( subscriptionResponse.status, subscriptionResponse.error )
}

async function requestSubscription(): Promise<SubscriptionResponse> {
    const sendSSubscription = await fetch('https://grutli-subscription.deno.dev/subscribe', {
    // const sendSSubscription = await fetch('http://0.0.0.0:8000/subscribe', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: form.value.email,
            groups: form.value.groups,
        } satisfies SubscriberDataToSend)
    })

    return await sendSSubscription.json() satisfies SubscriptionResponse
}

</script>





<style lang="scss" scoped >
.v-app-newsletter {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: var(--app-gutter-xl);
}

.v-app-newsletter__overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.85);
  z-index: 0;
}

.v-app-newsletter__wrap {
  position: relative;
  z-index: 1;
  width: 100%;
  max-height: 80vh;
  overflow: auto;
  background: white;
  border-radius: 1rem;
  max-width: 25rem;
  padding: 2rem;
  box-sizing: border-box;

  @media (max-width: 600px) {
    padding-left: var(--app-gutter-xl);
    padding-right: var(--app-gutter-xl);
  }
}

.v-app-newsletter__wrap__header {
  text-align: center;
}

.v-app-newsletter__wrap__header__title {
  margin-top: 0;
  margin-bottom: 1em;
  line-height: 1.15em;
}

div.v-app-newsletter__wrap__form__submit{
  display: inline-block;
  cursor: auto;
  pointer-events: none;
}

.v-app-newsletter__wrap__form--sending {
  pointer-events: none;
}

.v-app-newsletter__msg {
  margin-top: var(--app-line-height);
  text-align: center;

  .v-app-newsletter--error & {
    color: #ed3636;
  }

  .v-app-newsletter--ok & {
    color: hsl(160 84% 45% / 1);
  }

}

input[type="checkbox"] {
  display: block;
  width:  1rem;
  height: 1rem;
  border-radius: 0.15em;
  border: solid 1px;
  cursor: pointer;
  margin: 0;
  background: white;
  flex-shrink: 0;

  &:hover {
    background: var(--app-color-grey);
  }
}

h1, h2 {
  font-family: 'ABCOracleWebSite', sans-serif;
}
</style>
