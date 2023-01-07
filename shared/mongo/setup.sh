use FreeCar

db.trip.createIndex({
    "trip.account_id": 1,
    "trip.status": 1,
}, {
    unique: true,
    partialFilterExpression: {
        "trip.status": 1,
    }
})

db.profile.createIndex({
    "account_id": 1,
}, {
    unique: true,
})