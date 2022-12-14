package model

// ProfileRecord defines the profile record in db.
type ProfileRecord struct {
	AccountID   string `gorm:"column:account_id"`
	PhotoBlobID string `gorm:"column:photo_blob_id"`
	// Identity
	LicNumber       string `gorm:"column:lic_number"`
	Name            string `gorm:"type:varchar(20)"`
	Gender          int64  `gorm:"type:tinyint;default:0"`
	BirthDateMillis int64  `gorm:"column:birthdate_millis"`
	IdentityStatus  int64  `gorm:"column:identity_status;type:tinyint;default:0"`
}
