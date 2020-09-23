<template>
  <div>
    <Navbar/>
    <span class="icon is-large icon-burger" @click="showmenu()">
      <span class="fa-stack fa-lg">
        <i class="fas fa-bars fa-stack-1x"></i>
      </span>
    </span>
    <section class="section" id="xplorJP">
      <div class="columns">
        <div class="column legend-pane mobile-to">
          <span class="icon is-large hide-menu" @click="hidemenu()">
            <span class="fa-stack fa-lg">
              <i class="fas fa-times fa-stack-1x"></i>
            </span>
          </span>
          <h1 class="legend-region" >Regions Of Japan </h1>
          
          <hr>
          
          <section class="accordions">
            <article class="accordion" v-for="(item) in legend" v-bind:key="item.id" @click="togglRegion(item.id)" >
              <div class="accordion-header toggle" @mouseover="tangle(item)" @mouseleave="untangle(item)">
                <p :id="'legend-'+item.id" class="panel-title btn-toggl">{{item.region}}</p>
              </div>
              <div class="accordion-body">
                <div class="accordion-content">
                  <ul>
                    <li v-for="prefecture in item.prefectures" v-bind:key="prefecture.name"><router-link :to="{path:'/explore-japan/'+prefecture.name}" id="explore_japan_details">{{prefecture.name}}</router-link></li>
                  </ul>
                </div>
              </div>
            </article>
          </section>
        </div>
        <MapJapan class="column"/>
      </div>
    </section>
    <Footer />
  </div>
</template>
<script>
import bulmaAccordion from 'bulma-extensions/bulma-accordion/dist/js/bulma-accordion.min.js'
import 'bulma-extensions/bulma-accordion/dist/css/bulma-accordion.min.css'

import menujapan from '../assets/menujapan.json'
//import MapJapan from '@/partials/MapJapan.vue';
//import Navbar from '@/partials/Navbar.vue'
//import Footer from '@/partials/Footer.vue'
export default {
  name: 'ExploreJapan',
  components: {
    Navbar: () => import("@/partials/Navbar.vue"),
    //Navbar,
    MapJapan: () => import("@/partials/MapJapan.vue"),
    Footer:() => import("@/partials/Footer.vue")
  },
  props: {
    msg: String
  },
  data() {
    return {
      legend: []
    }
  },
  mounted () {
    this.load()
    this.accordions = bulmaAccordion.attach()
    this.$nextTick(() => {
      
    })
  },
  methods: {
    hidemenu(){
      var elems = document.getElementsByClassName('mobile-to');
      for (var i=0;i<elems.length;i+=1){
        elems[i].style ='display:none !important';
      }
    
    },
    showmenu(){
      //document.getElementsByClassName('mobile-to').style.display="block"
      var elems = document.getElementsByClassName('mobile-to');
      for (var i=0;i<elems.length;i+=1){
        elems[i].style ='display:block !important';
      }
      var elems1 = document.getElementsByClassName('hide-menu');
      for (var b=0;b<elems1.length;b+=1){
        elems1[b].style ='display:block !important';
      }
    },
    load(){
      this.legend = menujapan
    },
    tangle(item){
      document.getElementById('tooltip-'+item.id).style.display = 'block'
      document.getElementsByClassName('reg-'+item.id).forEach(eldom => eldom.classList.add('hvrd') )
    },
    untangle(item){
      let someThinActiv = false
      this.legend.forEach(lgd => someThinActiv=someThinActiv||lgd.isActive )
      if(someThinActiv){
        document.getElementById('tooltip-'+item.id).style.display = 'none'
      }
      document.getElementsByClassName('reg-'+item.id).forEach(eldom => eldom.classList.remove('hvrd') )
    },
    togglRegion(itemId){
      this.$ga.event({
        eventCategory: 'Explore Maps',
        eventAction: 'Click legend Region '+itemId,
        eventLabel: itemId
      })

      let item
      this.legend.forEach(lgd => {if(itemId==lgd.id){lgd.isActive = !lgd.isActive; item = lgd }else lgd.isActive=false } )
      
      document.getElementsByClassName('regions').forEach(eldom => eldom.removeAttribute('style') )
      document.getElementsByClassName('tooltip-prefectures').forEach(eldom => eldom.removeAttribute('style') )
      document.getElementsByClassName('tooltip-regions').forEach(eldom => {
        if(!eldom.classList.contains('tooltip-prefectures') || !eldom.classList.contains('tooltip-'+itemId) ){
          eldom.style.display = 'none'
        }
        if(eldom.classList.contains('is-mobile')){
          eldom.style.setProperty("display", "none", "important")
        }
      })

      if(this.legend[this.legend.indexOf(item)].isActive){
        document.getElementsByClassName('reg-'+itemId).forEach(eldom => {
          if(!eldom.classList.contains('prefectures') ){
            eldom.style.display = 'none'
          }
        })
        document.getElementsByClassName('tooltip-'+itemId).forEach(el => {
          if(window.innerWidth > 768){
            el.style.display = 'block'
          }else if(el.classList.contains('is-mobile')){
            el.style.setProperty("display", "block", "important")
          }
        })
      }else{
        document.getElementsByClassName('tooltip-regions').forEach(eldom => eldom.removeAttribute('style') )
      }
    }
  }
}
</script>
<style scoped>
.hide-menu{
  display:none !important;
}
.map {
  min-height: 500px;
  max-width:800px;
}
 </style>
 <style scss>
