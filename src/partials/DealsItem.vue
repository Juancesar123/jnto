<template>
  <div class="deal-item">
    <div class="columns">
      <div class="column">
        <hr class="line"> 
        <router-link :to="{path:getLink(item)}">
          <div class="imgbox">
            <img class="light-color" :src="getLogo(item)">
          </div>
        </router-link>
        <div class="deals-detail">
          <h1 class="title-exhibitors">{{item.title_reveal||item.deals_title}}</h1>
          <br>
          <div class="content">
            <p class="font-detail">
              {{item.flight_period?'Flight Period: '+item.flight_period.split("\n")[0]:''}}
              <br v-if="item.flight_period&&item.blackout_date">
              {{item.blackout_date?'Blackout Date: '+item.blackout_date:''}}
            </p>
            <p v-if="item.deals_description" class="font-header" v-html="item.deals_description.replace(/(?:\r\n|\r|\n)/g, '<br>')"></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
    name: 'DealsItem',
    props: {
      item: Object,
      breadcrumb: String
    },
    methods: {
      getLink(item){
        if(item&&item.ourdeal&&item.ourdeal.ourdeal_name&&!this.breadcrumb)
          return '/show-deals/'+item.ourdeal.category+'/'+item.ourdeal.ourdeal_name
      },
      getLogo(item){
        if(item)
          return 'https://img'+(item.ourdealId%10)+'.japantravelweek.co.id'+require('../assets/img/ourdeals/logo/'+item.ourdeal.ourdeal_name+'.png')
      },
      trackClick(act, label){
        this.$ga.event({
          eventCategory: 'Deals Item',
          eventAction: 'Click '+act,
          eventLabel: label
        })
      },
    },
    mounted(){
    }
}
</script>
<style scoped>
  .font-detail{
    font-family : 'Museo sans 300'; 
    font-size:14px;
  }
  .font-header{
    font-family : 'Museo sans 300'; 
    font-size:16px;
  }
  @media(max-width:768px){
    .deal-item{
      display: inline-block;
      width: 100%;
      float: none;
    }
    .deals-detail{
      float: none;
      max-width: 100%;
    }
    .deals-list .imgbox{
      margin: 0 auto !important;
      float: none;
      width: 100%;
      text-align: center;
    }
    .deals-list .imgbox img{
      max-width: 167.5px;
    }
  }
</style>