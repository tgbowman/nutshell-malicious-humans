//Kristen
//purpose create an event object

const eventId = require("./idGenerator")
const setLocalStorage = require("./setLocalStorage")
const getLocalStorage = require("./getLocalStorage")
const getSessionStorage = require("./getSessionStorage")

const storedDb = getLocalStorage()

let eventFactory = function(eventName, date, location, time, description) {
    let lastEventId = storedDb.events[storedDb.events.length- 1] ||  {eventId: 0}
    let eventIdFactory = eventId(lastEventId.eventId)
    

    const newEvent = Object.create(null, {
        "userId": {
            "value": getSessionStorage().user.userId,
            "enumerable": true
        },
        "eventId": {
            "value": eventIdFactory.next().value,
            "enumerable": true
        },
        "eventName": {
            "value": eventName,
            "enumerable": true,
            "writable": true,
        },
        "eventDate": {
            "value": date,
            "enumerable": true,
            "writable": true,
        },
        "eventLocation": {
            "value": location,
            "enumerable": true,
            "writable": true,
        },
        "eventTime": {
            "value": time,
            "enumerable": true,
            "writable": true,
        },
        "eventDescription": {
            "value": description,
            "enumerable": true,
            "writable": true,
        }
    })

    storedDb.events.push(newEvent)
}

const createEvent = () => {
    let eName = document.getElementById("event_name").value
    let eDate = document.getElementById("event_date").value
    let eLocation = document.getElementById("event_location").value
    let eTime = document.getElementById("event_time").value
    let eDescription = document.getElementById("event_description").value

    if (eName === "" || eDate === "" || eLocation === "" || eTime === "" || eDescription === "") {
        alert("Please fill out all fields")
    } else {
        eventFactory(eName, eDate, eLocation, eTime, eDescription)

        setLocalStorage(storedDb)
    }
}

module.exports = createEvent