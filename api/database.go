package main

import (
	"gorm.io/gorm"
	database "test/db"
	models "test/models"
)

func SetupDatabase() *gorm.DB {
	db := database.ConnectDB()
	db.AutoMigrate(&models.Job{})
	return db
}
