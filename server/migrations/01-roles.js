Migrations.add({
  version: 1,
  name: 'Roller tanımlanıyor ve admin user oluşturuluyor.',
  up: function () {
    Roles.createRole('roles.admin');
    Roles.createRole('roles.editor');
    Roles.createRole('roles.columnist');

    const userId = Accounts.createUser({
      email: 'admin@bordonews.com',
      password: '123123',
      profile: {
        name: 'Bordo',
        lastName: 'News',
      },
    });

    Meteor.users.update(
      {
        _id: userId,
      },
      {
        $set: {
          'profile.isAdmin': true,
          'profile.isEditor': true,
          'profile.isColumnist': true,
        },
      }
    );

    Roles.addUsersToRoles(userId, 'roles.admin', null);
    Roles.addUsersToRoles(userId, 'roles.editor', null);
    Roles.addUsersToRoles(userId, 'roles.columnist', null);
  },
});
