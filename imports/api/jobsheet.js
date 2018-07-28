import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import moment from 'moment'
import { CounterApi } from './counter';
import  {ReactiveAggregate}  from 'meteor/jcbernack:reactive-aggregate';
export  const JobSheetApi = new Mongo.Collection('jobsheets');

Meteor.methods({
  'jobsheet.insert'(showroomId,jobSheet) {  
    let count = CounterApi.findOne({showroomId})  
    if (count !== undefined) {
      if (jobSheet.jobSheetId === count.year+'-'+count.counter ) {
        CounterApi.update({showroomId}, {$inc: {counter: 1}});
        return  JobSheetApi.insert({
          showroomId:showroomId,
          oilLabel:jobSheet.oilLabel,
          airFilter:jobSheet.airFilter,
          taped:jobSheet.taped,
          spark:jobSheet.spark,
          corborator:jobSheet.corborator,
          clutch:jobSheet.clutch,
          breake:jobSheet.breake,
          diveChain:jobSheet.diveChain,
          battery:jobSheet.battery,
          fuel:jobSheet.fuel,
          electrical:jobSheet.electrical,
          cabel:jobSheet.cabel,
          nutBolt:jobSheet.nutBolt,
          customerId:jobSheet.customerId,
          jobSheetId:jobSheet.jobSheetId,
          type:jobSheet.type,
          status:1,
          createdAt: new Date(),
        })  
      }else {
        throw new Meteor.Error(500,'this jobsheet ID already exist');  
      }
    }
  },
  'jobsheet.update'(jobid,track) {
    return JobSheetApi.update({_id:jobid}, {
      $set: { 
        track
      },
    });
  },
  'jobsheet.complete'(jobid,track) {
    return JobSheetApi.update({_id:jobid}, {
      $set: { 
        track,
        status:0
      },
    });
  },
  'jobsheet.remove'(id) {
    JobSheetApi.remove(id);
  },
  // 'jobsheet.get'() {  
  //   let jobsheet = JobSheetApi.aggregate([
  //     {
  //       $lookup:
  //         {
  //           from: 'customers',
  //           localField: 'customerId',
  //           foreignField: '_id',
  //           as: 'customers'
  //         }
  //     }
  //   ]);    
  //   return jobsheet
  // },
});
if (Meteor.isServer) {
  JobSheetApi._ensureIndex({
    'showroomId': 1,
    'createdAt':1
  });
  Meteor.publish('alljobsheet', function userPublication() {
    return JobSheetApi.find({}  )
  });
  Meteor.publish('thisMonthJobSheet', function userPublication(showroomId) {
    var startOfMonth = moment().startOf ('month').toDate ();    
    const pipeline = [
      { $match : { showroomId : showroomId,createdAt:{$gte: startOfMonth } } },
      { $sort : { createdAt : -1 } },
      {
        $lookup:
            {
              from: 'customers',
              localField: 'customerId',
              foreignField: '_id',
              as: 'customer'
            }
      },
      { $unwind: '$customer' },
    ];
    let something =  ReactiveAggregate(this, JobSheetApi, pipeline,{})
    return something  
    
  });
  Meteor.publish('thisMonthTrackJobSheet', function userPublication(showroomId,numberOfDays=45) {
    let daysbefor = moment().subtract(parseInt(numberOfDays), 'days');
    daysbefor.set({hour:0,minute:0,second:0,millisecond:0})    
    const pipeline = [
      { $match : { showroomId,createdAt:{$gte:new Date(daysbefor) },status:1 } },
      { $sort : { createdAt : -1 } },
      {
        $lookup:
            {
              from: 'customers',
              localField: 'customerId',
              foreignField: '_id',
              as: 'customer'
            }
      },
      { $unwind: '$customer' },
    ];
    let something =  ReactiveAggregate(this, JobSheetApi, pipeline,{})
    return something  
    
  });
}
