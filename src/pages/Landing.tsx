import { Hero, SectionTitle } from "../components";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { URLS } from "../services/api";
import type { NewsResponse } from "../utils/types";
import { Loader2, AlertCircle } from "lucide-react";

const Landing = () => {
  // Fetch latest 3 news items for the landing page
  const { data: newsData, loading, error } = useFetch<NewsResponse>(URLS.NEWS + '?limit=3');

  return (
    <div className="min-h-screen bg-black text-white">
      <Hero />
      
      <div className="align-element py-16">
        <SectionTitle text="Latest Space News" subtitle="Updates from across the galaxy" />
        
        {loading ? (
             <div className="flex justify-center py-12">
                <Loader2 className="animate-spin text-primary w-8 h-8" />
             </div>
        ) : error ? (
            <div className="flex flex-col items-center justify-center py-12 gap-4">
                <AlertCircle className="text-red-400 w-12 h-12" />
                <p className="text-red-400 text-center">{error}</p>
                <Button 
                    variant="outline" 
                    onClick={() => window.location.reload()}
                    className="border-red-400 text-red-400 hover:bg-red-400 hover:text-black"
                >
                    Réessayer
                </Button>
            </div>
        ) : newsData?.results && newsData.results.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {newsData.results.map((news) => (
                    <article key={news.id} className="glass rounded-xl overflow-hidden group hover:border-primary/50 transition-all duration-300 flex flex-col h-full">
                        <div className="h-48 overflow-hidden relative">
                            <img 
                                src={news.image_url} 
                                alt={news.title} 
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                onError={(e) => {
                                    // Image de secours si la source échoue
                                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop';
                                }}
                            />
                             <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm px-2 py-1 rounded text-xs font-mono border border-white/10">
                                {news.news_site}
                            </div>
                        </div>
                        <div className="p-6 flex flex-col flex-grow">
                            <span className="text-xs font-mono text-primary mb-2 block">{new Date(news.published_at).toLocaleDateString()}</span>
                            <h3 className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                                {news.title}
                            </h3>
                            <p className="text-gray-400 text-sm mb-4 line-clamp-3 flex-grow">
                                {news.summary}
                            </p>
                            <Button 
                                variant="link" 
                                className="px-0 text-white group-hover:text-primary mt-auto"
                                onClick={() => window.open(news.url, '_blank')}
                            >
                                Read More &rarr;
                            </Button>
                        </div>
                    </article>
                ))}
            </div>
        ) : (
            <div className="text-center py-12 text-gray-400">
                <p>Aucune actualité disponible pour le moment.</p>
            </div>
        )}
        
        <div className="mt-12 text-center">
             <Link to="/news">
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-black">
                    View All News
                </Button>
             </Link>
        </div>
      </div>
    </div>
  )
}

export default Landing
