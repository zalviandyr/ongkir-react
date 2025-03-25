package main

import (
	"embed"
	"net/http"
	"ongkir-go/app/middleware"

	"github.com/gin-gonic/gin"
)

//go:embed static/*
var staticDir embed.FS

func main() {
	app := gin.Default()

	app.Use(middleware.StaticMiddleware(staticDir))

	app.GET("/api/ping", func(ctx *gin.Context) {
		ctx.JSON(http.StatusOK, gin.H{
			"message": "pong",
		})
	})

	app.Run("0.0.0.0:8000")
}
