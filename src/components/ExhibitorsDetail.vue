<template>
    <div>
      <Navbar />
      <nav class="breadcrumb has-succeeds-separator is-light" aria-label="breadcrumbs">
        <ul>
          <li><router-link :to="{path:'/'}">Home</router-link><i class="fas fa-light fa-chevron-right"></i></li>
          <li><router-link :to="{path:'/exhibitors'}">Exhibitors</router-link><i class="fas fa-light fa-chevron-right"></i></li>
          <li class="is-active"><a aria-current="page">{{breadcrumb}}</a></li>
        </ul>
      </nav>
      <figure class="image">
          <img :src="masthead_img" :alt="exhibitors_details.exhibitor_name">
      </figure>
      <ExpandExhibitors v-bind:exhibitors_details="exhibitors_details" />
      <Footer />
    </div>
</template>
<script>
import Navbar from '@/partials/Navbar.vue';
import client from '@/plugin/feathers'
import Footer from '@/partials/Footer.vue'
import ExpandExhibitors from '@/partials/ExpandExhibitors.vue';
export default {
    name: 'ExhibitorsDetail',
    components: {
      Navbar,
      Footer,
      ExpandExhibitors,
    },
    props: {
        msg: String
    },
    data() {
      return{
        masthead_img: '',
        exhibitor_imgs: [],
        exhibitors_details: {},
        relatedlinks:null,
        breadcrumb:this.$route.params.id
      }
    },
    mounted(){
      this.importAll(require.context('../assets/img/exhibitors/', true, /.$/))
       client.service('exibitors').watch()
      .find({
        query:{
          exhibitor_name:this.$route.params.id
        }
      }).subscribe(res => {
        this.exhibitors_details = res[0]
        document.title = this.exhibitors_details.exhibitor_name;
        document.head.querySelector('meta[name=description]').content = this.exhibitors_details.intro
        this.exhibitors_details.image_url = []

        //these two lines are safe from strongly typed checks because this.exhibitors_details.website_urls stays as string
        let urls = this.exhibitors_details.website_urls.split("\n").filter(s => s.trim().length)
        this.exhibitors_details.website_urls = urls[0]

        if('string'===typeof this.exhibitors_details.video_url)
          this.exhibitors_details.video_url = this.exhibitors_details.video_url.split("\n").filter(s => s.trim().length)

        if(urls.length>1)
          this.exhibitors_details.relatedlinks =  urls.slice(1)

        if('string'===typeof this.exhibitors_details.website_names)
          this.exhibitors_details.website_names = this.exhibitors_details.website_names.split("\n").filter(s => s.trim().length)

        if(urls.length>1){
          this.exhibitors_details.relatedlinks = []
          for (const idx in urls) {
            if(idx>0){
              this.exhibitors_details.relatedlinks.push({url:urls[idx], name:this.exhibitors_details.website_names&&this.exhibitors_details.website_names[idx]||'Visit Us'})
            }
          }
        }

        let imgCount = 0
        for (const path in this.exhibitor_imgs) {
          if(path.indexOf(this.exhibitors_details.exhibitor_name.trim() >=0 ) ){
            if(path.indexOf('masthead')>=0 && !this.masthead_img)
              this.masthead_img = 'https://img0.japantravelweek.co.id'+this.exhibitor_imgs[path]
            else
              this.exhibitors_details.image_url.push('https://img'+(++imgCount%10)+'.japantravelweek.co.id'+this.exhibitor_imgs[path] )
          }
        }
      })
    },
    computed:{
        navigationNext: function() { return `<i class="fas fa-chevron-right fa-3x exhibtors-arrows"></i>` },
        navigationPrev: function() { return `<i class="fas fa-chevron-left  fa-3x exhibtors-arrows"></i>` },
    },
    methods: {
      urlparse(url){
        var regExp =  /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;// eslint-disable-line
        var match = url.match(regExp);
        console.log(match)
        return (match&&match[2].length==11)? match[2] : false;
      },
      importAll(r) {
        r.keys().forEach(path => {
          try {
            if(2===path.indexOf(this.breadcrumb.trim() ) ){
              if(path.indexOf('masthead')>=0)
                this.masthead_img = r(path)
              else
                this.exhibitor_imgs.push( r(path) )
            }
          } catch (error) {
            console.log('ROR', path)
          }
        })
      },
    },
    filters: {
        uppercase: function(v) {
            return v.toUpperCase();
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
    .nullmargin *{
        margin-bottom:0px !important;
    }
    .content-list{
        font-family :'Museo sans 300';
        font-size:14px; 
        color:#666;
    }
    .subtitle-list{
        font-family:'Museo sans 500';
        font-size:24px;
        color:#000;
        margin: 1em 0;
    }
    .title-list{
        font-family:'Museo 500';
        font-size:'45px';
        color:#000

    }
    .img-exhibitor{
        width:auto;
        max-height:400px;
        border-radius:5px;
        margin: 1em 0;
    }
     .exhibtors-arrows *{
        fill:#d91f26;
    }
    .popper{
        background-color:#d91f26;
        color:white;
        font-family:"Museo 300";
        font-size:"13px";
    }
    .VueCarousel-navigation{
        margin-top : 0 !important
    }
    .VueCarousel-slide{
      text-align: center;
    }
    .VueCarousel-slide-adjustableHeight {
      display: block !important;
    }
    .VueCarousel-inner {
      align-items: flex-start !important;
    }
    .center {
        display: block;
        margin-left: auto;
        margin-right: auto;
        max-width:800px;
        width: 600px;
        height:400px;
        max-height:300px;
        margin-top:5px;
    }
    iframe{
      width: 750px !important;
      height: 422px !important;
      max-height: 422px !important;
    }
    .relatedlinks{
      display: inline-block;
      margin-bottom: 0.5em;
      margin-right: 1em;
    }
    @media (max-width: 758px) {
      iframe{
        width: 100% !important;
        height: auto !important;
        min-height: 53.3vw;
      }
      .img-exhibitor {
        height: auto;
      }
    }
</style>