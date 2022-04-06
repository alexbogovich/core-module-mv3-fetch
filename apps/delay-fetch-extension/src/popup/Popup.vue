<template>
  <div>
    <button @click="fetchData">
      Fetch Data
    </button>
    <div v-if="fetcherState">
      <div>
        {{ fetcherState.d10s }}
      </div>
      <div>
        {{ fetcherState.d30s }}
      </div>
      <div>
        {{ fetcherState.d60s }}
      </div>
      <div>
        {{ fetcherState.d120s }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { psdk } from '~/shared/psdk'
import type { FetcherState } from '~/background/fetcher/FetcherService'

export default defineComponent({
  name: 'Popup',
  setup() {
    const fetcherState = ref<FetcherState | null>(null)

    const fetchData = async() => {
      const state = await psdk.fetchers.getState()
      console.log('psdk.fetchers.getState().', state)
      fetcherState.value = state
    }

    onMounted(() => {
      fetchData()
    })

    return {
      fetcherState,
      fetchData,
    }
  },
})

</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
  line-height: 1.3;
  width: 400px;
  height: 600px;
  min-height: 500px;
  max-height: 600px;
  overflow: hidden;
  background: lightyellow;
  user-select: none;
}

p {
  margin: 0;
}

* {
  box-sizing: border-box;
}
</style>
