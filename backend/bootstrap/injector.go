//go:build wireinject
// +build wireinject

package bootstrap

import (
	"context"
	"ongkir-go/app/controller"
	"ongkir-go/app/repository"
	"ongkir-go/app/service"
	"ongkir-go/config"

	"github.com/google/wire"
)

var authSet = wire.NewSet(controller.NewAuthController, service.NewAuthService, repository.NewAuthRepository)

func Initialized(ctx context.Context) *Initialization {
	wire.Build(
		NewInitialization,

		config.NewEnvironment,
		config.NewMongo,

		authSet,
	)

	return nil
}
