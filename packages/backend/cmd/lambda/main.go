package main

import (
	"context"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	ginadapter "github.com/awslabs/aws-lambda-go-api-proxy/gin"
	"github.com/mattcullenmeyer/zendog/pkg/routes"
)

var ginLambda *ginadapter.GinLambda

// https://github.com/awslabs/aws-lambda-go-api-proxy#gin
func Handler(ctx context.Context, req events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	router := routes.RegisterRoutes()
	ginLambda = ginadapter.New(router)

	return ginLambda.ProxyWithContext(ctx, req)
}

func main() {
	lambda.Start(Handler)
}
