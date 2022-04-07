import SimpleSchema from 'simpl-schema';

new ValidatedMethod({
  name: 'column.show',
  validate: new SimpleSchema({
    _id: SimpleSchema.RegEx.Id,
  }).validator(),
  run: async function (data) {
    this.unblock();
    const { _id } = data;

    return Columns.findOne({
      _id: _id
    });
  }
});


