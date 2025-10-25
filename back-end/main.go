package main

import (
    "github.com/gin-gonic/gin"
    "github.com/gin-contrib/cors"
    "github.com/araff-16/rifugio-booker/back-end/controllers"
    "time"
)

func main() {
	r := gin.Default()

	 r.Use(cors.New(cors.Config{
        AllowOrigins:     []string{"http://localhost:5173"}, // your frontend
        AllowMethods:     []string{"GET", "POST", "PUT", "DELETE"},
        AllowHeaders:     []string{"Origin", "Content-Type"},
        ExposeHeaders:    []string{"Content-Length"},
        AllowCredentials: true,
        MaxAge: 12 * time.Hour,
    }))

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