package main

import (
	"fmt"
	"net/http"

	"github.com/natsudotmv/ticktickpos/internal/handlers"
)

var handleRoot = handlers.HandleRoot

func main() {
	mux := http.NewServeMux()
	mux.HandleFunc("/", handleRoot)

	fmt.Println("Server listening on :8080")
	http.ListenAndServe(":8080", mux)
}
