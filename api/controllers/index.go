package controllers

import (
	"github.com/gin-gonic/gin"
)

func ShowIndexPage(c *gin.Context) {
	c.JSON(200, gin.H{
		"message": "server is working fine!",
	})
}
