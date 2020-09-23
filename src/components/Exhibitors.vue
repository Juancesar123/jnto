<template>
  <div>
    <Navbar/>
    <div class="boxred">
        <div class="columns is-centered">
            <div class="column has-text-centered icon">
               <SvgIconExhibitors/>
            </div>
        </div>
    </div>
    <section class="section" v-for="(exhibs, ctg) in exhibitors" v-bind:key="ctg">
      <div class="container exhibitor-container">
        <div class="columns is-centered is-block">
          <div class="column explore-details">
            <h1 class="title-exhibitors">{{ctg}}</h1>
            <hr class="line"> 
            <carousel :navigation-next-label="navigationNext" :navigation-prev-label="navigationPrev" :navigationEnabled="true" :perPageCustom="[[480, 2], [768, 4],[200, 1]]" :paginationEnabled="false">
              <slide class="exhib-cate" v-for="(item) in exhibs" v-bind:key="item.id">
                <router-link :to="{path:'/details-exhibitors/'+item.exhibitor_name}">
                  <div class="imgbox"  :style="'background-image:url(\''+getImg(item)+'\')'" @click="track(item.exhibitor_name)"></div>
                  <p class="popper">{{ item.exhibitor_name }}</p>
                </router-link>
              </slide>
            </carousel>
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
import { Carousel, Slide } from 'vue-carousel'
import SvgIconExhibitors from '@/partials/SvgIconExhibitors';
import 'bulma-extensions/bulma-carousel/dist/css/bulma-carousel.min.css'
import bulmaCarousel from 'bulma-extensions/bulma-carousel/dist/js/bulma-carousel.min.js'
export default {
  name: 'exhibitors',
  components: {
     Navbar,
   //  VLazyImage,
     Carousel,
     Slide,
     Footer,
     SvgIconExhibitors
  },
  props: {
    msg: String
  },
  data(){
      return{
        exhibitors: {
          sightseeing:[],
          transportation:[],
          accomodation:[],
          shopping:[],
        },
        masthead_img: '',
        breadcrumb:this.$route.params.id,

      }
  },
  computed:{
    navigationNext: function() { return `<i class="fas fa-chevron-right fa-3x exhibtors-arrows"></i>` },
    navigationPrev: function() { return `<i class="fas fa-chevron-left  fa-3x exhibtors-arrows"></i>` },
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
  mounted(){
    for (const ctg in this.exhibitors) {
        client.service('exibitors').watch()
      .find({
        query:{
          category:ctg
        }
      }).subscribe(res => {
          res = res.cache&&res.cache.wrapped?res.cache.wrapped:res
          this.exhibitors[ctg] = res.sort((a, b) => {return a.exhibitor_name > b.exhibitor_name ? 1 : -1});
      })
    }

    bulmaCarousel.attach('#carousel-demo', {
      slidesToScroll: 1,
      slidesToShow: 2,
      navigation:true,
      autoplay:true,
      loop:true,
      infinte:true
    });
  },
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
    .exhibitor-container .explore-details {
      min-height: 120px;
      margin: 0 auto !important;
    }
    .title-exhibitors{
        font-family : 'Museo sans 500'; 
        font-size:20px; 
        color:#000;
        text-transform: capitalize
    }
    .line{
        border-bottom: 1px solid #ccc !important;
        margin-bottom: 20px;
    }
    .boxred{
        width:auto;
        height:132px !important;
        background-color: #d91f26;
    }
    .imgbox{
      border-radius:5px;
      width: 167.5px;
      height: 167.5px;
      position:relative;
      margin:0px 20px 5px 0px !important;
      background-size: cover;
      background-position: center;
    }
    .slider{
        position:relative;
        width:100%;
    }
    .slider-container{
        display:flex;
        overflow:hidden !important;
        flex-wrap:nowarp;
        flex-direction:row;
        min-height:100%;
    }
    .exhibtors-arrows *{
        fill:#d91f26;
    }
    .popper{
        background-color: transparent !important;
        color: black !important;
        border: none !important;
        font-family:"Museo 300";
        font-size:"13px";
        position: relative !important;
        width: 167.5px !important;
        box-shadow: none !important;
    }
    .exhib-cate{
        height: auto;
        text-align: left;
    }
    .exhibitor-container .VueCarousel-navigation{
        margin-top : -60px
    }
    .section{
      padding-bottom : 0 !important;
    }
    @media (max-width: 768px) {
        .boxred {
            height: 264px !important;
        }
        .boxred .column {
          padding: 0 !important;
        }
        .boxred .columns.is-centered {
          width: 100vw;
          margin: 0 !important;
        }
        .columns.is-centered {
          margin: 0 !important;
        }
        .imgbox {
          margin: auto !important;
          margin-bottom: 5px !important;
        }
        .popper {
          width: 167.5px !important;
          margin: auto;
          display: block !important;
        }
        .exhibitor-container .VueCarousel-navigation-next {
          right: 15px !important;
        }
        .exhibitor-container .VueCarousel-navigation-prev {
          left: 15px !important;
        }
    }
</style>