package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/mattcullenmeyer/zendog/pkg/models"
)

func GetDaysEvents(c *gin.Context) {
	day := c.Query("day")

	fetchDaysEventsArgs := models.FetchTodaysEventsParams{
		Day: day,
	}

	response, err := models.FetchDaysEvents(fetchDaysEventsArgs)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"events": response})
}
