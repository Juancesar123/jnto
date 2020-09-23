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
  <figure v-if="getMasthead(details)" class="image">
    <img :src="getMasthead(details)" :alt="details.ourdeal_name">
  </figure>
  <section class="section ">
    <div class="columns is-centered is-block">
      <div class="column explore-details deals-list">
        <div class="columns">
          <div class="column">
            <img class="imgdeals-details" :src="getLogo(details)">
            <h2 class="headline-ourdeals">
              {{details.headline}}
            </h2>
          </div>
        </div>
        <div class="content font-content">
            {{details.short_paragraph}}
        </div>
        <DealsItem v-for="item in filteredList(deals)" v-bind:key="item.id" v-bind:item="item" v-bind:breadcrumb="breadcrumb" />
        <hr class="line"> 
        <p v-if="details.phone_hotline" class="contact-heading">If you have any questions, contact us at:</p>
        <div class="contacts">
          <span class="phone" v-for="ph in contactsBreakdown(details.phone_hotline)" v-bind:key="ph" v-html="phoneTo(ph)"></span>
          <span class="phone" v-for="ph in contactsBreakdown(details.email)" v-bind:key="ph" v-html="iconSelect(ph)"></span>
        </div>
        <div class="toWebsite">
          <a target="_blank" @click="track('go2 t&c', details.linkto)" v-if="details.linkto" :href="details.linkto"><button>Terms &amp; Conditions</button></a>
          <a target="_blank" @click="track('go2 Traveloka', 'tvlk-jnto')" href="https://www.traveloka.com/id-id/promotion/tvlk-jnto"><button class="tvlk">Purchase at Traveloka</button></a>
        </div>
      </div>
    </div>
  </section>
  <Footer />
</div>
</template>
<script>
import SvgIconOurdeals from '@/partials/SvgIconOurdeals'
import DealsItem from '@/partials/DealsItem'
import Navbar from '@/partials/Navbar.vue'
import client from '@/plugin/feathers';
import Footer from '@/partials/Footer.vue'
export default {
    name: 'DealsDetail',
    components: {
        Footer,
        DealsItem,
        SvgIconOurdeals,
        Navbar
    },
    data(){
      return{
        breadcrumb: this.$route.params.name,
        masthead_img: '',
        details: {},
        deals: [],
        search: ''
      }
    },
    methods:{
      getMasthead(item){
        if(item && item.ourdeal_name){
          try {
            return 'https://img'+(item.id%10)+'.japantravelweek.co.id'+require('../assets/img/ourdeals/masthead/'+item.ourdeal_name+'.jpg')
          } catch (error) {// eslint-disable-line
            return false
          }
        }
      },
      filteredList(deals) {
        return deals.filter(item => {
          return item.deals_title.toLowerCase().includes(this.search.toLowerCase()) || item.deals_description&&item.deals_description.toLowerCase().includes(this.search.toLowerCase())
        })
      },
      getLogo(item){
        if(item && item.ourdeal_name)
          return 'https://img'+(item.id%10)+'.japantravelweek.co.id'+require('../assets/img/ourdeals/logo/'+item.ourdeal_name+'.png')
      },
      contactsBreakdown(s){
        if(s)
          return s.split("\n")
      },
      phoneTo(s){
        if(s){
          return '<a target="_blank" href="tel:'+s.split('(')[0]+'"><i class="fas fa-phone"></i>'+s+'</a>'
        }
      },
      iconSelect(s){
        if(s){
          let txt = s
          let ico = 'fas fa-envelope'
          let href = 'mailto:'+s

          if(s.indexOf('http')===0){
            ico = 'fas fa-globe'
            href = s
          }

          if(s.indexOf('facebook.com')>0){
            ico = 'fab fa-facebook-square'
            txt = s.split('facebook.com/')[1].split('/')[0]
          }

          if(s.indexOf('twitter.com')>0){
            ico = 'fab fa-twitter-square'
            txt = '@'+s.split('twitter.com/')[1].split('/')[0]
          }

          return '<a target="_blank" href="'+href+'"><i class="'+ico+'"></i>'+txt+'</a>'
        }
      },
      track(act, lbl){
        this.$ga.event({
          eventCategory: 'Deals Detail '+this.details.ourdeal_name,
          eventAction: 'Click '+act,
          eventLabel: lbl
        })
         window.fbq('track', 'Purchase', {
          value: 20000,
          currency: 'IDR',
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
    },
    mounted(){
       client.service('ourdeals').watch()
      .find({
        query:{
          ourdeal_name:this.$route.params.name
        }
      }).subscribe(res => {
          this.details = res.wrapped&&res.cache.wrapped?res.cache.wrapped:res[0];
          if(this.details.headline.indexOf('[')>=0)
            this.details.headline=this.details.headline.split("[")[0]+this.details.headline.split("]")[1]||''
          if(this.details.short_paragraph.indexOf('[')>=0)
            this.details.short_paragraph=this.details.short_paragraph.split("[")[0]+this.details.short_paragraph.split("]")[1]||''

          document.title = this.details.ourdeal_name;
          document.head.querySelector('meta[name=description]').content = this.details.short_paragraph
          client.service('deals-details').watch()
            .find({
              query:{
                ourdealId:this.details.id
              }
            }).subscribe(resdetails => {
              this.deals = resdetails;
            })
      })
    }
}
</script>
<style >
  @font-face {
    font-family: 'Museo 300';
    src: url('../assets/fonts/Museo-300.eot');
    src: url('../assets/fonts/Museo-300.eot?#iefix') format('embedded-opentype'),
        url('../assets/fonts/Museo-300.ttf') format('truetype'),
        url('../assets/fonts/Museo-300.woff') format('woff'),
        url('../assets/fonts/Museo-300.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
  }
  .imgdeals-details{
      float: left;
      width:230px;
      margin-right: 50px;
  }
  .headline-ourdeals{
      float: left;
      font-family : 'Museo sans 500'; 
      font-size:28px; 
      color:#000;
      max-width: 50%;
      max-width: calc(100% - 280px);
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
  }
  .font-content{
      font-family : 'Museo sans 300'; 
      font-size:18px; 
      color:#000;
  }
  .explore-details.deals-list .imgbox{
    cursor: initial;
  }
  .contact-heading{
    font-family: 'Museo sans 500';
    font-size: 18px;
    color: #000;
    margin-bottom: 50px;
    text-align: center;
  }
  .contacts, .toWebsite{
    text-align: center;
    margin-bottom: 30px;
  }
  .contacts span.phone{
    margin: 0 1em 1em;
    display: inline-block;
  }
  .phone svg{
    margin-right: 4px;
  }
  .toWebsite button{
    border-radius: 2em;
    border: 1px solid #ccc;
    font-family: 'Museo 300';
    font-size: 16px;
    color: #fff;
    width: 260px;
    height: 40px;
    background: #999;
    margin: 1em;
    cursor: pointer;
  }
  .toWebsite button:hover{
    background: #d91f26;
  }
  @media(max-width:768px){
    .explore-details.deals-list{
      text-align: center;
    }
    .imgdeals-details, .headline-ourdeals{
      float: none;
      margin: 0 auto;
      max-width:100%;
    }
    .font-content{
      display: inline-block;
    }
    .deals-list .imgbox{
      margin: 0 5% 20px 0 !important;
      width: 20%;
      height: auto;
    }
    .deals-detail{
      margin: 0 auto;
      max-width: 70%;
    }
  }
</style>