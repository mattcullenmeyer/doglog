package models

import (
	"fmt"
	"os"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/service/dynamodb"
	"github.com/aws/aws-sdk-go/service/dynamodb/dynamodbattribute"
	"github.com/mattcullenmeyer/zendog/pkg/utils"
)

type CreateRepParams struct {
	StartUtc string
	Day      string
	Start    string
	End      string
	Duration string
	Goal     string
}

type DyanmoDbAttributes struct {
	PK       string `dynamodbav:"PK"`
	SK       string `dynamodbav:"SK"`
	Day      string `dynamodbav:"Day"`
	Start    string `dynamodbav:"Start"`
	End      string `dynamodbav:"End"`
	Duration string `dynamodbav:"Duration"`
	Goal     string `dynamodbav:"Goal"`
}

func CreateRep(args CreateRepParams) error {
	svc := utils.DynamodbClient()
	tableName := os.Getenv("DYNAMODB_TABLE_NAME")

	PK := fmt.Sprintf("EVENT#%s", args.Day)
	SK := fmt.Sprintf("REP#%s", args.StartUtc)

	repAttributes := DyanmoDbAttributes{
		PK:       PK,
		SK:       SK,
		Day:      args.Day,
		Start:    args.Start,
		End:      args.End,
		Duration: args.Duration,
		Goal:     args.Goal,
	}

	repItem, err := dynamodbattribute.MarshalMap(repAttributes)
	if err != nil {
		return err
	}

	input := &dynamodb.PutItemInput{
		TableName: aws.String(tableName),
		Item:      repItem,
	}

	_, err = svc.PutItem(input)
	if err != nil {
		return err
	}

	return nil
}
