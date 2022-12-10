package models

import (
	"github.com/dgrijalva/jwt-go"
)

type CustomClaims struct {
	ID int64
	jwt.StandardClaims
}
