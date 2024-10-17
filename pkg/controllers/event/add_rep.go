package eventController

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type AddRepPayload struct {
	StartTime string `json:"start_time" binding:"required"`
	EndTime   string `json:"end_time" binding:"required"`
	Goal      string `json:"goal" binding:"required"`
}

func AddRep(c *gin.Context) {
	var payload AddRepPayload

	if err := c.ShouldBindJSON(&payload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	startTime := payload.StartTime

	c.JSON(http.StatusCreated, gin.H{"message": startTime})
}
