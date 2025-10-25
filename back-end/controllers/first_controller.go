package controllers

import (
	"net/http"
	"github.com/gin-gonic/gin"
)

// GET /users
func GetUsers(c *gin.Context) {
	users := []gin.H{
		{"id": "1", "name": "Alex", "email": "alex@example.com"},
		{"id": "2", "name": "Maria", "email": "maria@example.com"},
	}
	c.JSON(http.StatusOK, users)
}

// GET /users/:id
func GetUser(c *gin.Context) {
	id := c.Param("id")
	user := gin.H{
		"id":    id,
		"name":  "Alex Raffa",
		"email": "alex@example.com",
	}
	c.JSON(http.StatusOK, user)
}