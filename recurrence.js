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

function convertIndexToNum(index){
    let indexNum;
    switch(index){
        case 'first':
        indexNum= 1;
        break;

        case 'second':
        indexNum= 2;
        break;

        case 'third':
        indexNum= 3;
        break;

        case 'fourth':
        indexNum= 4;
        break;

        case 'last':
        indexNum = 5;
    }

    return indexNum;
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
    console.log("dates array",datesArr);
}

function calculateDatesWeekly2(startDate, interval, daysOfWeek, occurences, endDate){
    let currentDt = new Date(startDate);
    console.log(currentDt)
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

function calculateDatesMonthly(startDate, interval, daysOfWeek, index, dayOfMonth, endDate){
    let currentDt = moment(startDate).utcOffset('+05:30').format();
    console.log('endDt');
    let endDt = moment(endDate).utcOffset('+05:30').format();
    console.log(endDt)
    let datesArr = [];
    let time = moment(currentDt).format('HH:mm:ss');

    if(dayOfMonth){
        while(moment(currentDt).isSameOrBefore(endDt)){
           
            if(moment(currentDt).set('date', dayOfMonth).month() === moment(currentDt).month()){
                currentDt = moment(currentDt).set('date', dayOfMonth).format('YYYY-MM-DD');
            }else{
                currentDt = moment(currentDt).endOf('month').format('YYYY-MM-DD');
            }
            datesArr.push(moment(currentDt+'T'+time+'+05:30').utc().format());
            currentDt = moment(currentDt).add(interval, 'months').format();
        }
    }else if(daysOfWeek && index){
        let indexNum = convertIndexToNum(index);
        let dayOfWeek = convertDaysToNum([daysOfWeek[0]]);
        if(index === 'last'){
            while(moment(currentDt).isSameOrBefore(endDt)){
            let endOfMonth = moment(currentDt).endOf('month').startOf('day');
            let day = endOfMonth.day();
            switch(day){
                case 0:
                currentDt = moment(endOfMonth).subtract(7-dayOfWeek, 'days');
                break;

                default:
                currentDt = moment(endOfMonth).subtract(day-dayOfWeek, 'days');
                break;
            }
            if(currentDt.month() !== endOfMonth.month()){
                currentDt = currentDt.subtract(1,'w');
            }
            currentDt = moment(currentDt).format('YYYY-MM-DD');
            datesArr.push(moment(currentDt+'T'+time+'+05:30').utc().format());
            currentDt = moment(currentDt).add(interval, 'months').format();
            }
        }else{
            let i=0;
            console.log(endDt)
            while(moment(currentDt).isSameOrBefore(endDt)){
                        let startOfMonth = moment(currentDt).utc().startOf('month').startOf('isoWeek').add(dayOfWeek - 1,'d');
                        currentDt = moment(currentDt).utc().startOf('month').startOf('isoWeek').add(indexNum,'w').add(dayOfWeek - 1,'d');
                        console.log(moment(currentDt).utc().day())
                        if(moment(currentDt).utc().day() === dayOfWeek[0] || 
                        moment(currentDt).utc().day() === 0){
                            console.log("here")
                            currentDt = moment(currentDt).format('YYYY-MM-DD');
                            datesArr.push(moment(currentDt+'T'+time+'+05:30').utc().format());
                            currentDt = moment(currentDt).add(1, 'months').format();
                        }
                        else{
                        if(startOfMonth.month() === currentDt.month()){
                            currentDt = currentDt.subtract(indexNum, 'w');
                        }
                        currentDt = moment(currentDt).format('YYYY-MM-DD');
                        datesArr.push(moment(currentDt+'T'+time+'+05:30').utc().format());
                        currentDt = moment(currentDt).add(1, 'months').format();
                }
                //break;
        }
        }
        
    }
    console.log(datesArr);
    //console.log(moment(datesArr[0]).utc().format('YYYY-MM-DD').toString())
}

const startDate = '2019-01-04T17:00:00.000Z';
const endDate = '2019-02-06T18:30:00.000Z'; //on case
let timeZone = '+05:30';
const occurences = 1; //after case
const interval = 1; //every case
const daysOfWeek = ['Monday']; //for weekly and monthly
let index = 'first';
//calculateDatesWeekly(startDate, interval, daysOfWeek,null, endDate);
calculateDatesMonthly(startDate, interval, daysOfWeek, index, null, endDate);



function calculateDatesWeekly(startDt, interval, daysOfWeek, occurences, endDt){
    let startDate = moment(startDt).utcOffset('+05:30').format();
    console.log(startDate)
    let currentDt = new Date(startDt);
    //console.log(currentDt)
    let endDate = endDt;
    let daysOfWeekArr = convertDaysToNum(daysOfWeek);
    let daysOfWeekArrLength = daysOfWeekArr.length;
    let datesArr = [];
    let lastAndFirstDayDiff = (7 - daysOfWeekArr[daysOfWeekArrLength -1]) + daysOfWeekArr[0] + (7*(interval-1));
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
    console.log(datesArr);
}

