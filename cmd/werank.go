package main

import (
	"fmt"
	"log"
	"os"

	werank "github.com/mainanick/WeRank"
	"github.com/urfave/cli/v2"
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
					config := &werank.Config{
						Debug: cCtx.Bool("debug"),
					}
					return werank.Run(config)
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
