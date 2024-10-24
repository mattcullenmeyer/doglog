package models

import (
	"os"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/service/dynamodb"
	"github.com/aws/aws-sdk-go/service/dynamodb/dynamodbattribute"
	"github.com/aws/aws-sdk-go/service/dynamodb/expression"
	"github.com/mattcullenmeyer/zendog/pkg/utils"
)

type LastRep struct {
	EndUtc int `dynamodbav:"end_utc"`
}

func FetchLastRep() (LastRep, error) {
	svc := utils.DynamodbClient()
	tableName := os.Getenv("DYNAMODB_TABLE_NAME")

	lastRep := LastRep{}

	pkCondition := expression.Key("PK").Equal(expression.Value("LASTREP"))
	skCondition := expression.Key("SK").Equal(expression.Value("LASTREP"))
	keyCondition := pkCondition.And(skCondition)

	expr, err := expression.NewBuilder().
		WithKeyCondition(keyCondition).
		Build()
	if err != nil {
		return lastRep, err
	}

	input := &dynamodb.QueryInput{
		TableName:                 aws.String(tableName),
		KeyConditionExpression:    expr.KeyCondition(),
		ExpressionAttributeNames:  expr.Names(),
		ExpressionAttributeValues: expr.Values(),
	}

	queryOutput, err := svc.Query(input)
	if err != nil {
		return lastRep, err
	}

	if len(queryOutput.Items) == 0 {
		return lastRep, nil
	}

	if err = dynamodbattribute.UnmarshalMap(queryOutput.Items[0], &lastRep); err != nil {
		return lastRep, err
	}

	return lastRep, nil
}
