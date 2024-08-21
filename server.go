package werank

import (
	"embed"
	"fmt"
	"io/fs"
	"log"
	"log/slog"
	"net/http"

	"github.com/go-chi/chi/v5"
)

//go:embed frontend/out/*
var nextFS embed.FS

type Config struct {
	log   *log.Logger
	Debug bool
}

func Run(c *Config) error {
	if c.Debug {
		slog.SetLogLoggerLevel(slog.LevelDebug)
	}

	r := chi.NewRouter()
	r.Get("/api", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("api."))
	})

	spaFS, _ := fs.Sub(nextFS, "out")
	r.Handle("/*", http.FileServerFS(spaFS))

	slog.Debug("starting server")
	return http.ListenAndServe(":3333", r)
}

func SPAHandler() http.HandlerFunc {
	spaFS, err := fs.Sub(nextFS, "out")
	if err != nil {
		panic(fmt.Errorf("failed getting the sub tree for the site files: %w", err))
	}
	return func(w http.ResponseWriter, r *http.Request) {
		http.StripPrefix("frontend/out", http.FileServerFS(spaFS)).ServeHTTP(w, r)
	}
}
