Template.adminPageDashboard.onCreated(function () {
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

Template.adminPageDashboard.onRendered(function () {
  const self = this;
  this.autorun(function () {

  });
});

Template.adminPageDashboard.events({

});

Template.adminPageDashboard.onDestroyed(function () {

});
