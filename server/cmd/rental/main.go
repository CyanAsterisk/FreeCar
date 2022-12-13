package main

import (
	rental "github.com/CyanAsterisk/FreeCar/server/cmd/rental/kitex_gen/rental/profileservice"
	"log"
)

func main() {
	svr := rental.NewServer(new(ProfileServiceImpl))

	err := svr.Run()

	if err != nil {
		log.Println(err.Error())
	}
}
