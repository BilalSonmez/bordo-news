import SimpleSchema from 'simpl-schema';

new ValidatedMethod({
  name: 'user.list',
  //TODO mixins: [isAdmin],
  validate: new SimpleSchema({
    options: { type: QueryOptionsSchema, optional: true }
  }).validator(),
  run: function (data) {
    this.unblock();
    const { options } = data;

    return Fetch(Meteor.users, {}, options, 'user');
  }
});