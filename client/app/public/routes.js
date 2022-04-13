import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

FlowRouter.route('/', {
  name: 'public.home',
  action: function (params, queryParams) {
    this.render('publicLayoutDefault', {page: 'publicPagesHome'});
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
FlowRouter.route('/category', {
  name: 'public.category',
  action: function (params, queryParams) {
    this.render('publicLayoutDefault', {page: 'publicPagesCategory'});
  }
});
FlowRouter.route('/columns', {
  name: 'public.columns',
  action: function (params, queryParams) {
    this.render('publicLayoutDefault', {page: 'publicPagesColumns'});
  }
});
FlowRouter.route('/dashboard', {
  name: 'public.dashboard',
  action: function (params, queryParams) {
    this.render('publicLayoutDefault', {page: 'publicPagesDashboard'});
  }
});
FlowRouter.route('/content', {
  name: 'public.content',
  action: function (params, queryParams) {
    this.render('publicLayoutContent', {page: 'publicPagesContent'});
  }
});