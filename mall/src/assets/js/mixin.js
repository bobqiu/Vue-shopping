import {mapMutations} from 'vuex'
import BaseLoding from 'pages/other/BaseLoding'

export const details = {
    methods: {
        ...mapMutations({
            setGoodDetails: 'GOODSDETAILS'
        }),

        details(val) {
            this.setGoodDetails(val)
            this.$router.push({path:`/home/${val.goodsId}`})
        }
    }
}

export const loading = {
    data() {
        return {
            showFlag: true,     //是否显示lodding
        }
    },

    components: {
        BaseLoding,
    },
}