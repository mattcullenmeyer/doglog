package models

import (
	"os"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/service/dynamodb"
	"github.com/aws/aws-sdk-go/service/dynamodb/dynamodbattribute"
	"github.com/mattcullenmeyer/zendog/pkg/utils"
)

type UpdateLastRepParams struct {
	EndUtc int
}

type UpdateLastRepAttributes struct {
	PK     string `dynamodbav:"PK"`
	SK     string `dynamodbav:"SK"`
	EndUtc int    `dynamodbav:"end_utc"`
}

func UpdateLastRep(args UpdateLastRepParams) error {
	svc := utils.DynamodbClient()
	tableName := os.Getenv("DYNAMODB_TABLE_NAME")

	attributes := UpdateLastRepAttributes{
		PK:     "LASTREP",
		SK:     "LASTREP",
		EndUtc: args.EndUtc,
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
