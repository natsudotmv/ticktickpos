package handlers

import (
	"encoding/json"
	"net/http"

	"github.com/natsudotmv/ticktickpos/internal/database"
	"github.com/natsudotmv/ticktickpos/internal/models"
)

func GetMenu(w http.ResponseWriter, r *http.Request) {
	var categories []models.MenuCategory

	err := database.DB.Preload("Items").Find(&categories).Error
	if err != nil {
		http.Error(w, "Failed to retrieve menu", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(categories)
}
