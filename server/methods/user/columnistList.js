import SimpleSchema from 'simpl-schema';

new ValidatedMethod({
  name: 'columnist.list',
  validate: new SimpleSchema({}).validator(),
  run: function () {
    this.unblock();
    const columnists = Meteor.users.find({
      "profile.isColumnist": true,
      "profile.isAdmin": false,
    }).fetch();
    // todo ,{fields:{services:0}}
    const editedColumnists = [];
    columnists.forEach(function (columnnist) {
      editedColumnists.push({
        _id: columnnist._id,
        name: columnnist.profile.name,
        lastName: columnnist.profile.lastName,
        userName: columnnist.profile.userName,
        profilePicture: columnnist.profile.picture.url,
      })
    })
    return editedColumnists;
  }
});