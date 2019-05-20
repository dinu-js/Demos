let moment =require('moment');
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
function calculateDatesWeekly(startDt, interval, daysOfWeek, occurences, endDate){
    let currentDt = moment(startDate).utcOffset('+05:30').format();
    let endDt = moment(endDate).utcOffset('+05:30').format();
    let datesArr = [];
    let weekdays= convertDaysToNum(daysOfWeek);
    let time = moment(currentDt).format('HH:mm:ss');
    let diff;
    let lastAndFirstDayDiff = (7 - weekdays[weekdays.length -1]) + weekdays[0] + (7*(interval-1));
    while(moment(currentDt).isSameOrBefore(endDt)){
        let index;
        if(moment(currentDt).day() !== weekdays[0]){
            index = weekdays.indexOf(moment(currentDt).day());
        }else{
            index = 0
        }
        
        for(let i=index; i<weekdays.length;i++){
            if(moment(currentDt).day() !== 0 && moment(currentDt).day() === weekdays[i]){
                currentDt = moment(currentDt).format('YYYY-MM-DD');
                datesArr.push(moment(currentDt+'T'+time+'+05:30').utc().format());
            }
            else if(moment(currentDt).day() === 0 && weekdays[i] === 7){
                currentDt = moment(currentDt).format('YYYY-MM-DD');
                datesArr.push(moment(currentDt+'T'+time+'+05:30').utc().format());
            }
            if(i === weekdays.length - 1){
                diff = lastAndFirstDayDiff;
            }else{
                diff = weekdays[i+1] - weekdays[i];
            }
            currentDt = moment(currentDt).add(diff,'d').format();
            if(!moment(currentDt).isSameOrBefore(endDt)){
                break;
            }
            
        }
    }
        
    console.log(datesArr);
}

const startDate = '2019-05-15T18:30:00.000Z';
const endDate = '2019-06-28T18:30:00.000Z'; //on case
let timeZone = '+05:30';
const occurences = 1; //after case
const interval = 1; //every case
const daysOfWeek = ['Tuesday', 'Thursday', 'Sunday']; //for weekly and monthly
let index = 'first';
calculateDatesWeekly(startDate, interval, daysOfWeek,null, endDate);
