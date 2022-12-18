package id

// AccountID defines account id object.
type AccountID int64

func (a AccountID) int64() int64 {
	return int64(a)
}

// TripID defines trip id object.
type TripID string

func (t TripID) String() string {
	return string(t)
}

// IdentityID defines identity id object.
type IdentityID string

func (i IdentityID) String() string {
	return string(i)
}

// CarID defines car id object.
type CarID string

func (i CarID) String() string {
	return string(i)
}

// BlobID defines blob id object.
type BlobID int64

func (i BlobID) Int64() int64 {
	return int64(i)
}
