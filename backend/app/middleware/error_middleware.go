package middleware

import (
	"net/http"
	"ongkir-go/app/data"
	"ongkir-go/app/pkg"

	"github.com/gin-gonic/gin"
)

func NewErrorMiddleware() gin.RecoveryFunc {
	return func(c *gin.Context, err any) {
		if error, ok := err.(*data.InternalServerError); ok {
			c.JSON(pkg.NewResponse(http.StatusInternalServerError, error.Message).Build())
			return
		}

		if error, ok := err.(*data.UnprocessableEntityError); ok {
			c.JSON(pkg.NewResponse(http.StatusUnprocessableEntity, error.Message).Body(error.Field).Build())
			return
		}

		if error, ok := err.(*data.BadRequestError); ok {
			c.JSON(pkg.NewResponse(http.StatusBadRequest, error.Message).Build())
			return
		}

		if error, ok := err.(*data.NotFoundError); ok {
			c.JSON(pkg.NewResponse(http.StatusNotFound, error.Message).Build())
			return
		}

		response := pkg.NewResponse(http.StatusInternalServerError, "Server Error").Body(err)
		c.AbortWithStatusJSON(response.Build())
	}

}
