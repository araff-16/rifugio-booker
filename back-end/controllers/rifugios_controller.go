package controllers

import (
	"context"
	"time"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type RifugioController struct {
	Client *mongo.Client // <-- the dependency we are injecting
}

// GET /rifugios
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

// GET /rifugios/:id
func (rc *RifugioController) GetRifugio(c *gin.Context) {
	collection := rc.Client.Database("rifugio-booker").Collection("rifugio")

	id := c.Param("id")
	objID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		c.JSON(400, gin.H{"error": "Invalid ID"})
		return
	}

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	var rifugio bson.M
	err = collection.FindOne(ctx, bson.M{"_id": objID}).Decode(&rifugio)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			c.JSON(404, gin.H{"error": "Rifugio not found"})
			return
		}
		c.JSON(500, gin.H{"error": "Failed to fetch rifugio"})
		return
	}

	c.JSON(200, rifugio)
}
