# Requires

This server is written in Go.

In order to run it, you need to have a golang compiler installed.
You can find it on https://go.dev/

# Usage

Run command:
```$ go run main.go```

# API

Example of an API call:
```
http://localhost:8080/with-delay?d=3s
```

Where `d` is a duration of the delay.
