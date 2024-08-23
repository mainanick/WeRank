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
	r.Get("/keywords", KeywordHandler)

	return r
}

func DataForSEOClient(c *config.Config) *dataforseo.Client {
	dataforseo.DefaultBaseURL = "https://sandbox.dataforseo.com/v3/"
	client := dataforseo.NewClient(nil).WithAuthToken(c.DataForSEO.Username, c.DataForSEO.Password)
	return client
}

type KeywordForKeywordRequest struct {
	Keywords             []string `json:"keywords"`
	LocationName         string   `json:"location_name,omitempty"`
	LanguageName         string   `json:"language_name,omitempty"`
	SearchPartners       bool     `json:"search_partners,omitempty"`
	DateFrom             string   `json:"date_from,omitempty"`
	DateTo               string   `json:"date_to,omitempty"`
	IncludeAdultKeywords bool     `json:"include_adult_keywords,omitempty"`
	SortBy               string   `json:"sort_by,omitempty"`
}

func KeywordHandler(w http.ResponseWriter, r *http.Request) {
	c := config.Get()
	client := DataForSEOClient(c)
	keywords, err := client.Keyword.KeywordsForKeywords(context.TODO(), dataforseo.KeywordForKeywordRequest{
		Keywords:     []string{"github.com"},
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
}
