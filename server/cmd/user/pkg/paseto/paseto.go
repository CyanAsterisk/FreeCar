package paseto

import (
	"github.com/hertz-contrib/paseto"
)

type TokenGenerator struct {
	paseto.GenTokenFunc
}

func NewTokenGenerator(asymmetricKey string, implicit []byte) (*TokenGenerator, error) {
	signFunc, err := paseto.NewV4SignFunc(asymmetricKey, implicit)
	if err != nil {
		return nil, err
	}
	return &TokenGenerator{signFunc}, nil
}

func (g *TokenGenerator) CreateToken(claims *paseto.StandardClaims) (token string, err error) {
	return g.GenTokenFunc(claims, nil, nil)
}
