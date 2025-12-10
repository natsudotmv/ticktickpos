package database

import (
	"database/sql"
	"log"
	"os"
)

func RunMigrations(db *sql.DB, migrationFilePath string) {
	data, err := os.ReadFile(migrationFilePath)
	if err != nil {
		log.Fatalf("Failed to read migration file: %v", err)
	}

	_, err = db.Exec(string(data))
	if err != nil {
		log.Fatalf("Failed to execute migrations: %v", err)
	}

	log.Println("Database migrations applied successfully.")
}
