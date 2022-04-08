import { each } from 'jquery';
import SimpleSchema from 'simpl-schema';

new ValidatedMethod({
  name: 'category.delete',
  mixins : [SignedInMixin,RoleMixin],
  roles: ["roles.admin"],
  validate: new SimpleSchema({
    _id: SimpleSchema.RegEx.Id
  }).validator(),
  run: async function (data) {
    this.unblock();
    const { _id } = data;
    Categories.remove({ _id: _id });
  }
}); 