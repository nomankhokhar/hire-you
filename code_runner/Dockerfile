# Use official Golang image
FROM golang:1.23

# Set work directory
WORKDIR /app

# Install JS (Node), Python, Java
RUN apt-get update && apt-get install -y \
    curl python3 python3-pip openjdk-17-jdk gnupg2 \
    && curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs \
    && apt-get clean

# Set environment variables for Java
ENV JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64
ENV PATH=$JAVA_HOME/bin:$PATH

# Copy go mod files first for caching
COPY go.mod go.sum ./
RUN go mod download

# Copy the source code
COPY . .

# Build Go app
RUN go build -o main .

# Expose API port
EXPOSE 8080

# Run the Go binary
CMD ["./main"]
