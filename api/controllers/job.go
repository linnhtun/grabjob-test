package controllers

import (
	"strconv"
	models "test/models"

	"github.com/gin-gonic/gin"
)

func ShowNearByJobs(c *gin.Context) {
	// ipAddr := c.ClientIP()
	radius, _ := strconv.Atoi(c.DefaultQuery("radius", "5"))
	point := c.DefaultQuery("p", "0,0")
	page, _ := strconv.Atoi(c.DefaultQuery("page", "0"))
	limit, _ := strconv.Atoi(c.DefaultQuery("limit", "5"))
	title := c.DefaultQuery("title", "")
	jobs, hasMore := new(models.Job).FindNearByJobsWithTitle(title, point, radius, page, limit)

	c.JSON(200, gin.H{
		"success": true,
		"jobs":    jobs,
		"hasMore": hasMore,
	})
}
