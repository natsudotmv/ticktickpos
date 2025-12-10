FROM golang:latest

WORKDIR /app

# Install Air for hot reload
RUN go install github.com/air-verse/air@v1.63.4

COPY go.mod ./
RUN go mod tidy

COPY . .

EXPOSE 8080

CMD ["air"]