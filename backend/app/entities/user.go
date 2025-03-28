package entities

type UserDao struct {
	Username string `bson:"username"`
	Password string `bson:"password"`
}

func (*UserDao) Name() string {
	return "user"
}

type UserDto struct {
	Username string `binding:"required" json:"name"`
	Password string `binding:"required,min=4" json:"password"`
}
