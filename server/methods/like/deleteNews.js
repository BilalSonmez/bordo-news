import SimpleSchema from 'simpl-schema';

new ValidatedMethod({
  name: 'like.delete.news',
  mixins : [SignedInMixin],
  validate: new SimpleSchema({
    _id: SimpleSchema.RegEx.Id,
  }).validator(),
  run: function (data) {
    //mongodb pull
    this.unblock();
    const { _id } = data
    const news = News.findOne({
      _id: _id
    });
    let likes = news.communityData.like;
    let indexOfLike;
    likes.forEach((a,index)=>{
      if (a.userId===Meteor.userId()) {
        indexOfLike=index;
        return;
      }
    })
    likes.splice(indexOfLike, 1);
    News.update({_id: _id}, {$set:{
      "communityData.like": likes,
    }});

    return News.findOne({ _id: _id });
  }
});