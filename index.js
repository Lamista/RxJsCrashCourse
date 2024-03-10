const { Observable } = require("rxjs");

const observable = new Observable((subscriber) => {
    //emit data
    //convention subscriber - but can be any name
    subscriber.next(10)
    subscriber.next(11)
    subscriber.next(12)
})

const observer = {
    //ok
    next: (value) => {
        console.log("Observer got a value of " + value);
    },
    //error
    error: (err) => {
        console.log("Observer got an error of " + err);
    },
    // when observable wants to complete, no value passed
    complete: () => {
        console.log("Observer got a complete notification.");
    }
}

// connecting observable and observer
observable.subscribe(observer);