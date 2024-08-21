package main

import (
	"fmt"
	"log"
	"log/slog"
	"net/http"
	"os"

	"github.com/go-chi/chi/v5"
	"github.com/urfave/cli/v2"
)

func serve() error {
	r := chi.NewRouter()
	r.Get("/", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("root."))
	})

	return http.ListenAndServe(":3333", r)
}

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
					if cCtx.Bool("debug") {
						slog.SetLogLoggerLevel(slog.LevelDebug)
					}
					slog.Debug("starting server")
					return serve()
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
