const startDate = new Date();
const endDate = '2025-05-31T24:00:00.000Z'; //on case
const occurences = 1; //after case
const interval = 1; //every case
const daysOfWeek = ['Wednesday', 'Friday']; //for weekly and monthly
function convertDaysToNum(dates){
    return dates.map(day => {
        let dayNum;
        switch (day){
            case 'Monday':
            dayNum = 1;
            break;
            case 'Tuesday':
            dayNum = 2;
            break;
            case 'Wednesday':
            dayNum = 3;
            break;
            case 'Thursday':
            dayNum = 4;
            break;
            case 'Friday':
            dayNum = 5;
            break;
            case 'Saturday':
            dayNum = 6;
            break;
            case 'Sunday':
            dayNum = 7;
            break;
            default :
            dayNum = 0;
        }
        return dayNum;
    })
}

function calculateDatesDaily(startDate, interval, occurences, endDate){
    let currentDt = new Date(startDate);
    let datesArr = [];
    if(occurences){
        while(occurences !== 0){
            datesArr.push(new Date(currentDt));
            currentDt = new Date(currentDt.setDate(currentDt.getDate() + interval));
            occurences --;
        }
    }else{
        let compare = currentDt - new Date(endDate);
        while(compare < 0){
            datesArr.push(new Date(currentDt));
            currentDt = new Date(currentDt.setDate(currentDt.getDate() + interval));
            compare = currentDt - new Date(endDate);
        }
    }
    //console.log("dates array",datesArr);
}

function calculateDatesWeekly(startDate, interval, daysOfWeek, occurences, endDate){
    let currentDt = new Date(startDate);
    let daysOfWeekArr = convertDaysToNum(daysOfWeek);
    let daysOfWeekArrLength = daysOfWeekArr.length;
    let datesArr = [];
    let lastAndFirstDayDiff = (7 - daysOfWeekArr[daysOfWeekArrLength -1]) + daysOfWeekArr[0] + (7*(interval-1));

    if(occurences){
        if(currentDt.getDay() !== daysOfWeekArr[0]){
            for(let i=daysOfWeekArr.indexOf(currentDt.getDay()); i<daysOfWeekArrLength;i++){
                if(datesArr.length === 0){
                    datesArr.push(new Date(currentDt));
                }
                else{
                    let diff = daysOfWeekArr[i] - daysOfWeekArr[i-1];
                    currentDt = new Date(currentDt.setDate(currentDt.getDate() + diff));
                    datesArr.push(new Date(currentDt));
                }
            }
            occurences --;
        }
            while(occurences !== 0){
                for(let i=0; i<daysOfWeekArrLength;i++){
                    if(datesArr.length === 0){
                        datesArr.push(new Date(currentDt));
                    }else if(i === 0){
                        currentDt = new Date(currentDt.setDate(currentDt.getDate() + lastAndFirstDayDiff));
                        datesArr.push(new Date(currentDt));
                    }
                    else{
                        let diff = daysOfWeekArr[i] - daysOfWeekArr[i-1];
                        currentDt = new Date(currentDt.setDate(currentDt.getDate() + diff));
                        datesArr.push(new Date(currentDt));
                    }
                }
                occurences --;
            }
    }
    else{
        let compare = currentDt - new Date(endDate);
        if(currentDt.getDay() !== daysOfWeekArr[0]){
            for(let i=daysOfWeekArr.indexOf(currentDt.getDay()); i<daysOfWeekArrLength;i++){
                if(datesArr.length !== 0){
                    let diff = daysOfWeekArr[i] - daysOfWeekArr[i-1];
                    currentDt = new Date(currentDt.setDate(currentDt.getDate() + diff));
                    compare = currentDt - new Date(endDate);
                }
                if(compare < 0){
                    datesArr.push(new Date(currentDt));
                }else{
                    break;
                }
            }
            
        }
        while(compare < 0){
            for(let i=0; i<daysOfWeekArrLength;i++){
                if(i === 0 && datesArr.length !==0 ){
                    currentDt = new Date(currentDt.setDate(currentDt.getDate() + lastAndFirstDayDiff));
                    compare = currentDt - new Date(endDate);
                }
                else if(datesArr.length !== 0){
                    let diff = daysOfWeekArr[i] - daysOfWeekArr[i-1];
                    currentDt = new Date(currentDt.setDate(currentDt.getDate() + diff));
                    compare = currentDt - new Date(endDate);
                }
                if(compare < 0){
                    datesArr.push(new Date(currentDt));
                }else{
                    break;
                }
            }
        }

        
    }
    console.log(datesArr);
}

function calculateDatesMonthly(startDate, interval, daysOfWeek, occurences, endDate){

}

let starTim = new Date().getTime();
for(let i=0;i<100;i++){
    calculateDatesDaily(startDate, interval, null, endDate);
}
let endTim = new Date().getTime();
console.log('time taken ',endTim - starTim)

