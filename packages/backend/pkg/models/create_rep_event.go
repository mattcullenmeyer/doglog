package models

import (
	"fmt"
	"os"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/service/dynamodb"
	"github.com/aws/aws-sdk-go/service/dynamodb/dynamodbattribute"
	"github.com/mattcullenmeyer/zendog/pkg/utils"
)

type CreateRepEventParams struct {
	StartUtc int
	Day      string
	Start    string
	Duration int
	Goal     int
	Success  bool
	Comment  string
	Behavior []string
	User     string
}

type CreateRepEventAttributes struct {
	PK       string   `dynamodbav:"PK"`
	SK       string   `dynamodbav:"SK"`
	Type     string   `dynamodbav:"type"`
	Day      string   `dynamodbav:"day"`
	Start    string   `dynamodbav:"start"`
	StartUtc int      `dynamodbav:"start_utc"`
	Duration int      `dynamodbav:"duration"`
	Goal     int      `dynamodbav:"goal"`
	Success  bool     `dynamodbav:"success"`
	Comment  string   `dynamodbav:"comment"`
	Behavior []string `dynamodbav:"behavior"`
	User     string   `dynamodbav:"user"`
}

func CreateRepEvent(args CreateRepEventParams) error {
	svc := utils.DynamodbClient()
	tableName := os.Getenv("DYNAMODB_TABLE_NAME")

	PK := fmt.Sprintf("EVENT#%s", args.Day)
	SK := fmt.Sprintf("EVENT#%d", args.StartUtc)

	attributes := CreateRepEventAttributes{
		PK:       PK,
		SK:       SK,
		Type:     "rep",
		Day:      args.Day,
		Start:    args.Start,
		StartUtc: args.StartUtc,
		Duration: args.Duration,
		Goal:     args.Goal,
		Success:  args.Success,
		Comment:  args.Comment,
		Behavior: args.Behavior,
		User:     args.User,
	}

	values, err := dynamodbattribute.MarshalMap(attributes)
	if err != nil {
		return err
	}

	// technically should be transaction where I check if SK already exists
	input := &dynamodb.PutItemInput{
		TableName: aws.String(tableName),
		Item:      values,
	}

	_, err = svc.PutItem(input)
	if err != nil {
		return err
	}

	return nil
}
