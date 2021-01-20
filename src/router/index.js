import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import LoginAndSignin from '../views/LoginAndSignin.vue'
import Companion from '../views/Companion.vue'
import Strategy from '../views/Strategy.vue'
import RouteQuery from '../views/RouteQuery.vue'
import Login from '../components/Login.vue'
import SignIn from '../components/SignIn.vue'
import PushCompanion from '../views/PushCompanion.vue'
import CompanionDetail from '../views/CompanionDetail.vue'
import PushStrategy from '../views/PushStrategy.vue'
import StrategyDetail from '../views/StrategyDetail.vue'
import ChangePassword from '../views/ChangePassword.vue'
import AdministratorLogin from '../views/AdministratorLogin.vue'
import Other from '../views/Other.vue'
import Personal from '../views/Personal.vue'
import UserControl from '../views/UserControl.vue'
// import OtherInfo from '../components/OtherInfo.vue'
// import OtherCompanion from '../components/OtherCompanion.vue'
// import OtherStrategy from '../components/OtherStrategy.vue'
// import OtherFocus from '../components/OtherFocus.vue'



Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/companion',
    name: 'Companion',
    component: Companion
  },
  {
    path: '/loginandsignin',
    name: 'LoginAndSignin',
    component: LoginAndSignin,
    children:[
      {
        path: '/login',
        name: 'Login',
        component: Login
      },
      {
        path: '/signin',
        name: 'SignIn',
        component: SignIn
      }
    ]
  },
  {
    path: '/strategy',
    name: 'Strategy',
    component: Strategy
  },
  {
    path: '/routeQuery',
    name: 'RouteQuery',
    component: RouteQuery
  },
  {
    path: '/pushcompanion',
    name: 'PushCompanion',
    component: PushCompanion
  },
  {
    path: '/companiondetail',
    name: 'CompanionDetail',
    component: CompanionDetail
  },
   {
    path: '/pushstrategy',
    name: 'PushStrategy',
    component: PushStrategy
  },
  {
    path: '/strategydetail',
    name: 'StrategyDetail',
    component: StrategyDetail
  },
  {
    path:'/changepassword',
    name: 'ChangePassword',
    component: ChangePassword
  },
  {
    path: '/administratorlogin',
    name: 'AdministratorLogin',
    component: AdministratorLogin
  },
  {
    path: '/other',
    name: 'Other',
    component: Other,

  },
  {
    path: '/personal',
    name: 'Personal',
    component: Personal,

  },
  {
    path: '/usercontrol',
    name: 'UserControl',
    component: UserControl
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  // base: process.env.BASE_URL,
  base:'/tour/',
  routes
})

export default router