/////////////////////////////////////////////////////
// /**
//  * Copyright (c) 2020 - TrueNorthCorp
//  *
//  * @summary fetching noEnd recurrence meetings
//  * @author Dinesh Rawat
//  *
//  * Created at     : 2019-05-16 02:21:56
//  * Last modified  : 2019-05-16 02:21:56
//  */
// import Models from '../models';
// import {
//     Logger
// } from 'tn-common';
// import moment from 'moment';

// /**
//  * getDates - to get dates in a range
//  * @param {string} start  - startDt
//  * @param {string} end  - endDt
//  */
// function getDates(startDate, stopDttm) {
//     let dateArray = [];
//     let currentDate = moment(startDate);
//     let stopDate = moment(stopDttm);
//     while (currentDate <= stopDate) {
//         dateArray.push(moment(currentDate).format('YYYY-MM-DD') + '');
//         currentDate = moment(currentDate).add(1, 'days');
//     }
//     return dateArray;
// }

// let meetingMapper = function(meeting, expectedDates){
//     let meetingRes = [];
//     let meetingData = meeting.meetingData;
//     let startDttm = meetingData.meeting_start_time.split('T');
//     let endDttm = meetingData.meeting_end_time.split('T');
//     let diff = new Date(startDttm[0]) - new Date(endDttm[0]);

//     expectedDates.forEach(date => {
//         let startD = moment(date).utc().format('YYYY-MM-DD').toString();
//         let meetingObj = JSON.parse(JSON.stringify(meeting));
//         meetingObj.meetingData.meeting_start_time = startD+'T'+startDttm[1];
//         meetingObj.meetingData.meeting_end_time = moment(startD, 'YYYY-MM-DD').add(diff, 'days').format('YYYY-MM-DD')+'T'+endDttm[1];
//         meetingObj.meetingData.date_time = startD+startDttm[1];
//         meetingRes.push(meetingObj);
//     });
//     return meetingRes;
// }

// function calculateDatesDaily(startDate, interval, requestedDates){
//     let endDate = requestedDates[requestedDates.length - 1]+'T24:00:00.000Z';
//     let currentDt = new Date(startDate);
//     let datesArr = [];
//     let compare = currentDt - new Date(endDate);
//     while(compare < 0){
//         datesArr.push(new Date(currentDt));
//         currentDt = new Date(currentDt.setDate(currentDt.getDate() + interval));
//         compare = currentDt - new Date(endDate);
//     }
//     let finaldates = [];
//     requestedDates.forEach(date => {
//         let expectedDate = datesArr.find(obj => {
//             if(obj.toString() === new Date(date).toString()){
//                 return obj;
//             }
//         });
//         if(expectedDate){
//             finaldates.push(expectedDate);
//         }
//     });
//     return finaldates;
// }

// let meetingPatternParser = function(meetings, params){
//     let finalResponse = [];
//     if(meetings){
//         meetings.forEach(obj => {
//             let meetingData = obj.meetingData;
//             if(meetingData.recurrence.pattern.type === 'daily'){
//                 let startDate = meetingData.meeting_start_time.split('T')[0]+'T00:00:00.000Z';
//                 let requestEndDate = params.endDate.split('T')[0];
//                 let requestStartDate = params.startDate.split('T')[0];
//                 let requestedDates = getDates(requestStartDate, requestEndDate);
//                 let interval = meetingData.recurrence.pattern.interval;
//                 let expectedDates = calculateDatesDaily(startDate, interval, requestedDates);
//                 if(expectedDates.length > 0){
//                     finalResponse = finalResponse.concat(meetingMapper(obj, expectedDates));
//                 }
//             }
//         });
//     }
//     return finalResponse;
// }
// module.exports = {
//     fetchNoEndMeetings(params){
//         return Models.Meeting
//             .findAll({
//                 attributes: ['meetingId', 'organizerProfileId', 'projectId', 'locationId', 'taskId',
//                 'bridgeId', 'agendaNotesId', 'meetingData'],
//                 include: [{
//                     model: Models.MeetingAttendee,
//                     attributes: ['meetingId', 'userProfileId'],
//                     where: {
//                         userProfileId: params.profile_id
//                     },
//                     required:true
//                 }],
//                 where: {
//                     meetingData: {
//                         recurrenceType:{
//                             $iLike : 'noEnd'
//                         }
//                     },
//                     $and: [{
//                         meetingData: {
//                             meeting_status: {
//                                 $notIn: ['Cancelled', 'Completed']
//                             }
//                         }
//                     }]
//                 },
//                 raw:true
//             })
//             .then(res => {
//                 let noEndMeetings = meetingPatternParser(res, params);
//                 return noEndMeetings;
//             })
//             .catch(err => {
//                 Logger.err('fetchNoEndMeetings :: Error fetching noEnd recurrence meetings', err);
//                 throw err;
//             });
//     }
// }

