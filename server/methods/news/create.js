import SimpleSchema from 'simpl-schema';

new ValidatedMethod({
  name: 'news.create',
  //TODO: mixin role kontrolü
  validate: new SimpleSchema({
    news: NewSchema
  }).validator(),
  run: function (data) {
    this.unblock();

    const { news } = data
    const id = News.insert(news);
    return News.findOne({ _id: id });
  }
});