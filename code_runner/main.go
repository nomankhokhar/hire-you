package main

import (
	"code_runner/handler"

	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()

	r.GET("/ping", pingHandler)
	r.POST("/run", handler.RunCodeHandler)

	r.Run(":8080")
}

func pingHandler(c *gin.Context) {
	c.JSON(200, gin.H{
		"message": "pong",
	})
}
