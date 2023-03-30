namespace go base

struct User{
    1: i64 account_id;
    2: string username;
    3: i64 phone_number;
    4: i64 avatar_blob_id;
    5: string open_id;
}

struct UserInfo{
    1: i64 account_id;
    2: string username;
    3: i64 phone_number;
    4: string avatar_url;
}