package router

import (
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/mainanick/WeRank/internal/config"
	"github.com/mainanick/WeRank/pkg/handlers"
)

type H map[string]any

const msg = `Looks like we're playing hide-and-seek, and this page is winning.

Anyway, while you're here, let's play the blame game:
- Maybe the URL wasn’t quite right? 
- Perhaps it’s taking a detour in the cloud?
- Or maybe the page just went on a perpetual coffee break!

In any case, why not take a moment to reflect on all the other pages you *do* get to see every day. They're not feeling very appreciated right now!
`

func V1APIRouter(c *config.Config) chi.Router {
	r := chi.NewRouter()
	r.NotFound(func(w http.ResponseWriter, r *http.Request) {
		http.Error(w, msg, http.StatusNotFound)
	})

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
