<template>
<footer class="footer">
  <div class="content has-text-left">
    japantravelweek.co.id &copy; 2020
    <div class="is-grouped">
      <a target="_blank" href="https://www.instagram.com/jntoid"><i class="fab fa-instagram" style="margin:10px 10px 10px;height:22px;"></i></a>
      <a target="_blank" href="mailto:secretariat@japantravelweek.co.id"><i class="fa fa-envelope" style="margin:10px 10px 10px;height:22px;"></i></a>
      <a target="_blank" href="https://www.facebook.com/KunjungiJepang"><i class="fab fa-facebook-f" style="margin:10px 10px 10px;height:22px;"></i></a>
    </div>
  </div>
  
</footer>
</template>
<script>
export default {
  name: 'Footer',
  props: {
    msg: String
  }
}
</script>
<style scss>
  @font-face {
    font-family: "museoSans100";
    src: url("../assets/fonts/MuseoSans-100.otf");
  } 
  .footer {
    position: relative;
    bottom: 0;
    width: 100%;
    font-family: 'museoSans100';
    font-weight:normal;
    font-style:normal;
    background-color: #000 !important;
    height : 50px;
    padding: 0 2% !important;
    max-height:50px;
    font-size:15px;
    color:white;
  }
  .footer .content {
    position: absolute;
    top:30%;
    width: 96%;
  }
  .footer a{color: #fff}
  .footer .svg-inline--fa{
    margin-top: -0em !important;
    margin-bottom: 0 !important;
  }
  .is-grouped {
    float: right;
  }

  @media (max-width: 768px) {
    .footer {
      height: 100px;
      max-height: 100px;
    }

    .footer .content {
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      text-align: center !important;
    }

    .is-grouped {
      float: unset;
      text-align: center;
      padding-top: 5px;
    }
  }
</style>