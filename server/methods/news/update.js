import SimpleSchema from 'simpl-schema';

new ValidatedMethod({
  name: 'news.update',
  //TODO mixin and roles
  validate: new SimpleSchema({
    _id: SimpleSchema.RegEx.Id,
    news: NewSchema
  }).validator(),
  run: function (data) {
    this.unblock();
    const { _id, news } = data

    const id = News.update({ _id: _id }, {
      $set: news
    });

    return News.findOne({ _id: id });
  }
});