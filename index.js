// Your code here
function createEmployeeRecord(arr){
    return {
    firstName:arr[0],
familyName:arr[1],
title:arr[2],
payPerHour:arr[3],
timeInEvents:[],
timeOutEvents:[],
           }
}

function createEmployeeRecords(Array){
    return Array.map((nestedArr) => (createEmployeeRecord(nestedArr)))

}

function createTimeInEvent(obj,dateStamp){
    const [date,hour] =dateStamp.split(' ')
    obj.timeInEvents.push({
        type:"TimeIn",
        hour:parseInt(hour,10),
        date:date
    })
    
    return obj
}

function createTimeOutEvent(emp,dateStamp){
    const [date ,hour] =dateStamp.split(' ')

    emp.timeOutEvents.push({
        type:"TimeOut",
        hour :parseInt(hour,10),
        date,
       
    })
return emp;
}

let hoursWorkedOnDate = function(employee, soughtDate){
    let inEvent = employee.timeInEvents.find(function(e){
        return e.date === soughtDate
    })

    let outEvent = employee.timeOutEvents.find(function(e){
        return e.date === soughtDate
    })

    return (outEvent.hour - inEvent.hour) / 100
}

let wagesEarnedOnDate = function(employee, dateSought){
    let rawWage = hoursWorkedOnDate(employee, dateSought)
        * employee.payPerHour
    return parseFloat(rawWage.toString())
}

let allWagesFor = function(employee){
    let eligibleDates = employee.timeInEvents.map(function(e){
        return e.date
    })

    let payable = eligibleDates.reduce(function(memo, d){
        return memo + wagesEarnedOnDate(employee, d)
    }, 0)

    return payable
}

let findEmployeeByFirstName = function(srcArray, firstName) {
  return srcArray.find(function(rec){
    return rec.firstName === firstName
  })
}

let calculatePayroll = function(arrayOfEmployeeRecords){
    return arrayOfEmployeeRecords.reduce(function(memo, rec){
        return memo + allWagesFor(rec)
    }, 0)
}