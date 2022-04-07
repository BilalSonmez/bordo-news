import SimpleSchema from 'simpl-schema';

new ValidatedMethod({
  name: 'column.create',
  //TODO: mixin role kontrolü
  validate: new SimpleSchema({
    column: ColumnSchema
  }).validator(),
  run: function (data) {
    this.unblock();

    const { column } = data
    const id = Columns.insert(column);
    return Columns.findOne({ _id: id });
  }
});