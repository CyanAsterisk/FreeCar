package main

import (
	"fmt"
	"log"
	"os"
	"time"

	"github.com/CyanAsterisk/FreeCar/server/cmd/blob/model"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
	"gorm.io/gorm/schema"
)

func main() {
	// Defined by your database.
	dsn := "root:123456@tcp(localhost:3306)/FreeCar?charset=utf8mb4&parseTime=True&loc=Local"

	newLogger := logger.New(
		log.New(os.Stdout, "\r\n", log.LstdFlags), // io writer
		logger.Config{
			SlowThreshold: time.Second, // Slow SQL Threshold
			LogLevel:      logger.Info, // Log level
			Colorful:      true,        // Disable color printing
		},
	)

	// global mode
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{
		NamingStrategy: schema.NamingStrategy{
			SingularTable: true,
		},
		Logger: newLogger,
	})
	if err != nil {
		panic(err)
	}

	_ = db.AutoMigrate(&model.BlobRecord{})

	for i := 0; i < 10; i++ {

		user := model.BlobRecord{
			AccountId: int64(i),
			Path:      fmt.Sprintf("blob/path/%d", i),
		}
		db.Save(&user)
	}
}
