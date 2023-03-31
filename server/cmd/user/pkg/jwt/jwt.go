package jwt

import (
	"github.com/CyanAsterisk/FreeCar/server/shared/middleware"
	"github.com/CyanAsterisk/FreeCar/server/shared/model"
)

type TokenGenerator struct {
	jwt *middleware.JWT
}

func NewTokenGenerator(signingKey string) *TokenGenerator {
	j := middleware.NewJWT(signingKey)
	return &TokenGenerator{jwt: j}
}

func (g *TokenGenerator) CreateToken(claims *model.CustomClaims) (string, error) {
	return g.jwt.CreateToken(*claims)
}
