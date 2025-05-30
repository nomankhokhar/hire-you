package handler

import (
	"code_runner/service"
	"code_runner/types"

	"github.com/gin-gonic/gin"
)

func RunCodeHandler(c *gin.Context) {
	var codeRunner types.CodeRunner
	if err := c.ShouldBindJSON(&codeRunner); err != nil {
		c.JSON(400, gin.H{
			"error": "Invalid request payload",
		})
		return
	}

	output, err := service.RunCode(codeRunner)

	if err != nil {
		c.JSON(500, gin.H{
			"error":   "Failed to run code",
			"details": err.Error(),
		})
		return
	}

	c.JSON(200, gin.H{
		"output": output,
	})

}
