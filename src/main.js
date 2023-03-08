import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
/*
import { VueFire, VueFireAuth } from 'vuefire'
import { firebaseApp } from './firebase/firebase'
*/
const app = createApp(App)


/*
app
  .use(VueFire, {
    // imported above but could also just be created here
    firebaseApp,
    modules: [
      // we will see other modules later on
      VueFireAuth(),
    ],
  })
*/
app.use(router)

app.mount('#app')

