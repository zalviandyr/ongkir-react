package controller

import (
	"net/http"
	"ongkir-go/app/entities"
	"ongkir-go/app/pkg"
	"ongkir-go/app/service"

	"github.com/gin-gonic/gin"
)

type AuthController struct {
	Service *service.AuthService
}

func NewAuthController(service *service.AuthService) *AuthController {
	return &AuthController{
		Service: service,
	}
}

func (con *AuthController) Register(c *gin.Context) {
	user := new(entities.UserDto)
	if err := pkg.ExtractValidateData(c, user); err != nil {
		c.Error(err)
		return
	}

	err := con.Service.Register(user)
	if err != nil {
		c.Error(err)
	}

	response := pkg.NewResponse(http.StatusCreated, "register success").Body(user)
	c.JSON(response.Build())

}
