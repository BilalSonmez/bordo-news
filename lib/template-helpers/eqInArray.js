Template.registerHelper('eqInArray', function (id, array) {
  return array.findIndex(_item => _item._id === id) > -1 ? true : false;
});
