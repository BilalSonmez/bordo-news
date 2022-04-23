import { each } from 'jquery';
import SimpleSchema from 'simpl-schema';

new ValidatedMethod({
  name: 'column.delete',
  mixins: [SignedInMixin, RoleMixin],
  roles: ['roles.columnist'],
  validate: new SimpleSchema({
    _id: SimpleSchema.RegEx.Id,
  }).validator(),
  run: async function (data) {
    this.unblock();
    const { _id } = data;

    Columns.remove({ _id: _id });
  },
});
