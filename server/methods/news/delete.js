import { each } from 'jquery';
import SimpleSchema from 'simpl-schema';

new ValidatedMethod({
  name: 'news.delete',
  //TODO mixin and roles
  validate: new SimpleSchema({
    _id: SimpleSchema.RegEx.Id
  }).validator(),
  run: async function (data) {
    this.unblock();
    const { _id } = data;
    News.remove({ _id: _id });
  }
}); 