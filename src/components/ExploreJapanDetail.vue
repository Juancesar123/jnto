<template>
  <div>
    <Navbar />
    <span class="icon is-large icon-burger" @click="showmenu()">
      <span class="fa-stack fa-lg">
        <i class="fas fa-bars fa-stack-1x"></i>
      </span>
    </span>
    <nav class="breadcrumb has-succeeds-separator is-light " aria-label="breadcrumbs" >
      <ul>
        <li><router-link :to="{path:'/'}">Home</router-link><i class="fas fa-light fa-chevron-right"></i></li>
        <li><router-link :to="{path:'/explore-japan'}">Explore</router-link><i class="fas fa-chevron-right"></i></li>
        <li class="is-active"><a aria-current="page">{{breadcrumb}}</a></li>
      </ul>
    </nav>
    <figure v-if="hide_maps.includes(breadcrumb)" class="image">
        <img :src="masthead_img">
    </figure>
    <section class="section">
      <div class="columns">
        <div class="column mobile-to-s">
          <span class="icon is-large hide-menu" @click="hidemenu()">
            <span class="fa-stack fa-lg">
              <i class="fas fa-times fa-stack-1x"></i>
            </span>
          </span>
          <h1 class="legend-region" >Regions Of Japan</h1>
          <hr>
          <section class="accordions">
            <article class="accordion" v-for="(item) in legend" v-bind:key="item.id" @click="togglRegion(item.id)"  v-bind:class="{'is-active': item.isActive }">
              <div class="accordion-header toggle">
                <p :id="'legend-'+item.id" class="panel-title btn-toggl">{{item.region}}</p>
              </div>
              <div class="accordion-body">
                <div class="accordion-content">
                  <ul>
                    <li v-for="prefecture in item.prefectures" v-bind:key="prefecture.name"><router-link :to="{path:'/explore-japan/'+prefecture.name}" id="explore_japan_details" @click="trackClick('Side Menu '+prefecture.name, prefecture.name)">{{prefecture.name}}</router-link></li>
                  </ul>
                </div>
              </div>
            </article>
          </section>
        </div>
        </div>
      <div class="container">
        <div class="columns has-text-centered is-block">
          <div class="column explore-details">
            <h1 v-if="!tourism_orgs.includes(breadcrumb)" class="headline">JELAJAH {{breadcrumb  | uppercase}}</h1>

            <h2 v-if="!tourism_orgs.includes(breadcrumb)" class="subheadline">{{prefecture_details.subheading}}</h2>

            <component v-if="!hide_maps.includes(breadcrumb)" :is="mapView" v-bind:links="prefecture_details.cities" v-on:clickCityTooltip="onChildClick"></component>

            <div v-if="!tourism_orgs.includes(breadcrumb)" class="content">

              <p v-if="!hide_maps.includes(breadcrumb)" v-html="prefecture_details.intro" class="intro"></p>

              <carousel v-if="prefecture_details.imgs" :navigation-next-label="navigationNext" :navigation-prev-label="navigationPrev" :navigationEnabled="true" :perPageCustom="[[200, 1]]" :paginationEnabled="false">
                <slide  v-for="img in prefecture_details.imgs" v-bind:key="img">
                  <img :src="img" class="img-exhibitor" v-img-orientation-changer>
                  <!-- <amp-img class="img-exhibitor" layout="fill" :src="img"></amp-img> -->
                </slide>
              </carousel>

              <iframe
                v-for="vids in prefecture_details.prefecture_video_url" v-bind:key="vids" 
                class="center" 

                :src="'https://www.youtube.com/embed/'+urlparse(vids)" 
                frameborder="0" 
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 

                allowfullscreen>
              </iframe>

              <p v-if="hide_maps.includes(breadcrumb)"  v-html="prefecture_details.intro" class="intro"></p>

              <p v-html="prefecture_details.description" class="description"></p>
            </div>
            <p v-if="!tourism_orgs.includes(breadcrumb)" class="buttons">
              <a class="btn-more-details button is-rounded is-pulled-left" :href="prefecture_details.prefecture_url" target="_blank" @click="trackClick('More Details '+breadcrumb, prefecture_details.prefecture_url)">
                <span>More Details</span>
                <span class="icon">
                  <i class="fas fa-external-link-alt"></i>
                </span>
              </a>
            </p>
            <div v-if="related_links" class="explore-more">
              <ExpandExhibitors v-for="rel in related_links" v-bind:key="rel.id" v-bind:exhibitors_details="rel" />
            </div>
          </div>
        </div>
      </div>
    </section>
    <Footer />
  </div>
