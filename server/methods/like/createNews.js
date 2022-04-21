import SimpleSchema from 'simpl-schema';

new ValidatedMethod({
  name: 'like.create.news',
  mixins : [SignedInMixin],
  validate: new SimpleSchema({
    _id: SimpleSchema.RegEx.Id,
    like: LikeSchema.omit("userId"),
  }).validator(),
  run: function (data) {
    this.unblock();
    const { _id,like } = data
    const news = News.findOne({
      _id: _id
    });
    like.userId=Meteor.userId();
    let likes = news.communityData.like;
    //todo news find 
    likes.forEach((a)=>{
      if (a.userId===Meteor.userId()) {
        throw (new Meteor.Error("You already like this content"));
      }
    })
    likes.push(like);
    News.update({_id: _id}, {$set:{
      "communityData.like": likes,
    }});
    //$addToSet

    return News.findOne({ _id: _id });
  }
});