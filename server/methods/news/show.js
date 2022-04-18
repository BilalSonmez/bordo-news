import SimpleSchema from 'simpl-schema';

new ValidatedMethod({
  name: 'news.show',
  validate: new SimpleSchema({
    _id: SimpleSchema.RegEx.Id,
  }).validator(),
  run: async function (data) {
    this.unblock();
    const { _id } = data;

    const news = News.findOne({
      _id: _id
    });

    news.featuredImage = Files.findOne({
      _id: news.featuredImage
    });

    return news;
  }
});


