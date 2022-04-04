import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import Swal from 'sweetalert2';
Template.adminPageCategory.onCreated(function () {
  this.state = new ReactiveDict(null, {
    categories: [],
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
      console.log(result);
      self.pagination.set("totalCount",result.options.pagination.totalCount);
      const pages=Math.ceil(result.options.pagination.totalCount/result.options.pagination.pageItems);
      self.pagination.set("totalPages",pages);
      self.state.set("categories", result);
    })

  });
});

Template.adminPageCategory.events({
  'click .btnCategoryAdd': function (event, template) {
    FlowRouter.go("admin.category.add",{});
  },
  "click .btnCategortDelete": function (event, template) {
    event.preventDefault();
    const category = this;
    Swal.fire({
      title: 'Do you want to delete Category?',
      showCancelButton: true,
      confirmButtonText: 'Delete',
    }).then((result) => {
      if (result.isConfirmed) {
        Meteor.call(
          "category.delete",{_id: category._id},function (error, result) {
            if (error) {
              ErrorHandler.show(error.message);
              return;
            }
            Swal.fire('Deleted!', '', 'success');
            AppUtil.refreshTokens.set("category", Random.id());
          }
        );
        
      }
    })
  },
  "click .btnCategortEdit": function (event, template) {
    FlowRouter.go("admin.category.edit", {_id: this._id});
  }
});

Template.adminPageCategory.onDestroyed(function () {
  
});
