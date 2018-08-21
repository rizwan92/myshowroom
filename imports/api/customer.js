import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import moment from 'moment'
import{ JobSheetApi }from './jobsheet'
export  const CustomerApi = new Mongo.Collection('customers');
Meteor.methods({
  'customer.insert'(customer) { 
    const mycustomer = CustomerApi.insert({
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
      status:1,
      createdAt: customer.vehicleDeleiveryDate,
    });
    JobSheetApi.insert({
      showroomId: customer.showroomId,
      oilLabel:false,airFilter: false,taped:false,spark:false,
      corborator: false,clutch:false,breake:false,diveChain:false,
      battery:false,fuel:false, electrical:false,cabel: false,
      nutBolt: false,customerId:mycustomer,jobSheetId:'dummy',
      registrationNumber:'',hasRun:'',mad:false,
      light:false,isbattery:false,toolkit:false,rml:false,
      rmr:false,dent:false,scratch:false,cc:false,
      accessories:false,fuellevel:false,anya:'',serviceNumber:'',
      oil:false,typeofoil:'',
      type:'',status: 1,createdAt: customer.vehicleDeleiveryDate,
    }) 

    return customer
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
        createdAt:customer.vehicleDeleiveryDate,
      },
    });
  },
  
  'customer.remove'(customerId) {
    check(customerId, String);
    CustomerApi.remove(customerId);
  },
  'customer.get'(customerId) {
    return CustomerApi.findOne({_id:customerId});
  },
  
});
if (Meteor.isServer) {
  // CustomerApi._ensureIndex({
  //   'customerName': 'text'
  // });
  Meteor.publish('allcustomer', function userPublication() {
    return CustomerApi.find({},{sort: {createdAt: -1},limit:20})
  });
  Meteor.publish('thisMonthCustomer', function userPublication(showroomId,numberOfDays='january') {
    const monthNumber = moment ().month (numberOfDays).format ('M'); 
    const rangeDate = getMonthDateRange (new Date ().getFullYear ().toString (),monthNumber);
    const from = rangeDate.start;
    const to = rangeDate.end;
    return CustomerApi.find({ showroomId,createdAt: {$gte: from, $lte: to}},{sort: {createdAt: -1}})      
  });
  Meteor.methods({
    'customer.bynames'(showroomId,searchValue) {    
      const customers = CustomerApi.find({ showroomId,customerName:new RegExp(searchValue, 'gi')}).fetch()
      return customers 
    },
    'customer.singleitem'(customerId) {
      const pipeline = [
        { $match : { _id:customerId} },
        {
          $lookup:
              {
                from: 'jobsheets',
                localField: '_id',
                foreignField: 'customerId',
                as: 'jobsheets',
              },      
        },
        
      ]; 
      const customers = CustomerApi.aggregate(pipeline).toArray()
      return customers 
    }

  })
  // Meteor.methods({
  //   'customer.bynames'(showroomId,searchValue) {    
  //     const pipeline = [
  //       { $match : { showroomId,customerName:new RegExp(searchValue, 'gi') } },
  //       {
  //         $lookup:
  //             {
  //               from: 'jobsheets',
  //               localField: '_id',
  //               foreignField: 'customerId',
  //               as: 'jobsheets',
  //             },      
  //       },
        
  //     ]; 
  //     const customers = CustomerApi.aggregate(pipeline).toArray()
  //     return customers 
  //   },
  // })
}


function getMonthDateRange (year, month) {
  var startDate = moment ([year, month - 1]);
  var endDate = moment (startDate).endOf ('month');
  return {start: startDate.toDate (), end: endDate.toDate ()};
}