<template>
  <div>
    <Navbar/>
    <div class="boxred">
      <div class="columns is-centered  ">
        <div class="column has-text-centered icon">
          <SvgIconExhibitors/>
        </div>
      </div>
    </div>
    <section class="section">
      <div class="container">
        <div class="columns is-centered is-block exhib-single-ctg">
          <div class="column explore-details">
            <h1 class="title-exhibitors">{{this.$route.params.id}}</h1>
            <hr class="line">
            <div>
              <router-link v-for="(item) in data" v-bind:key="item.id" :to="{path:'/details-exhibitors/'+item.exhibitor_name}">
              <div class="exhib-cate">
                <div class="imgbox"  :style="'background-image:url(\''+getImg(item)+'\')'" @click="track()"></div>
                <p class="popper">{{ item.exhibitor_name }}</p>
              </div>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>
    <Footer />
  </div>
</template>
<script>
import Navbar from '@/partials/Navbar.vue'
import Footer from '@/partials/Footer.vue'
import client from '@/plugin/feathers'
import 'vue-popperjs/dist/vue-popper.css';
import SvgIconExhibitors from '@/partials/SvgIconExhibitors';
export default {
  name: 'ExhibitorCategory',
  components: {
    Navbar,
    Footer,
    SvgIconExhibitors
  },
  mounted(){
     client.service('exibitors').watch()
      .find({
        query:{
          category:this.$route.params.id
        }
      }).subscribe(res => {
        res = res.cache&&res.cache.wrapped?res.cache.wrapped:res
        this.data = res.sort((a, b) => {return a.exhibitor_name > b.exhibitor_name ? 1 : -1})
      })
  },
  props: {
    msg: String
  },
  methods:{
    getImg(item){
      return 'https://img'+(item.id%10)+'.japantravelweek.co.id/thumbs/exhibitors/'+item.exhibitor_name+'.jpg'
    },
    track(exhibitor_name){
      this.$ga.event({
        eventCategory: 'Detail Exhibitor',
        eventAction: 'Click '+exhibitor_name,
        eventLabel: exhibitor_name
      })
    }
  },
  data() {
      return{
        data: [],
        breadcrumb:this.$route.params.id
      }
  }
}
</script>
<style scss>
     @font-face {
        font-family: 'Museo Sans 300';
        src: url('../assets/fonts/MuseoSans-300.woff2') format('woff2'),
            url('../assets/fonts/MuseoSans-300.woff') format('woff'),
            url('../assets/fonts/MuseoSans-300.ttf') format('truetype');
        font-weight: 300;
        font-style: normal;
    }
    @font-face {
        font-family: 'Museo Sans 500';
        src: url('../assets/fonts/MuseoSans-500.woff2') format('woff2'),
            url('../assets/fonts/MuseoSans-500.woff') format('woff'),
            url('../assets/fonts/MuseoSans-500.ttf') format('truetype');
        font-weight: normal;
        font-style: normal;
    }
    .boxred{
        width:auto;
        height:100px;
        background-color: #d91f26;
    }
    .exhib-single-ctg .exhib-cate{
      text-align: left;
      position: relative;
      overflow: hidden;
      width: auto;
      height: auto;
      display: inline-block;
      vertical-align: top;
      margin-bottom: 10px;
    }
    .exhib-single-ctg .imgbox {
      margin: 0px 26px 5px 0px !important;
    }
    .explore-details a:nth-child(4n) .exhib-cate .imgbox {
      margin-right: 0!important;
    }
    @media(max-width:768px){
      .title-exhibitors{
        text-align: center;
      }
      .exhib-single-ctg .exhib-cate {
          height: auto;
          display: inline-block;
          margin: 0 20px;
          margin-bottom: 20px;
          vertical-align: top;
      }
      .exhib-single-ctg .column {
        text-align: center;
      }
      .exhib-single-ctg .imgbox {
        margin: 0px 10px 5px 10px !important;
      }
      .explore-details a:nth-child(4n) .exhib-cate .imgbox {
        margin-right: 10px !important;
      }
    }
</style>