package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/mattcullenmeyer/zendog/pkg/models"
)

// const date = new Date()
// date.getTime()
// date.toLocaleString().split(',')[0]
// date.toLocaleString()

type AddRepEventPayload struct {
	StartUtc string   `json:"start_utc" binding:"required"`
	Day      string   `json:"day" binding:"required"`
	Start    string   `json:"start" binding:"required"`
	End      string   `json:"end" binding:"required"`
	Duration string   `json:"duration" binding:"required"`
	Goal     string   `json:"goal" binding:"required"`
	Success  *bool    `json:"success" binding:"required"`
	Comment  string   `json:"comment" binding:"required"`
	Behavior []string `json:"behavior" binding:"required"`
}

func AddRepEvent(c *gin.Context) {
	var payload AddRepEventPayload

	if err := c.ShouldBindJSON(&payload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	createRepEventArgs := models.CreateRepEventParams{
		StartUtc: payload.StartUtc,
		Day:      payload.Day,
		Start:    payload.Start,
		End:      payload.End,
		Duration: payload.Duration,
		Goal:     payload.Goal,
		Success:  *payload.Success,
		Comment:  payload.Comment,
		Behavior: payload.Behavior,
	}

	if err := models.CreateRepEvent(createRepEventArgs); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "success"})
}
