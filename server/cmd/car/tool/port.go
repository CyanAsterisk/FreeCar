package tool

import (
	"net"

	"github.com/CyanAsterisk/FreeCar/shared/consts"
)

// GetFreePort get a free port.
func GetFreePort() (int, error) {
	addr, err := net.ResolveTCPAddr(consts.TCP, consts.FreePortAddress)
	if err != nil {
		return 0, err
	}

	l, err := net.ListenTCP(consts.TCP, addr)
	if err != nil {
		return 0, err
	}
	defer l.Close()
	return l.Addr().(*net.TCPAddr).Port, nil
}
