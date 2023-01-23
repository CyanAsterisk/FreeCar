package main

import (
	"fmt"
	"log"
	"os"
	"time"

	"github.com/CyanAsterisk/FreeCar/server/cmd/auth/model"
	"github.com/CyanAsterisk/FreeCar/server/cmd/auth/tool"
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

	_ = db.AutoMigrate(&model.User{})

	for i := 0; i < 10; i++ {
		cryOpenID := tool.Md5Crypt(fmt.Sprintf("openid%d", i), "FreeCar")
		user := model.User{
			Username: fmt.Sprintf("user%d", i),
			OpenID:   cryOpenID,
		}
		db.Save(&user)
	}
}
