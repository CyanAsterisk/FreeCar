package test

import (
	"context"
	"fmt"
	"testing"

	"github.com/CyanAsterisk/FreeCar/server/shared/consts"
	"github.com/docker/docker/api/types"
	"github.com/docker/docker/api/types/container"
	"github.com/docker/docker/client"
	"github.com/docker/go-connections/nat"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var mongoURI string

// RunWithMongoInDocker runs the tests with
// a mongodb instance in a docker container.
func RunWithMongoInDocker(t *testing.T) (cleanUpFunc func(), cli *mongo.Client, err error) {
	c, err := client.NewClientWithOpts()
	if err != nil {
		return func() {}, nil, err
	}

	ctx := context.Background()

	resp, err := c.ContainerCreate(ctx, &container.Config{
		Image: consts.MongoImage,
		ExposedPorts: nat.PortSet{
			consts.MongoContainerPort: {},
		},
	}, &container.HostConfig{
		PortBindings: nat.PortMap{
			consts.MongoContainerPort: []nat.PortBinding{
				{
					HostIP:   consts.MongoContainerIP,
					HostPort: consts.MongoPort,
				},
			},
		},
	}, nil, nil, "")
	if err != nil {
		return func() {}, nil, err
	}
	containerID := resp.ID
	cleanUpFunc = func() {
		err := c.ContainerRemove(ctx, containerID, types.ContainerRemoveOptions{
			Force: true,
		})
		if err != nil {
			t.Error("remove test docker failed", err)
		}
	}

	err = c.ContainerStart(ctx, containerID, types.ContainerStartOptions{})
	if err != nil {
		return cleanUpFunc, nil, err
	}

	inspRes, err := c.ContainerInspect(ctx, containerID)
	if err != nil {
		return cleanUpFunc, nil, err
	}
	hostPort := inspRes.NetworkSettings.Ports[consts.MongoContainerPort][0]
	mongoURI = fmt.Sprintf("mongodb://%s:%s", hostPort.HostIP, hostPort.HostPort)

	cli, err = mongo.Connect(ctx, options.Client().ApplyURI(mongoURI))
	return cleanUpFunc, cli, err
}

// SetupIndexes sets up indexes for the given database.
func SetupIndexes(c context.Context, d *mongo.Database) error {
	_, err := d.Collection("trip").Indexes().CreateOne(c, mongo.IndexModel{
		Keys: bson.D{
			{Key: "trip.accountid", Value: 1},
			{Key: "trip.status", Value: 1},
		},
		Options: options.Index().SetUnique(true).SetPartialFilterExpression(bson.M{
			"trip.status": 1,
		}),
	})
	if err != nil {
		return err
	}

	_, err = d.Collection("profile").Indexes().CreateOne(c, mongo.IndexModel{
		Keys: bson.D{
			{Key: "accountid", Value: 1},
		},
		Options: options.Index().SetUnique(true),
	})
	return err
}
