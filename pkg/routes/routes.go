package routes

import (
	"net/http"

	"github.com/gin-gonic/gin"
	eventController "github.com/mattcullenmeyer/zendog/pkg/controllers/event"
)

func RegisterRoutes() *gin.Engine {
	router := gin.Default()

	// middleware.CorsMiddleware(router)

	router.GET("/healthcheck", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"message": "success"})
	})

	router.POST("/event/rep", eventController.AddRep)

	return router
}
