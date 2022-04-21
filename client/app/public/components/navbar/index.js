import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import Swal from 'sweetalert2';

Template.publicComponentsNavbar.onCreated(function(){
  this.state = new ReactiveDict(null, {
    categories: [],
  });
  this.pagination = new ReactiveDict(null, {
    currentPage: 1,
    pageItems: 8,
    totalCount: 0,
    totalPages: 0
  });

  this.sorting = new ReactiveDict(null, {
    sortField: 'createdAt',
    sortOrder: 'desc'
  });

  this.filtering = new ReactiveDict(null, {});
});

Template.publicComponentsNavbar.onRendered(function(){
  const self = this;
  this.autorun(function () {
    AppUtil.refreshTokens.get("category");
    const listOptions = {
      options: {
        pagination: {
          currentPage: self.pagination.get("currentPage"),
          pageItems: self.pagination.get("pageItems"),
        },
        filtering: {},
        sorting: {
          sortField: self.sorting.get("sortField"),
          sortOrder: self.sorting.get("sortOrder"),
        }
      }
    };

    Meteor.call("category.list", listOptions, function (error, result) {
      if (error) {
        ErrorHandler.show(error.message);
        return;
      }
      //console.log(result);
      self.pagination.set("totalCount", result.options.pagination.totalCount);
      const pages = Math.ceil(result.options.pagination.totalCount / result.options.pagination.pageItems);
      self.pagination.set("totalPages", pages);
      self.state.set("categories", result.categories);
    })
  });
});

Template.publicComponentsNavbar.events({
  "click .brdNavbarLogout": function (event, template) {
    event.preventDefault();
    Meteor.logout(function () {
      Swal.fire({
        position: 'top-end',
        icon: 'info',
        title: 'Goodbye!',
        showConfirmButton: false,
        timer: 1500
      })
      FlowRouter.go("public.home");
    });
  },
});