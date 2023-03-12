package mysql

import (
	"github.com/CyanAsterisk/FreeCar/server/cmd/auth/pkg/md5"
	"github.com/CyanAsterisk/FreeCar/server/shared/errno"
	"github.com/bwmarrin/snowflake"
	"github.com/cloudwego/kitex/pkg/klog"
	"gorm.io/gorm"
)

type User struct {
	ID           int64 `gorm:"primarykey"`
	PhoneNumber  int64
	AvatarBlobId int64
	Username     string `gorm:"type:varchar(40)"`
	OpenID       string `gorm:"column:openid;type:varchar(100);not null"`
}

// BeforeCreate uses snowflake to generate an ID.
func (u *User) BeforeCreate(_ *gorm.DB) (err error) {
	sf, err := snowflake.NewNode(1)
	if err != nil {
		klog.Fatalf("generate id failed: %s", err.Error())
	}
	u.ID = sf.Generate().Int64()
	return nil
}

type Manager struct {
	salt string
	db   *gorm.DB
}

// NewManager creates a mysql manager.
func NewManager(db *gorm.DB, salt string) *Manager {
	m := db.Migrator()
	if !m.HasTable(&User{}) {
		if err := m.CreateTable(&User{}); err != nil {
			panic(err)
		}
	}
	return &Manager{
		db:   db,
		salt: salt,
	}
}

func (m *Manager) CreateUser(openID string) (*User, error) {
	var user User
	user.OpenID = md5.Md5Crypt(openID, m.salt)
	err := m.db.Create(&user).Error
	if err != nil {
		return nil, err
	}
	return &user, err
}

func (m *Manager) GetUserByOpenId(openID string) (*User, error) {
	var user User
	cryOpenID := md5.Md5Crypt(openID, m.salt)
	err := m.db.Where(&User{OpenID: cryOpenID}).First(&user).Error
	if err != nil {
		if err == gorm.ErrRecordNotFound {
			return nil, errno.RecordNotFound
		} else {
			return nil, err
		}
	}
	return &user, nil
}

func (m *Manager) GetUserByAccountId(aid int64) (*User, error) {
	var user User
	err := m.db.Where(&User{ID: aid}).First(&user).Error
	if err == gorm.ErrRecordNotFound {
		return nil, errno.RecordNotFound
	}
	return &user, nil
}

func (m *Manager) UpdateUser(user *User) error {
	u := map[string]interface{}{}
	if user.PhoneNumber != 0 {
		u["phone_number"] = user.PhoneNumber
	}
	if user.Username != "" {
		u["username"] = user.Username
	}
	if user.AvatarBlobId != 0 {
		u["avatar_blob_id"] = user.AvatarBlobId
	}
	err := m.db.Model(&User{ID: user.ID}).Updates(u).Error
	if err == gorm.ErrRecordNotFound {
		return errno.RecordNotFound
	}
	return err
}
