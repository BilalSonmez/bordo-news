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
FlowRouter.route('/category/:slugUrl', {
  name: 'public.category',
  action: function (params, queryParams) {
    this.render('publicLayoutDefault', {page: 'publicPagesCategoryDetail'});
  }
});
FlowRouter.route('/columnist/:_id', {
  name: 'public.columnist',
  action: function (params, queryParams) {
    this.render('publicLayoutDefault', {page: 'publicPagesColumnistDetail'});
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

FlowRouter.route('/news', {
  name: 'public.all.news',
  action: function (params, queryParams) {
    this.render('publicLayoutDefault', {page: 'publicPagesAllNews'});
  }
});

FlowRouter.route('/columns', {
  name: 'public.all.columns',
  action: function (params, queryParams) {
    this.render('publicLayoutDefault', {page: 'publicPagesAllColumns'});
  }
});