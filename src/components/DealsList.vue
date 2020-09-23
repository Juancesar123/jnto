<template>
  <div>
    <Navbar />
    <div class="boxred">
      <div class="columns is-centered  ">
        <div class="column has-text-centered icon">
          <SvgIconOurdeals/>
        </div>
      </div>
    </div>
    <section class="section">
      <div class="search-wrapper">
        <input type="text" v-model="search" placeholder="Search deals.."/>
      </div>
      <div class="columns is-centered is-block" v-for="(ourdeal, ctg) in ourdeals" v-bind:key="ctg">
        <div v-if="filteredList(ourdeal).length" class="column deals-list">
          <h1 class="title-exhibitors">{{ctg}}</h1>
          <DealsItem v-for="item in filteredList(ourdeal)" v-bind:key="item.id" v-bind:item="item" />
        </div>
      </div>
    </section>
    <div class="floater-wrap">
      <a target="_blank" @click="track('go2 Traveloka', 'tvlk-jnto')" href="https://www.traveloka.com/id-id/promotion/tvlk-jnto"><button class="go2t">Purchase at Traveloka</button></a>
      <button class="back2top" v-on:click="back2top()"><i class="fas fa-arrow-up"></i></button>
    </div>
    <Footer />
  </div>
</template>
<script>
import SvgIconOurdeals from '@/partials/SvgIconOurdeals'
import Navbar from '@/partials/Navbar.vue'
import client from '@/plugin/feathers';
import DealsItem from '@/partials/DealsItem'
import Footer from '@/partials/Footer.vue'
export default {
  name: 'DealsList',
  components: {
    Footer,
    SvgIconOurdeals,
    DealsItem,
    Navbar
  },
  data(){
    return {
      search: '',
      ourdeals: {
        airlines:[],
        banks:[],
        'online travel agent':[]
      },
      snapping: false
    }
  },
  mounted(){
    for (const ctg in this.ourdeals) {
       client.service('deals-details').watch()
      .find().subscribe(res => {
        this.ourdeals[ctg] = res.filter((val) => {
            return val.ourdeal.category.toLowerCase() == ctg.toLowerCase()
          }).sort((a, b) => {
            return a.ourdeal.ourdeal_name > b.ourdeal.ourdeal_name ? 1 : -1
          });
      })
    }
  },
  methods: {
    filteredList(deals) {
      let scan = this.search.toLowerCase()
      return deals.filter(item => {
        return item.deals_title.toLowerCase().includes(scan)
          || item.ourdeal.ourdeal_name.toLowerCase().includes(scan)
          || item.flight_period&&item.flight_period.toLowerCase().includes(scan)
          || item.blackout_date&&item.blackout_date.toLowerCase().includes(scan)
          || item.deals_description&&item.deals_description.toLowerCase().includes(scan)
      })
    },
    track(act, lbl){
      this.$ga.event({
        eventCategory: 'Deals All List ',
        eventAction: 'Click '+act,
        eventLabel: lbl
      })
      window.fbq('track', 'Purchase', {
        value: 20000,
        currency: 'IDR',
      });
      var url = 'https://www.traveloka.com/id-id/promotion/tvlk-jnto'
      var callback = function () {
        if (typeof(url) != 'undefined') {
          window.location = url;
        }
      };
      window.gtag('event', 'conversion', {
          'send_to': 'AW-968498168/xfwSCKyP3cgBEPi36M0D',
          'transaction_id': '',
          'event_callback': callback
      });
    },
    back2top(){
      window.scrollTo({left:0, top:0, behavior:'smooth'})
    },
    handleScroll(){
      let flotr = document.getElementsByClassName('floater-wrap')[0]
      const docHeight = document.body.scrollHeight - (this.snapping?80:0)
      const scrollEffort = window.pageYOffset + window.innerHeight + 80
      const snaps = scrollEffort > docHeight
      this.docHeight = document.body.scrollHeight
      if( snaps ){
        this.snapping = true
        flotr.style.position = 'relative'
        flotr.style.margin = '0'
      }else{
        this.snapping = false
        flotr.removeAttribute('style')
      }
    }
  },
  created () {
    window.addEventListener('scroll', this.handleScroll);
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll);
  }
}
</script>
<style>
    .search-wrapper{
      text-align: center;
    }
    .search-wrapper > input{
      border-radius: 1em;
      font-size: 1em;
      margin-bottom: 2em;
      padding: 0.4em;
      border: 1px solid #ccc;
    }
    .light-color{
      background:#f6f6f6;
      border: 1px solid #ebebeb;
      border-radius: 5px;
      padding: 15px;
    }
    .deals-list{
      max-width: 750px;
      margin: 0 auto;
    }
    .deals-list .line{
      margin: 0 0 50px;
    }
    .deals-list .imgbox{
      margin: 0 50px 50px 0 !important;
      float: left;
      
    }
    .deals-detail{
      float: left;
      max-width: 50%;
      max-width: calc(100% - 220px);
    }
    .back2top{
      font-size: 20px;
      width: 2em;
      height: 2em;
      cursor: pointer;
      border-radius: 4em;
      background: rgba(255,255,255,0.4);
      border: 1px solid #ccc;
      position: absolute;
      right: 2em;
      top: 1em;
    }
    .back2top .fa-arrow-up{
      width: 80%;
      height: auto;
    }
    .floater-wrap{
      background: #222;
      width: 100%;
      width: 100vw;
      text-align: center;
      position: fixed;
      bottom: 0px;
      z-index: 999999;
    }
    .floater-wrap .go2t{
      font-family: 'Museo 300';
      font-size: 20px;
      color: #fff;
      width: 12em;
      height: 2em;
      background: #d91f26;
      margin: 1em;
      border-radius: 2em;
      border: none;
      box-shadow: 0px 3px 13px 0px rgba(0, 0, 0, 0.36);
    }
    .floater-wrap .go2t:hover{
      background: #fff;
      color: #d91f26;
    }
    @media(max-width:768px){
      .floater-wrap .go2t{
        font-size: 16px;
      }
      .back2top{
        font-size: 16px;
        right:10px;
      }
    }
</style>