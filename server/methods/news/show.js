import SimpleSchema from 'simpl-schema';

new ValidatedMethod({
  name: 'news.show',
  validate: new SimpleSchema({
    _id: SimpleSchema.RegEx.Id,
  }).validator(),
  run: async function (data) {
    this.unblock();
    const { _id } = data;

    return News.findOne({
      _id: _id
    });
  }
});


