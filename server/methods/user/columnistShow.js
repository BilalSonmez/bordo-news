import SimpleSchema from 'simpl-schema';

new ValidatedMethod({
  name: 'columnist.show',
  validate: new SimpleSchema({
    userName: String
  }).validator(),
  run: function (data) {
    this.unblock();
    const { userName } = data;

    const columnist = Meteor.users.findOne({
      "profile.userName": userName,
    });
    return {_id:columnist._id,name:columnist.profile.name,lastName:columnist.profile.lastName,picture:columnist.profile.picture.url};
  }
});