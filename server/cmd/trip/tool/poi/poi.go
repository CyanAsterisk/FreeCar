package poi

import (
	"hash/fnv"

	"github.com/CyanAsterisk/FreeCar/server/cmd/trip/kitex_gen/trip"
	"github.com/bytedance/sonic"
)

var poi = []string{
	"知行苑7舍",
	"兴业苑5舍",
	"中心食堂",
	"第二教学楼",
	"综合实验大楼",
	"信科大厦",
}

// Manager defines a poi manager.
type Manager struct{}

// Resolve resolves the given location.
func (*Manager) Resolve(loc *trip.Location) (string, error) {
	b, err := sonic.Marshal(loc)
	if err != nil {
		return "", err
	}

	h := fnv.New32()
	h.Write(b)
	return poi[int(h.Sum32())%len(poi)], nil
}
