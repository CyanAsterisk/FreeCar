// Code generated by Kitex v0.4.4. DO NOT EDIT.

package carservice

import (
	"context"
	car "github.com/CyanAsterisk/FreeCar/server/shared/kitex_gen/car"
	client "github.com/cloudwego/kitex/client"
	callopt "github.com/cloudwego/kitex/client/callopt"
)

// Client is designed to provide IDL-compatible methods with call-option parameter for kitex framework.
type Client interface {
	CreateCar(ctx context.Context, req *car.CreateCarRequest, callOptions ...callopt.Option) (r *car.CreateCarResponse, err error)
	DeleteCar(ctx context.Context, req *car.DeleteCarRequest, callOptions ...callopt.Option) (r *car.DeleteCarResponse, err error)
	AdminUpdateCar(ctx context.Context, req *car.AdminUpdateCarRequest, callOptions ...callopt.Option) (r *car.AdminUpdateCarResponse, err error)
	GetSomeCars(ctx context.Context, req *car.GetSomeCarsRequest, callOptions ...callopt.Option) (r *car.GetSomeCarsResponse, err error)
	GetAllCars(ctx context.Context, req *car.GetAllCarsRequest, callOptions ...callopt.Option) (r *car.GetAllCarsResponse, err error)
	GetCars(ctx context.Context, req *car.GetCarsRequest, callOptions ...callopt.Option) (r *car.GetCarsResponse, err error)
	GetCar(ctx context.Context, req *car.GetCarRequest, callOptions ...callopt.Option) (r *car.GetCarResponse, err error)
	LockCar(ctx context.Context, req *car.LockCarRequest, callOptions ...callopt.Option) (r *car.LockCarResponse, err error)
	UnlockCar(ctx context.Context, req *car.UnlockCarRequest, callOptions ...callopt.Option) (r *car.UnlockCarResponse, err error)
	UpdateCar(ctx context.Context, req *car.UpdateCarRequest, callOptions ...callopt.Option) (r *car.UpdateCarResponse, err error)
}

// NewClient creates a client for the service defined in IDL.
func NewClient(destService string, opts ...client.Option) (Client, error) {
	var options []client.Option
	options = append(options, client.WithDestService(destService))

	options = append(options, opts...)

	kc, err := client.NewClient(serviceInfo(), options...)
	if err != nil {
		return nil, err
	}
	return &kCarServiceClient{
		kClient: newServiceClient(kc),
	}, nil
}

// MustNewClient creates a client for the service defined in IDL. It panics if any error occurs.
func MustNewClient(destService string, opts ...client.Option) Client {
	kc, err := NewClient(destService, opts...)
	if err != nil {
		panic(err)
	}
	return kc
}

type kCarServiceClient struct {
	*kClient
}

func (p *kCarServiceClient) CreateCar(ctx context.Context, req *car.CreateCarRequest, callOptions ...callopt.Option) (r *car.CreateCarResponse, err error) {
	ctx = client.NewCtxWithCallOptions(ctx, callOptions)
	return p.kClient.CreateCar(ctx, req)
}

func (p *kCarServiceClient) DeleteCar(ctx context.Context, req *car.DeleteCarRequest, callOptions ...callopt.Option) (r *car.DeleteCarResponse, err error) {
	ctx = client.NewCtxWithCallOptions(ctx, callOptions)
	return p.kClient.DeleteCar(ctx, req)
}

func (p *kCarServiceClient) AdminUpdateCar(ctx context.Context, req *car.AdminUpdateCarRequest, callOptions ...callopt.Option) (r *car.AdminUpdateCarResponse, err error) {
	ctx = client.NewCtxWithCallOptions(ctx, callOptions)
	return p.kClient.AdminUpdateCar(ctx, req)
}

func (p *kCarServiceClient) GetSomeCars(ctx context.Context, req *car.GetSomeCarsRequest, callOptions ...callopt.Option) (r *car.GetSomeCarsResponse, err error) {
	ctx = client.NewCtxWithCallOptions(ctx, callOptions)
	return p.kClient.GetSomeCars(ctx, req)
}

func (p *kCarServiceClient) GetAllCars(ctx context.Context, req *car.GetAllCarsRequest, callOptions ...callopt.Option) (r *car.GetAllCarsResponse, err error) {
	ctx = client.NewCtxWithCallOptions(ctx, callOptions)
	return p.kClient.GetAllCars(ctx, req)
}

func (p *kCarServiceClient) GetCars(ctx context.Context, req *car.GetCarsRequest, callOptions ...callopt.Option) (r *car.GetCarsResponse, err error) {
	ctx = client.NewCtxWithCallOptions(ctx, callOptions)
	return p.kClient.GetCars(ctx, req)
}

func (p *kCarServiceClient) GetCar(ctx context.Context, req *car.GetCarRequest, callOptions ...callopt.Option) (r *car.GetCarResponse, err error) {
	ctx = client.NewCtxWithCallOptions(ctx, callOptions)
	return p.kClient.GetCar(ctx, req)
}

func (p *kCarServiceClient) LockCar(ctx context.Context, req *car.LockCarRequest, callOptions ...callopt.Option) (r *car.LockCarResponse, err error) {
	ctx = client.NewCtxWithCallOptions(ctx, callOptions)
	return p.kClient.LockCar(ctx, req)
}

func (p *kCarServiceClient) UnlockCar(ctx context.Context, req *car.UnlockCarRequest, callOptions ...callopt.Option) (r *car.UnlockCarResponse, err error) {
	ctx = client.NewCtxWithCallOptions(ctx, callOptions)
	return p.kClient.UnlockCar(ctx, req)
}

func (p *kCarServiceClient) UpdateCar(ctx context.Context, req *car.UpdateCarRequest, callOptions ...callopt.Option) (r *car.UpdateCarResponse, err error) {
	ctx = client.NewCtxWithCallOptions(ctx, callOptions)
	return p.kClient.UpdateCar(ctx, req)
}
