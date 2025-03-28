package main

import (
	"context"
	"ongkir-go/bootstrap"
	"ongkir-go/router"
)

func main() {
	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()

	init := bootstrap.Initialized(ctx)
	app := router.NewRoute(init)

	// run on port 8000
	app.Run(":8000")
}
