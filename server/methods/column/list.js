import SimpleSchema from 'simpl-schema';

new ValidatedMethod({
  name: 'column.list',
  validate: new SimpleSchema({
    options: { type: QueryOptionsSchema, optional: true },
  }).validator(),
  run: function (data) {
    this.unblock();
    const { options } = data;
    
    let columns = Fetch(Columns, {}, options, 'columns');
    columns.columns.map((data) => {
      data.featuredImage = Files.findOne({
        _id: data.featuredImage,
      });
    });

    return columns;
  },
});
