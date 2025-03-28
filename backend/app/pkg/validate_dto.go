package pkg

import (
	"fmt"
	"ongkir-go/app/data"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
)

func ExtractValidateData(c *gin.Context, obj any) error {
	errors := map[string]any{}

	// validate
	if err := c.ShouldBind(obj); err != nil {
		for _, err := range err.(validator.ValidationErrors) {
			errors[err.Field()] = fmt.Sprintf("Field validation for '%s' failed on the '%s' tag", err.Field(), err.Tag())
		}
	}

	if len(errors) == 0 {
		return nil
	} else {
		return &data.UnprocessableEntityError{
			Message: "invalid fields",
			Field:   errors,
		}
	}
}
