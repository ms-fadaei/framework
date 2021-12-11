<template>
  <div>
    Hello World

    <Html :lang="String(dynamic)">
      <Head>
        <Title>{{ dynamic }} title</Title>
        <Meta name="description" :content="`My page's ${dynamic} description`" />
        <Link rel="preload" href="/test.txt" as="script" />
        <Script :src="`./mock.js?t=${dynamic}`" strategy="immediate" @load="log('immediate')" />
        <Script :src="`./mock.js?t=${dynamic}`" strategy="onInteractive" @load="log('interactive')" />
        <Script :src="`./mock.js?t=${dynamic}`" strategy="onLoad" @load="log('load')" />
        <Script :src="`./mock.js?t=${dynamic}`" strategy="onIdle" @load="log('idle')" />
      </Head>
    </Html>
    <br>
    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Fronalpstock_big.jpg/640px-Fronalpstock_big.jpg" alt="" @load="log('photo loaded')">
    <br>
    <button class="blue" @click="dynamic = Math.random() * 100">
      Clickme
    </button>
  </div>
</template>

<script lang="ts">

export default {
  setup () {
    useMeta({
      bodyAttrs: {
        class: 'test'
      }
    })

    const log = (e: any) => {
      console.log('load event for js', e)
    }

    if (typeof window !== 'undefined') {
      document.addEventListener('readystatechange', () => {
        console.log('readystatechange', document.readyState)
      })
    }

    return { dynamic: ref(49), log }
  },
  head: {
    title: 'Another title'
  }
}
</script>
