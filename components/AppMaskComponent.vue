<template>
    <div
        class="v-app-mask-component"
    >
      <div ref="ref_contentToMask"
           style="width: 100%; height: 100%; background-color: red; display: flex; justify-content: center; align-items: center;"
      >
        <div>bonjour le monde</div>
      </div>

      <video ref="ref_video" src="/mask.mp4" autoplay muted loop/>

      <canvas ref="ref_canvas" />

    </div>
</template>





<script setup lang="ts">

const ref_video: Ref<HTMLVideoElement | null> = ref(null);
const ref_canvas: Ref<HTMLCanvasElement | null> = ref(null);
const ref_ctx: Ref< CanvasRenderingContext2D | null> = ref(null)
const ref_contentToMask: Ref<HTMLVideoElement | null> = ref(null);


onMounted(() => {
    nextTick(() => {
        setupCanvas()
    })
})

function setupCanvas() {
    if (ref_canvas.value === null) return
    if (ref_video.value === null) return
    if (ref_contentToMask.value === null) return

    ref_ctx.value = ref_canvas.value.getContext('2d')

    ref_video.value.addEventListener('loadedmetadata', () => {
        if (ref_canvas.value === null) return
        if (ref_video.value === null) return

        ref_canvas.value.width =  ref_video.value.videoWidth
        ref_canvas.value.height = ref_video.value.videoHeight
    })


    applyMask()

    // // Démarrer la vidéo et appliquer le masque
    // ref_video.value.addEventListener('play', () => {
    //     console.log('play')
    //     applyMask();
    // })
}


function applyMask() {
    if( ref_ctx.value === null) return
    if( ref_video.value === null) return
    if( ref_canvas.value === null) return
    if( ref_contentToMask.value === null) return


    // Dessiner la vidéo sur le canvas
    ref_ctx.value.drawImage(ref_video.value, 0, 0, ref_canvas.value.width, ref_canvas.value.height)

    // Extraire les données des pixels
    const imageData = ref_ctx.value.getImageData(0, 0, ref_canvas.value.width, ref_canvas.value.height)
    const data = imageData.data

    console.log(0, 0, ref_canvas.value.width, ref_canvas.value.height)

    // Créer un masque basé sur le canal alpha
    for (let i = 0; i < data.length; i += 4) {
        const alpha = data[i + 3] // Canal alpha
        data[i] = 0 // Rouge
        data[i + 1] = 0 // Vert
        data[i + 2] = 0 // Bleu
        data[i + 3] = alpha // Conserver l'alpha
    }

    // Appliquer le masque sur le canvas
    ref_ctx.value.putImageData(imageData, 0, 0)

    // Utiliser le canvas comme masque pour le contenu HTML
    // ref_contentToMask.value.style.maskImage       = `url(${ref_canvas.value.toDataURL()})`
    // ref_contentToMask.value.style.webkitMaskImage = `url(${ref_canvas.value.toDataURL()})` // Pour Safari

    // Répéter l'opération à chaque frame
    requestAnimationFrame(applyMask)
}


</script>





<style lang="scss" scoped >
.v-app-mask-component {
  width: 100%;
  height: 100%;
  position: relative;
  mask-size: cover;
  -webkit-mask-size: cover;
  mask-border-mode: alpha;
}

video {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

canvas {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100000;
  background: white;
}
</style>
