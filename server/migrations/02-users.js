Migrations.add({
  version: 2,
  name: 'Köşe yazarları ve editor account oluşturuluyor.',
  up: function () {
    const users = JSON.parse(Assets.getText('users.json'));
    users.forEach(user => {
      Meteor.users.insert(user);
    });
    Roles.addUsersToRoles('4sJpxQRwjfPCjnGM7', 'roles.columnist', null);
    Roles.addUsersToRoles('vLvp233WPiKKjMmkR', 'roles.columnist', null);
    Roles.addUsersToRoles('R5xHxWtd9YeFQ45tJ', 'roles.columnist', null);
    Roles.addUsersToRoles('4CqMck2ziQNGC5tpE', 'roles.columnist', null);
    Roles.addUsersToRoles('AAwwvT5scnaPqD2mv', 'roles.editor', null);
  }
});