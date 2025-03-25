package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type AuthController struct{}

func NewAuthController() *AuthController {
	return &AuthController{}
}

func (c *AuthController) Register(ctx *gin.Context) {
	ctx.JSON(http.StatusOK, gin.H{})
}
