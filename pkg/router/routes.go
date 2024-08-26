package router

import (
	"context"
	"log/slog"
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/render"
	"github.com/mainanick/WeRank/internal/config"
	"github.com/mainanick/WeRank/pkg/binding"
	"github.com/mainanick/dataforseo"
)

func V1APIRouter(c *config.Config) chi.Router {
	r := chi.NewRouter()
	r.Post("/keywords", KeywordHandler)

	return r
}

func DataForSEOClient(c *config.Config) *dataforseo.Client {
	// dataforseo.DefaultBaseURL = "https://sandbox.dataforseo.com/v3/"
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

type KeywordForKeywordResponse struct {
	Results []dataforseo.SiteKeywordResult `json:"results,omitempty"`
}

func KeywordHandler(w http.ResponseWriter, r *http.Request) {
	c := config.Get()
	client := DataForSEOClient(c)

	body := &KeywordForKeywordRequest{}
	if err := binding.ShouldBindJSON(r.Body, body); err != nil {
		slog.Error("Error Binding JSON ", err)
		render.Status(r, http.StatusBadRequest)
		render.JSON(w, r, err)
		return
	}

	d := dataforseo.KeywordForKeywordRequest{
		Keywords:     body.Keywords,
		LocationName: body.LocationName,
	}
	if body.DateFrom != "" {
		d.DateFrom = body.DateFrom
	}
	keywords, err := client.Keyword.KeywordsForKeywords(context.TODO(), d)
	if err != nil {
		slog.Error("DataForSEO Client Error: ", err)
	}
	res := &KeywordForKeywordResponse{}
	for _, t := range keywords.Tasks {
		res.Results = t.Result
	}

	render.Status(r, http.StatusOK)
	render.JSON(w, r, res)
}
