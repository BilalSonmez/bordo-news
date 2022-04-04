Template.adminPageCategory.onCreated(function () {
  this.state = new ReactiveDict(null, {
    
  });
  this.pagination = new ReactiveDict(null, {
    currentPage: 1,
    pageItems: 10,
    totalCount: 0,
    totalPages: 0
  });

  this.sorting = new ReactiveDict(null, {
    sortField: 'createdAt',
    sortOrder: 'asc'
  });

  this.filtering = new ReactiveDict(null, {});
});

Template.adminPageCategory.onRendered(function () {
  const self = this;
  this.autorun(function () {

  });
});

Template.adminPageCategory.events({

});

Template.adminPageCategory.onDestroyed(function () {

});
