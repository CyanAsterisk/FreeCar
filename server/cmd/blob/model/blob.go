package model

import (
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
	sf, err := snowflake.NewNode(3)
	if err != nil {
		klog.Fatalf("generate id failed: %s", err.Error())
	}
	b.ID = sf.Generate().Int64()
	return nil
}
