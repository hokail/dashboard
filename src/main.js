import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from "./router/index.js";
import {createPinia} from "pinia";
const pinia = createPinia()

// 在 main.js 中通过动态 import 按需加载，仅在开发环境 + VITE_USE_WEBSOCKET_MOCK=true 时启动：
if (import.meta.env.DEV && import.meta.env.VITE_USE_WEBSOCKET_MOCK === 'true') {
    import('../mock/mockServer.js').then(({ createMockServer }) => {
        const mockServer = createMockServer()
        mockServer.start()
        console.log('🎭 Mock WebSocket 服务已启用')
    })
}
createApp(App).use(router).use(pinia).mount('#app')
