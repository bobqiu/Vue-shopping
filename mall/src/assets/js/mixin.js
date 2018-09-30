import {mapMutations} from 'vuex'

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