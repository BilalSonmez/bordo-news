Migrations.add({
  version: 2,
  name: 'Creating Categories',
  up: function () {
    const categories = JSON.parse(Assets.getText('categories.json'));
    categories.forEach(category => {
      Category.insert(category);
    });
  }
});