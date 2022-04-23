RoleMixin = function (methodOptions) {
  const roles = methodOptions.roles;
  const runFunc = methodOptions.run;
  methodOptions.run = function (_data) {
    const userId = this.userId;
    const isInRole = Roles.userIsInRole(userId, roles);

    if (!isInRole) {
      throw new Meteor.Error('You dont have permission');
    }

    return runFunc.call(this, ...arguments);
  };
  return methodOptions;
};
