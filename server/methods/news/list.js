import SimpleSchema from 'simpl-schema';

new ValidatedMethod({
  name: 'news.list',
  validate: new SimpleSchema({
    options: { type: QueryOptionsSchema, optional: true },
  }).validator(),
  run: function (data) {
    this.unblock();
    const { options } = data;
    let news = Fetch(News, {}, options, 'news');

    news.news.map((data) => {
      data.featuredImage = Files.findOne({
        _id: data.featuredImage,
      });
    });

    return news;
  },
});
