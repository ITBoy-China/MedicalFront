import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}

import OutPatientRegister from 'views/OutPatientRegister.vue'
import OutPatientLogin from 'views/OutPatientLogin.vue'
import OutPatientIndex from 'views/OutPatientIndex.vue'
import ChargeLogin from 'views/ChargeLogin.vue'
import ChargeIndex from 'views/ChargeIndex.vue'
import charge from 'components/charge.vue'
import queryCharge from 'components/queryCharge.vue'
import returnCharge from 'components/returnCharge.vue'
import DrugLogin from "../views/DrugLogin";
import DrugIndex from "../views/DrugIndex";
import DoctorIndex from 'views/DoctorIndex.vue'
import DoctorLogin from 'views/DoctorLogin.vue'
import DoctorMedicalList from 'views/DoctorMedicalList.vue'

const routes = [
  {
    path:'/',
    name:'home',
    redirect:'/OutPatient/login'
  },
  {
    path:'/OutPatient/register',
    name:'out-register',
    component:OutPatientRegister
  },
  {
    path:'/OutPatient/login',
    name:'ou-login',
    component:OutPatientLogin
  },{
    path:'/OutPatient/index',
    name:'out-index',
    component:OutPatientIndex
  },
  {
    path:"/Charge/login",
    name:"charge-login",
    component:ChargeLogin
  },{
    path:"/Charge/index",
    name:"charge-index",
    component:ChargeIndex,
    redirect:'/Charge/index/pcharge',
    children:[
      {
        path:'pcharge',
        component:charge
      },
      {
        path:'qcharge',
        component:queryCharge
      },{
        path:'rcharge',
        component:returnCharge
      }
    ]
  },
  {
    // path:'/OutPatient/login',
    path:'/Drug/login',
    name:'login',
    // component:OutPatientLogin
    component:DrugLogin
  },{
    // path:'/OutPatient/index',
    path:'/Drug/index',
    name:'index',
    component:DrugIndex
  }, {
    path:'/Doctor/login',
    name:'doctorlogin',
    component:DoctorLogin
  },
  {
    path:'/Doctor/index',
    name:'doctorindex',
    component:DoctorIndex
  },
  {
    path:'/Doctor/MedicalList',
    name:'medicalList',
    component:DoctorMedicalList
  }
]

const router = new VueRouter({
  //url取消hash
  mode:"history",
  routes
})

export default router
