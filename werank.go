package main

import (
	"fmt"
	"log"
	"os"
	"time"

	"embed"
	"io/fs"
	"log/slog"
	"net/http"

	_ "github.com/joho/godotenv/autoload"

	"github.com/mainanick/WeRank/config"
	"github.com/mainanick/WeRank/router"
	"github.com/urfave/cli/v2"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"
)

var (
	Digital = `
 +-+-+-+-+-+-+
 |W|e|R|a|n|k|
 +-+-+-+-+-+-+
`

	Help = ""
)

func main() {
	app := &cli.App{
		Name:  "WeRank",
		Usage: "Rank High",
		Action: func(*cli.Context) error {
			fmt.Println(Digital + "\n\n" + Help)
			return nil
		},
		Commands: []*cli.Command{
			{
				Name: "start",
				Flags: []cli.Flag{
					&cli.BoolFlag{
						Name:    "debug",
						Aliases: []string{"d"},
						EnvVars: []string{"WERANK_DEBUG"},
					},
				},
				Action: func(cCtx *cli.Context) error {
					envConfig := config.Load()
					if cCtx.Bool("debug") {
						envConfig.Debug = cCtx.Bool("debug")
					}

					return Run(envConfig)
				},
			},
		},

		EnableBashCompletion: true,
		Suggest:              true,
	}

	if err := app.Run(os.Args); err != nil {
		log.Fatal(err)
	}
}

//go:embed frontend/out/*
var nextFS embed.FS

func Run(c *config.Config) error {

	if c.Debug {
		slog.SetLogLoggerLevel(slog.LevelDebug)
	}

	r := chi.NewRouter()

	r.Use(middleware.RequestID)
	r.Use(middleware.RealIP)
	r.Use(middleware.Recoverer)
	r.Use(middleware.Timeout(60 * time.Second))
	r.Use(router.Heartbeat("/.well-known/ping"))
	r.Use(router.Health("/.well-known/health"))

	maxAge := 12 * 60 * 60 * time.Second // 12hours 60 minute 60 seconds
	corz := cors.Options{
		AllowedOrigins:   config.Load().AllowedHosts,
		AllowedMethods:   []string{"GET", "POST", "PUT", "PATCH", "DELETE", "HEAD", "OPTIONS"},
		AllowedHeaders:   []string{"Origin", "Content-Length", "Content-Type"},
		ExposedHeaders:   []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           int(maxAge),
	}
	r.Use(cors.Handler(corz))

	v1 := router.V1APIRouter(c)

	r.Mount("/api/v1", v1)

	if !c.DisableUI {
		spaFS, _ := fs.Sub(nextFS, "frontend/out")
		r.Handle("/*", http.FileServerFS(spaFS))
	}

	slog.Debug("starting server")
	return http.ListenAndServe(":"+c.PORT, r)
}
