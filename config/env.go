package config

import (
	"context"
	"log"

	"github.com/sethvargo/go-envconfig"
)

type DataForSEOConfig struct {
	Username string `env:"DATAFORSEO_USERNAME,required"`
	Password string `env:"DATAFORSEO_PASSWORD,required"`
}

type Config struct {
	PORT         string   `env:"PORT,default=3333"`
	Debug        bool     `env:"DEBUG,default=false"`
	AllowedHosts []string `env:"ALLOWED_HOSTS,required"`
	DisableUI    bool     `env:"DISABLE_UI,default=false"`
	DataForSEO   *DataForSEOConfig
}

func Load() *Config {
	c := Config{}
	if err := envconfig.Process(context.TODO(), &c); err != nil {
		log.Fatalf("Failed to load env: %s", err)
	}
	return &c
}
