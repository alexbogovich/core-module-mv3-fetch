// import { createApp } from 'vue'
// import { createPinia } from 'pinia'
// import App from './App.vue'
// import '~/shared/main.css'

// const pinia = createPinia()

// const mountSlider = () => {
//   const wrapper = document.createElement('div')
//   // wrapper.style.setProperty('z-index', '2147483647', 'important')
//   // wrapper.style.setProperty('pointer-events', 'none', 'important')
//   // wrapper.style.setProperty('width', '100%', 'important')
//   // wrapper.style.setProperty('height', '100%', 'important')
//   const root = document.createElement('div')
//   const styleEl = document.createElement('link')
//   const shadowDOM = wrapper.attachShadow?.({ mode: __DEV__ ? 'open' : 'closed' }) || wrapper
//   styleEl.setAttribute('rel', 'stylesheet')
//   styleEl.setAttribute('href', chrome.runtime.getURL('content/style.css'))
//   shadowDOM.appendChild(styleEl)
//   shadowDOM.appendChild(root)
//   document.body.prepend(wrapper)
//   const app = createApp(App)
//   app.use(pinia)
//   app.mount(root)
// }
//
// const init = async() => {
//   mountSlider()
// }
//
// setTimeout(() => {
//   init()
// }, 1000)
