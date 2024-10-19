package main

import (
	"log"

	"github.com/mattcullenmeyer/zendog/pkg/routes"
)

func runRouter() {
	router := routes.RegisterRoutes()

	err := router.Run(":8888")

	if err != nil {
		log.Fatal(err)
	}
}

func main() {
	runRouter()
}
