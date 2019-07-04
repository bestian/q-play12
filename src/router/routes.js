
const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'tutorial', component: () => import('pages/Tutorial.vue') },
      { path: 'play12', component: () => import('pages/Play12.vue') },
      { path: 'play24', component: () => import('pages/Play24.vue') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
