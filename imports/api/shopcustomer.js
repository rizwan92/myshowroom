import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import moment from 'moment'
export  const ShopCustomerApi = new Mongo.Collection('shopcustomers');
Meteor.methods({
  'shopcustomer.insert'(shopcustomer) {
    const myshopcustomer = ShopCustomerApi.insert({
      shopId:shopcustomer.shopId,
      customerName:shopcustomer.customerName,
      customerNumber:shopcustomer.customerNumber,
      status:1,
      createdAt: shopcustomer.vehicleDeleiveryDate,
    });
    return myshopcustomer
  },
  'shopcustomer.updatedynamic'(userid,field,value) {
    return ShopCustomerApi.update(userid,{ $set: { [field]: value } });
  },
  'shopcustomer.update'(shopcustomerId,shopcustomer) {
    ShopCustomerApi.update({_id:shopcustomerId}, {
      $set: {
        shopcustomerName:shopcustomer.shopcustomerName,
        shopcustomerNumber:shopcustomer.shopcustomerNumber,
        shopcustomerEmail:shopcustomer.shopcustomerEmail,
        shopcustomerAddress:shopcustomer.shopcustomerAddress,
        hpd:shopcustomer.hpd,
        vehicleModel:shopcustomer.vehicleModel,
        vehicleColor:shopcustomer.vehicleColor,
        vehicleKeyNumber:shopcustomer.vehicleKeyNumber,
        vehicleEngineNumber:shopcustomer.vehicleEngineNumber,
        vehicleChassisNumber:shopcustomer.vehicleChassisNumber,
        vehicleSoldDealer:shopcustomer.vehicleSoldDealer,
        createdAt:shopcustomer.vehicleDeleiveryDate,
      },
    });
  },

  'shopcustomer.remove'(shopcustomerId) {
    check(shopcustomerId, String);
    ShopCustomerApi.remove(shopcustomerId);
  },
  'shopcustomer.get'(shopcustomerId) {
    return ShopCustomerApi.findOne({_id:shopcustomerId});
  },

});
if (Meteor.isServer) {
  // ShopCustomerApi._ensureIndex({
  //   'shopcustomerName': 'text'
  // });
  Meteor.publish('allshopcustomer', function userPublication(shopId='') {
    return ShopCustomerApi.find({shopId},{sort: {createdAt: -1},limit:20})
  });
  Meteor.publish('thisMonthShopCustomer', function userPublication(shopId,numberOfDays='august') {
    const monthNumber = moment ().month (numberOfDays).format ('M');
    const rangeDate = getMonthDateRange (new Date ().getFullYear ().toString (),monthNumber);
    const from = rangeDate.start;
    const to = rangeDate.end;
    return ShopCustomerApi.find({ shopId,createdAt: {$gte: from, $lte: to}},{sort: {createdAt: -1}})
  });
  Meteor.methods({
    'shopcustomer.bynames'(showroomId,searchValue) {
      const shopcustomers = ShopCustomerApi.find({ showroomId,shopcustomerName:new RegExp(searchValue, 'gi')}).fetch()
      return shopcustomers
    },
    'shopcustomer.singleitem'(shopcustomerId) {
      const pipeline = [
        { $match : { _id:shopcustomerId} },
        {
          $lookup:
              {
                from: 'jobsheets',
                localField: '_id',
                foreignField: 'shopcustomerId',
                as: 'jobsheets',
              },
        },

      ];
      const shopcustomers = ShopCustomerApi.aggregate(pipeline).toArray()
      return shopcustomers
    }

  })
  // Meteor.methods({
  //   'shopcustomer.bynames'(showroomId,searchValue) {
  //     const pipeline = [
  //       { $match : { showroomId,shopcustomerName:new RegExp(searchValue, 'gi') } },
  //       {
  //         $lookup:
  //             {
  //               from: 'jobsheets',
  //               localField: '_id',
  //               foreignField: 'shopcustomerId',
  //               as: 'jobsheets',
  //             },
  //       },

  //     ];
  //     const shopcustomers = ShopCustomerApi.aggregate(pipeline).toArray()
  //     return shopcustomers
  //   },
  // })
}


function getMonthDateRange (year, month) {
  var startDate = moment ([year, month - 1]);
  var endDate = moment (startDate).endOf ('month');
  return {start: startDate.toDate (), end: endDate.toDate ()};
}
