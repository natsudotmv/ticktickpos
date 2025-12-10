package main

import (
	"fmt"
	"net/http"

	"github.com/natsudotmv/ticktickpos/internal/config"
	"github.com/natsudotmv/ticktickpos/internal/database"
	"github.com/natsudotmv/ticktickpos/internal/handlers"
)

var handleRoot = handlers.HandleRoot

func main() {
	// Load configuration and connect to the database
	cfg := config.LoadConfig()
	db := database.ConnectPostgresDb(cfg)
	database.RunMigrations(db, "internal/database/migrations.sql")

	// Set up HTTP server and routes
	mux := http.NewServeMux()
	mux.HandleFunc("/", handleRoot)

	fmt.Println("Server listening on :8080")
	http.ListenAndServe(":8080", mux)
}
