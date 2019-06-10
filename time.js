const tc = require('time-slots-generator');

/**
 * calculateAvailableSlotsRes - to calculate slots in final res
 * @param {Object} timeInterval  - interval of time to calculate
 * @param {Object} obj  - containing occupied slots
 * @param {Object} zeroFlag  - for zero time
 */
function calculateAvailableSlotsRes(timeInterval, obj, zeroFlag) {
    let availableTimeSlots = tc.getTimeSlots(obj, true, 'tenth', false, true);
    if (zeroFlag) {
        availableTimeSlots['0'] = '0:00';
    }
    availableTimeSlots = calculateSlots(availableTimeSlots, timeInterval);

    return availableTimeSlots;
}
/**
 * getTime - to calculate time HH:mm format
 * @param {Object} obj  - Obj
 */
function getTime(num) {
    const tempHour = String(Math.trunc(num / 60));
    const hour = tempHour + ''.length === 1 ? '0' + tempHour : tempHour;
    const min = num % 60 === 0 ? '00' : num % 60;
    return hour + ':' + min;
}

const switchcase = cases => defaultCase => key =>
  cases.hasOwnProperty(key) ? cases[key] : defaultCase

  const executeIfFunction = f =>
  f instanceof Function ? f() : f

const switchcaseF = cases => defaultCase => key =>
  executeIfFunction(switchcase(cases)(defaultCase)(key))

/**
 * halfHourlyCal - to calculate slots in half hour
 * @param {Object} obj  - Obj
 */
function calculateSlots(obj, timeInterval) {
    const resArr = [];
    const timeCase = switchcase({
        'half' : 1/2,
        'one' : 1,
        'two' : 2,
        'three' : 3,
        'four' : 4,
        'five' : 5,
        'six' : 6,
        'seven' : 7,
        'eight' : 8,
        'nine' : 9,
        'ten' : 10,
        'eleven' : 11,
        'tweleve' : 12,
        'thirteen' : 13,
        'fourteen' : 14,
        'fifteen' : 15,
        'sixteen' : 16,
        'seventeen' : 17,
        'eighteen' : 18,
        'nineteen' : 19,
        'twenty' : 20,
        'twentyone' : 21,
        'twentytwo' : 22,
        'twentythree' : 23,
        'twentyfour' : 24
    })(1/2)(timeInterval);

    let i = 0;
    const slotTime = 60*timeCase;
    const addSlotTime = (slotTime > 30)? 60 : 30;
    while (i < 1440) {
        const slot = [getTime(i), getTime(i + slotTime)];
        let availSlot = true;
        let counter = timeCase * 2;
        let j = i;
        while(counter !== 0){
            if (obj[j] && obj[j+10] && obj[j+20]) {
                j = j + 30;
                counter = counter-1;
            }else{
                availSlot = false;
                //i = startSlot+slotTime;
                break;
            }
        }
        if(availSlot){
            resArr.push(slot);
        }
        i = i + addSlotTime;
    }
    return resArr;
}

var time = [
    ["0:25","0:30"],
    // ["1:20","01:35"],
    // ["23:30","24:00"]
]
var zeroFlag = true;

var timemap = [];
time.map(value => {
    
 timemap.push([value[0].split(":")[0] * 60 + parseInt(value[0].split(":")[1]),value[1].split(":")[0] * 60 + parseInt(value[1].split(":")[1])]);
 if((value[0].split(":")[0] * 60 + parseInt(value[0].split(":")[1]) < 30)){
     //console.log("false" + value[0].split(":")[0] * 60 + parseInt(value[0].split(":")[1]));
     zeroFlag = false;
 }
})
console.log(calculateAvailableSlotsRes('half', timemap, zeroFlag));
