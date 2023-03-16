package mysql

import (
	"github.com/CyanAsterisk/FreeCar/server/shared/consts"
	"github.com/CyanAsterisk/FreeCar/server/shared/errno"
	"github.com/bwmarrin/snowflake"
	"github.com/cloudwego/kitex/pkg/klog"
	"gorm.io/gorm"
)

type Admin struct {
	ID       int64  `gorm:"primarykey"`
	Username string `gorm:"type:varchar(40);uniqueIndex"`
	Password string `gorm:"type:varchar(40)"`
}

// BeforeCreate uses snowflake to generate an ID.
func (u *Admin) BeforeCreate(_ *gorm.DB) (err error) {
	// skip if the accountID already set.
	if u.ID != 0 {
		return nil
	}
	sf, err := snowflake.NewNode(consts.AdminSnowflakeNode)
	if err != nil {
		klog.Fatalf("generate id failed: %s", err.Error())
	}
	u.ID = sf.Generate().Int64()
	return nil
}

type AdminManager struct {
	salt string
	db   *gorm.DB
}

// NewAdminManager creates a mysql manager.
func NewAdminManager(db *gorm.DB, salt string) *AdminManager {
	m := db.Migrator()
	if !m.HasTable(&Admin{}) {
		if err := m.CreateTable(&Admin{}); err != nil {
			panic(err)
		}
	}
	return &AdminManager{
		db:   db,
		salt: salt,
	}
}

// GetAdminByAccountId get admin by account id.
func (m *AdminManager) GetAdminByAccountId(aid int64) (*Admin, error) {
	var admin Admin
	err := m.db.Where(&Admin{ID: aid}).First(&admin).Error
	if err != nil {
		if err == gorm.ErrRecordNotFound {
			return nil, errno.RecordNotFound
		} else {
			return nil, err
		}
	}
	return &admin, nil
}

func (m *AdminManager) GetAdminByName(name string) (*Admin, error) {
	var admin Admin
	err := m.db.Where(&Admin{Username: name}).First(&admin).Error
	if err != nil {
		if err == gorm.ErrRecordNotFound {
			return nil, errno.RecordNotFound
		} else {
			return nil, err
		}
	}
	return &admin, nil
}

// UpdateAdminPassword updates admin password.
func (m *AdminManager) UpdateAdminPassword(aid int64, password string) error {
	if err := m.db.Where(&Admin{ID: aid}).Update("password", password).Error; err != nil {
		return err
	}
	return nil
}
