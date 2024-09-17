package router

import (
	"github.com/go-chi/chi/v5"
	"github.com/mainanick/WeRank/internal/config"
	"github.com/mainanick/WeRank/pkg/handlers"
)

type H map[string]any

func V1APIRouter(c *config.Config) chi.Router {
	r := chi.NewRouter()
	r.Post("/keywords-for-site", handlers.KeywordForSiteHandler)
	r.Post("/related-keywords", handlers.RelatedKeywordHandler)
	r.Post("/keyword-suggestions", handlers.KeywordSuggestions)
	r.Post("/keyword-ideas", handlers.KeywordIdeas)
	r.Post("/keyword-historic-search-volume", handlers.KeywordHistoricalSearchVolume)
	r.Post("/bulk-keyword-difficulty", handlers.BulkKeywordDifficulty)
	r.Post("/search-intent", handlers.SearchIntent)
	r.Post("/ranked-keywords", handlers.RankedKeywords)
	r.Post("/serp-competitors", handlers.SERPCompetitors)
	r.Post("/competitors-domain", handlers.CompetitorsDomain)
	r.Post("/domain-intersection", handlers.DomainIntersection)
	r.Post("/subdomains", handlers.Subdomains)
	r.Post("/relevant-pages", handlers.RelevantPages)
	r.Post("/domain-rank", handlers.DomainRank)
	r.Post("/page-intersection", handlers.PageIntersection)
	r.Post("/bulk-traffic-estimation", handlers.BulkTrafficEstimation)
	r.Post("/historical-bulk-traffic", handlers.HistoricalBulkTraffic)

	return r
}
