namespace go trip
include "../rpc/trip.thrift"


service TripService{

  // for back-stage management
  trip.GetAllTripsResponse GetAllTrips(1: trip.GetAllTripsRequest req)
  trip.GetSomeTripsResponse GetSomeTrips (1: trip.GetSomeTripsRequest req)
    trip.DeleteTripResponse DeleteTrip(1: trip.DeleteTripRequest req)

  // for mini-program
   trip.CreateTripResponse CreateTrip(1: trip.CreateTripRequest req)
   trip.GetTripResponse GetTrip(1: trip.GetTripRequest req)
   trip.GetTripsResponse GetTrips (1: trip.GetTripsRequest req)
   trip.UpdateTripResponse UpdateTrip(1: trip.UpdateTripRequest req)
}