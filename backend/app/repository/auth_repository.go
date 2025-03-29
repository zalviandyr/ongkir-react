package repository

import (
	"errors"
	"ongkir-go/app/data"
	"ongkir-go/app/entities"
	"ongkir-go/config"

	"go.mongodb.org/mongo-driver/v2/mongo"
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
	result, _ := r.Login(user)
	if result == nil {
		return r.Mongo.Create(user)
	}

	return &data.BadRequestError{
		Message: "username has been created",
	}
}

func (r *AuthRepository) Login(user *entities.UserDao) (*entities.UserDao, error) {
	result := new(entities.UserDao)

	if err := r.Mongo.Find(user, result); err != nil {
		if errors.Is(err, mongo.ErrNoDocuments) {
			return nil, &data.NotFoundError{
				Message: "username or password not found",
			}
		}

		return nil, err
	}

	return result, nil
}
