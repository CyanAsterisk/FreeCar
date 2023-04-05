package middleware

import (
	"context"
	"errors"
	"github.com/CyanAsterisk/FreeCar/server/shared/errno"
	"github.com/CyanAsterisk/FreeCar/server/shared/tools"
	"net/http"
	"strings"
	"time"

	"github.com/CyanAsterisk/FreeCar/server/shared/model"
	"github.com/cloudwego/hertz/pkg/app"
	"github.com/golang-jwt/jwt"
)

var (
	TokenExpired     = errors.New("token is expired")
	TokenNotValidYet = errors.New("token not active yet")
	TokenMalformed   = errors.New("that's not even a token")
	TokenInvalid     = errors.New("couldn't handle this token")
)

func JWTAuth(signingKey string) app.HandlerFunc {
	return func(ctx context.Context, c *app.RequestContext) {
		token := c.Request.Header.Get("authorization")
		if token == "" {
			c.JSON(http.StatusUnauthorized, tools.BuildBaseResp(errno.AuthorizeFail))
			c.Abort()
			return
		}
		token = strings.Split(token, " ")[1]
		j := NewJWT(signingKey)
		// Parse the information contained in the token
		claims, err := j.ParseToken(token)
		if err != nil {
			if err == TokenExpired {
				c.JSON(http.StatusUnauthorized, tools.BuildBaseResp(errno.AuthorizeFail))
				c.Abort()
				return
			}
			c.JSON(http.StatusUnauthorized, tools.BuildBaseResp(errno.AuthorizeFail))
			c.Abort()
			return
		}
		c.Set("claims", claims)
		c.Set("accountID", claims.ID)
		c.Next(ctx)
	}
}

type JWT struct {
	SigningKey []byte
}

func NewJWT(signingKey string) *JWT {
	return &JWT{
		SigningKey: []byte(signingKey),
	}
}

// CreateToken to create a token
func (j *JWT) CreateToken(claims model.CustomClaims) (string, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString(j.SigningKey)
}

// ParseToken to parse a token
func (j *JWT) ParseToken(tokenString string) (*model.CustomClaims, error) {
	token, err := jwt.ParseWithClaims(tokenString, &model.CustomClaims{}, func(token *jwt.Token) (i interface{}, e error) {
		return j.SigningKey, nil
	})
	if err != nil {
		if ve, ok := err.(*jwt.ValidationError); ok {
			if ve.Errors&jwt.ValidationErrorMalformed != 0 {
				return nil, TokenMalformed
			} else if ve.Errors&jwt.ValidationErrorExpired != 0 {
				// Token is expired
				return nil, TokenExpired
			} else if ve.Errors&jwt.ValidationErrorNotValidYet != 0 {
				return nil, TokenNotValidYet
			} else {
				return nil, TokenInvalid
			}
		}
	}
	if token != nil {
		if claims, ok := token.Claims.(*model.CustomClaims); ok && token.Valid {
			return claims, nil
		}
		return nil, TokenInvalid

	} else {
		return nil, TokenInvalid
	}
}

// RefreshToken to refresh a token
func (j *JWT) RefreshToken(tokenString string) (string, error) {
	jwt.TimeFunc = func() time.Time {
		return time.Unix(0, 0)
	}
	token, err := jwt.ParseWithClaims(tokenString, &model.CustomClaims{}, func(token *jwt.Token) (interface{}, error) {
		return j.SigningKey, nil
	})
	if err != nil {
		return "", err
	}
	if claims, ok := token.Claims.(*model.CustomClaims); ok && token.Valid {
		jwt.TimeFunc = time.Now
		claims.StandardClaims.ExpiresAt = time.Now().Add(1 * time.Hour).Unix()
		return j.CreateToken(*claims)
	}
	return "", TokenInvalid
}
