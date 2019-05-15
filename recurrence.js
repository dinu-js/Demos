const startDate = new Date();
const endDate = '2019-05-30T08:53:20.320Z'; //on case
const occurences = 1; //after case
const interval = 1; //every case
const daysOfWeek = ['Monday','Wednesday', 'Friday']; //for weekly and monthly
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
    console.log("dates array",datesArr);
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
                console.log(lastAndFirstDayDiff)
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
                if(compare >=0){
                    break;
                }
                if(datesArr.length === 0){
                    
                }
                else if(datesArr.length === 0){
                    let diff = daysOfWeekArr[i] - daysOfWeekArr[i-1];
                    currentDt = new Date(currentDt.setDate(currentDt.getDate() + diff));
                }
                datesArr.push(new Date(currentDt));
                compare = currentDt - new Date(endDate);
            }
            
        }
        while(compare < 0){
            console.log(lastAndFirstDayDiff)
            for(let i=0; i<daysOfWeekArrLength;i++){
                if(i === 0 && datesArr.length !== 0){
                    currentDt = new Date(currentDt.setDate(currentDt.getDate() + lastAndFirstDayDiff));
                }
                else{
                    let diff = daysOfWeekArr[i] - daysOfWeekArr[i-1];
                    currentDt = new Date(currentDt.setDate(currentDt.getDate() + diff));
                }

                if(compare < 0){
                    compare = currentDt - new Date(endDate);
                    datesArr.push(new Date(currentDt));
                }else{
                    break;
                } 
            }
        }

        
    }
    console.log(datesArr);
}

calculateDatesWeekly(startDate, interval, daysOfWeek, 2, null);

// daysOfWeekArr.forEach((day,index) => {
//     if(datesArr.length === 0){
//         tempArr.push(new Date(currentDt));
//     }else{
//         let diff = daysOfWeekArr[index] - daysOfWeekArr[index-1];
//         tempArr.push(new Date(tempArr[tempArr.length -1] + diff))
//     }
// })

//calculateDatesDaily(startDate, interval, occurences, null);



//console.log("days array : ",convertDaysToNum(daysOfWeek))
