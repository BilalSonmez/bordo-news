Template.registerHelper('state', function () {
  return Template.instance().state;
});

Template.registerHelper('appUtilTemp', function () {
  return AppUtil.temp;
});