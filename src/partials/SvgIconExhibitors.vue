<template>
    <div class="exhibitor-navbar">
        <router-link to="/" exact id="homepage">
        <div class="exhibitor-navbar-item" @click="track('Exhibitor Home')">
                <div class="exhibitor-category-icon exhibitor-home" style="background-image: url('../icon/icon-home.svg');">
                    <span>Home</span>
                </div>
            
        </div>
        </router-link>
        <router-link to="/exhibitors" exact id="exhibitors">
        <div class="exhibitor-navbar-item" @click="track('Exhibitor All')">
            
                <div class="exhibitor-category-icon exhibitor-all" style="background-image: url('../icon/icon-all.svg');">
                    <span>Exhibitors</span>
                </div>
            
        </div>
        </router-link>
        <router-link :to="{path:'/exhibitor/'+'sightseeing'}" exact id="exhibitors_sightseeing">
        <div class="exhibitor-navbar-item" @click="track('Exhibitors Sightseeing')">
            
                <div class="exhibitor-category-icon exhibitor-sightseeing" style="background-image: url('../icon/icon-sight.svg');">
                    <span>Sightseeing</span>
                </div>
            
        </div>
        </router-link>
        <router-link :to="{path:'/exhibitor/transportation'}" exact id="exhibitors_transportation">
        <div class="exhibitor-navbar-item" @click="track('Exhibitors Transportation')">
            
                <div class="exhibitor-category-icon exhibitor-transportation" style="background-image: url('../icon/icon-transport.svg');">
                    <span>Transportation</span>
                </div>
            
        </div>
        </router-link>
        <router-link to="/exhibitor/accomodation" exact id="exhibitors_accomodation">
        <div class="exhibitor-navbar-item" @click="track('Exhibitors Accomodation')">
            
                <div class="exhibitor-category-icon exhibitor-accomodation" style="background-image: url('../icon/icon-accommodation.svg');">
                    <span>Accomodation</span>
                </div>
            
        </div>
        </router-link>
        <router-link :to="{path:'/exhibitor/shopping'}" exact id="exhibitor_shopping">
        <div class="exhibitor-navbar-item" @click="track('Exhibitors Shopping')">
            
                <div class="exhibitor-category-icon exhibitor-shopping" style="background-image: url('../icon/icon-shopping.svg');">
                    <span>Shopping</span>
                </div>
            
        </div>
        </router-link>
    </div>
</template>
<script>
export default {
  name: 'SvgIconExhibitors',
  components: {
  },
  props: {
    msg: String
  },
  methods:{
    track(item){
      this.$ga.event({
        eventCategory: 'Exhibitor Category Icon',
        eventAction: 'Click Icon '+item,
        eventLabel: item
      })
    },
  },
  data() {
    return {
        
      legend: []
    }
  },
}
</script>
<style >
    .label:before{
        content:'aaa'
    }
    .router-link-exact-active,
    .router-link-active *{
        opacity: 1 !important;
    }
    .exhibitors_categories:before{
        content:'category'
    }
    .exhibitor-navbar {
        display: flex;
        max-width: 820px;
        margin: 0 auto;
    }
    .exhibitor-navbar a {
        width: calc(100vw / 6);
    }
    .exhibitor-navbar-item {
        position: relative;
        text-align: center;
        height: 80px;
        margin: 20px 0;
    }
    .exhibitor-category-icon {
        margin: auto;
        width: 54px;
        height: 54px;
        background-repeat: no-repeat;
        opacity: 0.5 !important;
    }
    .exhibitor-category-icon:hover{
        opacity: 1 !important;
    }
    .router-link-active .exhibitor-category-icon {
        opacity: 1 !important;
    }
    .exhibitor-category-icon span {
        color: #ffffff;
        left: 50%;
        bottom: -20%;
        transform: translate(-50%, -50%);
        position: absolute;
    }

    @media (max-width: 768px) {
      .exhibitor-navbar {
        position: relative;
        display: block;
        width: 100vw;
      }
      .exhibitor-navbar a {
        width: 33vw;
        display: inline-block;
      }
      .exhibitor-navbar-item {
        height: 80px;
        margin: 30px 0 0;
      }
      .exhibitor-category-icon span {
        line-height: 1.2;
        bottom: -1em;
        font-size: 3vw;
      }
    }
</style>