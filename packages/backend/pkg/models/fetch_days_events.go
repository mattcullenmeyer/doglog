package models

import (
	"fmt"
	"os"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/service/dynamodb"
	"github.com/aws/aws-sdk-go/service/dynamodb/dynamodbattribute"
	"github.com/aws/aws-sdk-go/service/dynamodb/expression"
	"github.com/mattcullenmeyer/zendog/pkg/utils"
)

type FetchTodaysEventsParams struct {
	Day string
}

type Event struct {
	Type     string   `json:"type" dynamodbav:"type"`
	Start    string   `json:"start" dynamodbav:"start"`
	End      string   `json:"end" dynamodbav:"end"`
	Duration int      `json:"duration" dynamodbav:"duration"`
	Goal     int      `json:"goal" dynamodbav:"goal"`
	Success  bool     `json:"success" dynamodbav:"success"`
	Comment  string   `json:"comment" dynamodbav:"comment"`
	Behavior []string `json:"behavior" dynamodbav:"behavior"`
}

func FetchDaysEvents(args FetchTodaysEventsParams) ([]Event, error) {
	svc := utils.DynamodbClient()
	tableName := os.Getenv("DYNAMODB_TABLE_NAME")

	events := []Event{}

	pk := fmt.Sprintf("EVENT#%s", args.Day)
	pkCondition := expression.Key("PK").Equal(expression.Value(pk))

	expr, err := expression.NewBuilder().WithKeyCondition(pkCondition).Build()
	if err != nil {
		return events, err
	}

	input := &dynamodb.QueryInput{
		TableName:                 aws.String(tableName),
		KeyConditionExpression:    expr.KeyCondition(),
		ExpressionAttributeNames:  expr.Names(),
		ExpressionAttributeValues: expr.Values(),
		ScanIndexForward:          aws.Bool(false),
	}

	queryOutput, err := svc.Query(input)
	if err != nil {
		return events, err
	}

	if len(queryOutput.Items) == 0 {
		return events, nil
	}

	for _, item := range queryOutput.Items {
		var event Event
		if err := dynamodbattribute.UnmarshalMap(item, &event); err != nil {
			return events, err
		}

		events = append(events, event)
	}

	return events, nil
}
