package mysql

import (
	"github.com/CyanAsterisk/FreeCar/server/cmd/user/pkg/md5"
	"github.com/CyanAsterisk/FreeCar/server/shared/consts"
	"github.com/CyanAsterisk/FreeCar/server/shared/errno"
	"github.com/bwmarrin/snowflake"
	"github.com/cloudwego/kitex/pkg/klog"
	"gorm.io/gorm"
)

type User struct {
	ID           string `gorm:"primarykey"`
	PhoneNumber  string
	AvatarBlobId string
	Username     string `gorm:"type:varchar(40)"`
	OpenID       string `gorm:"column:openid;type:varchar(100);uniqueIndex"`
	Balance      int32  `gorm:"column:balance"`
	Deleted      gorm.DeletedAt
}

// BeforeCreate uses snowflake to generate an ID.
func (u *User) BeforeCreate(_ *gorm.DB) (err error) {
	// skip if the accountID already set.
	if u.ID != "" {
		return nil
	}
	sf, err := snowflake.NewNode(consts.UserSnowflakeNode)
	if err != nil {
		klog.Fatalf("generate id failed: %s", err.Error())
	}
	u.ID = sf.Generate().String()
	return nil
}

type UserManager struct {
	salt string
	db   *gorm.DB
}

// NewUserManager creates a mysql manager.
func NewUserManager(db *gorm.DB, salt string) *UserManager {
	m := db.Migrator()
	if !m.HasTable(&User{}) {
		if err := m.CreateTable(&User{}); err != nil {
			panic(err)
		}
	}
	return &UserManager{
		db:   db,
		salt: salt,
	}
}

func (m *UserManager) CreateUser(user *User) (*User, error) {
	if user.OpenID == "" {
		return nil, errno.UserSrvErr.WithMessage("openId not set")
	}
	if _, err := m.GetUserByOpenId(user.OpenID); err == nil {
		return nil, errno.RecordAlreadyExist
	} else if err != errno.RecordNotFound {
		return nil, err
	}
	user.OpenID = md5.Md5Crypt(user.OpenID, m.salt)
	err := m.db.Create(&user).Error
	if err != nil {
		return nil, err
	}
	return user, err
}

func (m *UserManager) GetUserByOpenId(openID string) (*User, error) {
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

func (m *UserManager) GetUserByAccountId(aid string) (*User, error) {
	var user User
	err := m.db.Where(&User{ID: aid}).First(&user).Error
	if err != nil {
		if err == gorm.ErrRecordNotFound {
			return nil, errno.RecordNotFound
		}
		return nil, err
	}
	return &user, nil
}

func (m *UserManager) UpdateUser(user *User) error {
	u := map[string]interface{}{}
	if user.PhoneNumber != "" {
		u["phone_number"] = user.PhoneNumber
	}
	if user.Username != "" {
		u["username"] = user.Username
	}
	if user.AvatarBlobId != "" {
		u["avatar_blob_id"] = user.AvatarBlobId
	}
	if user.Balance != 0 {
		u["balance"] = user.Balance
	}
	err := m.db.Model(&User{ID: user.ID}).Updates(u).Error
	if err == gorm.ErrRecordNotFound {
		return errno.RecordNotFound
	}
	return err
}

func (m *UserManager) DeleteUser(aid string) error {
	var user User
	err := m.db.Where(&User{ID: aid}).Delete(&user).Error
	if err != nil {
		return err
	}
	return nil
}

func (m *UserManager) GetAllUsers() ([]*User, error) {
	var users []*User
	err := m.db.Model(&User{}).Find(&users).Error
	if err != nil {
		return nil, err
	}
	return users, nil
}

func (m *UserManager) GetSomeUsers() ([]*User, error) {
	var users []*User
	err := m.db.Scopes(Paginate(1, consts.LimitOfSomeUsers)).Find(&users).Error
	if err != nil {
		return nil, err
	}
	return users, nil
}

// Paginate is responsible for pagination.
func Paginate(page, pageSize int) func(db *gorm.DB) *gorm.DB {
	return func(db *gorm.DB) *gorm.DB {
		if page == 0 {
			page = 1
		}
		switch {
		case pageSize > 100:
			pageSize = 100
		case pageSize <= 0:
			pageSize = 10
		}
		offset := (page - 1) * pageSize
		return db.Offset(offset).Limit(pageSize)
	}
}
