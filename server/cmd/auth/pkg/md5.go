package pkg

import (
	"crypto/md5"
	"fmt"
	"strings"
)

// Md5Crypt uses MD5 encryption algorithm to add salt encryption.
func Md5Crypt(str string, salt ...interface{}) (CryptStr string) {
	if l := len(salt); l > 0 {
		slice := make([]string, l+1)
		str = fmt.Sprintf(str+strings.Join(slice, "%v"), salt...)
	}
	return fmt.Sprintf("%x", md5.Sum([]byte(str)))
}
