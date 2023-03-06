package test

import (
	"context"
	"fmt"
	"github.com/CyanAsterisk/FreeCar/server/shared/consts"
	"log"
	"os"
	"strconv"
	"testing"
	"time"

	"github.com/docker/docker/api/types"
	"github.com/docker/docker/api/types/container"
	"github.com/docker/docker/client"
	"github.com/docker/go-connections/nat"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
	"gorm.io/gorm/schema"
)

// RunWithMySQLInDocker runs the tests with
// a MySQL instance in a docker container.
func RunWithMySQLInDocker(t *testing.T) (cleanUpFunc func(), db *gorm.DB, err error) {
	c, err := client.NewClientWithOpts(client.WithVersion("1.41"))
	if err != nil {
		return func() {}, nil, err
	}

	ctx := context.Background()
	resp, err := c.ContainerCreate(ctx, &container.Config{
		Image: consts.MySQLImage,
		ExposedPorts: nat.PortSet{
			consts.MySQLContainerPort: {},
		},
		Env: []string{"MYSQL_DATABASE=" + consts.FreeCar, "MYSQL_ROOT_PASSWORD=" + consts.DockerTestMySQLPwd},
	}, &container.HostConfig{
		PortBindings: nat.PortMap{
			consts.MySQLContainerPort: []nat.PortBinding{
				{
					HostIP:   consts.MySQLContainerIP,
					HostPort: consts.MySQLPort,
				},
			},
		},
	}, nil, nil, "")
	if err != nil {
		return func() {}, nil, err
	}
	containerID := resp.ID
	cleanUpFunc = func() {
		err = c.ContainerRemove(ctx, containerID, types.ContainerRemoveOptions{
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
	hostPort := inspRes.NetworkSettings.Ports[consts.MySQLContainerPort][0]
	port, _ := strconv.Atoi(hostPort.HostPort)
	mysqlDSN := fmt.Sprintf(consts.MySqlDSN, consts.MySQLAdmin, consts.DockerTestMySQLPwd, hostPort.HostIP, port, consts.FreeCar)
	// Init mysql
	time.Sleep(20 * time.Second)
	db, err = gorm.Open(mysql.Open(mysqlDSN), &gorm.Config{
		NamingStrategy: schema.NamingStrategy{
			SingularTable: true,
		},
		Logger: logger.New(
			log.New(os.Stdout, "\r\n", log.LstdFlags),
			logger.Config{
				SlowThreshold:             time.Second,
				LogLevel:                  logger.Warn,
				IgnoreRecordNotFoundError: true,
				Colorful:                  false,
			},
		),
	})
	if err != nil {
		return cleanUpFunc, nil, err
	}
	return cleanUpFunc, db, nil
}
