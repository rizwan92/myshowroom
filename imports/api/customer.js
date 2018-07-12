import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import moment from 'moment'
import { CounterApi } from './counter';
export  const CustomerApi = new Mongo.Collection('customers');

Meteor.methods({
  'customer.insert'(customer) {    
    return  CustomerApi.insert({
      showroomId:customer.showroomId,
      customerName:customer.customerName,
      customerNumber:customer.customerNumber,
      customerEmail:customer.customerEmail,
      customerAddress:customer.customerAddress,
      hpd:customer.hpd,
      vehicleModel:customer.vehicleModel,
      vehicleColor:customer.vehicleColor,
      vehicleKeyNumber:customer.vehicleKeyNumber,
      vehicleEngineNumber:customer.vehicleEngineNumber,
      vehicleChassisNumber:customer.vehicleChassisNumber,
      vehicleSoldDealer:customer.vehicleSoldDealer,
      jobSheet:[],
      status:1,
      createdAt: new Date(),
    });
  },
  'customer.updatedynamic'(userid,field,value) {
    return CustomerApi.update(userid,{ $set: { [field]: value } });
  },
  'customer.update'(customerId,customer) {
    CustomerApi.update({_id:customerId}, {
      $set: { 
        customerName:customer.customerName,
        customerNumber:customer.customerNumber,
        customerEmail:customer.customerEmail,
        customerAddress:customer.customerAddress,
        hpd:customer.hpd,
        vehicleModel:customer.vehicleModel,
        vehicleColor:customer.vehicleColor,
        vehicleKeyNumber:customer.vehicleKeyNumber,
        vehicleEngineNumber:customer.vehicleEngineNumber,
        vehicleChassisNumber:customer.vehicleChassisNumber,
        vehicleSoldDealer:customer.vehicleSoldDealer,
      },
    });
  },
  'customer.bynames'(showroomId,searchValue) {    
    // const customers = CustomerApi.find({$or:[{customerName:new RegExp(searchValue, 'gi')},{showroomId}]}).fetch()    
    const customers = CustomerApi.find({customerName:new RegExp(searchValue, 'gi'),showroomId}).fetch()    
    // var phrase = '"' + searchValue + '"';
    // const customers = CustomerApi.find({ $text: { $search: phrase }},{ fields: { _id: 1 } } ).fetch()    
    return customers 
  },
  'customer.createJobSheet'(showroomId,customerId,jobSheetId,jobSheet) {  
    let count = CounterApi.findOne({showroomId})  
    if (parseInt(jobSheetId) === parseInt(count.counter) ) {
      CounterApi.update({showroomId}, {$inc: {counter: 1}});
      return  CustomerApi.update(customerId,{
        $push: {jobSheet: jobSheet},
      })  
    }else {
      throw new Meteor.Error(500,'this jobsheet ID already exist');  
    }
  },
  'customer.remove'(customerId) {
    check(customerId, String);
    CustomerApi.remove(customerId);
  },
  'customer.singleitem'(customerId) {
    let Customer = CustomerApi.findOne({_id:customerId});
    return Customer;
  }
});
if (Meteor.isServer) {
  CustomerApi._ensureIndex({
    'customerName': 'text'
  });
  Meteor.publish('allcustomer', function userPublication() {
    return CustomerApi.find({},{sort: {createdAt: -1},limit:20})
  });
  Meteor.publish('thisMonthCustomer', function userPublication() {
    var startOfMonth = moment().startOf ('month').toDate ();
    return CustomerApi.find({ createdAt: {$gte: startOfMonth}},{fields:{jobSheet:0},sort: {createdAt: -1}})      
  });
  Meteor.publish('thisMonthJobSheet', function userPublication() {
    var startOfMonth = moment().startOf ('month').toDate ();
    return CustomerApi.find({jobSheet:{$elemMatch:{ createdAt: {$gte: startOfMonth}}}},{fields:{jobSheet:1},sort: {createdAt: -1}})      
  });
}
