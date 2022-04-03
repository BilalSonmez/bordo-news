import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

const routesAdmin = FlowRouter.group({
  prefix: '/admin',
  name: 'admin',
  //TODO Admin&Editor Check
  //triggersEnter:[MustSignIn, IsAdmin]
});

routesAdmin.route('/', {
  name: 'admin',
  action: function (params, queryParams) {
    FlowRouter.go('admin.dashboard');
  }
});

routesAdmin.route('/dashboard', {
  name: 'admin.dashboard',
  action: function (params, queryParams) {
    this.render('adminLayoutDefault', { page: 'adminPageDashboard' });
  }
});