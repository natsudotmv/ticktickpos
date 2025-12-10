package main

import (
	"fmt"
	"net/http"

	"github.com/natsudotmv/ticktickpos/internal/config"
	"github.com/natsudotmv/ticktickpos/internal/database"
	"github.com/natsudotmv/ticktickpos/internal/handlers"
	"github.com/natsudotmv/ticktickpos/internal/models"
)

func main() {
	// Load configuration and connect to the database
	cfg := config.LoadConfig()
	database.ConnectPostgredDb(cfg)

	// Run migrations and seed the database
	database.DB.AutoMigrate(&models.MenuCategory{}, &models.MenuItem{})
	database.SeedDatabase()

	// Set up HTTP server and routes
	mux := http.NewServeMux()
	mux.HandleFunc("/", handlers.HandleRoot)
	mux.HandleFunc("/menu", handlers.GetMenu)

	fmt.Println("Server listening on :8080")
	http.ListenAndServe(":8080", mux)
}
