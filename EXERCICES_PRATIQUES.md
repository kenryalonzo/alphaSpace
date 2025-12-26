# 💪 Exercices Pratiques - alphaSpace

## Objectif
Ces exercices vous permettront de mettre en pratique tous les concepts appris dans le cours complet.

---

## 📋 Exercice 1 : Créer un Hook Personnalisé

### Objectif
Créer un hook `useLocalStorage` pour persister des données.

### Instructions
1. Créez un fichier `src/hooks/useLocalStorage.ts`
2. Le hook doit :
   - Prendre une clé et une valeur initiale
   - Lire depuis localStorage au montage
   - Sauvegarder automatiquement à chaque changement
   - Gérer les erreurs (JSON.parse peut échouer)

### Solution Guidée

```typescript
import { useState, useEffect } from 'react';

function useLocalStorage<T>(key: string, initialValue: T) {
  // Étape 1 : État initial depuis localStorage ou valeur par défaut
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Erreur lors de la lecture de ${key}:`, error);
      return initialValue;
    }
  });

  // Étape 2 : Fonction pour mettre à jour la valeur
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Permettre la fonction comme setState
      const valueToStore = value instanceof Function 
        ? value(storedValue) 
        : value;
      
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Erreur lors de l'écriture de ${key}:`, error);
    }
  };

  return [storedValue, setValue] as const;
}

