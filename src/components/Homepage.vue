<template>
    <div>
       <!-- <amp-img  layout="fill" :src="require('@/assets/img/logo/jnto_home.png')"  class="logo-jnto"></amp-img> -->
        <img src="../assets/img/logo/jnto_home.png" class="logo-jnto"/>
        <img src="../assets/img/logo/jway_home.png" class="logo-jed"/>
        <!-- <amp-img  layout="fill" :src="require('@/assets/img/logo/jtw_home.png')"  class="logo-main"></amp-img> -->
        <img src="../assets/img/logo/jtw_home.png" class="logo-main"/>
        <div class="card-wrapper">
            <div class="card" @click="trackexplorejapan()">
              <router-link to="explore-japan" id="explore_japan">
                <div class="cardInside menu_explore">
                    <p class="has-text-centered">Explore Japan</p>
                    <img src="../assets/img/home/explore.png" alt="">
                </div>
              </router-link>
            </div>
            <div class="card" @click="trackourdeals()">
                <router-link to="show-deals" id="our_deals">
                  <div class="cardInside menu_deals">
                      <p>Our Deals</p>
                      <img src="../assets/img/home/our-deals.png" alt="Our Deals Image Japan Travel Week">
                  </div>
                </router-link>
            </div>
            <div class="card" @click="trackExhibitors()">
              <router-link to="exhibitors" id="exhibitors" alt="Exhibitor Image Japan Travel Week">
                <div class="cardInside menu_exhib">
                    <p>EXHIBITOR</p>
                </div>
              </router-link>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  name: 'homepage',
  components: {
    
  },
  props: {
    msg: String                  
  },
  methods:{
    trackourdeals(){
      this.$ga.event({
        eventCategory: 'Home Page',
        eventAction: 'Click Button Our Deals',
        eventLabel: 'Our Deals from Home Page'
      })
    },
    trackexplorejapan(){
      this.$ga.event({
        eventCategory: 'Home Page',
        eventAction: 'Click Button Explore Japan ',
        eventLabel: 'Explore Japan from Home Page'
      })
    },
    trackExhibitors(){
      this.$ga.event({
        eventCategory: 'Home Page',
        eventAction: 'Click Button Exhibitor',
        eventLabel: 'Exhibitor from Home Page'
      })
    }
  }
}
</script>
<style lang="scss">
  html{
    background-image: url('../assets/img/bg.png');
    background-repeat: repeat;
    -ms-background-size: auto;
    -o-background-size: auto;
    -moz-background-size: auto;
    -webkit-background-size: auto;
    background-size: auto;
  }

  * {
    transition: all 0.3s ease-in-out;
  }
  .card-wrapper {
    position:fixed;
    bottom:0;
    width: 100%;
    text-align:center;
    font-size:0;
    line-height:0;
  }

  // Card
  $cardImageHeight: 218px;
  $cardHeight: 54px;
  $cardWidth: 360px;
  $borderRadius: 10px;
  .card {
    font-size:18px;
    line-height:1;
    letter-spacing:15px;
    background-color: transparent;
    display: inline-block;
    margin-left: auto;
    margin-right: 15px;
    width: $cardWidth;
    height: $cardHeight;
    max-width: 30vw !important;
    border-radius: $borderRadius;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    .cardInside {
      position: absolute;
      bottom: 0;
      left: 0;
      border-radius: $borderRadius;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
      background-color: #D91F26;
      display: block;
      width: 100%;
      height: $cardHeight;
      overflow: hidden;
      p {
        color: white;
        text-transform: uppercase;
        font-weight: bold;
        letter-spacing: 1.1px;
        line-height:0;
        position: absolute;
        bottom: calc((100% - 1em)/2 );
        left: 50%;
        transform: translateX(-50%);
        z-index: 3;
      }
      p a{
        color:white;
      }
      img {
        position: absolute;
        width: 100%;
        height: 100%;
        object-fit: cover;
        bottom: -100%;
        left:0;
        //z-index: -1;
      }
    }
      &:hover {
        background-color: #D91F26;
        .cardInside {
          height: $cardImageHeight;
          p {
            bottom: calc(100% - 54px);
            left: 0;
            transform: translateX(25%);
          }
          p a{
            color:white;
          }
          img {
            bottom: 0%;
          }
        }
        .menu_exhib{
          background-image: url('../assets/img/home/exhibitors.png');
        }
      }
    }
  
    .logo-main {
      margin: 0 auto;
      margin-top:20vh;
      max-width:90vw;
      display:block;
      clear:both;
    }
    
    .logo-jnto {
      margin-left:95px;
      margin-top:30px;
    }
    
    .logo-jed {
      float:right;
      margin-right:95px;
      margin-top:30px;
      
    }

    @media (max-width: 768px) {

      .logo-main {
        margin-top: 10vh;
        width: 100vw;
        max-width: 100vw;
        padding: 10vw;
      }
     
      .logo-jnto {
        margin: 0;
        padding-left: 6vw;
        padding-top: 6vh;
        width: 20%;
      }

      .logo-jed {
        margin: 0;
        padding-right: 6vw;
        padding-top: 5vh;
        width: 32.5%;
      }

      .card {
        width: 60%;
        height: 34px;
        max-width: 100% !important;
        margin: auto;
        margin-bottom: 15px;
        bottom: 5vh;
      }

      .card, .card .cardInside {
        position: relative;
        border-radius: 10px;
        height: 34px;
        background-image: none !important;
      }

      .card .cardInside p {
        width: 100%;
        bottom: 50%;
        transform: translate(-50%, -50%);
        font-size: 3.2vw;
      }

      .card:hover .cardInside {
        margin-bottom: 15px;
        height: 34px;
      }

      .card:hover .cardInside p {
        bottom: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }

      .card:hover .cardInside img {
        display: none;
      }
    }

    @media (max-height: 400px) {
      .logo-main {
        margin: 0;
        padding-top: 5vh;
      }
    }
    
</style>