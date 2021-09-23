package utils

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"os"
)

type IPGeo struct {
	Ip        string
	Latitude  string
	Longitude string
}

func GetIPGeo(ipAddr string) (string, string) {
	res, err := http.Get(fmt.Sprintf("https://api.ipgeolocation.io/ipgeo?apiKey=%s&ip=%s", os.Getenv("IPGEO_APIKEY"), ipAddr))

	fmt.Print(ipAddr)
	if err != nil {
		fmt.Printf("The HTTP request failed with error %s\n", err)
	} else {
		var ipgeo IPGeo
		data, _ := ioutil.ReadAll(res.Body)
		json.Unmarshal([]byte(data), &ipgeo)

		return ipgeo.Latitude, ipgeo.Longitude
	}

	return "", ""
}
