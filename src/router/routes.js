const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'characters', component: () => import('pages/CharactersView.vue') },
      { path: 'character/:id', name: 'character-detail', component: () => import('pages/CharacterDetail.vue') },
      { path: 'about', name: 'about', component: () => import('pages/AboutView.vue') }
    ]
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
