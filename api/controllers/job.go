package controllers

import (
	"strconv"
	models "test/models"
	utils "test/utils"

	"github.com/gin-gonic/gin"
)

func ShowNearByJobs(c *gin.Context) {
	ipAddr := c.ClientIP()
	radius, _ := strconv.Atoi(c.DefaultQuery("radius", "5"))
	page, _ := strconv.Atoi(c.DefaultQuery("page", "0"))
	limit, _ := strconv.Atoi(c.DefaultQuery("limit", "5"))
	title := c.DefaultQuery("title", "")
	lat := c.DefaultQuery("lat", "")
	lng := c.DefaultQuery("lng", "")

	if lat == "" {
		lat, lng = utils.GetIPGeo(ipAddr)
	}

	jobs, hasMore := new(models.Job).FindNearByJobsWithTitle(title, lat, lng, radius, page, limit)

	c.JSON(200, gin.H{
		"success": true,
		"jobs":    jobs,
		"lat":     lat,
		"lng":     lng,
		"hasMore": hasMore,
	})
}
