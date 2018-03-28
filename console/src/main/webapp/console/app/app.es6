class AppController {
  static $inject = [ '$scope', '$router', '$location', 'Profile' ]

  constructor ($scope, $router, $location, Profile) {
    $router.config([
      { path: '/',
        redirectTo: '/home' },
      { path: '/home',
        component: 'home' },
      { path: '/analytics/:role',
        component: 'analytics' },
      { path: '/orgs/:org',
        component: 'orgs' },
      { path: '/org/:org/:tab',
        component: 'org' },
      { path: '/roles/:role',
        component: 'roles' },
      { path: '/role/:role/:tab',
        component: 'role' },
      { path: '/browse/:id/users',
        component: 'users' },
      { path: '/users/:id/:tab',
        component: 'user' },
      { path: '/users/add',
        component: 'newUser' },
      { path: '/logs',
        component: 'logs' }
    ])

    $scope.isActive = (routes) => routes.some(
      route => $location.$$path.indexOf(route) === 1
    )

    Profile.get((p) => {
      $scope.profile = p.roles.indexOf('SUPERUSER') === -1
        ? 'index.delegated' : 'index.superuser'
    })
  }
}

class StandaloneController {
  static $inject = [ '$scope', 'Orgs' ]

  constructor ($scope, Org) {
    $scope.org = new Org()
  }
}

angular.module('admin_console', [
  'ngResource',
  'ngNewRouter',
  'ngSanitize',
  'inline',
  'localytics.directives',
  'flash',
  'angularUtils.directives.dirPagination',
  'pascalprecht.translate'
])
  .controller('AppController', AppController)
  .controller('StandaloneController', StandaloneController)
  .constant('LDAP_ROOT_URI', '/console/')
  .constant('LDAP_BASE_URI', '/console/private/')
  .constant('LDAP_PUBLIC_URI', '/console/public/')
  .constant('MF_BASE_URI', '/mapfishapp/ws/')
  .constant('ANALYTICS_BASE_URI', '/analytics/ws/')
  .config([
    '$componentLoaderProvider',
    '$translateProvider',
    '$locationProvider',
    'paginationTemplateProvider',
    'LDAP_ROOT_URI',
    '$qProvider',
    ($componentLoader, $translate, $location, paginationTemplate, $uri, $qP) => {
      $componentLoader.setTemplateMapping(
        (name) => 'components/' + name + '/' + name + '.tpl.html')
      $translate
        .useSanitizeValueStrategy('escape')
        .useStaticFilesLoader({ prefix: $uri + 'console/public/lang/', suffix: '.json' })
        .registerAvailableLanguageKeys(['en', 'fr'], {
          'en_*': 'en',
          'fr_*': 'fr',
          '*': 'en'
        })
        .determinePreferredLanguage()
        .fallbackLanguage('en')
      $location.html5Mode(false)
      paginationTemplate.setPath('templates/dirPagination.tpl.html')
      $qP.errorOnUnhandledRejections(false)
    }])

require('components/analytics/analytics')
require('components/orgs/orgs')
require('components/org/org')
require('components/roles/roles')
require('components/role/role')
require('components/home/home')
require('components/browse/browse')
require('components/logs/logs')
require('components/newUser/newUser')
require('components/stats/stats')
require('components/user/user')
require('components/users/users')

require('templates/dirPagination.tpl')
