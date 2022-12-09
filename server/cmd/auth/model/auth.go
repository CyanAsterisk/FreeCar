package model

import (
	"github.com/bwmarrin/snowflake"
	"time"

	"gorm.io/gorm"
)

type BaseModel struct {
	ID        int64     `gorm:"primarykey"`
	CreatedAt time.Time `gorm:"column:create_time"`
	UpdatedAt time.Time `gorm:"column:update_time"`
	DeletedAt gorm.DeletedAt
}

type User struct {
	BaseModel
	OpenID string `gorm:"column:openid;type:varchar(100);not null"`
}

func (u *User) BeforeCreate(_ *gorm.DB) (err error) {
	sf, err := snowflake.NewNode(1)
	if err != nil {
		panic(err)
	}
	u.ID = sf.Generate().Int64()
	return nil
}
