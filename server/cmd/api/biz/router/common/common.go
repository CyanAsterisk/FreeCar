package common

import (
	"context"
	"net/http"
	"strconv"

	pt "aidanwoods.dev/go-paseto"
	"github.com/CyanAsterisk/FreeCar/server/cmd/api/config"
	"github.com/CyanAsterisk/FreeCar/server/shared/consts"
	"github.com/CyanAsterisk/FreeCar/server/shared/errno"
	"github.com/CyanAsterisk/FreeCar/server/shared/middleware"
	"github.com/CyanAsterisk/FreeCar/server/shared/tools"
	"github.com/cloudwego/hertz/pkg/app"
	"github.com/cloudwego/hertz/pkg/common/hlog"
	"github.com/hertz-contrib/gzip"
	"github.com/hertz-contrib/limiter"
	"github.com/hertz-contrib/paseto"
)

func CommonMW() []app.HandlerFunc {
	return []app.HandlerFunc{
		// use recovery mw
		middleware.Recovery(),
		// use gzip mw
		gzip.Gzip(gzip.DefaultCompression, gzip.WithExcludedExtensions([]string{".jpg", ".mp4", ".png"})),
		// use limiter mw
		limiter.AdaptiveLimit(limiter.WithCPUThreshold(900)),
	}
}

func PasetoAuth(audience string) app.HandlerFunc {
	pi := config.GlobalServerConfig.PasetoInfo
	pf, err := paseto.NewV4PublicParseFunc(pi.PubKey, []byte(pi.Implicit), paseto.WithAudience(audience), paseto.WithNotBefore())
	if err != nil {
		hlog.Fatal(err)
	}
	sh := func(ctx context.Context, c *app.RequestContext, token *pt.Token) {
		aidString, err := token.GetString("id")
		if err != nil {
			c.JSON(http.StatusUnauthorized, tools.BuildBaseResp(errno.BadRequest.WithMessage("missing accountID in token")))
			c.Abort()
			return
		}
		aid, err := strconv.ParseInt(aidString, 10, 64)
		if err != nil {
			c.JSON(http.StatusUnauthorized, tools.BuildBaseResp(errno.BadRequest.WithMessage("bad accountID")))
			c.Abort()
			return
		}
		c.Set(consts.AccountID, aid)
	}

	return paseto.New(paseto.WithTokenPrefix("Bearer "), paseto.WithParseFunc(pf), paseto.WithSuccessHandler(sh))
}
