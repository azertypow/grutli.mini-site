<template>
    <div class="v-app-newsletter"
         :class="{
          'v-app-newsletter--ok': subscriberApiStatus === 'ok',
          'v-app-newsletter--error': subscriberApiStatus === 'error',
         }"
         role="dialog"
         aria-modal="true"
         aria-labelledby="newsletter-title"
         @keydown.esc="useAppNewsletterIsOpen().value = false"
    >
      <div class="v-app-newsletter__overlay"
           @click="useAppNewsletterIsOpen().value = false"
           aria-hidden="true"
      />
      <div class="v-app-newsletter__wrap v-transition-opacity__translate">

        <button class="v-app-newsletter__wrap__close-ui"
                @click="useAppNewsletterIsOpen().value = false"
                type="button"
                aria-label="Fermer la fenêtre d'inscription">
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor" aria-hidden="true">
            <path d="m336-280 144-144 144 144 56-56-144-144 144-144-56-56-144 144-144-144-56 56 144 144-144 144 56 56ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/>
          </svg>
        </button>

        <div class="v-app-newsletter__wrap__header">
          <h1 id="newsletter-title" class="v-app-newsletter__wrap__header__title">Inscription à nos actualités</h1>
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
                      required
                      aria-required="true"
                      :aria-invalid="validationErrors.groups ? 'true' : 'false'"
                      autocomplete="email"
                      style="
                        display: block;
                        font-size: var(--app-font-size);
                        padding: .25rem;
                        border-radius: 1rem;
                        border: solid 1px;
                      "
                      ref="newsletter_first_focused"
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

              <fieldset style="max-width: 15rem; width: 100%; display: flex; flex-direction: column; gap: .5rem; border: none; padding: 0; margin: 0;"
                        aria-required="true"
                        :aria-invalid="validationErrors.groups ? 'true' : 'false'">
                <legend class="sr-only">Choix des newsletters</legend>
                <div v-for="(group, index) in listOfNewsletterGroups" :key="group.name"
                     style="
                      display: flex;
                      flex-direction: row;
                      gap: .25rem;
                      align-items: center;
                    "
                >
                  <input
                          :id="`newsletter-group-${index}`"
                          type="checkbox"
                          :value="group.name"
                          v-model="form.groups"
                          aria-required="true"
                  />
                  <label :for="`newsletter-group-${index}`" v-html="group.text"/>
                </div>
              </fieldset>
            </div>
          </template>

          <p class="v-app-newsletter__msg"
             :role="subscriberApiStatus === 'error' ? 'alert' : 'status'"
             :aria-live="subscriberApiStatus === 'error' ? 'assertive' : 'polite'">
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

const newsletter_first_focused = ref<HTMLElement>()

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
    "Principale"
    | "RELAX"
    | "Bureau des Cies"
    | "Ecoles"
    | "Programmatrices"

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
        name: "Principale",
        text: "de la saison",
    },
    {
        name: "RELAX",
        text: "des mesures d’accessibilité",
    },
    {
        name: "Bureau des Cies",
        text: "du Bureau des Compagnies<br>(destiné aux artistes)",
    },
    {
        name: "Ecoles",
        text: "de l’offre pour les écoles",
    },
    {
        name: "Programmatrices",
        text: "de la diffusion des spectacles<br>(destiné à la profession)"
    },
] satisfies NewsLetterGroupes

const subscriberApiMessage = ref('')
const subscriberApiStatus: Ref<'ok' | 'error' | 'sending' | null> = ref(null)

const validationErrors = ref({
    email: false,
    groups: false,
})

const form = ref<SubscriberDataToSend>({
    email: '',
    groups: [],
});

const handleSubmit = async () => {
    // Reset validation errors
    validationErrors.value = {
        email: false,
        groups: false,
    }

    // Client-side validation
    if (!form.value.email || form.value.email.trim() === '') {
        validationErrors.value.email = true
        subscriberApiMessage.value = 'Votre adresse courriel est obligatoire'
        subscriberApiStatus.value = 'error'
        return
    }

    if (form.value.groups.length === 0) {
        validationErrors.value.groups = true
        subscriberApiMessage.value = 'Vous devez sélectionner au moins 1 choix de newsletter'
        subscriberApiStatus.value = 'error'
        return
    }

    subscriberApiMessage.value = 'Envoi en cours...'
    subscriberApiStatus.value = 'sending'

    const subscriptionResponse = await requestSubscription()

    subscriberApiMessage.value = subscriptionResponse.message
    subscriberApiStatus.value = subscriptionResponse.status

    if( subscriptionResponse.status === 'ok' ) {
        form.value.email = ''
        form.value.groups = []
        validationErrors.value = {
            email: false,
            groups: false,
        }
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

watch(useAppNewsletterIsOpen, (isOpen) => {
  if(isOpen.value) newsletter_first_focused.value?.focus()
})

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
  background: transparent;
}

.v-app-newsletter__overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  //background: rgba(0, 0, 0, 0.85);
  z-index: 0;
  backdrop-filter: blur(2rem);
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

.v-app-newsletter__wrap__close-ui {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: .5rem;
  right: .5rem;
  width: 2rem;
  height: 2rem;
  padding: 0.25rem;
  z-index: 10;
  background: transparent;
  border: none;
  cursor: pointer;
  border-radius: 0.25rem;
  transition: transform 0.2s ease;

  svg {
    width: 1rem;
    height: 1rem;
    fill: var(--app-color-secondary);
  }

  &:hover,
  &:focus {
    transform: scale(1.1);
    background: rgba(0, 0, 0, 0.05);
  }

  &:focus-visible {
    outline: 2px solid currentColor;
    outline-offset: 2px;
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
