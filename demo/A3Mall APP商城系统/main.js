import Vue from 'vue'
import App from './App'
import * as http from './common/http'
import * as utils from './common/utils'
import * as common from './common/common'
import store from './store'
import storage from 'common/storage'
import config from './config'

Vue.config.productionTip = false
Vue.prototype.$store = store
Vue.prototype.$storage = storage
Vue.prototype.$http = http
Vue.prototype.$utils = utils
Vue.prototype.$common = common
Vue.prototype.$config = config


App.mpType = 'app'

const app = new Vue({
    ...App
})

app.$mount()
