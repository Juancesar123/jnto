import Vue from 'vue'
import Router from 'vue-router'
import Homepage from '@/components/Homepage'
import ExploreJapan from '@/components/ExploreJapan'
import ExhibitorsDetail from '@/components/ExhibitorsDetail'
// import OurDeals from '@/components/OurDeals'
import ExploreJapanDetail from '@/components/ExploreJapanDetail'
//const Homepage = () => import('@/components/Homepage')
import Exhibitors from '@/components/Exhibitors'
import ExhibitorCategory from '@/components/ExhibitorCategory'
import DealsList from '@/components/DealsList'
import DealsCategory from '@/components/DealsCategory'
import DealsDetail from '@/components/DealsDetail'
import DealsHome from '@/components/DealsHome'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Japan Travel Week',
      meta: {
        title: 'Japan Travel Week',
        metaTags: [
          {
            name: 'description',
            content: 'Japan Travel Week.'
          },
          {
            property: 'og:description',
            content: 'Japan Travel Week.'
          }
        ],
      },
      component: Homepage
    },
    {
      path: '/explore-japan',
      name: 'Explore Japan',
      meta: {
        title: 'Explore Japan - Japan Travel Week',
        metaTags: [
          {
            name: 'description',
            content: 'Explore Japan'
          },
          {
            property: 'og:description',
            content: 'Explore Japan'
          }
        ],
      },
      component: ExploreJapan
    },
    { 
      path: '/explore-japan/:id', 
      name:'Explore Japan Detail',
      meta: {
        title: 'Detail Explore Japan - Japan Travel Week',
        metaTags: [
          {
            name: 'description',
            content: 'Detail Explore Japan'
          },
          {
            property: 'og:description',
            content: 'Detail Explore Japan'
          }
        ],
      },
      component: ExploreJapanDetail
    },
    { 
      path: '/exhibitors',
      name:'List Exhibitors',
      meta: {
        title: 'Exhibitors - Japan Travel Week',
        metaTags: [
          {
            name: 'description',
            content: 'All Exhibitors Japan Travel Week'
          },
          {
            property: 'og:description',
            content: 'All Exhibitors Japan Travel Week'
          }
        ],
      }, 
      component: Exhibitors
    },
    { 
      path: '/exhibitor/:id', 
      meta: {
        title: 'List Exhibitors Category - Japan Travel Week',
        metaTags: [
          {
            name: 'description',
            content: 'List Of Exhibitors Category'
          },
          {
            property: 'og:description',
            content: 'List Of Exhibitors Category'
          }
        ],
      },
      component: ExhibitorCategory
    },
    {
      path: '/details-exhibitors/:id',
      name: 'Details Exhibitors',
      meta: {
        title: 'Detail Exhibitors - Japan Travel Week',
        metaTags: [
          {
            name: 'description',
            content: 'Detail Exhibitors '
          },
          {
            property: 'og:description',
            content: 'Details Exhibitors'
          }
        ],
      },
      component: ExhibitorsDetail
    },
    {
      path: '/our-deals',
      name: 'Our Deals',
      meta: {
        title: 'Our Deals - Japan Travel Week',
        metaTags: [
          {
            name: 'description',
            content: 'Japan Travel Week Deals'
          },
          {
            property: 'og:description',
            content: 'Japan Travel Week Deals'
          }
        ],
      },
      component: DealsHome
    },
    {
      path: '/show-deals',
      name: 'All Deals',
      meta: {
        title: 'All Deals - Japan Travel Week',
        metaTags: [
          {
            name: 'description',
            content: 'All Deals'
          },
          {
            property: 'og:description',
            content: 'All Deals'
          }
        ],
      },
      component: DealsHome
    },
    {
      path: '/show-deals/deals/all',
      name: 'All Deals List',
      meta: {
        title: 'All Deals List - Japan Travel Week',
        metaTags: [
          {
            name: 'description',
            content: 'All Deals List '
          },
          {
            property: 'og:description',
            content: 'All Deals List'
          }
        ],
      },
      component: DealsList
    },
    {
      path: '/show-deals/:id',
      name: 'Deals by Category',
      meta: {
        title: 'Deals by Category - Japan Travel Week',
        metaTags: [
          {
            name: 'description',
            content: 'Deals by Category'
          },
          {
            property: 'og:description',
            content: 'Deals by Category'
          }
        ],
      },
      component: DealsCategory
    },
    {
      path: '/show-deals/:id/:name',
      name: 'show-deals-details',
      meta: {
        title: 'Detail Our Deals - Japan Travel Week',
        metaTags: [
          {
            name: 'description',
            content: 'Detail Our Deals '
          },
          {
            property: 'og:description',
            content: 'Details Our Deals'
          }
        ],
      },
      component: DealsDetail
    },

  ]
})
