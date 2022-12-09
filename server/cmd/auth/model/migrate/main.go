package main

import (
	"crypto/sha512"
	"fmt"
	"log"
	"os"
	"time"

	"github.com/CyanAsterisk/FreeCar/server/cmd/auth/model"
	"github.com/anaskhan96/go-password-encoder"
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

	options := &password.Options{SaltLen: 16, Iterations: 100, KeyLen: 32, HashFunction: sha512.New}

	for i := 0; i < 10; i++ {
		salt, encodedOpenID := password.Encode(fmt.Sprintf("openid%d", i), options)
		newOpenID := fmt.Sprintf("$pbkdf2-sha512$%s$%s", salt, encodedOpenID)
		user := model.User{
			OpenID: newOpenID,
		}
		db.Save(&user)
	}
}
