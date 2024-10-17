# ZenDog Readme

## Local Development

Run locally  
`go run ./cmd/local/main.go`  

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

## Helpful Go Commands

Add any missing module requirements  
`go mod tidy -v`  

Install a dependency  
`go get github.com/aws/aws-lambda-go/events`
