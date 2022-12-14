package main

import (
	trip "github.com/CyanAsterisk/FreeCar/server/cmd/trip/kitex_gen/trip/tripservice"
	"log"
)

func main() {
	svr := trip.NewServer(new(TripServiceImpl))

	err := svr.Run()

	if err != nil {
		log.Println(err.Error())
	}
}
