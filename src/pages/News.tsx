import { SectionTitle } from "../components";
import { URLS } from "../services/api";
import { Button } from "../components/ui/button";
import { useState, useEffect } from "react";
import axios from "axios";
import type { NewsResponse, Article } from "../utils/types";
import { Loader2, ExternalLink, Calendar } from "lucide-react";

const News = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [nextUrl, setNextUrl] = useState<string | null>(URLS.NEWS + '?limit=9');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchNews = async (url: string) => {
    if (!url) return;
    setLoading(true);
    try {
        const response = await axios.get<NewsResponse>(url);
        // We filter out articles that might be duplicates if the API returns overlapping data, 
        // though usually nextUrl handles pagination correctly.
        // We append new articles to the existing list.
        setArticles(prev => {
            const newArticles = response.data.results.filter(
                newArt => !prev.some(prevArt => prevArt.id === newArt.id)
            );
            return [...prev, ...newArticles];
        });
        setNextUrl(response.data.next);
    } catch (err) {
        setError("Failed to load news from the cosmos.");
        console.error(err);
    } finally {
        setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    // Only fetch if we have no articles (prevent double fetch on strict mode mount)
    if (articles.length === 0) {
        fetchNews(URLS.NEWS + '?limit=9');
    }
  }, []);

  return (
    <div className="align-element py-12 text-white">
      <SectionTitle text="Spaceflight News" subtitle="Daily updates from the final frontier" />
      
      {error && (
          <div className="text-red-400 text-center p-4 bg-red-900/20 rounded-lg border border-red-900 mb-8">
              {error}
          </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate__animated animate__fadeIn">
          {articles.map((news) => (
              <article key={news.id} className="glass rounded-xl overflow-hidden group hover:border-primary/50 transition-all duration-300 flex flex-col h-full">
                  <div className="h-48 overflow-hidden relative">
                      <img 
                          src={news.image_url} 
                          alt={news.title} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          onError={(e) => {
                            // Fallback image if source fails
                            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop';
                          }}
                      />
                      <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm px-2 py-1 rounded text-xs font-mono border border-white/10">
                        {news.news_site}
                      </div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                      <div className="flex items-center gap-2 text-xs font-mono text-primary mb-3">
                        <Calendar size={12} />
                        <span>{new Date(news.published_at).toLocaleDateString()}</span>
                      </div>
                      
                      <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                          {news.title}
                      </h3>
                      
                      <p className="text-gray-400 text-sm mb-4 line-clamp-3 flex-grow">
                          {news.summary}
                      </p>
                      
                      <div className="mt-auto pt-4 border-t border-white/10">
                        <Button 
                            variant="link" 
                            className="px-0 text-white group-hover:text-primary gap-2"
                            onClick={() => window.open(news.url, '_blank')}
                        >
                            Read Full Article <ExternalLink size={14} />
                        </Button>
                      </div>
                  </div>
              </article>
          ))}
      </div>

      {loading && (
          <div className="flex justify-center items-center py-12">
              <Loader2 className="animate-spin text-primary w-8 h-8" />
          </div>
      )}

      {!loading && nextUrl && (
        <div className="mt-12 text-center">
            <Button 
                variant="outline" 
                size="lg" 
                className="border-white text-white hover:bg-white hover:text-black"
                onClick={() => fetchNews(nextUrl)}
            >
                Load More News
            </Button>
        </div>
      )}
    </div>
  )
}

export default News