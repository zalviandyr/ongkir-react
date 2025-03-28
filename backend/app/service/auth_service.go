package service

import (
	"ongkir-go/app/entities"
	"ongkir-go/config"
)

type AuthService struct {
	mongo *config.Mongo
}

func NewAuthService(mongo *config.Mongo) *AuthService {
	return &AuthService{
		mongo: mongo,
	}
}

func (s *AuthService) Register(user *entities.UserDto) error {
	dao := &entities.UserDao{
		Username: user.Username,
		Password: user.Password,
	}

	return s.mongo.Create(dao)
}
