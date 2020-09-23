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
                <div class="columns is-centered is-block">
                  <div class="column deals-list cate-single">
                    <div class="search-wrapper">
                      <input type="text" v-model="search" placeholder="Search deals.."/>
                    </div>
                    <DealsItem v-for="item in filteredList(ourdeals)" v-bind:key="item.id" v-bind:item="item" />
                  </div>
                </div>
            </section>
        <div class="floater-wrap">
          <a target="_blank" @click="track('go2 Traveloka', 'tvlk-jnto',)" href="https://www.traveloka.com/id-id/promotion/tvlk-jnto"><button class="go2t">Purchase at Traveloka</button></a>
          <button class="back2top" v-on:click="back2top()"><i class="fas fa-arrow-up"></i></button>
        </div>
        <Footer />
    </div>
</template>
<script>
import SvgIconOurdeals from '@/partials/SvgIconOurdeals'
import Navbar from '@/partials/Navbar.vue'
import DealsItem from '@/partials/DealsItem'
import Footer from '@/partials/Footer.vue'
import client from '@/plugin/feathers'
export default {
  name: 'DealsCategory',
  components: {
    Navbar,
    SvgIconOurdeals,
    DealsItem,
    Footer
  },
  data() {
      return{
        search: '',
        ourdeals: [],
        snapping: false
      }
  },
  methods:{
    getLogo(item){
      return 'https://img'+(item.id%10)+'.japantravelweek.co.id'+require('../assets/img/ourdeals/logo/'+item.ourdeal_name+'.png')
    },
         
    track(s, l){
      
      this.$ga.event({
        eventCategory: 'Deals Category',
        eventAction: 'Click '+s,
        eventLabel: l
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
  },
  mounted(){
    client.service('deals-details').watch()
    .find().subscribe(res => {
      this.ourdeals = res.filter((val) =>{
        return val.ourdeal.category.toLowerCase() == this.$route.params.id.toLowerCase()
      }).sort((a, b) =>{
        return a.ourdeal.ourdeal_name > b.ourdeal.ourdeal_name ? 1 : -1
      })
    })
  },
}
</script>
<style>
.deals-list.cate-single > div:first-child .line{
  display: none;
}
</style>