export default useLocalStorage;
```

### Test
Créez un composant pour tester le hook :

```typescript
const ThemeToggle = () => {
  const [theme, setTheme] = useLocalStorage('theme', 'dark');

  return (
    <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
      Thème actuel : {theme}
    </button>
  );
};
```

---

## 📋 Exercice 2 : Composant de Recherche avec Debounce

### Objectif
Créer une barre de recherche qui attend 500ms avant de lancer la recherche.

### Instructions
1. Utilisez le hook `useDebounce` du cours
2. Créez un composant `SearchBar.tsx`
3. Affichez les résultats de recherche

### Solution Guidée

```typescript
import { useState } from 'react';
import { useDebounce } from '../hooks/useDebounce';
import { useFetch } from '../hooks/useFetch';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 500);

  // Recherche seulement après 500ms d'inactivité
  const { data, loading } = useFetch(
    debouncedSearch ? `${URLS.NEWS}?search=${debouncedSearch}` : null
  );

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Rechercher..."
        className="w-full p-3 rounded-lg bg-white/10 text-white"
      />
      {loading && <p>Recherche en cours...</p>}
      {data && (
        <div>
          {data.results.map(article => (
            <div key={article.id}>{article.title}</div>
          ))}
        </div>
      )}
    </div>
  );
};
```

---

## 📋 Exercice 3 : Pagination Personnalisée

### Objectif
Créer un composant de pagination réutilisable.

### Instructions
1. Créez `src/components/Pagination.tsx`
2. Le composant doit afficher les numéros de page
3. Gérer les cas limites (première/dernière page)

### Solution Guidée

```typescript
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center gap-2 justify-center">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 rounded disabled:opacity-50"
      >
        Précédent
      </button>

      {pages.map(page => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-4 py-2 rounded ${
            page === currentPage
              ? 'bg-primary text-white'
              : 'bg-white/10 hover:bg-white/20'
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 rounded disabled:opacity-50"
      >
        Suivant
      </button>
    </div>
  );
};
```

---

## 📋 Exercice 4 : Modal Réutilisable

### Objectif
Créer un composant Modal réutilisable avec composition.

### Instructions
1. Créez `src/components/ui/Modal.tsx`
2. Utilisez le pattern Compound Components
3. Ajoutez la possibilité de fermer avec Escape

### Solution Guidée

```typescript
import { useEffect } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="glass rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

const ModalHeader = ({ children, onClose }: { children: React.ReactNode; onClose: () => void }) => (
  <div className="flex items-center justify-between mb-4">
    <h2 className="text-2xl font-bold">{children}</h2>
    <button onClick={onClose} className="text-gray-400 hover:text-white">
      <X className="w-6 h-6" />
    </button>
  </div>
);

const ModalBody = ({ children }: { children: React.ReactNode }) => (
  <div className="mb-4">{children}</div>
);

const ModalFooter = ({ children }: { children: React.ReactNode }) => (
  <div className="flex justify-end gap-2">{children}</div>
);

export { Modal, ModalHeader, ModalBody, ModalFooter };
```

### Utilisation

```typescript
const [isOpen, setIsOpen] = useState(false);

<Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
  <ModalHeader onClose={() => setIsOpen(false)}>
    Titre du Modal
  </ModalHeader>
  <ModalBody>
    Contenu du modal
  </ModalBody>
  <ModalFooter>
    <Button onClick={() => setIsOpen(false)}>Fermer</Button>
    <Button variant="default">Confirmer</Button>
  </ModalFooter>
</Modal>
```

---

## 📋 Exercice 5 : Formulaire avec Validation

### Objectif
Créer un formulaire de contact avec validation en temps réel.

### Instructions
1. Créez `src/pages/Contact.tsx`
2. Champs : nom, email, message
3. Validation en temps réel
4. Affichage des erreurs

### Solution Guidée

```typescript
const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validate = (name: string, value: string) => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'Le nom est requis';
        if (value.length < 2) return 'Le nom doit contenir au moins 2 caractères';
        return '';
      
      case 'email':
        if (!value.trim()) return 'L\'email est requis';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Email invalide';
        return '';
      
      case 'message':
        if (!value.trim()) return 'Le message est requis';
        if (value.length < 10) return 'Le message doit contenir au moins 10 caractères';
        return '';
      
      default:
        return '';
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (touched[name]) {
      const error = validate(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validate(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Marquer tous les champs comme touchés
    const allTouched = Object.keys(formData).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {} as Record<string, boolean>);
    setTouched(allTouched);

    // Valider tous les champs
    const formErrors = Object.keys(formData).reduce((acc, key) => {
      const error = validate(key, formData[key as keyof typeof formData]);
      if (error) acc[key] = error;
      return acc;
    }, {} as Record<string, string>);

    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      console.log('Formulaire valide:', formData);
      // Envoyer les données
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
      <div>
        <label htmlFor="name" className="block mb-2">Nom</label>
        <input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          onBlur={handleBlur}
          className="w-full p-3 rounded-lg bg-white/10 text-white"
        />
        {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="email" className="block mb-2">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          className="w-full p-3 rounded-lg bg-white/10 text-white"
        />
        {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="message" className="block mb-2">Message</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          onBlur={handleBlur}
          rows={5}
          className="w-full p-3 rounded-lg bg-white/10 text-white"
        />
        {errors.message && <p className="text-red-400 text-sm mt-1">{errors.message}</p>}
      </div>

      <Button type="submit" size="lg" className="w-full">
        Envoyer
      </Button>
    </form>
  );
};
```

---

## 📋 Exercice 6 : Infinite Scroll

### Objectif
Implémenter un scroll infini pour charger plus d'articles automatiquement.

### Instructions
1. Modifiez `src/pages/News.tsx`
2. Détectez quand l'utilisateur arrive en bas de page
3. Chargez automatiquement plus d'articles

### Solution Guidée

```typescript
import { useEffect, useRef } from 'react';

const News = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [nextUrl, setNextUrl] = useState<string | null>(URLS.NEWS + '?limit=9');
  const [loading, setLoading] = useState(false);
  const observerTarget = useRef<HTMLDivElement>(null);

  const fetchNews = async (url: string) => {
    if (!url || loading) return;
    setLoading(true);
    try {
      const response = await axios.get<NewsResponse>(url);
      setArticles(prev => [...prev, ...response.data.results]);
      setNextUrl(response.data.next);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (articles.length === 0) {
      fetchNews(URLS.NEWS + '?limit=9');
    }
  }, []);

  // Intersection Observer pour détecter le scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && nextUrl && !loading) {
          fetchNews(nextUrl);
        }
      },
      { threshold: 0.1 }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [nextUrl, loading]);

  return (
    <div>
      {/* Liste des articles */}
      <div className="grid">
        {articles.map(article => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>

      {/* Élément cible pour l'observer */}
      <div ref={observerTarget} className="h-20 flex items-center justify-center">
        {loading && <Loader2 className="animate-spin" />}
        {!nextUrl && !loading && <p>Fin des articles</p>}
      </div>
    </div>
  );
};
```

---

## 📋 Exercice 7 : Dark Mode Toggle

### Objectif
Implémenter un toggle pour basculer entre thème clair et sombre.

### Instructions
1. Utilisez le hook `useLocalStorage` de l'exercice 1
2. Créez un composant `ThemeToggle.tsx`
3. Appliquez les classes Tailwind dark mode

### Solution Guidée

```typescript
const ThemeToggle = () => {
  const [theme, setTheme] = useLocalStorage('theme', 'dark');

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="p-2 rounded-lg bg-white/10 hover:bg-white/20"
    >
      {theme === 'dark' ? '☀️' : '🌙'}
    </button>
  );
};
```

---

## 🎯 Exercices Bonus

### Bonus 1 : Tests Unitaires
Écrivez des tests pour le hook `useFetch` avec Jest et React Testing Library.

### Bonus 2 : Animation de Transition
Ajoutez des animations de transition entre les pages avec Framer Motion.

### Bonus 3 : Service Worker
Implémentez un service worker pour le mode hors ligne (PWA).

---

## ✅ Checklist de Validation

Après avoir complété les exercices, vous devriez être capable de :

- [ ] Créer des hooks personnalisés réutilisables
- [ ] Gérer l'état local et la persistance
- [ ] Créer des composants modulaires
- [ ] Implémenter la validation de formulaires
- [ ] Gérer les interactions utilisateur avancées
- [ ] Optimiser les performances avec lazy loading
- [ ] Créer des patterns de composition

---

**Bon courage ! 💪**

