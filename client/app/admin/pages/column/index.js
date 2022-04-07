import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import Swal from 'sweetalert2';
Template.adminPageColumn.onCreated(function () {
  this.state = new ReactiveDict(null, {
    columns:[],
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
    AppUtil.refreshTokens.get("column");
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
    
    Meteor.call("column.list", listOptions, function (error, result) {
      if (error) {
        ErrorHandler.show(error.message);
        return;
      }
      console.log(result);
      self.pagination.set("totalCount",result.options.pagination.totalCount);
      const pages=Math.ceil(result.options.pagination.totalCount/result.options.pagination.pageItems);
      self.pagination.set("totalPages",pages);
      self.state.set("columns", result);
    })

  });
});

Template.adminPageColumn.events({
  'click .btnColumnAdd': function (event, template) {
    FlowRouter.go("admin.column.add",{});
  },
  "click .btnColumnEdit": function (event, template) {
    FlowRouter.go("admin.column.edit", {_id: this._id});
  },
  "click .btnColumnDelete": function (event, template) {
    event.preventDefault();
    const column = this;
    Swal.fire({
      title: 'Do you want to delete Column?',
      showCancelButton: true,
      confirmButtonText: 'Delete',
    }).then((result) => {
      if (result.isConfirmed) {
        Meteor.call(
          "column.delete",{_id: column._id},function (error, result) {
            if (error) {
              ErrorHandler.show(error.message);
              return;
            }
            Swal.fire('Deleted!', '', 'success');
            AppUtil.refreshTokens.set("column", Random.id());
          }
        );
        
      }
    })
  },
});

Template.adminPageColumn.onDestroyed(function () {

});
