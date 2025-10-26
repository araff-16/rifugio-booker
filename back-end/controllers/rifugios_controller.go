package controllers

import (
	"github.com/gin-gonic/gin"
  "context"
  "time"
	"go.mongodb.org/mongo-driver/bson"
  "go.mongodb.org/mongo-driver/mongo"
)

type RifugioController struct {
	Client *mongo.Client // <-- the dependency we are injecting
}

// GET /users
func (rc *RifugioController) GetRifugios(c *gin.Context) {

	collection := rc.Client.Database("rifugio-booker").Collection("rifugio")

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	cursor, err := collection.Find(ctx, bson.M{})
	if err != nil {
		c.JSON(500, gin.H{"error": "Failed to fetch rifugios"})
		return
	}
	defer cursor.Close(ctx)

var rifugios []bson.M
if err := cursor.All(ctx, &rifugios); err != nil {
    c.JSON(500, gin.H{"error": "Failed to parse rifugios"})
    return
}

	c.JSON(200, rifugios)
}

// GET /users/:id
// func GetRifugio(c *gin.Context) {
// 	id := c.Param("id")
// 	user := gin.H{
// 		"id":    id,
// 		"name":  "Alex Raffa",
// 		"email": "alex@example.com",
// 	}
// 	c.JSON(http.StatusOK, user)
// }
