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
    news.featuredImage = await Files.findOne({
      _id: news.featuredImage,
    });
    news.categories = await Categories.find({
      _id : {
        $in : news.categories,
       }
    }).fetch(); 
    News.update({slugUrl: slugUrl}, {$set:{
      "communityData.views": news.communityData.views + 1,
    }});

    return news;
  }
});


