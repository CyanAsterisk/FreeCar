package models

import (
	"github.com/golang-jwt/jwt"
)

type CustomClaims struct {
	ID int64
	jwt.StandardClaims
}
