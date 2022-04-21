Template.registerHelper('eqInArray', function (array, id) {
  return array.findIndex(_item => _item._id === id) > -1 ? true : false;
});
