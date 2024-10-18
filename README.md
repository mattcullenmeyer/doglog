# ZenDog Readme

## Local Development

Run locally  
`go run ./cmd/local/main.go`  

Build Dockerfile image  
`docker build -t zendog-image .`  

Run docker conainter  
`docker run -p 8888:8888 --name zendog-container zendog-image`  

Run docker compose  
`docker compose build && docker compose --env-file .env up`  

## Local DynamoDB Access

You will need to set AWS credentials to make requests to your local DynamoDB instance, but they can be made up values.

```bash
export AWS_REGION=us-east-2  
export AWS_ACCESS_KEY_ID=xx  
export AWS_SECRET_ACCESS_KEY=xx  
```

```bash
echo $AWS_REGION  
echo $AWS_ACCESS_KEY_ID  
echo $AWS_SECRET_ACCESS_KEY  
```

[Create DynamoDB Table](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/getting-started-step-1.html)

```bash
aws dynamodb list-tables \
  --endpoint-url http://localhost:8000
```

```bash
aws dynamodb create-table \
  --table-name zendog \
  --endpoint-url http://localhost:8000 \
  --attribute-definitions \
      AttributeName=PK,AttributeType=S \
      AttributeName=SK,AttributeType=S \
  --key-schema \
      AttributeName=PK,KeyType=HASH \
      AttributeName=SK,KeyType=RANGE \
  --region us-east-2 \
  --billing-mode PAY_PER_REQUEST \
  --table-class STANDARD
```

```bash
aws dynamodb delete-table \
  --table-name ZenDog \
  --endpoint-url http://localhost:8000
```

```bash
aws dynamodb put-item \
  --table-name zendog \
  --endpoint-url http://localhost:8000 \
  --item '{"PK": {"S": "m"}, "SK": {"S": "cm"}, "test": {"S": "test"}}'
```

```bash
aws dynamodb get-item \
  --table-name zendog \
  --endpoint-url http://localhost:8000 \
  --key '{ "PK": {"S": "m"}, "SK": {"S": "cm"}}'
```

```bash
aws dynamodb scan \
  --table-name zendog \
  --endpoint-url http://localhost:8000 \
  --output json
```

## Lambda Deployment

The executable must be in the root of the zip file — not in a folder within the zip file.  
Use the -j flag to junk directory names, otherwise lambda won't work.

GOARCH must match architecture of lambda function

[Migrating AWS Lambda Functions from the go1.x Runtime to the Custom Runtime on Amazon Linux 2](https://aws.amazon.com/blogs/compute/migrating-aws-lambda-functions-from-the-go1-x-runtime-to-the-custom-runtime-on-amazon-linux-2/)

```bash
GOARCH=arm64 GOOS=linux go build -tags lambda.norpc \
  -o ./bin/bootstrap ./cmd/lambda && \
  zip -j terraform/resources/bootstrap.zip bin/bootstrap
```

```bash
export AWS_PROFILE=personal

aws lambda update-function-code \
  --function-name zendog \
  --region us-east-2 \
  --zip-file fileb://terraform/resources/bootstrap.zip

unset AWS_PROFILE
```

## Helpful Go Commands

Add any missing module requirements  
`go mod tidy -v`  

Install a dependency  
`go get github.com/aws/aws-lambda-go/events`

## Docker Gotchas

- The dynamodb endpoint includes the name specific to its container
