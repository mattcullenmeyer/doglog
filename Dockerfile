FROM golang:1.21.1-alpine

WORKDIR /app

COPY go.mod .
COPY go.sum .

RUN go mod download

COPY . .

RUN GOARCH=arm64 GOOS=linux go build -o ./bin/main ./cmd/local

EXPOSE 8888

CMD ["./bin/main"]
