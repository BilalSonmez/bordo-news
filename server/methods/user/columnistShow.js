import SimpleSchema from 'simpl-schema';

new ValidatedMethod({
  name: 'columnist.show',
  validate: new SimpleSchema({
    _id: SimpleSchema.RegEx.Id,
  }).validator(),
  run: function (data) {
    this.unblock();
    const { _id } = data;

    const columnist = Meteor.users.findOne({
      _id: _id,
    });

    return { _id: columnist._id, name: columnist.profile.name, lastName: columnist.profile.lastName, picture: columnist.profile.picture.url };
  },
});
