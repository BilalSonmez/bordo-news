import { Meteor } from "meteor/meteor";

Meteor.startup(() => {
  Migrations.migrateTo("latest");
  process.env.MAIL_URL = Meteor.settings.smtp;
});