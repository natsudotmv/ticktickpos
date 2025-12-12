package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"time"
)

func HandleRoot(
	w http.ResponseWriter,
	r *http.Request,
) {
	fmt.Fprintf(w, "Hello World")
}

func HealthCheckHandler(
	w http.ResponseWriter,
	r *http.Request,
) {
	w.Header().Set("Content-Type", "application/json")

	resp := map[string]interface{}{
		"status":    "ok",
		"timestamp": time.Now(),
	}

	json.NewEncoder(w).Encode(resp)
}
