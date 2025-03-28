package config

import (
	"context"
	"fmt"
	"ongkir-go/app/entities"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
)

type Mongo struct {
	ctx      context.Context
	database *mongo.Database
}

func NewMongo(env *Environment, ctx context.Context) *Mongo {
	credential := options.Credential{
		Username: env.MONGO_USER,
		Password: env.MONGO_PASS,
	}
	uri := fmt.Sprintf("mongodb://%s:%d", env.MONGO_HOST, env.MONGO_PORT)
	clientOpts := options.Client().
		ApplyURI(uri).
		SetAuth(credential)

	client, err := mongo.Connect(clientOpts)
	if err != nil {
		panic(err)
	}

	return &Mongo{
		ctx:      ctx,
		database: client.Database(env.MONGO_DB),
	}
}

func (m *Mongo) Create(collection entities.Collection) error {
	bsonData, err := bson.Marshal(collection)
	if err != nil {
		return err
	}

	if _, err := m.database.
		Collection(collection.Name()).
		InsertOne(m.ctx, bsonData); err != nil {
		return err
	}

	return nil
}
