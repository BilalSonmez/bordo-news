import SimpleSchema from 'simpl-schema';

new ValidatedMethod({
  name: 'column.show',
  validate: new SimpleSchema({
    _id: SimpleSchema.RegEx.Id,
  }).validator(),
  run: async function (data) {
    this.unblock();
    const { _id } = data;

    const column = Columns.findOne({
      _id: _id
    });


    column.featuredImage = Files.findOne({
      _id: column.featuredImage
    });

    return column;
  }
});


