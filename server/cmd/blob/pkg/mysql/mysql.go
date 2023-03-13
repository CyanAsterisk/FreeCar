package mysql

import (
	"github.com/CyanAsterisk/FreeCar/server/shared/consts"
	"github.com/CyanAsterisk/FreeCar/server/shared/errno"
	"github.com/bwmarrin/snowflake"
	"github.com/cloudwego/kitex/pkg/klog"
	"gorm.io/gorm"
)

type BlobRecord struct {
	ID        int64  `gorm:"primarykey"`
	AccountId int64  `gorm:"column:account_id"`
	Path      string `gorm:"column:path;type:varchar(100);not null"`
}

// BeforeCreate uses snowflake to generate an BlobID and path.
func (b *BlobRecord) BeforeCreate(_ *gorm.DB) (err error) {
	sf, err := snowflake.NewNode(consts.BlobSnowflakeNode)
	if err != nil {
		klog.Fatalf("generate id failed: %s", err.Error())
	}
	b.ID = sf.Generate().Int64()
	return nil
}

type Manager struct {
	db *gorm.DB
}

// NewManager creates a mysql manager.
func NewManager(db *gorm.DB) *Manager {
	m := db.Migrator()
	if !m.HasTable(&BlobRecord{}) {
		if err := m.CreateTable(&BlobRecord{}); err != nil {
			panic(err)
		}
	}
	return &Manager{db: db}
}

func (m *Manager) CreateBlobRecord(br *BlobRecord) error {
	return m.db.Model(&BlobRecord{}).Create(br).Error
}

func (m *Manager) DeleteBlobRecord(bid int64) error {
	err := m.db.Model(&BlobRecord{}).
		Where(&BlobRecord{ID: bid}).First(&BlobRecord{}).Error
	if err != nil {
		if err == gorm.ErrRecordNotFound {
			return errno.RecordNotFound
		} else {
			return err
		}
	}
	return m.db.Model(&BlobRecord{}).Delete(&BlobRecord{ID: bid}).Error
}

func (m *Manager) GetBlobRecord(bid int64) (*BlobRecord, error) {
	var br BlobRecord
	err := m.db.Model(&BlobRecord{}).
		Where(&BlobRecord{ID: bid}).First(&br).Error
	if err != nil {
		if err == gorm.ErrRecordNotFound {
			return nil, errno.RecordNotFound
		} else {
			return nil, err
		}
	}
	return &br, err
}
