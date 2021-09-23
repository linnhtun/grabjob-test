package models

import (
	database "test/db"

	"gorm.io/gorm/clause"
)

type Job struct {
	ID    uint   `json:"id:"`
	Title string `json:"title" gorm:"size:1000"`
	Loc   database.Location
	Lat   string `json:"lat" gorm:"size:20"`
	Lng   string `json:"lng" gorm:"size:20"`
}

func (job *Job) FindNearByJobsWithTitle(title string, point string, radius int, page int, limit int) ([]Job, bool) {
	var jobs []Job
	db := database.ConnectDB()
	point = "POINT(" + point + ")"
	builder := db.Clauses(
		clause.OrderBy{
			Expression: clause.Expr{SQL: "ST_Distance_Sphere(loc, ST_GeomFromText(?, 4326))", Vars: []interface{}{point}},
		})

	if radius > 0 {
		builder.Where(
			"ST_Distance_Sphere(loc, ST_GeomFromText(?, 4326)) <= ?", point, radius*1000,
		)
	}

	if title != "" {
		builder.Where("title LIKE ?", "%"+title+"%")
	}
	builder.Limit(limit).Offset(page * limit).Find(&jobs)

	return jobs, len(jobs) == limit
}
