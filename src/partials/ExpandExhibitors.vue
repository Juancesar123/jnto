<template>
  <section class="section ">
    <div class="columns is-centered has-text-center is-block">
      <div class="column explore-details">
          <h1 class="headline title-list">{{exhibitors_details.exhibitor_name}}</h1>
          <h2 class="subheadline subtitle-list">
            {{exhibitors_details.intro}}
          </h2>
            <carousel :adjustableHeight="true" :navigation-next-label="navigationNext" :navigation-prev-label="navigationPrev" :navigationEnabled="true" :perPageCustom="[[200, 1]]" :paginationEnabled="false">
              <slide  v-for="img in exhibitors_details.image_url" v-bind:key="img">
                <img :src="img" class="img-exhibitor" v-img-orientation-changer>
                <!-- <amp-img class="img-exhibitor" layout="fill" :src="img"></amp-img> -->
                <!-- <amp-img class="img-exhibitor" layout="fill" :src="require('@/assets/img/home/exhibitors.png')"></amp-img>  -->
              </slide>
            </carousel>
            <iframe
              v-for="vids in exhibitors_details.video_url" v-bind:key="vids"
              class="center"
              :src="'https://www.youtube.com/embed/'+urlparse(vids)" 
              frameborder="0" 
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
              allowfullscreen>
            </iframe>
            <!-- <amp-img class="img-exhibitor" layout="fill" :src="require('@/assets/img/home/exhibitors.png')"></amp-img> -->
            <!-- <img v-for="img in exhibitor_imgs" v-bind:key="img" :src="img" class="img-exhibitor"> -->
          <div class="content content-list description" v-html="exhibitors_details.description&&exhibitors_details.description.replace(/(?:\r\n|\r|\n)/g, '<br>')"></div>
            <p class="buttons">
              <a class="btn-more-details more_details button is-light is-rounded is-pulled-left" :href="exhibitors_details.website_urls" target="_blank" @click="trackClick('more detail '+exhibitors_details.exhibitor_name, exhibitors_details.website_urls)">
                <span>More Details</span>
                <span class="icon">
                  <i class="fas fa-external-link-alt"></i>
                </span>
              </a>
          </p>
        <div v-if="exhibitors_details.relatedlinks">
          <h1 class="title-exhibitors">Related Links</h1>
          <hr class="line">
          <div >
          <a class="relatedlinks" v-for="item in exhibitors_details.relatedlinks" v-bind:key="item.url" :href="item.url" target="_blank" @click="trackClick('related link '+item.name,item.url)">
            <span>{{item.name||'Visit Us'}}</span>
            <span class="icon">
              <i class="fas fa-external-link-alt"></i>
            </span>
          </a></div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  name: 'ExpandExhibitors',
  props: {
    exhibitors_details: Object
  },
  computed:{
    navigationNext: function() { return `<i class="fas fa-chevron-right fa-3x exhibtors-arrows"></i>` },
    navigationPrev: function() { return `<i class="fas fa-chevron-left  fa-3x exhibtors-arrows"></i>` },
  },
  methods: {
    trackClick(act, label){
      this.$ga.event({
        eventCategory: 'Detail Exhibitor',
        eventAction: 'Click '+act,
        eventLabel: label
      })
    },
    urlparse(url){
      if(url){
        var regExp =  /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;// eslint-disable-line
        var match = url.match(regExp);
        return (match&&match[2].length==11)? match[2] : false;
      }
    },
  }
}
</script>
<style scss>
  @media (max-width: 758px) {
    .explore-details .VueCarousel-navigation-next,
    .explore-details .VueCarousel-navigation-prev {
      margin: 0 !important;
      padding: 0 !important;
      transform: none !important;
    }
  }
</style>