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