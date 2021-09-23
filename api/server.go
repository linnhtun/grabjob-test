package main

import (
	"github.com/gin-gonic/gin"
	"log"
	routes "test/routes"
)

func main() {
	router := gin.Default()
	routes.SetupRouter(router)

	SetupDatabase()

	log.Print("Listening for requests in :3000")
	router.Run(":3000")
}
