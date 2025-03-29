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

	if err := con.Service.Register(user); err != nil {
		c.Error(err)
		return
	}

	response := pkg.NewResponse(http.StatusCreated, "success register").Body(user)
	c.JSON(response.Build())

}

func (con *AuthController) Login(c *gin.Context) {
	user := new(entities.UserDto)
	if err := pkg.ExtractValidateData(c, user); err != nil {
		c.Error(err)
		return
	}

	if err := con.Service.Login(user); err != nil {
		panic(err)
		// c.Error(err)
		// return
	}

	response := pkg.NewResponse(http.StatusOK, "success login")
	c.JSON(response.Build())
}