</template>
<script>
import bulmaAccordion from 'bulma-extensions/bulma-accordion/dist/js/bulma-accordion.min.js'
import 'bulma-extensions/bulma-accordion/dist/css/bulma-accordion.min.css'
//import Navbar from '@/partials/Navbar.vue';
import client from '@/plugin/feathers'
import menujapan from '../assets/menujapan.json'
import maps from '@/partials/prefecture';
//import Footer from '@/partials/Footer.vue'
//import ExpandExhibitors from '@/partials/ExpandExhibitors.vue';
export default {
    name: 'ExploreJapanDetail',
    components: {
      ...maps, 
      ...{
        Navbar: () => import("@/partials/Navbar.vue"),
        //Navbar,
        Footer:() => import("@/partials/Footer.vue"),
        ExpandExhibitors:() => import("@/partials/ExpandExhibitors.vue")
    } },
    computed:{
      navigationNext: function() { return `<i class="fas fa-chevron-right fa-3x exhibtors-arrows"></i>` },
      navigationPrev: function() { return `<i class="fas fa-chevron-left  fa-3x exhibtors-arrows"></i>` },
      mapView() {
        return this.breadcrumb.toLowerCase()
      }
    },
    props: {
      msg: String
    },
    data() {
      return{
        legend: [],
        tourism_orgs: ['hokkaido', 'okinawa', 'nagano'],
        hide_maps: ['hokkaido', 'niigata', 'ishikawa', 'gifu', 'mie', 'hyogo', 'okayama', 'wakayama', 'okinawa', 'nagano'],
        prefecture_details: [],
        related_links: [],
        masthead_img: '',
        exhibitor_imgs: {},
        prefecture_imgs: {},
        breadcrumb:this.$route.params.id
      }
    },
    mounted() {
      this.load()
      this.loadmenu()
      this.accordions = bulmaAccordion.attach()
      this.$nextTick(() => {
        
      })
    },
    methods: {
      hidemenu(){
        var elems = document.getElementsByClassName('mobile-to-s');
        for (var i=0;i<elems.length;i+=1){
          elems[i].style ='display:none !important';
        }
    
      },
      showmenu(){
        //document.getElementsByClassName('mobile-to').style.display="block"
        var elems = document.getElementsByClassName('mobile-to-s');
        for (var i=0;i<elems.length;i+=1){
          elems[i].style ='display:block !important';
        }
        var elems1 = document.getElementsByClassName('hide-menu');
        for (var b=0;b<elems1.length;b+=1){
          elems1[b].style ='display:block !important';
        }
      },
      togglRegion(itemId){
        let item // eslint-disable-line
        this.legend.forEach(lgd => {
          if(itemId == lgd.id){
            lgd.isActive = !lgd.isActive;
            item = lgd 
          }else {
            lgd.isActive=false 
          }
        })
      },
      urlparse(url){
        if(url){
          var regExp =  /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;// eslint-disable-line
          var match = url.match(regExp);
          return (match&&match[2].length==11)? match[2] : false;
        }
      },
      trackClick(act, label){
        this.$ga.event({
          eventCategory: 'Detail Prefecture',
          eventAction: 'Click '+act,
          eventLabel: label
        })
      },
      importAll(r) {
        let pths = {}
        r.keys().forEach(path => {
          try {
            pths[path.slice(2)]= r(path)
          } catch (error) {
            console.log('ROR', path)
          }
        })
        return pths
      },
      onChildClick (city_click) {
        this.trackClick('Map Tooltip '+city_click,city_click)
      },
      loadmenu(){

      },
      load(){
        this.legend = menujapan
        this.exhibitor_imgs = this.importAll(require.context('../assets/img/exhibitors/', true, /.$/) )
        client.service('contenttour').watch()
        .find({
          query:{
            prefecture_name:this.$route.params.id
          }
        }).subscribe(res => {
            this.prefecture_details = res.cache&&res.cache.wrapped?res.cache.wrapped[0]:res[0]
            document.title = this.prefecture_details.prefecture_name;
            document.head.querySelector('meta[name=description]').content = this.prefecture_details.intro

            this.prefecture_details.imgs = []
            this.prefecture_imgs = this.importAll(require.context('../assets/img/prefectures/', true, /.$/) )

            let imgCount = 0
            for (const path in this.prefecture_imgs) {
              if(path.indexOf(this.prefecture_details.prefecture_name) >= 0 ) {
                this.prefecture_details.imgs.push('https://img'+(++imgCount%10)+'.japantravelweek.co.id'+this.prefecture_imgs[path])
              }
            }

            //need to strongly check types because websockets cached the modified values
            if('string'===typeof this.prefecture_details.cities_url)
              this.prefecture_details.cities_url = this.prefecture_details.cities_url.split('|')
            this.prefecture_details.cities = {}
            let cidx = 0;

            if('string'===this.prefecture_details.cities_name)
            this.prefecture_details.cities_name.split(',').forEach(city_name => {
              this.prefecture_details.cities[city_name] = this.prefecture_details.cities_url[cidx++]
            })

            if('string'===typeof this.prefecture_details.prefecture_video_url)
              this.prefecture_details.prefecture_video_url = this.prefecture_details.prefecture_video_url.split("\n").filter(s => s.trim().length)
        })
         client.service('exibitors').watch()
        .find({
          query:{
            category:this.$route.params.id
          }
        }).subscribe(res => {
          this.related_links = res.wrapped&&res.cache.wrapped?res.cache.wrapped:res
          this.related_links.forEach(rl => {
            rl.image_url = []

            //these two lines are safe because rl.website_urls stays to be typeof 'string'
            let urls = rl.website_urls.split("\n").filter(s => s.trim().length)
            rl.website_urls = urls[0]

            if('string'===typeof rl.video_url)
              rl.video_url = rl.video_url.split("\n").filter(s => s.trim().length)

            if('string'===typeof rl.website_names)
              rl.website_names = rl.website_names.split("\n").filter(s => s.trim().length)

            if(urls.length>1){
              rl.relatedlinks = []
              for (const idx in urls) {
                let label = (urls.length>2)?rl.website_names[idx]||'Visit Us':'Visit Us';
                if(idx>0)
                  rl.relatedlinks.push({url:urls[idx], name: label })
              }
            }

            let imgCount = 0
            for (const path in this.exhibitor_imgs) {
              if(0===path.indexOf(rl.exhibitor_name.trim() ) ){
                if(path.indexOf('masthead')>=0 && !this.masthead_img)
                  this.masthead_img = 'https://img0.japantravelweek.co.id'+this.exhibitor_imgs[path]
                else
                  rl.image_url.push('https://img'+(++imgCount%10)+'.japantravelweek.co.id'+this.exhibitor_imgs[path] )
              }
            }
            if(!rl.image_url.length)
              rl.image_url.push(this.masthead_img)
          })
          if(this.hide_maps.includes(this.breadcrumb) ){
            for (const path in this.exhibitor_imgs) {
              if(path.toLowerCase().indexOf('masthead_'+this.breadcrumb)>=0 ){
                this.masthead_img = this.exhibitor_imgs[path]
              }
            }
          }
        })
      }
    },
    filters: {
        uppercase: function(v) {
        return v.toUpperCase();
        }
  }
}
</script>
<style lang="scss">
  .mobile-to-s{
    display:none !important;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;
    background: white;
    width: 100% !important;
    height: 100%;
    white-space: nowrap;
    max-width: 13em;
  }
  .show-breadcrumb{
    display:block !important;
  }
  .hide-breadcrumb{
    display:none !important;
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
  $breadcrumb-item-color:"#d91f26";
  .breadcrumb{
    background-color:#d91f26 !important;
    padding: 0.8em 5.5vw;
    margin-bottom: 0 !important;
  }
  .breadcrumb a{
    color:white !important;
    text-transform: capitalize;
  }
  .explore-details{
    max-width: 750px;
    font-family: 'Museo Sans 500';
    padding: 0 !important;
    margin: 0 auto 4em !important;
  }
  .explore-details .headline{
    font-family:'Museo 500';
    font-size: 45px;
  }
  .explore-details .subheadline{
    font-size: 24px;
  }
  .explore-details svg{
    max-height: 500px
  }
  .explore-details .intro{
    font-size: 24px;
    text-align: left;
    margin-top: 1em;
  }
  .explore-details .description{
    font-size: 18px;
    line-height: 2;
    padding: 1em 0 0;
    margin: 1em 0;
    text-align: left;
  }
  .masthead-special{
    padding: 1em 0;
  }
  .explore-details path,
  .explore-details polygon{cursor: initial;}
	.st0, .st1, .st2, .st3, .st5{fill:#B9B9B9;stroke:#FFFFFF;stroke-width:0.4854;stroke-miterlimit:10}
	.st1{fill:#F58D8E}
	.st2{stroke-width:0.762}
	.st3{fill:none;stroke-width:0.389}
	.st4{fill:#FFFFFF}
	.st5{fill:none}
	.st6{fill:#F5BAD2;stroke:#010101;stroke-width:0.2;stroke-linejoin:round;}
  .explore-details .tooltip-btn{font-size: 16px;height: 1.8em;fill:#d91f26;}
  .explore-details .tooltip-txt{font-size: 16px;font-family: 'Museo Sans 500';cursor: pointer;fill: #fff;text-transform: uppercase;}
  .button.btn-more-details{
    background-color: #999 !important;
    color: #fff  !important;
    border: none !important;
  }
  .button.btn-more-details:hover{
    background-color: #d91f26  !important;
    color: #fff  !important;
  }
  .btn-more-details path{
    fill: #fff  !important;
  }
  .explore-details .description {
    font-family: 'Museo Sans 300';
  }
  .explore-more{text-align: left;}
  .explore-details .column {
    padding: 0.75rem 0 !important;
  }

  @media (max-width: 758px) {
    .hide-breadcrumb{
      display:block !important;
    }
    .show-breadcrumb{
      display:none !important;
    }
    .section {
      padding: 1.25rem !important;
    }
    .breadcrumb {
      padding: 10px 25px;
      font-size: 4vw !important;
      white-space: unset !important;
    }
    .breadcrumb.has-succeeds-separator li + li::before {
      content: ">" !important;
      color: white;
      transform: scaleY(1.5);
      font-size: 3.7vw;
    }
    .explore-details .headline {
      font-size: 6vw;
      padding-bottom: 10px;
    }
    .explore-details .subheadline, .explore-details .intro {
      font-size: 4vw;
    }
    .explore-details .intro {
      text-align: left;
    }
    .explore-details .description {
      font-size: 3.7vw;
      text-align: left;
    }
    .button.btn-more-details{
      font-size: 3vw;
    }
  }
  .breadcrumb .svg-inline--fa path {
    fill: #fff;
  }
  .breadcrumb.has-succeeds-separator li + li::before {
    content: ">" !important;
    font-size: 16px;
    font-weight: 500;
    color: #ffffff;
    transform: scaleY(1.7);
    position: relative;
    bottom: 2px;
    display: none;
  }
</style>