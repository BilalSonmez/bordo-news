import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  //Migrations.unlock();
  // Migrations.migrateTo("1,rerun");
  Migrations.migrateTo('latest');
});

