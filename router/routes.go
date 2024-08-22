package router

import (
	"context"
	"log/slog"
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/mainanick/WeRank/config"
	"github.com/mainanick/dataforseo"
)

func V1APIRouter(c *config.Config) chi.Router {
	r := chi.NewRouter()
	r.Get("/", func(w http.ResponseWriter, r *http.Request) {
		dataforseo.DefaultBaseURL = "https://sandbox.dataforseo.com/v3/"
		client := dataforseo.NewClient(nil).WithAuthToken(c.DataForSEO.Username, c.DataForSEO.Password)
		keywords, err := client.Keyword.GoogleSiteKeywords(context.TODO(), dataforseo.SiteKeywordRequest{
			Target:       "safaribookings.com",
			LocationName: "United States",
		})

		if err != nil {
			slog.Error("DataForSEO Client Error: ", err)
		}

		for _, t := range keywords.Tasks {
			for _, i := range t.Result {
				slog.Debug(i.Keyword)
			}

		}
		w.Write([]byte("api."))
	})

	return r
}
