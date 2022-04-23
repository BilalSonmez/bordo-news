import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { FlowRouterMeta, FlowRouterTitle } from 'meteor/ostrio:flow-router-meta';


const routesPublic = FlowRouter.group({
  prefix: '',
  name: 'public',
  title: 'A day in the life - Bordo News',
  meta: {
    url: {
      property: 'og:url',
      itemprop: 'url',
      content() {
        return document.location.href;
      }
    }
  },
  link: {
    canonical() {
      return document.location.href;
    }
  }
});

routesPublic.route('/', {
  name: 'public.home',
  action: function (params, queryParams) {
    this.render('publicLayoutDefault', {page: 'publicPagesHome'});
  }
});

routesPublic.route('/news/:slugUrl', {
  name: 'public.news',
  title: 'News Detail - Bordo News',
  action: function (params, queryParams) {
    this.render('publicLayoutDefault', {page: 'publicPagesNewDetail'});
  }
});
routesPublic.route('/columns/:slugUrl', {
  name: 'public.columns',
  title: 'Columns Detail - Bordo News',
  action: function (params, queryParams) {
    this.render('publicLayoutDefault', {page: 'publicPagesColumnDetail'});
  }
});
routesPublic.route('/category/:slugUrl', {
  name: 'public.category',
  title: 'News Category - Bordo News',
  action: function (params, queryParams) {
    this.render('publicLayoutDefault', {page: 'publicPagesCategoryDetail'});
  }
});
routesPublic.route('/columnist/:_userName', {
  name: 'public.columnist',
  title: 'Columnist - Bordo News',
  action: function (params, queryParams) {
    this.render('publicLayoutDefault', {page: 'publicPagesColumnistDetail'});
  }
});

routesPublic.route('/about', {
  name: 'public.about',
  title: 'About Us - Bordo News',
  action: function (params, queryParams) {
    this.render('publicLayoutDefault', {page: 'publicPagesAbout'});
  }
});

routesPublic.route('/contact', {
  name: 'public.contact',
  title: 'Contact Us - Bordo News',
  action: function (params, queryParams) {
    this.render('publicLayoutDefault', {page: 'publicPagesContact'});
  }
});

routesPublic.route('/news', {
  name: 'public.all.news',
  title: 'News - Bordo News',
  action: function (params, queryParams) {
    this.render('publicLayoutDefault', {page: 'publicPagesAllNews'});
  }
});

routesPublic.route('/columns', {
  name: 'public.all.columns',
  title: 'Columns - Bordo News',
  action: function (params, queryParams) {
    this.render('publicLayoutDefault', {page: 'publicPagesAllColumns'});
  }
});

new FlowRouterMeta(FlowRouter);
new FlowRouterTitle(FlowRouter);