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
routesAdmin.route('/category', {
  name: 'admin.category',
  action: function (params, queryParams) {
    this.render('adminLayoutDefault', { page: 'adminPageCategory' });
  }
});
routesAdmin.route('/category/add', {
  name: 'admin.category.add',
  action: function (params, queryParams) {
    this.render('adminLayoutDefault', { page: 'adminPageCategoryAdd' });
  }
});
routesAdmin.route('/category/edit/:_id', {
  name: 'admin.category.edit',
  action: function (params, queryParams) {
    this.render('adminLayoutDefault', { page: 'adminPageCategoryEdit' });
  }
});
routesAdmin.route('/new', {
  name: 'admin.new',
  action: function (params, queryParams) {
    this.render('adminLayoutDefault', { page: 'adminPageNew' });
  }
});
routesAdmin.route('/new/add', {
  name: 'admin.new.add',
  action: function (params, queryParams) {
    this.render('adminLayoutDefault', { page: 'adminPageNewsAdd' });
  }
});
routesAdmin.route('/new/edit/:_id', {
  name: 'admin.new.edit',
  action: function (params, queryParams) {
    this.render('adminLayoutDefault', { page: 'adminPageNewsEdit' });
  }
});
routesAdmin.route('/column', {
  name: 'admin.column',
  action: function (params, queryParams) {
    this.render('adminLayoutDefault', { page: 'adminPageColumn' });
  }
});
routesAdmin.route('/user', {
  name: 'admin.user',
  action: function (params, queryParams) {
    this.render('adminLayoutDefault', { page: 'adminPageUser' });
  }
});