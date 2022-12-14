package main

import (
	profile "github.com/CyanAsterisk/FreeCar/server/cmd/profile/kitex_gen/profile/profileservice"
	"log"
)

func main() {
	svr := profile.NewServer(new(ProfileServiceImpl))

	err := svr.Run()

	if err != nil {
		log.Println(err.Error())
	}
}
