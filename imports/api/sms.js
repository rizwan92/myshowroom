import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import moment from 'moment';

export  const SMSApi = new Mongo.Collection('sms');

Meteor.methods({
  'sms.insert'(showroomId,sms) {
    SMSApi.insert({
      showroomId,
      statusCode:sms.statusCode,
      message:sms.message,
      type:sms.type,
      status: 1,
      createdAt: new Date (),
    });
  },
  
});
if (Meteor.isServer) {
  SMSApi._ensureIndex({
    'showroomId': 1,
  });
  Meteor.publish('allsms', function() {    
    return SMSApi.find({});
  });
  Meteor.publish('smsByShowroomId', function(showroomId) {
    var startOfMonth = moment ().startOf ('month').toDate ();
    var endOfMonth = moment ().endOf ('month').toDate ();
    return SMSApi.find({showroomId,createdAt: {$gte: startOfMonth,$lte:endOfMonth}});
  });
}
