<template>
    <div class="exhibitor-navbar">
        <router-link to="/show-deals" exact id="homepage">
            <div class="exhibitor-navbar-item" @click="track('Deals Home')">
                <div class="exhibitor-category-icon" style="background-image: url('/icon/icon-home.svg');">
                    <span>Home</span>
                </div>
            </div>
        </router-link>
        <router-link to="/show-deals/deals/all" exact id="show-deals">
            <div class="exhibitor-navbar-item" @click="track('Deals List')">
                <div class="exhibitor-category-icon" style="background-image: url('/icon/icon-all.svg');">
                    <span>All Deals</span>
                </div>
            </div>
        </router-link>
        <router-link :to="{path:'/show-deals/airlines'}" exact id="showdeals-airlines">
            <div class="exhibitor-navbar-item" @click="track('Deals Airlines')">
                <div class="exhibitor-category-icon" style="background-image: url('/icon/icon-airlines.svg');">
                    <span>Airlines</span>
                </div>
            </div>
        </router-link>
        <router-link :to="{path:'/show-deals/banks'}" exact id="showdeals-banks">
            <div class="exhibitor-navbar-item" @click="track('Deals Banks')">
                <div class="exhibitor-category-icon" style="background-image: url('/icon/icon-banks.svg');">
                    <span>Banks</span>
                </div>
            </div>
        </router-link>
        <router-link to="/show-deals/online travel agent" exact id="showdeals-others">
            <div class="exhibitor-navbar-item" @click="track('Deals OTA')">
                <div class="exhibitor-category-icon" style="background-image: url('/icon/icon-others.svg');">
                    <span>Traveloka</span>
                </div>
            </div>
        </router-link>
    </div>
</template>
<script>
export default {
  name: 'SvgIconOurdeals',
  components: {
  },
  props: {
    msg: String
  },
  methods:{
    track(item){
      this.$ga.event({
        eventCategory: 'Deals Category Icon',
        eventAction: 'Click Icon '+item,
        eventLabel: item
      })
    },
  },
  data() {
    return {}
  },
}
</script>