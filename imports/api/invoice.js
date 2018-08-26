import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import moment from 'moment';

export  const InvoiceApi = new Mongo.Collection('invoice');

Meteor.methods({
  'invoice.insert'(shopId,invoice) {
    InvoiceApi.insert({
      shopId,
      customerDetail:invoice.customerDetail,
      products:invoice.products,
      message:invoice.message,
      type:invoice.type,
      status: 1,
      createdAt: new Date (),
    });
  },
  
});
if (Meteor.isServer) {
  InvoiceApi._ensureIndex({
    'shopId': 1,
  });
  Meteor.publish('allinvoice', function() {    
    return InvoiceApi.find({});
  });
  Meteor.publish('invoiceByshopId', function(shopId) {
    var startOfMonth = moment ().startOf ('month').toDate ();
    var endOfMonth = moment ().endOf ('month').toDate ();
    return InvoiceApi.find({shopId,createdAt: {$gte: startOfMonth,$lte:endOfMonth}});
  });
}