.icon-burger{
  display:none;
  top: 30px;
  position: absolute;
  z-index: 9999;
}
  @media (max-width: 768px) {
   .icon-burger{
      display:block !important;
      top: 30px;
      position: absolute;
      z-index: 9999;
    }
    .mobile-to{
      display:none !important;
      position: fixed;
      top: -10px;
      z-index: 9999;
      background: white;
      width: 100% !important;
      height: 100%;
      left: -17px;
    }
  }
  @font-face {
    font-family: 'Museo 100';
    src: url('../assets/fonts/Museo100-Regular.eot');
    src: url('../assets/fonts/Museo100-Regular.eot?#iefix') format('embedded-opentype'),
        url('../assets/fonts/Museo100-Regular.ttf') format('truetype'),
        url('../assets/fonts/Museo100-Regular.woff') format('woff'),
        url('../assets/fonts/Museo100-Regular.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
  }
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
  @font-face {
    font-family: 'Museo 500';
    src: url('../assets/fonts/Museo500-Regular.eot');
    src: url('../assets/fonts/Museo500-Regular.eot?#iefix') format('embedded-opentype'),
        url('../assets/fonts/Museo500-Regular.ttf') format('truetype'),
        url('../assets/fonts/Museo500-Regular.woff') format('woff'),
        url('../assets/fonts/Museo500-Regular.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
  }
  @font-face {
    font-family: 'Museo 700';
    src: url('../assets/fonts/Museo700-Regular.eot');
    src: url('../assets/fonts/Museo700-Regular.eot?#iefix') format('embedded-opentype'),
        url('../assets/fonts/Museo700-Regular.ttf') format('truetype'),
        url('../assets/fonts/Museo700-Regular.woff') format('woff'),
        url('../assets/fonts/Museo700-Regular.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'Museo Sans 700';
    src: url('../assets/fonts/MuseoSans-700.woff2') format('woff2'),
        url('../assets/fonts/MuseoSans-700.woff') format('woff'),
        url('../assets/fonts/MuseoSans-700.ttf') format('truetype');
    font-weight: 600;
    font-style: normal;
  }
  @font-face {
    font-family: 'Museo Sans 300';
    src: url('../assets/fonts/MuseoSans-300.woff2') format('woff2'),
        url('../assets/fonts/MuseoSans-300.woff') format('woff'),
        url('../assets/fonts/MuseoSans-300.ttf') format('truetype');
    font-weight: 300;
    font-style: normal;
  }
  @font-face {
    font-family: 'Museo Sans 100';
    src: url('../assets/fonts/MuseoSans-100.woff2') format('woff2'),
        url('../assets/fonts/MuseoSans-100.woff') format('woff'),
        url('../assets/fonts/MuseoSans-100.ttf') format('truetype');
    font-weight: 200;
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
  @import url("https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css");
  .navbar{
    border-width: 1px;
    border-color: rgb(245, 244, 239);
    border-style: solid;
    background-color: rgb(255, 255, 255);
    box-shadow: 0px 4px 13.6px 2.4px rgba(153, 153, 153, 0.17);
    height: 100px;
  }
  #xplorJP{padding: 2em 0 0 0;min-height: 82vh;min-height: calc(100vh - 180px);}
  #xplorJP > .columns > .column{padding: 0;}
  .legend-pane{
    width: auto;
    white-space: nowrap;
    max-width: 13em;
    margin: 3vw 0 3vw 4vw;
  }
  .legend-region{
    font-family: 'Museo Sans 500';
    font-size: 22px;
  }
  .panel-title{
    float:left;
    font-family: 'Museo Sans 300';
    cursor: pointer;
    padding-left: 0.3em;
  }
  .panel-title:hover{
    color:#d91f26;
  }
  .panel-title > a:before {
    float: left !important;
    font-family: FontAwesome;
    content:"\f068";
    padding-right: 5px;
  }
  .panel-title > a.collapsed:before {
    float: left !important;
    content:"\f067";
  }
  .panel-title > a:hover,
  .panel-title > a:active,
  .panel-title > a:focus  {
    text-decoration:none;
  }
  hr{
    border-bottom: 1px solid #d91f26 !important;
  }
  .accordions .accordion,
  .accordions .accordion .accordion-header{
    background-color: transparent;
    color: #000;
    font-size: 15px;
  }
  .accordions .accordion.is-active .panel-title{
    font-family: 'Museo Sans 700';
    color: #d91f26;
  }
  .accordions .accordion .accordion-header+.accordion-body{
    border: none;
  }
  .accordions .accordion .btn-toggl::before{
    color: #000;
    display: block;
    position: absolute;
    left: 0;
    top: 0.4em;
    content: '\002B';
  }
  .accordions .accordion.is-active .btn-toggl::before {
    content: '\002D';
  }
  .accordions .accordion .accordion-header+.accordion-body .accordion-content{
    padding-top: 0;
  }
  .accordions .accordion .accordion-header+.accordion-body .accordion-content li{
    list-style-type: disc;
    list-style-position: inside;
  }
  .accordions .accordion a:not(.button):not(.tag){
    text-transform: capitalize;
    text-decoration: none;
    font-family: 'Museo Sans 300';
    color: #000;
    letter-spacing: 0;
  }

  @media (max-width: 768px) {
    .legend-pane {
      display: none !important;
      padding-left: 1em !important;
    }
    #xplorJP {
      padding-top: 100px !important;
    }
  }
</style>