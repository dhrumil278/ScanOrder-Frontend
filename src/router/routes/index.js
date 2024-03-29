import { lazy } from 'react';

// ** Document title
// const TemplateTitle = "%s - Vuexy React Admin Template";

// ** Default Route
const DefaultRoute = '/home';

// ** Merge Routes
const Routes = [
  {
    path: '/home',
    component: lazy(() => import('../../views/pages/Home')),
  },
  {
    path: '/landingPage',
    component: lazy(() => import('../../views/pages/Restorunts/LandingPage')),
  },
  {
    path: '/addToCartPage',
    component: lazy(() => import('../../views/pages/Restorunts/AddToCartPage')),
  },
  {
    path: '/confirmOrderPage',
    component: lazy(() => import('../../views/pages/Restorunts/confirmOrder')),
  },
  {
    path: '/orderAcceptPage',
    component: lazy(() =>
      import('../../views/pages/Restorunts/OrderAcceptPage'),
    ),
  },
  {
    path: '/foodPage',
    component: lazy(() => import('../../views/pages/Restorunts/FoodPage')),
  },
  {
    path: '/myprofile',
    component: lazy(() => import('../../views/pages/profile/MyProfile')),
  },
  {
    path: '/accountsetting',
    component: lazy(() => import('../../views/pages/profile/AccountSetting')),
  },
  {
    path: '/second-page',
    component: lazy(() => import('../../views/SecondPage')),
  },
  {
    path: '/login',
    component: lazy(() => import('../../views/pages/auth/Login')),
    layout: 'BlankLayout',
    meta: {
      authRoute: true,
    },
  },
  {
    path: '/register',
    component: lazy(() => import('../../views/pages/auth/Register')),
    layout: 'BlankLayout',
    meta: {
      authRoute: true,
    },
  },
  {
    path: '/forgotpassword',
    component: lazy(() => import('../../views/pages/auth/ForgotPassword')),
    layout: 'BlankLayout',
    meta: {
      authRoute: true,
    },
  },
  {
    path: '/verifyEmail',
    component: lazy(() => import('../../views/pages/auth/VerifyEmail')),
    layout: 'BlankLayout',
    meta: {
      authRoute: true,
    },
  },
  {
    path: '/forgotPasswordConfirmation',
    component: lazy(() =>
      import('../../views/pages/auth/forgotPassConfirmation'),
    ),
    layout: 'BlankLayout',
    meta: {
      authRoute: true,
    },
  },
  {
    path: '/emailVerification',
    component: lazy(() => import('../../views/pages/auth/emailVerifiction')),
    layout: 'BlankLayout',
    meta: {
      authRoute: true,
    },
  },
  {
    path: '/resetpassword',
    component: lazy(() => import('../../views/pages/auth/ResetPassword')),
    layout: 'BlankLayout',
    meta: {
      authRoute: true,
    },
  },
  {
    path: '/error',
    component: lazy(() => import('../../views/Error')),
    layout: 'BlankLayout',
  },
];

export {
  DefaultRoute,
  // TemplateTitle,
  Routes,
};
