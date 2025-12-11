package handlers

import (
	"encoding/json"
	"net/http"

	"github.com/natsudotmv/ticktickpos/internal/services"
)

type LoginRequest struct {
	Username string `json:"username"`
	Pin      string `json:"pin"`
}

type LoginResponse struct {
	Token string `json:"token"`
}

func LoginHandler(authService *services.AuthService) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var req LoginRequest
		if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
			http.Error(w, "invalid request", http.StatusBadRequest)
			return
		}

		token, err := authService.AuthenticateUser(req.Username, req.Pin)
		if err != nil {
			http.Error(w, "invalid username or pin", http.StatusUnauthorized)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(LoginResponse{Token: token})
	}
}
