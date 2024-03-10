const { Observable, map, pluck, filter } = require("rxjs");

const usersOK = {
    data: [
        {
            status: "active",
            age: 14
        },
        {
            status: "inactive",
            age: 32
        },
        {
            status: "inactive",
            age: 53
        },
        {
            status: "active",
            age: 17
        },
        {
            status: "inactive",
            age: 11
        },
        {
            status: "inactive",
            age: 32
        },
        {
            status: "inactive",
            age: 43
        },
        {
            status: "active",
            age: 23
        },
    ]
}

const usersTooYoung = {
    data: [
        {
            status: "active",
            age: 14
        },
        {
            status: "inactive",
            age: 32
        },
        {
            status: "inactive",
            age: 53
        },
        {
            status: "active",
            age: 17
        },
        {
            status: "inactive",
            age: 11
        },
        {
            status: "inactive",
            age: 32
        },
        {
            status: "inactive",
            age: 43
        },
        {
            status: "active",
            age: 20
        },
    ]
}

const observable = new Observable((subscriber) => {
    //emit data
    //convention subscriber - but can be any name
    subscriber.next({ data: [] }) // will be filtered out
    subscriber.next(usersOK)
    subscriber.complete() // or next(usersTooYoung)
    subscriber.next(usersOK)
}).pipe(
    // extracts data from an object - pluck operator instead of map (in fact pluck is deprecated and map should be used)
    pluck("data"),
    filter((value) => value.length >= 5),
    map((value) => {
        // console.log("2. Got data from from first operator", value);
        return value.filter(user => user.status === 'active');
    }),
    map((value) => {
        // console.log("3. Got data from from second operator", value);
        return (value.reduce((sum, user) => sum + user.age, 0)) / value.length;
    }),
    map((value) => {
        // console.log("4. Got data from from third operator", value);
        if (value < 18) throw new Error('Average age is too young')
        return value;
    })
)

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