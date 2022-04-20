import SimpleSchema from 'simpl-schema';

new ValidatedMethod({
  name: 'like.delete.column',
  mixins : [SignedInMixin],
  validate: new SimpleSchema({
    _id: SimpleSchema.RegEx.Id,
  }).validator(),
  run: function (data) {
    this.unblock();
    const { _id } = data
    const column = Columns.findOne({
      _id: _id
    });
    let likes = column.communityData.like;
    let indexOfLike;
    likes.forEach((a,index)=>{
      if (a.userId===Meteor.userId()) {
        indexOfLike=index;
        return;
      }
    })
    likes.splice(indexOfLike, 1);
    Columns.update({_id: _id}, {$set:{
      "communityData.like": likes,
    }});

    return Columns.findOne({ _id: _id });
  }
});