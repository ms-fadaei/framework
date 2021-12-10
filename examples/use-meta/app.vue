<template>
  <div>
    Hello World

    <Html :lang="String(dynamic)">
      <Head>
        <Title>{{ dynamic }} title</Title>
        <Meta name="description" :content="`My page's ${dynamic} description`" />
        <Link rel="preload" href="/test.txt" as="script" />
        <Script :src="`https://cdn.jsdelivr.net/npm/jquery@3.2?c=${dynamic}`" strategy="onLoad" @load="onLoad" />
      </Head>
    </Html>

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

    const log = (e: any) => () => {
      console.log(e)
    }

    if (typeof window !== 'undefined') {
      document.addEventListener('readystatechange', () => {
        console.log('readystatechange', document.readyState)
      })
    }

    return { dynamic: ref(49), onLoad: log('load') }
  },
  head: {
    title: 'Another title'
  }
}
</script>
