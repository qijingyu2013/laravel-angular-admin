class TradeDtAddController {
  constructor (API, $state, $stateParams) {
    'ngInject'

    this.$state = $state
    this.formSubmitted = false
    this.API = API
    this.alerts = []

    if ($stateParams.alerts) {
      this.alerts.push($stateParams.alerts)
    }
  }

  save (isValid) {
    this.$state.go(this.$state.current, {}, { alerts: 'test' })
    if (isValid) {
      let Roles = this.API.service('roles', this.API.all('users'))
      let $state = this.$state

      Roles.post({
        'role': this.role,
        'slug': this.slug,
        'description': this.description
      }).then(function () {
        let alert = { type: 'success', 'title': 'Success!', msg: 'Role has been added.' }
        $state.go($state.current, { alerts: alert})
      }, function (response) {
        let alert = { type: 'error', 'title': 'Error!', msg: response.data.message }
        $state.go($state.current, { alerts: alert})
      })
    } else {
      this.formSubmitted = true
    }
  }

  $onInit () {}
}

export const TradeDtAddComponent = {
  templateUrl: './views/app/components/trade-dt-add/trade-dt-add.component.html',
  controller: TradeDtAddController,
  controllerAs: 'vm',
  bindings: {}
}
