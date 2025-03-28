package bootstrap

import "ongkir-go/app/controller"

type Initialization struct {
	AuthController *controller.AuthController
}

func NewInitialization(
	authController *controller.AuthController,
) *Initialization {
	return &Initialization{
		AuthController: authController,
	}
}
