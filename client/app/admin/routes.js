import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

const routesAdmin = FlowRouter.group({
  prefix: '/admin',
  name: 'admin',
  triggersEnter:[MustSignIn, hasRole]
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
routesAdmin.route('/user', {
  name: 'admin.user',
  action: function (params, queryParams) {
    this.render('adminLayoutDefault', { page: 'adminPageUser' });
  }
});


const routesCategories = FlowRouter.group({
  prefix: '/admin/category',
  name: 'admin.category',
  triggersEnter:[MustSignIn, IsEditor]
});
routesCategories.route('/', {
  name: 'admin.category',
  action: function (params, queryParams) {
    this.render('adminLayoutDefault', { page: 'adminPageCategory' });
  }
});
routesCategories.route('/add', {
  name: 'admin.category.add',
  action: function (params, queryParams) {
    this.render('adminLayoutDefault', { page: 'adminPageCategoryAdd' });
  }
});
routesCategories.route('/edit/:_id', {
  name: 'admin.category.edit',
  action: function (params, queryParams) {
    this.render('adminLayoutDefault', { page: 'adminPageCategoryEdit' });
  }
});


const routesNews = FlowRouter.group({
  prefix: '/admin/new',
  name: 'admin.new',
  triggersEnter:[MustSignIn, IsEditor]
});
routesNews.route('/', {
  name: 'admin.new',
  action: function (params, queryParams) {
    this.render('adminLayoutDefault', { page: 'adminPageNew' });
  }
});
routesNews.route('/add', {
  name: 'admin.new.add',
  action: function (params, queryParams) {
    this.render('adminLayoutDefault', { page: 'adminPageNewsAdd' });
  }
});
routesNews.route('/edit/:_id', {
  name: 'admin.new.edit',
  action: function (params, queryParams) {
    this.render('adminLayoutDefault', { page: 'adminPageNewsEdit' });
  }
});


const routesColumns = FlowRouter.group({
  prefix: '/admin/column',
  name: 'admin.column',
  triggersEnter:[MustSignIn, IsEditor]
});
routesColumns.route('/', {
  name: 'admin.column',
  action: function (params, queryParams) {
    this.render('adminLayoutDefault', { page: 'adminPageColumn' });
  }
});
routesColumns.route('/add', {
  name: 'admin.column.add',
  action: function (params, queryParams) {
    this.render('adminLayoutDefault', { page: 'adminPageColumnAdd' });
  }
});
routesColumns.route('/edit/:_id', {
  name: 'admin.column.edit',
  action: function (params, queryParams) {
    this.render('adminLayoutDefault', { page: 'adminPageColumnEdit' });
  }
});