package data

import "fmt"

type InternalServerError struct {
	Message string
}

func (e *InternalServerError) Error() string {
	return fmt.Sprintf("InternalServerError: %s", e.Message)
}

type BadRequestError struct {
	Message string
}

func (e *BadRequestError) Error() string {
	return fmt.Sprintf("BadRequestError: %s", e.Message)
}

type NotFoundError struct {
	Message string
}

func (e *NotFoundError) Error() string {
	return fmt.Sprintf("NotFoundError: %s", e.Message)
}

type UnprocessableEntityError struct {
	Message string
	Field   map[string]any
}

func (e *UnprocessableEntityError) Error() string {
	return fmt.Sprintf("UnprocessableEntityError: %s", e.Field)
}
