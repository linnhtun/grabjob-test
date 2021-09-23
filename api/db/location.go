package db

import (
	"context"
	"fmt"
	"gorm.io/gorm"
	"gorm.io/gorm/clause"
)

type Location struct {
	Lat, Lng int
}

func (loc Location) GormDataType() string {
	return "point"
}

func (loc Location) GormValue(ctx context.Context, db *gorm.DB) clause.Expr {
	return clause.Expr{
		SQL:  "ST_GeomFromText(?, 4326)",
		Vars: []interface{}{fmt.Sprintf("POINT(%d %d)", loc.Lat, loc.Lng)},
	}
}

// Scan implements the sql.Scanner interface
func (loc *Location) Scan(value interface{}) error {
	return nil
}
