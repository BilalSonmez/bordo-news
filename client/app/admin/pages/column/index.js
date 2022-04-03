Template.adminPageColumn.onCreated(function () {
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

Template.adminPageColumn.onRendered(function () {
  const self = this;
  this.autorun(function () {

  });
});

Template.adminPageColumn.events({

});

Template.adminPageColumn.onDestroyed(function () {

});
