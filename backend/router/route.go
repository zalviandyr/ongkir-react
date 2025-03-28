package router

import (
	"net/http"
	"ongkir-go/app/middleware"
	"ongkir-go/asset"
	"ongkir-go/bootstrap"

	"github.com/gin-gonic/gin"
)

type Route struct{}

func NewRoute(initialization *bootstrap.Initialization) *gin.Engine {
	app := gin.Default()
	app.Use(middleware.NewStaticMiddleware(asset.WebDir, "web"))

	api := app.Group("/api")
	api.Use(gin.CustomRecovery(middleware.NewErrorMiddleware()))

	api.GET("/ping", func(ctx *gin.Context) {
		ctx.JSON(http.StatusOK, gin.H{
			"message": "pong",
		})
	})

	// auth
	auth := initialization.AuthController
	{
		api.POST("/register", auth.Register)
		api.POST("/login", auth.Login)
	}

	return app
}
