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

type FetchDaysStatsParams struct {
	Day string
}

type Stats struct {
	RepCount        int `json:"rep_count" dynamodbav:"rep_count"`
	SuccessCount    int `json:"success_count" dynamodbav:"success_count"`
	AverageDuration int `json:"average_duration" dynamodbav:"average_duration"`
}

func FetchDaysStats(args FetchDaysStatsParams) (Stats, error) {
	svc := utils.DynamodbClient()
	tableName := os.Getenv("DYNAMODB_TABLE_NAME")

	stats := Stats{}

	pk := fmt.Sprintf("EVENT#%s", args.Day)
	pkCondition := expression.Key("PK").Equal(expression.Value(pk))
	skCondition := expression.Key("SK").BeginsWith("STATS#")
	keyCondition := pkCondition.And(skCondition)

	expr, err := expression.NewBuilder().
		WithKeyCondition(keyCondition).
		Build()
	if err != nil {
		return stats, err
	}

	input := &dynamodb.QueryInput{
		TableName:                 aws.String(tableName),
		KeyConditionExpression:    expr.KeyCondition(),
		ExpressionAttributeNames:  expr.Names(),
		ExpressionAttributeValues: expr.Values(),
	}

	queryOutput, err := svc.Query(input)
	if err != nil {
		return stats, err
	}

	if err = dynamodbattribute.UnmarshalMap(queryOutput.Items[0], &stats); err != nil {
		return stats, err
	}

	return stats, nil
}
