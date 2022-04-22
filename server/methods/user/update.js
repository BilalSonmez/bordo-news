import SimpleSchema from 'simpl-schema';

new ValidatedMethod({
  name: 'user.profile.update',
  mixins : [SignedInMixin],
  validate: new SimpleSchema({
    userName: String,
    name: String,
    lastName: String
  }).validator(),
  run: async function (data) {
    this.unblock();
    const { userName, name, lastName } = data;
    return Meteor.users.update({_id: Meteor.userId()}, {
      $set: {
        "profile.userName": userName,
        "profile.name": name,
        "profile.lastName": lastName
      }
    });
  }
});
