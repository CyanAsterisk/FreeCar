package initialize

import (
	"context"

	"github.com/CyanAsterisk/FreeCar/server/cmd/blob/config"
	"github.com/cloudwego/kitex/pkg/klog"
	"github.com/minio/minio-go/v7"
	"github.com/minio/minio-go/v7/pkg/credentials"
)

func InitMinio() *minio.Client {
	mi := config.GlobalServerConfig.MinioInfo
	// Initialize minio client object.
	mc, err := minio.New(mi.Endpoint, &minio.Options{
		Creds:  credentials.NewStaticV4(mi.AccessKeyID, mi.SecretAccessKey, ""),
		Secure: false,
	})
	if err != nil {
		klog.Fatalf("create minio client err: %s", err.Error())
	}
	exists, err := mc.BucketExists(context.Background(), mi.Bucket)
	if err != nil {
		klog.Fatal(err)
	}
	if !exists {
		err = mc.MakeBucket(context.Background(), mi.Bucket, minio.MakeBucketOptions{Region: "cn-north-1"})
		if err != nil {
			klog.Fatalf("make bucket err: %s", err.Error())
		}
	}
	policy := `{"Version": "2012-10-17","Statement": [{"Action": ["s3:GetObject"],"Effect": "Allow","Principal": {"AWS": ["*"]},"Resource": ["arn:aws:s3:::` + mi.Bucket + `/*"],"Sid": ""}]}`
	err = mc.SetBucketPolicy(context.Background(), mi.Bucket, policy)
	if err != nil {
		klog.Fatal("set bucket policy err:%s", err)
	}
	return mc
}
