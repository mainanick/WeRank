package handlers

import (
	"context"
	"errors"
	"log/slog"
	"net/http"

	"github.com/go-chi/render"
	"github.com/mainanick/WeRank/internal/config"
	"github.com/mainanick/WeRank/pkg/binding"
	"github.com/mainanick/dataforseo"
)

type H map[string]any

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

func KeywordForSiteHandler(w http.ResponseWriter, r *http.Request) {
	c := config.Get()
	client := DataForSEOClient(c)

	body := &dataforseo.GoogleLabsKeywordForSiteRequest{}
	if err := binding.ShouldBindJSON(r.Body, body); err != nil {
		slog.Error("Error Binding JSON ", "error", err)
		render.Status(r, http.StatusBadRequest)
		render.JSON(w, r, err)
		return
	}
	slog.Debug("[KeywordForSite]", "body", body)

	res, err := client.GoogleLabs.KeywordForSite(context.TODO(), body)
	if err != nil {
		DataSEOErrorResponse(w, r, err)
		return
	}

	render.Status(r, http.StatusOK)
	render.JSON(w, r, res)
}

func RelatedKeywordHandler(w http.ResponseWriter, r *http.Request) {

	c := config.Get()
	client := DataForSEOClient(c)

	body := &dataforseo.GoogleLabsRelatedKeywordsRequest{}
	if err := binding.ShouldBindJSON(r.Body, body); err != nil {
		slog.Error("Error Binding JSON ", "error", err)
		render.Status(r, http.StatusBadRequest)
		render.JSON(w, r, err)
		return
	}
	slog.Debug("[RelateKeywords]", "body", body)

	res, err := client.GoogleLabs.RelatedKeywords(context.TODO(), body)
	if err != nil {
		DataSEOErrorResponse(w, r, err)
		return
	}

	render.Status(r, http.StatusOK)
	render.JSON(w, r, res)
}

func KeywordSuggestions(w http.ResponseWriter, r *http.Request) {

	c := config.Get()
	client := DataForSEOClient(c)

	body := &dataforseo.GoogleLabsKeywordSuggestionsRequest{}
	if err := binding.ShouldBindJSON(r.Body, body); err != nil {
		slog.Error("Error Binding JSON ", "error", err)
		render.Status(r, http.StatusBadRequest)
		render.JSON(w, r, err)
		return
	}
	slog.Debug("[KeywordSuggestions]", "body", body)

	res, err := client.GoogleLabs.KeywordSuggestions(context.TODO(), body)
	if err != nil {
		DataSEOErrorResponse(w, r, err)
		return
	}

	render.Status(r, http.StatusOK)
	render.JSON(w, r, res)
}

func KeywordIdeas(w http.ResponseWriter, r *http.Request) {

	c := config.Get()
	client := DataForSEOClient(c)

	body := &dataforseo.GoogleLabsKeywordIdeasRequest{}
	if err := binding.ShouldBindJSON(r.Body, body); err != nil {
		slog.Error("Error Binding JSON ", "error", err)
		render.Status(r, http.StatusBadRequest)
		render.JSON(w, r, err)
		return
	}
	slog.Debug("[KeywordIdeas]", "body", body)

	res, err := client.GoogleLabs.KeywordIdeas(context.TODO(), body)
	if err != nil {
		DataSEOErrorResponse(w, r, err)
		return
	}

	render.Status(r, http.StatusOK)
	render.JSON(w, r, res)
}

func KeywordHistoricalSearchVolume(w http.ResponseWriter, r *http.Request) {

	c := config.Get()
	client := DataForSEOClient(c)

	body := &dataforseo.GoogleLabsHistoricalSearchVolumeRequest{}
	if err := binding.ShouldBindJSON(r.Body, body); err != nil {
		slog.Error("Error Binding JSON ", "error", err)
		render.Status(r, http.StatusBadRequest)
		render.JSON(w, r, err)
		return
	}
	slog.Debug("[KeywordHistoricalSearchVolume]", "body", body)

	res, err := client.GoogleLabs.HistoricalSearchVolume(context.TODO(), body)
	if err != nil {
		DataSEOErrorResponse(w, r, err)
		return
	}

	render.Status(r, http.StatusOK)
	render.JSON(w, r, res)
}

func BulkKeywordDifficulty(w http.ResponseWriter, r *http.Request) {

	c := config.Get()
	client := DataForSEOClient(c)

	body := &dataforseo.GoogleLabsBulkKeywordDifficultyRequest{}
	if err := binding.ShouldBindJSON(r.Body, body); err != nil {
		slog.Error("Error Binding JSON ", "error", err)
		render.Status(r, http.StatusBadRequest)
		render.JSON(w, r, err)
		return
	}
	slog.Debug("[BulkKeywordDifficulty]", "body", body)

	res, err := client.GoogleLabs.BulkKeywordDifficulty(context.TODO(), body)
	if err != nil {
		DataSEOErrorResponse(w, r, err)
		return
	}

	render.Status(r, http.StatusOK)
	render.JSON(w, r, res)
}

