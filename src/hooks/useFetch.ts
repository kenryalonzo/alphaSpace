import { useState, useEffect, useRef } from 'react';
import axios, { type AxiosRequestConfig } from 'axios';

type FetchState<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
};

export function useFetch<T>(url: string, options?: AxiosRequestConfig) {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  // Utiliser useRef pour éviter les dépendances dans useEffect
  const optionsRef = useRef(options);
  optionsRef.current = options;

  useEffect(() => {
    let isMounted = true;
    const abortController = new AbortController();

    const fetchData = async () => {
      setState(prev => ({ ...prev, loading: true, error: null }));
      try {
        const response = await axios.get<T>(url, {
          ...optionsRef.current,
          signal: abortController.signal,
        });
        if (isMounted) {
          setState({ data: response.data, loading: false, error: null });
        }
      } catch (err) {
        if (isMounted && !abortController.signal.aborted) {
          let errorMessage = "Une erreur s'est produite lors du chargement des données";
          if (axios.isAxiosError(err)) {
            if (err.response) {
              // Erreur de réponse du serveur
              errorMessage = `Erreur ${err.response.status}: ${err.response.statusText || 'Erreur serveur'}`;
            } else if (err.request) {
              // Requête effectuée mais pas de réponse
              errorMessage = "Impossible de se connecter au serveur. Vérifiez votre connexion internet.";
            } else {
              // Erreur lors de la configuration de la requête
              errorMessage = err.message;
            }
          } else if (err instanceof Error) {
            errorMessage = err.message;
          }
          setState({ data: null, loading: false, error: errorMessage });
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
      abortController.abort();
    };
  }, [url]);

  return state;
}
