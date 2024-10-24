package models

import (
	"fmt"
	"os"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/service/dynamodb"
	"github.com/aws/aws-sdk-go/service/dynamodb/dynamodbattribute"
	"github.com/mattcullenmeyer/zendog/pkg/utils"
)

type UpdateDaysStatsParams struct {
	Day             string
	RepCount        int
	SuccessCount    int
	AverageDuration int
}

type UpdateDaysStatsAttributes struct {
	PK              string `dynamodbav:"PK"`
	SK              string `dynamodbav:"SK"`
	RepCount        int    `dynamodbav:"rep_count"`
	SuccessCount    int    `dynamodbav:"success_count"`
	AverageDuration int    `dynamodbav:"average_duration"`
}

func UpdateDaysStats(args UpdateDaysStatsParams) error {
	svc := utils.DynamodbClient()
	tableName := os.Getenv("DYNAMODB_TABLE_NAME")

	PK := fmt.Sprintf("EVENT#%s", args.Day)
	SK := fmt.Sprintf("STATS#%s", args.Day)

	attributes := UpdateDaysStatsAttributes{
		PK:              PK,
		SK:              SK,
		RepCount:        args.RepCount,
		SuccessCount:    args.SuccessCount,
		AverageDuration: args.AverageDuration,
	}

	values, err := dynamodbattribute.MarshalMap(attributes)
	if err != nil {
		return err
	}

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
