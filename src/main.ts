import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

const defaultBackgroundColor = 'lightBlue'
const defaultText = 'blue'

const app = createApp(App)
app.use(router).mount('#app')
app.directive('background', (el, binding) => {
    console.log(binding.arg) // => "white"

    el.style.backgroundColor = binding.arg || defaultBackgroundColor
    //el.innerHTML =  'My background text is :  ' + binding.arg || defaultBackgroundColor
});

//createApp(App).use(store).use(router).mount('#app');

