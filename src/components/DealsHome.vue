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
      <div class="columns is-centered is-block exhib-single-ctg" v-for="(ourdeal, ctg) in ourdeals" v-bind:key="ctg">
        <div class="column explore-details">
            <h1 class="title-exhibitors">{{ctg}}</h1>
            <hr class="line"> 
            <div>
              <router-link v-for="(item) in ourdeal" v-bind:key="item.id" :to="{path:'/show-deals/'+item.category+'/'+item.ourdeal_name}">
                <div class="exhib-cate">
                  <div class="imgbox ">
                    <img class="light-color" :src="getLogo(item)" >
                  </div>
                  <p class="popper">{{ item.ourdeal_name }}</p>
                </div>
              </router-link>
            </div>
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
import 'vue-popperjs/dist/vue-popper.css';
import Footer from '@/partials/Footer.vue'
export default {
    name: 'DealsHome',
    components: {
        Footer,
        SvgIconOurdeals,
        Navbar
    },
    data(){
      return {
        ourdeals: {
          Airlines:[],
          Banks:[],
          'Online Travel Agent':[]
        },
        snapping: false
      }
    },
    mounted(){
      client.service('ourdeals').watch()
      .find().subscribe(todos => {
        let rsp = todos
        rsp.sort((a, b) => {return a.ourdeal_name > b.ourdeal_name ? 1 : -1});
          rsp.forEach(od => {
            this.ourdeals[od.category].push(od)
          });
      });
    },
    methods:{
      getLogo(item){
        return 'https://img'+(item.id%10)+'.japantravelweek.co.id'+require('../assets/img/ourdeals/logo/'+item.ourdeal_name+'.png')
      },
      track(s, l){
        this.$ga.event({
          eventCategory: 'Deals Home',
          eventAction: 'Click '+s,
          eventLabel: l
        })
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