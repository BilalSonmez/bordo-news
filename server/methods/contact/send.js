import SimpleSchema from 'simpl-schema';

new ValidatedMethod({
  name: 'contact.send',
  validate: new SimpleSchema({
    name: String,
    mail: String,
    text: String
  }).validator(),
  run: function (data) {
    this.unblock();
    const simpleHtml = `
    <ul>
      <li>Name: ${data.name}</li>
      <li>Mail: ${data.mail}</li>
      <li>Message: ${data.text}</li>
    </ul>
    `;
    return Email.send({
      from: "newsbordo@gmail.com",
      to: "blalsnmez.8@gmail.com",
      subject: "Contact Form",
      html: simpleHtml
    });
  }
});