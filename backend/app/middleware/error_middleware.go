package middleware

import (
	"net/http"
	"ongkir-go/app/data"
	"ongkir-go/app/pkg"

	"github.com/gin-gonic/gin"
)

func NewErrorMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		// handle request
		c.Next()

		// get last error
		err := c.Errors.Last()
		if err == nil {
			return
		}

		if error, ok := err.Err.(*data.InternalServerError); ok {
			c.JSON(pkg.NewResponse(http.StatusInternalServerError, error.Message).Build())
			return
		}

		if error, ok := err.Err.(*data.UnprocessableEntityError); ok {
			c.JSON(pkg.NewResponse(http.StatusUnprocessableEntity, error.Message).Body(error.Field).Build())
			return
		}

		if error, ok := err.Err.(*data.BadRequestError); ok {
			c.JSON(pkg.NewResponse(http.StatusBadRequest, error.Message).Build())
			return
		}

		if error, ok := err.Err.(*data.NotFoundError); ok {
			c.JSON(pkg.NewResponse(http.StatusNotFound, error.Message).Build())
			return
		}

		response := pkg.NewResponse(http.StatusInternalServerError, "Server Error").Body(err)
		c.AbortWithStatusJSON(response.Build())
	}

}
