<template>
    <div>
      <Navbar/>
      <nav class="breadcrumb nullmargin has-succeeds-separator is-light " aria-label="breadcrumbs" >
        <ul>
          <li><a href="/">Home</a><i class="fas fa-light fa-chevron-right"></i></li>
          <li><a href="/our-deals">Our Deals</a></li>
        </ul>
      </nav>
      <section class="section coming-soon-form">
        <div class="columns is-centered">
            <div class="column has-text-centered">
                <h1 class="title-ourdeals">COMING SOON !</h1>
                <h2 class="subtitle-ourdeals sign-up-text">Sign Up For Notification</h2>
                <div class="field">
                  <div class="columns is-centered">
                    <div class="column is-one-fifth">
                      <div class="control">
                        <input class="input" type="text" placeholder="Email Address" v-model="email">
                      </div>
                    </div>
                    <div class="column is-one-fifth">
                      <div class="control">
                        <input class="input" type="text" placeholder="WhatsApp Number" v-model="telepon_number">
                      </div>
                    </div>
                  </div>
                </div>
                <div class="columns is-centered">
                     <button class="button button-custom" @click="submit()">Notify Me!</button>
                </div>
                <p class="purchase-period"><strong>Purchase Period: 3-10 March 2020</strong></p>
            </div>
        </div>
      </section>
      <section class="section ourdeals-airlines">
        <div class="columns is-centered">
            
            <div class="column is-two-thirds">
              <p class="subtitle-ourdeals"><b>Special Deals from Japan Travel Week partners</b></p>
              <h1 class="title-arilines">Airlines</h1>
              <hr class="line">
              <img src="../assets/img/ourdeals/logo/All Nippon Airways.png" class="airline-logo">
              <img src="../assets/img/ourdeals/logo/Cathay Pacific.png" class="airline-logo">
              <img src="../assets/img/ourdeals/logo/Garuda Indonesia.png" class="airline-logo">
              <img src="../assets/img/ourdeals/logo/Japan Airlines.png" class="airline-logo">
              <img src="../assets/img/ourdeals/logo/Malaysia Airlines.png" class="airline-logo">
              <img src="../assets/img/ourdeals/logo/Philippine Airlines.png" class="airline-logo">
              <img src="../assets/img/ourdeals/logo/Thai Airways.png" class="airline-logo">
            </div>
          </div>
      </section>
      <section class="section ourdeals-banks">
        <div class="columns is-centered">
          <div class="column is-two-thirds banks">
            <div class="banks-column">
              <h1 class="title-arilines">Banks</h1>
              <hr class="line">
              <img src="../assets/img/ourdeals/logo/BNI.png" class="airline-logo">
              <img src="../assets/img/ourdeals/logo/BRI.png" class="airline-logo">
              <img src="../assets/img/ourdeals/logo/Mandiri.png" class="airline-logo">
            </div>
            <div class="banks-column">
              <h1 class="title-arilines">Online Travel Agent</h1>
              <hr class="line">
              <img src="../assets/img/ourdeals/logo/Traveloka.png" class="airline-logo">
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
</template>
<script>
import Footer from "@/partials/Footer";
import Navbar from "@/partials/Navbar";
import axios from 'axios';
import 'sweetalert2/dist/sweetalert2.min.css';
import Swal from 'sweetalert2/dist/sweetalert2.js';
export default {
  name: 'OurDeals',
  components: {
    Footer,
    Navbar
  },
  props: {
    msg: String
  },
  data(){
    return{  
      email:'',
      telepon_number: '',
    }
  },
  methods:{
    submit(){
      this.data = {
        'email':this.email,
        'nomor_telepon':this.telepon_number
      }
      this.trackClick(' Notify Email', JSON.stringify(this.data) )
      axios.post(this.$apiHost+'/commingsoon',this.data).then(err => {// eslint-disable-line
        Swal.fire(
          'Success!',
          'Data sent successfully',
          'success'
        )
      }).catch ((err) => {// eslint-disable-line
        // Swal.fire({
        //   icon: 'error',
        //   title: 'Oops...',
        //   text: 'Something went wrong!'
        // })
        console.log(err)
      })
    },
    trackClick(act, label){
      this.$ga.event({
        eventCategory: 'Our Deals Coming Soon',
        eventAction: 'Click '+act,
        eventLabel: label
      })
    },
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
  .title-ourdeals{
    font-family :'Museo 500';
    font-size:50px; 
    color:#d91f26;
    padding-top: 100px;
  }
  .subtitle-ourdeals{
    font-family :'Museo 300';
    font-size:16px; 
    color:#000;
    padding-bottom: 90px;
    text-align:center;
  }
  .sign-up-text {
    font-family :'Museo 500';
    padding-bottom: 35px;
    padding-top: 10px;
    font-size: 22px;
  }
  .button-custom{
    width:195px;
    height:40px !important;
    background:#999 !important;
    color:white  !important;
    font-family:'museo sans 300';
    font-size:16px; 
    border-radius: 50px !important;
  }
  .button-custom:hover{
    background:#d91f26 !important
  }
  .purchase-period{
    font-family:'Museo 500';
    font-size:16px; 
    color:#000;
    padding-top: 30px;
  }
  .title-arilines{
    font-family : 'Museo sans 500'; 
    font-size:20px; 
    color:#000;
    text-align: left;
  }
  .airline-logo{
    width: calc(100% / 7 - 20px);
    min-width: 100px;
    float: left;
    margin: 0 10px;
  }
  .nullmargin *{
      margin-bottom:0px !important;
  }
  .field {
    padding-bottom: 25px !important;
  }
  .field .is-one-fifth {
    padding: 0.75rem !important;
    width: 20% !important;
  }
  .input {
    border-radius: 50px !important;
    text-align: center;
  }
  .button-custom {
    border-radius: 50px;
  }
  .coming-soon-form {
    padding-bottom: 0 !important;
  }
  .ourdeals-airlines {
    padding-top: 0 !important;
    padding-bottom: 30px !important;
  }
  .ourdeals-airlines .is-two-thirds {
    padding-top: 5px !important;
  }
  .banks {
    display: flex !important;
  }
  .banks-column {
    width: 49%;
  }
  .banks-column:first-child {
    margin-right: 1%;
  }
  .banks-column:last-child {
    margin-left: 1%;
  }
  .ourdeals-banks {
    padding-top: 0 !important;
    padding-bottom: 150px !important;
  }

  @media (max-width: 768px) {
    .title-ourdeals {
      font-size: 10vw;
      padding-top: 40px;
    }
    .sign-up-text {
      font-size: 5.5vw;
    }
    .field .is-one-fifth {
      width: 100% !important;
    }
    .subtitle-ourdeals {
      padding-bottom: 40px;
    }
    .section.ourdeals-airlines {
      padding-top: 0 !important;
    }
    .airline-logo {
      width: calc(100% / 3 - 20px);
      min-width: auto;
      float: unset;
    }
    .banks {
      margin: 0 !important;
      display: inline-block !important;
    }
    .banks-column:first-child, .banks-column:last-child {
      margin: 0;
      width: 100%;
    }
  }
</style>