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
    1:  string account_id,
    2:  string photo_blob_id,
    3:  Profile profile,
}

struct Profile {
    1:  Identity identity,
    2:  IdentityStatus identity_status,
}

struct Identity {
    1:  string lic_number,
    2:  string name,
    3:  Gender gender,
    4:  i64 birth_date_millis,
}