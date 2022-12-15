package initialize

import (
	"context"
	"fmt"
	"github.com/CyanAsterisk/FreeCar/server/cmd/profile/global"
	"github.com/cloudwego/kitex/pkg/klog"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func InitDB() {
	c := global.ServerConfig.MongoDBInfo
	mongoClient, err := mongo.Connect(context.Background(), options.Client().ApplyURI(
		fmt.Sprintf("mongodb://%s:%s@%s:%d", c.User, c.Password, c.Host, c.Port)))
	if err != nil {
		klog.Fatal("cannot connect mongodb", err)
	}
	global.DB = mongoClient.Database(c.Name).Collection(c.Collection)
}
