package repository

import (
	"ongkir-go/app/entities"
	"ongkir-go/config"
)

type AuthRepository struct {
	Mongo *config.Mongo
}

func NewAuthRepository(
	mongo *config.Mongo,
) *AuthRepository {
	return &AuthRepository{
		Mongo: mongo,
	}
}

func (r *AuthRepository) Register(user *entities.UserDao) error {
	return r.Mongo.Create(user)
}

func (r *AuthRepository) Login(user *entities.UserDao) (*entities.UserDao, error) {
	result := new(entities.UserDao)

	if err := r.Mongo.Find(user, result); err != nil {
		return nil, err
	}

	return result, nil
}
