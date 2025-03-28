package test

import (
	"ongkir-go/config"
	"testing"
)

func TestReadEnvironment(t *testing.T) {
	env := config.NewEnvironment()

	t.Log(env)
}
