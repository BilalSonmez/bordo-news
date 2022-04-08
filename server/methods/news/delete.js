import { each } from 'jquery';
import SimpleSchema from 'simpl-schema';

new ValidatedMethod({
  name: 'news.delete',
  mixins : [SignedInMixin,RoleMixin],
  roles: ["roles.editor"],
  validate: new SimpleSchema({
    _id: SimpleSchema.RegEx.Id
  }).validator(),
  run: async function (data) {
    this.unblock();
    const { _id } = data;
    News.remove({ _id: _id });
  }
}); 