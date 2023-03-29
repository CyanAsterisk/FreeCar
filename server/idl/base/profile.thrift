namespace go base

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
    AUDITFAILED = 3,
}

struct ProfileRecord {
    1: required i64 account_id,
    2: required i64 photo_blob_id,
    3: required Profile profile,
}

struct Profile {
    1: required Identity identity,
    2: required IdentityStatus identity_status,
}

struct Identity {
    1: required string lic_number,
    2: required string name,
    3: required Gender gender,
    4: required i64 birth_date_millis,
}