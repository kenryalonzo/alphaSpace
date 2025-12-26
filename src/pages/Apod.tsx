import { useFetch } from "../hooks/useFetch";
import { URLS } from "../services/api";
import type { ApodResponse } from "../utils/types";
import { SectionTitle } from "../components";
import { Loader2 } from "lucide-react";

const Apod = () => {
  const { data, loading, error } = useFetch<ApodResponse>(URLS.APOD);

  if (loading) {
    return (
        <div className="h-[50vh] flex flex-col items-center justify-center text-white">
            <Loader2 className="w-10 h-10 animate-spin text-primary mb-4" />
            <p className="cube-font animate-pulse">Contacting NASA Servers...</p>
        </div>
    );
  }

  if (error) {
    return (
        <div className="h-[50vh] flex flex-col items-center justify-center text-white text-center px-4">
            <p className="text-red-400 text-xl mb-2">Houston, we have a problem.</p>
            <p className="text-gray-400 max-w-md">{error}</p>
            <p className="text-xs text-gray-500 mt-4">Tip: The DEMO_KEY might be rate limited.</p>
        </div>
    );
  }

  return (
    <div className="align-element py-12 text-white">
      <SectionTitle text="Astronomy Picture of the Day" subtitle={data?.date} />

      {data && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start animate__animated animate__fadeIn">
            {/* Media Section */}
            <div className="glass p-2 rounded-2xl">
                {data.media_type === "image" ? (
                    <img 
                        src={data.hdurl || data.url} 
                        alt={data.title} 
                        className="w-full h-auto rounded-xl shadow-2xl"
                    />
                ) : (
                    <div className="aspect-video w-full">
                        <iframe 
                            src={data.url} 
                            title={data.title}
                            className="w-full h-full rounded-xl"
                            allowFullScreen
                        ></iframe>
                    </div>
                )}
            </div>

            {/* Info Section */}
            <div className="space-y-6">
                <h1 className="text-4xl md:text-5xl font-bold cube-font leading-tight text-primary">
                    {data.title}
                </h1>
                
                <div className="flex items-center gap-4 text-sm font-mono text-gray-400 border-l-2 border-primary pl-4">
                    <span>{data.date}</span>
                    {data.copyright && <span>&copy; {data.copyright}</span>}
                </div>

                <p className="text-lg leading-relaxed text-gray-200 font-light">
                    {data.explanation}
                </p>

                {data.hdurl && (
                    <a 
                        href={data.hdurl} 
                        target="_blank" 
                        rel="noreferrer"
                        className="inline-block mt-4 text-primary hover:underline underline-offset-4"
                    >
                        View High Definition Image &rarr;
                    </a>
                )}
            </div>
        </div>
      )}
    </div>
  )
}

export default Apod
