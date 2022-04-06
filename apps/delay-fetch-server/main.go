package main

import (
	"encoding/json"
	"log"
	"net/http"
	"time"
)

type ResponseBody struct {
	Time    time.Time     `json:"time"`
	Message string        `json:"message"`
	Delay   time.Duration `json:"duration"`
}

func main() {
	mux := http.NewServeMux()
	mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("Hello World!"))
	})
	mux.HandleFunc("/with-delay", func(w http.ResponseWriter, r *http.Request) {

		logRequest(r)

		delay, err := time.ParseDuration(r.URL.Query().Get("d"))
		if err != nil {
			w.Write([]byte("Error: " + err.Error()))
		}

		time.Sleep(delay)

		result := ResponseBody{
			Delay:   delay,
			Time:    time.Now(),
			Message: "Hello World!",
		}

		logResponse(r, result)

		// write response as json
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		json.NewEncoder(w).Encode(result)
	})

	// start http server
	log.Printf("run server on port 8080")
	err := http.ListenAndServe(":8080", mux)
	if err != nil {
		log.Fatalln("error on server run", err)
	}
}

func logRequest(r *http.Request) {
	// log request
	log.Printf("request: %s %s", r.Method, r.URL)
}

func logResponse(r *http.Request, result ResponseBody) {
	// log response
	log.Printf("response: %s %s %s %s %s %s", r.Method, r.URL, result.Time, result.Message, result.Delay, result.Time.Add(result.Delay))
}
