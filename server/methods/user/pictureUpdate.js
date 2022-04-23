import SimpleSchema from 'simpl-schema';

new ValidatedMethod({
  name: 'user.picture.update',
  mixins: [SignedInMixin],
  validate: new SimpleSchema({
    picture: ProfilePictureSchema,
  }).validator(),
  run: async function (data) {
    this.unblock();
    const { picture } = data;
    
    return Meteor.users.update({ _id: Meteor.userId() }, { $set: { 'profile.picture': picture } });
  },
});
