import { useFetch } from "../hooks/useFetch";
import { URLS } from "../services/api";
import type { Launch } from "../utils/types";
import { SectionTitle } from "../components";
import { Loader2, Calendar, Rocket, ExternalLink } from "lucide-react";
import { Button } from "../components/ui/button";

const Spacex = () => {
  const { data, loading, error } = useFetch<Launch[]>(URLS.SPACEX_UPCOMING);

  if (loading) {
    return (
        <div className="h-[50vh] flex flex-col items-center justify-center text-white">
            <Loader2 className="w-10 h-10 animate-spin text-primary mb-4" />
            <p className="cube-font animate-pulse">Loading Launch Manifest...</p>
        </div>
    );
  }

  if (error) {
    return (
        <div className="h-[50vh] flex flex-col items-center justify-center text-white text-center px-4">
            <p className="text-red-400 text-xl mb-2">Launch Aborted.</p>
            <p className="text-gray-400 max-w-md">{error}</p>
        </div>
    );
  }

  return (
    <div className="align-element py-12 text-white">
      <SectionTitle text="Upcoming SpaceX Launches" subtitle="The future of space travel" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate__animated animate__fadeIn">
        {data && data.map((launch) => (
            <div key={launch.id} className="glass rounded-xl p-6 hover:border-primary/50 transition-all duration-300 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                    <div className="bg-white/10 p-3 rounded-lg">
                        <Rocket className="w-6 h-6 text-primary" />
                    </div>
                    {launch.links.patch.small && (
                        <img src={launch.links.patch.small} alt="patch" className="w-12 h-12" />
                    )}
                </div>

                <h3 className="text-xl font-bold mb-2 cube-font tracking-wide">{launch.name}</h3>
                
                <div className="flex items-center text-sm text-gray-400 mb-4">
                    <Calendar className="w-4 h-4 mr-2" />
                    {new Date(launch.date_utc).toLocaleDateString(undefined, {
                        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
                    })}
                </div>

                <p className="text-gray-400 text-sm mb-6 line-clamp-3 flex-grow">
                    {launch.details || "No mission details available yet for this launch."}
                </p>

                <div className="mt-auto pt-4 border-t border-white/10">
                     {launch.links.webcast ? (
                        <a href={launch.links.webcast} target="_blank" rel="noreferrer">
                            <Button className="w-full gap-2" variant="outline">
                                Watch Webcast <ExternalLink className="w-4 h-4"/>
                            </Button>
                        </a>
                     ) : (
                        <Button disabled className="w-full bg-white/5 text-gray-500 cursor-not-allowed border-none">
                            Webcast Pending
                        </Button>
                     )}
                </div>
            </div>
        ))}
      </div>
    </div>
  )
}

export default Spacex
