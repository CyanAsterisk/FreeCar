package model

import "github.com/golang-jwt/jwt"

type CustomClaims struct {
	ID      int64
	IsAdmin bool
	jwt.StandardClaims
}
