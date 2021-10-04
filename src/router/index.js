import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// route-level code splitting

const HomePage = () => import('client/pages/Home.page.vue');
const Bounty = () => import('client/pages/Bounty.page.vue');
const ExplorerBlocks = () => import('client/pages/Explorer.page.vue');
const AdminPage = () => import('client/pages/Admin.page.vue');
const FaqPage = () => import('client/pages/Faq.page.vue');
const PartnersPage = () => import('client/pages/Partners.page.vue');
const ClearIndexedDBPage = () => import('client/pages/ClearIndexedDB.page.vue');

export function createRouter() {

  return new Router({
    mode: 'history',
    scrollBehavior(to, from, savedPosition) {
      //console.log('router scroll', to, from, to === from);

      if (savedPosition) {
        return savedPosition
      } else {
        if (to.hash) {
          return {
            selector: to.hash
          }
        }
      }

    },
    routes: [

      {
        path: '/explorer/:a?',
        component: ExplorerBlocks
      },
      {
        path: '/explorer',
        component: ExplorerBlocks
      },
      {
        path: '/bounties',
        component: Bounty
      },
      {
        path: '/faq/:qHash?',
        component: FaqPage,
        name: 'faq'
      },
      {
        path: '/partners/:qHash?',
        component: PartnersPage,
        name: 'partners'
      },
      {
        path: '/payment/:toAddress/:toAmount?/:toFee?',
        component: HomePage,
        beforeEnter: (to, from, next) => {
            // We need to re-do the matching because '#' from the
            // WebDollar addresses are breaking up the original matcher
            let pathParts = to.matched[0].regex.exec(to.fullPath);

            to.params.toAddress = pathParts[1];
            let toAmount = pathParts[2];
            let toFee    = pathParts[3];

            if (toAmount) {
               to.params.toAmount = toAmount.replace(',', '.');
            }
            if (toFee) {
                to.params.toFee = toFee.replace(',', '.');
            }

            console.log(to)
            next();
        }
      },
      {
        path: '/pool',
        component: AdminPage
      },
      {
        path: '/pool/:a?',
        component: AdminPage
      },
      {
        path: '/clearIndexedDB',
        component: ClearIndexedDBPage
      },
      {
        path: '/:a?/*',
        component: HomePage
      },
      {
        path: '/:a?',
        component: HomePage
      },
      {
        path: '/',
        component: HomePage
      },

    ]
  })
}
