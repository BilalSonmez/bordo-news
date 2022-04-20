import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

FlowRouter.route('/', {
  name: 'public.home',
  action: function (params, queryParams) {
    this.render('publicLayoutDefault', {page: 'publicPagesHome'});
  }
});

FlowRouter.route('/news/:slugUrl', {
  name: 'public.news',
  action: function (params, queryParams) {
    this.render('publicLayoutDefault', {page: 'publicPagesNewDetail'});
  }
});
FlowRouter.route('/columns/:slugUrl', {
  name: 'public.columns',
  action: function (params, queryParams) {
    this.render('publicLayoutDefault', {page: 'publicPagesColumnDetail'});
  }
});


FlowRouter.route('/about', {
  name: 'public.about',
  action: function (params, queryParams) {
    this.render('publicLayoutDefault', {page: 'publicPagesAbout'});
  }
});

FlowRouter.route('/contact', {
  name: 'public.contact',
  action: function (params, queryParams) {
    this.render('publicLayoutDefault', {page: 'publicPagesContact'});
  }
});
FlowRouter.route('/allcategory', {
  name: 'public.all.category',
  action: function (params, queryParams) {
    this.render('publicLayoutDefault', {page: 'publicPagesAllCategory'});
  }
});
FlowRouter.route('/allcolumns', {
  name: 'public.all.columns',
  action: function (params, queryParams) {
    this.render('publicLayoutDefault', {page: 'publicPagesAllColumns'});
  }
});
FlowRouter.route('/dashboard', {
  name: 'public.dashboard',
  action: function (params, queryParams) {
    this.render('publicLayoutDefault', {page: 'publicPagesDashboard'});
  }
});