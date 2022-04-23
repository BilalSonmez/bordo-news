import SimpleSchema from 'simpl-schema';

new ValidatedMethod({
  name: 'like.create.column',
  mixins: [SignedInMixin],
  validate: new SimpleSchema({
    _id: SimpleSchema.RegEx.Id,
    like: LikeSchema.omit('userId'),
  }).validator(),
  run: function (data) {
    this.unblock();
    const { _id, like } = data;

    const column = Columns.findOne({
      _id: _id,
    });
    
    like.userId = Meteor.userId();
    let likes = column.communityData.like;

    likes.forEach((a) => {
      if (a.userId === Meteor.userId()) {
        throw new Meteor.Error('You already like this content');
      }
    });
    likes.push(like);

    Columns.update(
      { _id: _id },
      {
        $set: {
          'communityData.like': likes,
        },
      }
    );

    return Columns.findOne({ _id: _id });
  },
});
