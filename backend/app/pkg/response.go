package pkg

import (
	"github.com/gin-gonic/gin"
)

type Response struct {
	status  int
	message string
	data    any
}

func NewResponse(status int, message string) *Response {
	return &Response{
		status:  status,
		message: message,
	}
}

func (response *Response) Body(data any) *Response {
	response.data = &data

	return response
}

func (response *Response) Build() (status int, obj any) {
	return response.status, gin.H{
		"message": response.message,
		"success": response.status >= 200 && response.status < 300,
		"data":    response.data,
	}
}
