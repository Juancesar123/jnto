<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand" id="logo_jtw_top" >
      <router-link to="/"><img src="../assets/img/logo/jtw_top.png"/></router-link>
    </div>

    <div class="logo-end">
      <a target="_blank" href="https://www.japan.travel/id/id"><img id="logo_jnto_top" src="../assets/img/logo/jnto_top.png" /></a>
      <img id="logo_jed_top" src="../assets/img/logo/jway_top.png" />
    </div>
  </nav>
</template>
<script>
export default {
  name: 'Navbar',
  props: {
    msg: String
  },
  data() {
    return {
       isActive: false
    }
  }
}
</script>
<style scss>
  .navbar, .logo-img{
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  #logo_jtw_top{margin-left: 3vw;}
  #logo_jtw_top a{line-height: 0;}

  .logo-end{position: absolute;right: 3vw;top:0.5em;}
  #logo_jnto_top{margin-bottom: 1em;}

  @media (max-width: 768px) {
    .navbar {
      height: 100px !important;
    }
    #logo_jtw_top {
      margin: auto;
      width: 40vw;
    }
    .logo-end {
      display: none;
    }
    .breadcrumb ul{
      margin-left: 4vw
    }
  }
</style>