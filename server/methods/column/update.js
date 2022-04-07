import SimpleSchema from 'simpl-schema';

new ValidatedMethod({
  name: 'column.update',
  //TODO mixin and roles
  validate: new SimpleSchema({
    _id: SimpleSchema.RegEx.Id,
    column: ColumnSchema
  }).validator(),
  run: function (data) {
    this.unblock();
    const { _id, column } = data

    const id = Columns.update({ _id: _id }, {
      $set: column
    });

    return Columns.findOne({ _id: id });
  }
});