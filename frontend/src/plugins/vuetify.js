import Vue from 'vue'
import Vuetify from 'vuetify'

import colors from 'vuetify/lib/util/colors'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: colors.green.darken1, // #E53935
                secondary: colors.red.darken4, // #FFCDD2
                accent: colors.indigo.base, // #3F51B
                disable: colors.grey.darken1,
                warning: colors.orange.darken2,
            },
        },
    },

    icons: {
        iconfont: 'mdiSvg', // 'mdi' || 'mdiSvg' || 'md' || 'fa' || 'fa4' || 'faSvg'
    },
});