func SearchIntent(w http.ResponseWriter, r *http.Request) {

	c := config.Get()
	client := DataForSEOClient(c)

	body := &dataforseo.GoogleLabsSearchIntentRequest{}
	if err := binding.ShouldBindJSON(r.Body, body); err != nil {
		slog.Error("Error Binding JSON ", "error", err)
		render.Status(r, http.StatusBadRequest)
		render.JSON(w, r, err)
		return
	}
	slog.Debug("[SearchIntent]", "body", body)

	res, err := client.GoogleLabs.SearchIntent(context.TODO(), body)
	if err != nil {
		DataSEOErrorResponse(w, r, err)
		return
	}

	render.Status(r, http.StatusOK)
	render.JSON(w, r, res)
}

func RankedKeywords(w http.ResponseWriter, r *http.Request) {

	c := config.Get()
	client := DataForSEOClient(c)

	body := &dataforseo.GoogleLabsRankedKeywordsRequest{}
	if err := binding.ShouldBindJSON(r.Body, body); err != nil {
		slog.Error("Error Binding JSON ", "error", err)
		render.Status(r, http.StatusBadRequest)
		render.JSON(w, r, err)
		return
	}
	slog.Debug("[RankedKeywords]", "body", body)

	res, err := client.GoogleLabs.RankedKeywords(context.TODO(), body)
	if err != nil {
		DataSEOErrorResponse(w, r, err)
		return
	}

	render.Status(r, http.StatusOK)
	render.JSON(w, r, res)
}

func SERPCompetitors(w http.ResponseWriter, r *http.Request) {

	c := config.Get()
	client := DataForSEOClient(c)

	body := &dataforseo.GoogleLabsSERPCompetitorsRequest{}
	if err := binding.ShouldBindJSON(r.Body, body); err != nil {
		slog.Error("Error Binding JSON ", "error", err)
		render.Status(r, http.StatusBadRequest)
		render.JSON(w, r, err)
		return
	}
	slog.Debug("[SERPCompetitors]", "body", body)

	res, err := client.GoogleLabs.SERPCompetitors(context.TODO(), body)
	if err != nil {
		DataSEOErrorResponse(w, r, err)
		return
	}

	render.Status(r, http.StatusOK)
	render.JSON(w, r, res)
}

func CompetitorsDomain(w http.ResponseWriter, r *http.Request) {

	c := config.Get()
	client := DataForSEOClient(c)

	body := &dataforseo.GoogleLabsCompetitorsDomainRequest{}
	if err := binding.ShouldBindJSON(r.Body, body); err != nil {
		slog.Error("Error Binding JSON ", "error", err)
		render.Status(r, http.StatusBadRequest)
		render.JSON(w, r, err)
		return
	}
	slog.Debug("[CompetitorsDomain]", "body", body)

	res, err := client.GoogleLabs.CompetitorsDomain(context.TODO(), body)
	if err != nil {
		DataSEOErrorResponse(w, r, err)
		return
	}

	render.Status(r, http.StatusOK)
	render.JSON(w, r, res)
}

func DomainIntersection(w http.ResponseWriter, r *http.Request) {

	c := config.Get()
	client := DataForSEOClient(c)

	body := &dataforseo.GoogleLabsDomainIntersectionRequest{}
	if err := binding.ShouldBindJSON(r.Body, body); err != nil {
		slog.Error("Error Binding JSON ", "error", err)
		render.Status(r, http.StatusBadRequest)
		render.JSON(w, r, err)
		return
	}
	slog.Debug("[DomainIntersection]", "body", body)

	res, err := client.GoogleLabs.DomainIntersection(context.TODO(), body)
	if err != nil {
		DataSEOErrorResponse(w, r, err)
		return
	}

	render.Status(r, http.StatusOK)
	render.JSON(w, r, res)
}

func Subdomains(w http.ResponseWriter, r *http.Request) {

	c := config.Get()
	client := DataForSEOClient(c)

	body := &dataforseo.GoogleLabsSubdomainsRequest{}
	if err := binding.ShouldBindJSON(r.Body, body); err != nil {
		slog.Error("Error Binding JSON ", "error", err)
		render.Status(r, http.StatusBadRequest)
		render.JSON(w, r, err)
		return
	}
	slog.Debug("[Subdomains]", "body", body)

	res, err := client.GoogleLabs.Subdomains(context.TODO(), body)
	if err != nil {
		DataSEOErrorResponse(w, r, err)
		return
	}

	render.Status(r, http.StatusOK)
	render.JSON(w, r, res)
}

