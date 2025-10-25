package main

import (
	"github.com/gin-gonic/gin"
	"github.com/araff-16/rifugio-booker/back-end/controllers"
)

func main() {
	r := gin.Default()

	// Routes
	r.GET("/users", controllers.GetUsers)
	r.GET("/users/:id", controllers.GetUser)

	// Health check
	r.GET("/health", func(c *gin.Context) {
		c.JSON(200, gin.H{"status": "ok"})
	})

	// Start server
	r.Run(":8080")
}