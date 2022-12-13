namespace go rental

// Trip Service
struct Location {
  1: double latitude
  2: double longitude
}

struct LocationStatus {
  1: Location location
  2: i32 fee_cent
  3: double km_driven
  4: string poi_name
  5: i64 timestamp_sec
}

enum TripStatus {
  TS_NOT_SPECIFIED = 0,
  IN_PROGRESS = 1,
  FINISHED = 2,
}

struct TripEntity {
  1: string id
  2: Trip trip
}

struct Trip {
  1: string account_id
  2: string car_id
  3: LocationStatus start
  4: LocationStatus current
  5: LocationStatus end
  6: TripStatus status
  7: string identity_id
}

struct CreateTripRequest {
  1: Location start
  2: string car_id
  3: string avatar_url
}

struct GetTripRequest {
  1: string id
}

struct GetTripsRequest {
  1: TripStatus status
}

struct GetTripsResponse {
  1: list<TripEntity> trips
}

struct UpdateTripRequest {
  1: string id
  2: Location current
  3: bool end_trip
}

service TripService {
  TripEntity CreateTrip(1: CreateTripRequest req) (api.post="/v1/trip")
  Trip GetTrip(1: GetTripRequest req) (api.get="/v1/trip/:id")
  GetTripsResponse GetTrips (1: GetTripsRequest req) (api.get="/v1/trips")
  Trip UpdateTrip(1: UpdateTripRequest req) (api.put="/v1/trip/:id")
}

// Profile Service
enum Gender {
  G_NOT_SPECIFIED = 0,
  MALE = 1,
  FEMALE = 2,
}

enum IdentityStatus {
  UNSUBMITTED = 0,
  PENDING = 1,
  VERIFIED = 2,
}

struct Profile {
  1: Identity identity
  2: IdentityStatus identity_status
}

struct Identity {
  1: string lic_number
  2: string name
  3: Gender gender
  4: i64 birth_date_millis
}

struct GetProfileRequest {}
struct ClearProfileRequest {}

struct GetProfilePhotoRequest {}
struct GetProfilePhotoResponse {
  1: string url
}

struct CreateProfilePhotoRequest {}
struct CreateProfilePhotoResponse {
  1: string upload_url
}

struct CompleteProfilePhotoRequest {}
struct ClearProfilePhotoRequest {}
struct ClearProfilePhotoResponse {}

service ProfileService {
  Profile GetProfile(1: GetProfileRequest req) (api.get="/v1/profile")
  Profile SubmitProfile(1: Identity req) (api.post="/v1/profile")
  Profile ClearProfile(1: ClearProfileRequest req) (api.delete="/v1/profile")

  GetProfilePhotoResponse GetProfilePhoto(1: GetProfilePhotoRequest req) (api.get="/v1/profile/photo")
  CreateProfilePhotoResponse CreateProfilePhoto(1: CreateProfilePhotoRequest req) (api.post="/v1/profile/photo")
  Identity CompleteProfilePhoto(1: CompleteProfilePhotoRequest req) (api.post="/v1/profile/photo/complete")
  ClearProfilePhotoResponse ClearProfilePhoto(1: ClearProfilePhotoRequest req) (api.delete="/v1/profile/photo")
}
