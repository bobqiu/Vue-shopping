<template>
    <div>
        <van-address-edit
        :area-list="areaList"
        show-postal:false
        show-delete
        show-set-default
        is-saving:false
        is-deleting:false
        show-search-result
        @save="onSave"
        @delete="onDelete"
        />
    </div>
</template>

<script>
import { AddressEdit } from 'vant';
import Vue from 'vue';
Vue.use(AddressEdit);
import areaList from 'js/address'
export default {
  data() {
    return {
      areaList,
      searchResult: []
    }
  },

  methods: {
    onSave(content) {
      console.log(content);
      
    },
    onDelete() {
      Toast('delete');
    },
    
  }
}
</script>

<style lang="stylus" >
    @import '~styles/address.styl';
</style>
