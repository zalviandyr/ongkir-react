package service

import (
	"ongkir-go/app/entities"
	"ongkir-go/app/repository"
)

type AuthService struct {
	Repository *repository.AuthRepository
}

func NewAuthService(
	repository *repository.AuthRepository,
) *AuthService {
	return &AuthService{
		Repository: repository,
	}
}

func (s *AuthService) Register(user *entities.UserDto) error {
	dao := &entities.UserDao{
		Username: user.Username,
		Password: user.Password,
	}

	return s.Repository.Register(dao)
}

func (s *AuthService) Login(user *entities.UserDto) error {
	dao := &entities.UserDao{
		Username: user.Username,
		Password: user.Password,
	}

	if _, err := s.Repository.Login(dao); err != nil {
		return err
	}

	return nil
}
