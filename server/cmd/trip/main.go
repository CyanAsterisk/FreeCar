package main

import (
	"log"

	trip "github.com/CyanAsterisk/FreeCar/server/cmd/trip/kitex_gen/trip/tripservice"
)

func main() {
	svr := trip.NewServer(new(TripServiceImpl))

	err := svr.Run()
	if err != nil {
		log.Println(err.Error())
	}
}
