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
