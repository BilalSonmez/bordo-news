import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  //Migrations.unlock();
  Migrations.migrateTo(1);
});