func RelevantPages(w http.ResponseWriter, r *http.Request) {

	c := config.Get()
	client := DataForSEOClient(c)

	body := &dataforseo.GoogleLabsRelevantPagesRequest{}
	if err := binding.ShouldBindJSON(r.Body, body); err != nil {
		slog.Error("Error Binding JSON ", "error", err)
		render.Status(r, http.StatusBadRequest)
		render.JSON(w, r, err)
		return
	}
	slog.Debug("[RelevantPages]", "body", body)

	res, err := client.GoogleLabs.RelevantPages(context.TODO(), body)
	if err != nil {
		DataSEOErrorResponse(w, r, err)
		return
	}

	render.Status(r, http.StatusOK)
	render.JSON(w, r, res)
}

func DomainRank(w http.ResponseWriter, r *http.Request) {

	c := config.Get()
	client := DataForSEOClient(c)

	body := &dataforseo.GoogleLabsDomainRankRequest{}
	if err := binding.ShouldBindJSON(r.Body, body); err != nil {
		slog.Error("Error Binding JSON ", "error", err)
		render.Status(r, http.StatusBadRequest)
		render.JSON(w, r, err)
		return
	}
	slog.Debug("[DomainRank]", "body", body)

	res, err := client.GoogleLabs.DomainRank(context.TODO(), body)
	if err != nil {
		DataSEOErrorResponse(w, r, err)
		return
	}

	render.Status(r, http.StatusOK)
	render.JSON(w, r, res)
}

func PageIntersection(w http.ResponseWriter, r *http.Request) {

	c := config.Get()
	client := DataForSEOClient(c)

	body := &dataforseo.GoogleLabsPageIntersectionRequest{}
	if err := binding.ShouldBindJSON(r.Body, body); err != nil {
		slog.Error("Error Binding JSON ", "error", err)
		render.Status(r, http.StatusBadRequest)
		render.JSON(w, r, err)
		return
	}
	slog.Debug("[PageIntersection]", "body", body)

	res, err := client.GoogleLabs.PageIntersection(context.TODO(), body)
	if err != nil {
		DataSEOErrorResponse(w, r, err)
		return
	}

	render.Status(r, http.StatusOK)
	render.JSON(w, r, res)
}

func BulkTrafficEstimation(w http.ResponseWriter, r *http.Request) {

	c := config.Get()
	client := DataForSEOClient(c)

	body := &dataforseo.GoogleLabsBulkTrafficEstimationRequest{}
	if err := binding.ShouldBindJSON(r.Body, body); err != nil {
		slog.Error("Error Binding JSON ", "error", err)
		render.Status(r, http.StatusBadRequest)
		render.JSON(w, r, err)
		return
	}
	slog.Debug("[BulkTrafficEstimation]", "body", body)

	keywords, err := client.GoogleLabs.BulkTrafficEstimation(context.TODO(), body)
	if err != nil {
		DataSEOErrorResponse(w, r, err)
		return
	}

	render.Status(r, http.StatusOK)
	render.JSON(w, r, keywords)
}

func HistoricalBulkTraffic(w http.ResponseWriter, r *http.Request) {

	c := config.Get()
	client := DataForSEOClient(c)

	body := &dataforseo.GoogleLabsHistoricalBulkTrafficRequest{}
	if err := binding.ShouldBindJSON(r.Body, body); err != nil {
		slog.Error("Error Binding JSON ", "error", err)
		render.Status(r, http.StatusBadRequest)
		render.JSON(w, r, err)
		return
	}
	slog.Debug("[HistoricalBulkTraffic]", "body", body)

	res, err := client.GoogleLabs.HistoricalBulkTrafficEstimation(context.TODO(), body)
	if err != nil {
		DataSEOErrorResponse(w, r, err)
		return
	}

	render.Status(r, http.StatusOK)
	render.JSON(w, r, res)
}
func DataSEOErrorResponse(w http.ResponseWriter, r *http.Request, err error) {
	if err == nil {
		return
	}

	if errors.Is(err, dataforseo.ErrPaymentRequired) {
		slog.Error("DataForSEO Payment Required", "error", err.Error())
		render.Status(r, http.StatusBadRequest)
		render.JSON(w, r, H{"errors": []H{{
			"message": "DataForSEO Payment Required",
		}}})
		return
	}

	if errors.Is(err, dataforseo.ErrUnauthorized) {
		slog.Error("DataForSEO Unauthorized", "error", err.Error())
		render.Status(r, http.StatusBadRequest)
		render.JSON(w, r, H{"errors": []H{{
			"message": "DataForSEO Unauthorized",
		}}})
		return
	}

	if errors.Is(err, dataforseo.ErrDataForSEO) {
		slog.Error("DataForSEO Error", "error", err.Error())
		render.Status(r, http.StatusBadRequest)
		render.JSON(w, r, H{"errors": []H{{
			"message": "DataForSEO Error",
		}}})
		return
	}

	render.Status(r, http.StatusBadRequest)
	render.JSON(w, r, H{"errors": []H{{}}})
}
