package ocr

import (
	"context"
	"fmt"
	"strconv"

	"github.com/CyanAsterisk/FreeCar/server/cmd/profile/config"
	"github.com/CyanAsterisk/FreeCar/server/shared/consts"
	"github.com/CyanAsterisk/FreeCar/server/shared/kitex_gen/base"
	"github.com/bytedance/sonic"
	"github.com/cloudwego/hertz/pkg/app/client"
	"github.com/cloudwego/hertz/pkg/common/hlog"
	"github.com/cloudwego/hertz/pkg/network/standard"
)

type LicenseManager struct{}

type RequestRes struct {
	WordsResult struct {
		Name struct {
			Words string `json:"words"`
		} `json:"姓名"`
		BirthDay struct {
			Words string `json:"words"`
		} `json:"出生日期"`
		LicenseNum struct {
			Words string `json:"words"`
		} `json:"证号"`
		Gender struct {
			Words string `json:"words"`
		} `json:"性别"`
	} `json:"words_result"`
}

func (l *LicenseManager) GetLicenseInfo(url string) (*base.Identity, error) {
	c, err := client.NewClient(client.WithDialer(standard.NewDialer()))
	if err != nil {
		hlog.Error("new hertz client error", err)
		return nil, err
	}
	ocrUrl := fmt.Sprintf("%s?access_token=%s&url=%s",
		consts.OCRUrl, config.GlobalServerConfig.OCRConfig.AccessToken, url)
	_, body, err := c.Post(context.Background(), nil, ocrUrl, nil)
	if err != nil {
		hlog.Error("get license info error", err)
		return nil, err
	}
	var res RequestRes
	err = sonic.Unmarshal(body, &res)
	if err != nil {
		hlog.Error("unmarshal license info error", err)
		return nil, err
	}
	var gender base.Gender
	if res.WordsResult.Gender.Words == "男" {
		gender = 1
	} else if res.WordsResult.Gender.Words == "女" {
		gender = 2
	} else {
		gender = 0
	}
	birthDateMillis, err := strconv.ParseInt(res.WordsResult.BirthDay.Words, 10, 64)
	identity := &base.Identity{
		LicNumber:       res.WordsResult.LicenseNum.Words,
		Name:            res.WordsResult.Name.Words,
		Gender:          gender,
		BirthDateMillis: birthDateMillis,
	}
	return identity, nil
}
