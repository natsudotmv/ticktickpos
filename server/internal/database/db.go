package database

import (
	"database/sql"
	"fmt"
	"log"

	_ "github.com/lib/pq"
	"github.com/natsudotmv/ticktickpos/internal/config"
)

func ConnectPostgresDb(cfg *config.Config) *sql.DB {
	dsn := fmt.Sprintf(
		"host=%s port=%s user=%s password=%s dbname=%s sslmode=%s",
		cfg.DBHost, cfg.DBPort, cfg.DBUser, cfg.DBPassword, cfg.DBName, cfg.DBSSLMode,
	)

	db, err := sql.Open("postgres", dsn)
	if err != nil {
		log.Fatalf("Failed to ping database: %v", err)
	}

	if err := db.Ping(); err != nil {
		log.Fatalf("Failed to connec to database: %v", err)
	}

	log.Println("Postgres connection successful")
	return db
}
