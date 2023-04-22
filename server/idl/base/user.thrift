namespace go base

struct User{
    1: string account_id;
    2: string username;
    3: string phone_number;
    4: string avatar_blob_id;
    5: string open_id;
    6: i32 balance;
}

struct UserInfo{
    1: string account_id;
    2: string username;
    3: string phone_number;
    4: string avatar_url;
    5: i32 balance;
}