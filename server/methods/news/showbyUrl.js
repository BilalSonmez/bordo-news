import SimpleSchema from 'simpl-schema';

new ValidatedMethod({
  name: 'news.show.url',
  validate: new SimpleSchema({
    slugUrl: String,
  }).validator(),
  run: async function (data) {
    this.unblock();
    const { slugUrl } = data;

    const news = News.findOne({
      slugUrl: slugUrl
    });

    news.featuredImage = Files.findOne({
      _id: news.featuredImage
    });
    console.log(news.categories);
    news.categories = await Categories.find({
      _id : {
        $in : news.categories,
       }
    }).fetch(); 
    return news;
  }
});


