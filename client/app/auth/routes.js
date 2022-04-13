import {FlowRouter} from 'meteor/ostrio:flow-router-extra';

FlowRouter.route('/profile', {
  name: 'auth.profile',
  triggersEnter: [MustSignIn],
  action(params, queryParams) {
    this.render('publicLayoutDefault',{page: 'authPageProfile'});
  }
});