import { createApp } from 'vue';
import Dev from './serve.vue';
import mitt from 'mitt';
const emitter = mitt();
// To register individual components where they are used (serve.vue) instead of using the
// library as a whole, comment/remove this import and it's corresponding "app.use" call
import Vue3Paginate from '@/entry.esm';

const app = createApp(Dev);
app.config.globalProperties.emitter = emitter;
app.use(Vue3Paginate);

app.mount('#app');
