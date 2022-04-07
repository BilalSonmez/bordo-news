Migrations.add({
  version: 1,
  name: 'Roller tanımlanıyor ve admin user oluşturuluyor.',
  up: function () {
    Roles.createRole('roles.admin');
    Roles.createRole('roles.editor');

    const userId = Accounts.createUser({
      email: 'admin@bordomovie.com',
      password: '123123',
      profile: {
        name: 'Bordo',
        lastName: 'Movie'
      }
    });

    Meteor.users.update({ _id: userId }, {
      $set: {
        'profile.isAdmin': true,
        'profile.isEditor': true,
      }
    })

    
    Roles.addUsersToRoles(userId, 'roles.admin', null);
    Roles.addUsersToRoles(userId, 'roles.editor', null);
  }
});