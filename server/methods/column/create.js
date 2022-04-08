import SimpleSchema from 'simpl-schema';

new ValidatedMethod({
  name: 'column.create',
  mixins : [SignedInMixin,RoleMixin],
  roles: ["roles.editor"],
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