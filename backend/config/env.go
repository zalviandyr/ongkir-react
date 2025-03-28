package config

import (
	"github.com/spf13/viper"
)

type Environment struct {
	MONGO_HOST string `mapstructure:"MONGO_HOST"`
	MONGO_PORT int    `mapstructure:"MONGO_PORT"`
	MONGO_USER string `mapstructure:"MONGO_USER"`
	MONGO_PASS string `mapstructure:"MONGO_PASS"`
	MONGO_DB   string `mapstructure:"MONGO_DB"`

	DEBUG bool `mapstructure:"DEBUG"`
}

func NewEnvironment() *Environment {
	env := new(Environment)

	viper.SetConfigName("config")
	viper.AddConfigPath(".")
	viper.SetConfigType("env")

	viper.AutomaticEnv()

	if err := viper.ReadInConfig(); err != nil {
		panic(err)
	}

	if err := viper.Unmarshal(&env); err != nil {
		panic(err)
	}

	return env
}
