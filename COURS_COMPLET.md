# 🚀 Cours Complet : Développement React avec TypeScript
## Projet alphaSpace - De Zéro à Production

---

## 📚 Table des Matières

1. [Architecture du Projet](#1-architecture-du-projet)
2. [Concepts React Fondamentaux](#2-concepts-react-fondamentaux)
3. [Hooks Personnalisés](#3-hooks-personnalisés)
4. [Routing avec React Router](#4-routing-avec-react-router)
5. [Gestion d'État](#5-gestion-détat)
6. [Composants UI Réutilisables](#6-composants-ui-réutilisables)
7. [Styling avec Tailwind CSS](#7-styling-avec-tailwind-css)
8. [Gestion des Erreurs](#8-gestion-des-erreurs)
9. [Optimisations de Performance](#9-optimisations-de-performance)
10. [Patterns de Design](#10-patterns-de-design)

---

## 1. Architecture du Projet

### 1.1 Structure des Dossiers

```
src/
├── components/          # Composants réutilisables
│   ├── ui/             # Composants UI de base (Button, Dropdown)
│   ├── Header.tsx       # En-tête du site
│   ├── Navbar.tsx       # Barre de navigation
│   └── Footer.tsx       # Pied de page
├── pages/               # Pages de l'application
│   ├── Landing.tsx      # Page d'accueil
│   ├── News.tsx         # Page des actualités
│   └── ...
├── hooks/               # Hooks personnalisés
│   └── useFetch.ts      # Hook pour les requêtes API
├── services/            # Services API
│   └── api.ts           # Configuration des URLs API
├── utils/               # Utilitaires
│   ├── types.ts         # Types TypeScript
│   └── links.ts         # Configuration des liens
└── main.tsx             # Point d'entrée de l'application
```

### 1.2 Pourquoi cette Structure ?

**Séparation des responsabilités** : Chaque dossier a un rôle précis
- `components/` : Code réutilisable
- `pages/` : Vues spécifiques à une route
- `hooks/` : Logique réutilisable
- `services/` : Communication avec l'extérieur (APIs)

**Exemple d'application** : Un site e-commerce aurait :
- `components/ProductCard.tsx`
- `pages/ProductPage.tsx`
- `hooks/useCart.ts`
- `services/paymentApi.ts`

---

## 2. Concepts React Fondamentaux

### 2.1 Composants Fonctionnels

**Dans notre projet** : Tous les composants sont des fonctions

```typescript
// src/components/Header.tsx
const Header = () => {
  return (
    <header>
      {/* Contenu */}
    </header>
  );
};

export default Header;
```

**Explication** :
- Un composant est une fonction qui retourne du JSX
- Le nom commence par une majuscule (convention React)
- `export default` permet de l'importer ailleurs

**Autre scénario** : Un composant de profil utilisateur

```typescript
const UserProfile = ({ name, email, avatar }: UserProps) => {
  return (
    <div className="profile-card">
      <img src={avatar} alt={name} />
      <h2>{name}</h2>
      <p>{email}</p>
    </div>
  );
};
```

### 2.2 JSX (JavaScript XML)

**Dans notre projet** : Mélange de HTML et JavaScript

```typescript
// src/pages/Landing.tsx
{loading ? (
  <Loader2 className="animate-spin" />
) : (
  <div className="grid">
    {newsData?.results.map((news) => (
      <article key={news.id}>
        <h3>{news.title}</h3>
      </article>
    ))}
  </div>
)}
```

**Concepts clés** :
- `{variable}` : Injection de JavaScript
- `?.` : Optional chaining (évite les erreurs si null)
- `map()` : Transforme un tableau en éléments JSX
- `key` : Identifiant unique pour React

**Autre scénario** : Liste de produits avec filtres

```typescript
{products
  .filter(product => product.inStock)
  .map(product => (
    <ProductCard key={product.id} product={product} />
  ))}
```

### 2.3 Props (Propriétés)

**Dans notre projet** : Passage de données entre composants

```typescript
// src/components/SectionTitle.tsx
const SectionTitle = ({ text, subtitle }: SectionTitleProps) => {
  return (
    <div>
      <h2>{text}</h2>
      <p>{subtitle}</p>
    </div>
  );
};
```

**Utilisation** :
```typescript
<SectionTitle 
  text="Latest Space News" 
  subtitle="Updates from across the galaxy" 
/>
```

**Autre scénario** : Composant de notification

```typescript
<Notification 
  type="success" 
  message="Commande confirmée !" 
  onClose={() => setShow(false)}
/>
```

### 2.4 État Local avec useState

**Dans notre projet** : Gestion de l'état dans les composants

```typescript
// src/pages/News.tsx
const [articles, setArticles] = useState<Article[]>([]);
const [loading, setLoading] = useState(false);
const [error, setError] = useState<string | null>(null);
```

**Explication** :
- `useState` retourne un tableau : `[valeur, setter]`
- Le setter déclenche un re-render
- TypeScript garantit le type de la valeur

**Autre scénario** : Formulaire de connexion

```typescript
const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <form>
      <input 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
      />
      <input 
        type="password"
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
      />
      <input 
        type="checkbox"
        checked={rememberMe}
        onChange={(e) => setRememberMe(e.target.checked)} 
      />
    </form>
  );
};
```

### 2.5 Effets de Bord avec useEffect

**Dans notre projet** : Exécution de code après le rendu

```typescript
// src/components/Header.tsx
useEffect(() => {
  const handleScroll = () => {
    setIsScrolled(window.scrollY > 20);
  };

  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);
```

**Explication** :
- Premier paramètre : fonction à exécuter
- Deuxième paramètre : tableau de dépendances
- `[]` = exécute une seule fois (montage)
- Retour = fonction de nettoyage

**Autre scénario** : Timer qui se met à jour

```typescript
useEffect(() => {
  const interval = setInterval(() => {
    setTime(new Date().toLocaleTimeString());
  }, 1000);

  return () => clearInterval(interval);
}, []);
```

---

## 3. Hooks Personnalisés

### 3.1 Concept des Hooks Personnalisés

**Principe** : Extraire la logique réutilisable dans une fonction

**Dans notre projet** : `useFetch` pour les requêtes API

```typescript
// src/hooks/useFetch.ts
export function useFetch<T>(url: string, options?: AxiosRequestConfig) {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    // Logique de fetch
  }, [url]);

  return state;
}
```

**Utilisation** :
```typescript
const { data, loading, error } = useFetch<NewsResponse>(URLS.NEWS);
```

### 3.2 Analyse Détaillée de useFetch

#### 3.2.1 Gestion de l'État

```typescript
type FetchState<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
};
```

**Pourquoi ce type ?**
- `T` : Type générique (peut être `NewsResponse`, `Article[]`, etc.)
- `null` : Valeur initiale avant le chargement
- Trois états possibles : chargement, succès, erreur

#### 3.2.2 useRef pour les Options

```typescript
const optionsRef = useRef(options);
optionsRef.current = options;
```

**Pourquoi useRef ?**
- `useRef` ne déclenche pas de re-render
- Évite d'ajouter `options` dans les dépendances de `useEffect`
- Permet d'accéder à la dernière valeur

**Sans useRef (problème)** :
```typescript
useEffect(() => {
  fetchData(url, options); // options pourrait être obsolète
}, [url, options]); // Re-exécute à chaque changement d'options
```

**Avec useRef (solution)** :
```typescript
useEffect(() => {
  fetchData(url, optionsRef.current); // Toujours la dernière valeur
}, [url]); // Ne re-exécute que si l'URL change
```

#### 3.2.3 AbortController pour Annuler les Requêtes

```typescript
const abortController = new AbortController();

const response = await axios.get<T>(url, {
  signal: abortController.signal,
});

return () => {
  abortController.abort();
};
```

**Pourquoi c'est important ?**
- Évite les fuites mémoire
- Annule les requêtes si le composant est démonté
- Évite les mises à jour d'état sur composants démontés

**Scénario problématique sans AbortController** :
```typescript
// Composant démonté pendant le chargement
// La requête continue et met à jour l'état
// → Erreur : "Can't perform a React state update on an unmounted component"
```

#### 3.2.4 Flag isMounted

```typescript
let isMounted = true;

if (isMounted) {
  setState({ data: response.data, loading: false });
}

return () => {
  isMounted = false;
};
```

**Double protection** :
1. `AbortController` : Annule la requête HTTP
2. `isMounted` : Empêche la mise à jour d'état

### 3.3 Autres Exemples de Hooks Personnalisés

#### Hook pour le LocalStorage

```typescript
function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue] as const;
}

// Utilisation
const [theme, setTheme] = useLocalStorage('theme', 'dark');
```

#### Hook pour le Debounce

```typescript
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// Utilisation : Recherche avec debounce
const [searchTerm, setSearchTerm] = useState('');
const debouncedSearch = useDebounce(searchTerm, 500);

useEffect(() => {
  // Recherche seulement après 500ms d'inactivité
  searchAPI(debouncedSearch);
}, [debouncedSearch]);
```

---

## 4. Routing avec React Router

### 4.1 Configuration du Router

**Dans notre projet** : `src/main.tsx`

```typescript
const router = createBrowserRouter([
  { 
    path: "/", 
    element: <HomeLayout />, 
    children: [
      { index: true, element: <Landing /> }, 
      { path: "news", element: <News /> },
      { path: "webb", element: <Webb /> },
    ], 
  },
]);

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
);
```

**Explication** :
- `createBrowserRouter` : Router moderne de React Router v6+
- Routes imbriquées avec `children`
- `index: true` = route par défaut du parent
- `RouterProvider` : Fournit le contexte de routing

### 4.2 Layout avec Outlet

**Dans notre projet** : `src/pages/HomeLayout.tsx`

```typescript
const HomeLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Navbar />
      <main className="flex-grow pt-[140px]">
        <Outlet /> {/* Les routes enfants s'affichent ici */}
      </main>
      <Footer />
    </div>
  );
};
```

**Concept** : Le layout partagé évite la répétition
- Header et Footer sur toutes les pages
- Seul le contenu change avec `<Outlet />`

**Autre scénario** : Layout avec sidebar

```typescript
const DashboardLayout = () => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};
```

### 4.3 Navigation avec Link et NavLink

**Link** : Navigation simple

```typescript
<Link to="/news">Voir les actualités</Link>
```

**NavLink** : Navigation avec état actif

```typescript
// src/components/LinksDesktop.tsx
<NavLink
  to={ref}
  className={({ isActive }) =>
    isActive ? 'text-primary bg-primary/10' : 'text-gray-300'
  }
>
  {label}
</NavLink>
```

**Différence** :
- `Link` : Lien simple
- `NavLink` : Détecte automatiquement si la route est active

### 4.4 useLocation pour la Route Actuelle

**Dans notre projet** : Indicateur de page dans le Header

```typescript
const location = useLocation();

<span>
  {location.pathname === '/' ? 'Home' : location.pathname.slice(1)}
</span>
```

**Autre utilisation** : Breadcrumbs

```typescript
const Breadcrumbs = () => {
  const location = useLocation();
  const paths = location.pathname.split('/').filter(Boolean);

  return (
    <nav>
      <Link to="/">Home</Link>
      {paths.map((path, index) => (
        <span key={index}>
          / <Link to={`/${paths.slice(0, index + 1).join('/')}`}>
            {path}
          </Link>
        </span>
      ))}
    </nav>
  );
};
```

### 4.5 Routes Dynamiques (Exemple Avancé)

**Scénario** : Page de détail d'article

```typescript
// Dans le router
{ path: "news/:id", element: <ArticleDetail /> }

// Dans le composant
import { useParams } from 'react-router-dom';

const ArticleDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data } = useFetch<Article>(`${URLS.NEWS}${id}`);

  return <div>{data?.title}</div>;
};
```

---

## 5. Gestion d'État

### 5.1 État Local vs État Global

**État Local** : Utilisé dans notre projet pour la plupart des cas

```typescript
// src/pages/News.tsx
const [articles, setArticles] = useState<Article[]>([]);
const [loading, setLoading] = useState(false);
```

**Quand utiliser l'état local ?**
- Données spécifiques à un composant
- Pas besoin de partage entre composants
- Simple et direct

**Quand utiliser l'état global ?**
- Données partagées (panier, utilisateur connecté)
- État complexe avec plusieurs sources
- Besoin de persistance

### 5.2 Pattern : État Dérivé

**Dans notre projet** : Calcul de valeurs à partir de l'état

```typescript
// Au lieu de stocker une valeur calculée
const [filteredArticles, setFilteredArticles] = useState([]);

// On calcule à partir de l'état existant
const filteredArticles = articles.filter(article => 
  article.title.includes(searchTerm)
);
```

**Avantage** : Une seule source de vérité, pas de synchronisation

### 5.3 Pattern : Lift State Up

**Scénario** : Formulaire avec validation

```typescript
// ❌ Mauvais : État dans le composant enfant
const InputField = () => {
  const [value, setValue] = useState('');
  // ...
};

// ✅ Bon : État remonté au parent
const Form = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  
  return (
    <>
      <InputField 
        value={formData.email}
        onChange={(val) => setFormData({...formData, email: val})}
      />
      <InputField 
        value={formData.password}
        onChange={(val) => setFormData({...formData, password: val})}
      />
    </>
  );
};
```

### 5.4 Gestion d'État Complexe (Exemple Avancé)

**Scénario** : Panier d'achat avec useReducer

```typescript
type CartAction =
  | { type: 'ADD_ITEM'; payload: Product }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'CLEAR_CART' }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } };

const cartReducer = (state: CartItem[], action: CartAction): CartItem[] => {
  switch (action.type) {
    case 'ADD_ITEM':
      const existingItem = state.find(item => item.id === action.payload.id);
      if (existingItem) {
        return state.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...state, { ...action.payload, quantity: 1 }];
    
    case 'REMOVE_ITEM':
      return state.filter(item => item.id !== action.payload);
    
    case 'CLEAR_CART':
      return [];
    
    case 'UPDATE_QUANTITY':
      return state.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
    
    default:
      return state;
  }
};

const Cart = () => {
  const [cart, dispatch] = useReducer(cartReducer, []);

  return (
    <div>
      <button onClick={() => dispatch({ type: 'ADD_ITEM', payload: product })}>
        Ajouter
      </button>
    </div>
  );
};
```

---

## 6. Composants UI Réutilisables

### 6.1 Concept de Composants Réutilisables

**Principe** : Un composant doit être réutilisable et configurable

**Dans notre projet** : `Button` avec variants

```typescript
// src/components/ui/button.tsx
<Button variant="outline" size="lg">
  Cliquer
</Button>
```

### 6.2 Class Variance Authority (CVA)

**Dans notre projet** : Gestion des variants avec CVA

```typescript
const buttonVariants = cva(
  "base-classes", // Classes de base toujours appliquées
  {
    variants: {
      variant: {
        default: "bg-primary text-white",
        outline: "border bg-transparent",
        ghost: "hover:bg-gray-100",
      },
      size: {
        sm: "h-8 px-3",
        default: "h-9 px-4",
        lg: "h-10 px-6",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);
```

**Avantages** :
- Type-safe (TypeScript vérifie les variants)
- Composition de classes automatique
- IntelliSense dans l'éditeur

**Autre scénario** : Composant Card avec variants

```typescript
const cardVariants = cva(
  "rounded-lg border p-6",
  {
    variants: {
      variant: {
        default: "bg-white border-gray-200",
        elevated: "bg-white shadow-lg border-transparent",
        outlined: "bg-transparent border-2",
      },
      size: {
        sm: "p-4",
        default: "p-6",
        lg: "p-8",
      },
    },
  }
);

const Card = ({ variant, size, children, ...props }) => {
  return (
    <div className={cn(cardVariants({ variant, size }))} {...props}>
      {children}
    </div>
  );
};
```

### 6.3 Polymorphic Components avec Slot

**Dans notre projet** : Button peut être un lien

```typescript
const Button = ({ asChild = false, ...props }) => {
  const Comp = asChild ? Slot : "button";
  return <Comp {...props} />;
};

// Utilisation
<Button asChild>
  <Link to="/news">Voir les actualités</Link>
</Button>
```

**Avantage** : Un seul composant pour bouton et lien

### 6.4 Composition de Composants

**Pattern** : Composants qui travaillent ensemble

```typescript
// Exemple : Modal composé
const Modal = ({ children }) => (
  <div className="modal-overlay">
    <div className="modal-content">{children}</div>
  </div>
);

const ModalHeader = ({ children }) => (
  <div className="modal-header">{children}</div>
);

const ModalBody = ({ children }) => (
  <div className="modal-body">{children}</div>
);

const ModalFooter = ({ children }) => (
  <div className="modal-footer">{children}</div>
);

// Utilisation
<Modal>
  <ModalHeader>Titre</ModalHeader>
  <ModalBody>Contenu</ModalBody>
  <ModalFooter>
    <Button>Fermer</Button>
  </ModalFooter>
</Modal>
```

---

## 7. Styling avec Tailwind CSS

### 7.1 Classes Utilitaires

**Dans notre projet** : Utilisation extensive de Tailwind

```typescript
<div className="flex items-center justify-between py-4 bg-black/80 backdrop-blur-sm">
```

**Décomposition** :
- `flex` : display: flex
- `items-center` : align-items: center
- `justify-between` : justify-content: space-between
- `py-4` : padding vertical 1rem
- `bg-black/80` : background noir avec 80% d'opacité
- `backdrop-blur-sm` : flou d'arrière-plan

### 7.2 Responsive Design

**Dans notre projet** : Breakpoints Tailwind

```typescript
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
```

**Breakpoints Tailwind** :
- `sm:` : 640px
- `md:` : 768px
- `lg:` : 1024px
- `xl:` : 1280px
- `2xl:` : 1536px

**Autre exemple** : Texte responsive

```typescript
<h1 className="text-2xl md:text-4xl lg:text-6xl">
  Titre Responsive
</h1>
```

### 7.3 États Hover et Focus

**Dans notre projet** : Transitions fluides

```typescript
<button className="
  bg-primary 
  hover:bg-primary/90 
  focus:ring-2 
  focus:ring-primary 
  transition-all 
  duration-200
">
  Cliquer
</button>
```

**Classes importantes** :
- `hover:` : État au survol
- `focus:` : État au focus (accessibilité)
- `transition-all` : Animation de toutes les propriétés
- `duration-200` : Durée de 200ms

### 7.4 Classes Personnalisées

**Dans notre projet** : Classe `.glass` pour l'effet glassmorphism

```css
/* src/index.css */
.glass {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.05);
}
```

**Utilisation** :
```typescript
<div className="glass rounded-xl p-6">
  Contenu avec effet glass
</div>
```

**Autre exemple** : Classe pour les animations

```css
.fade-in {
  animation: fadeIn 0.5s ease-in;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
```

### 7.5 Dark Mode (Exemple Avancé)

**Configuration** : Toggle entre thème clair et sombre

```typescript
const ThemeProvider = () => {
  const [theme, setTheme] = useLocalStorage('theme', 'dark');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return (
    <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
      {theme === 'dark' ? '☀️' : '🌙'}
    </button>
  );
};
```

**Utilisation dans Tailwind** :
```typescript
<div className="bg-white dark:bg-gray-900 text-black dark:text-white">
  Contenu adaptatif
</div>
```

---

## 8. Gestion des Erreurs

### 8.1 Gestion d'Erreur dans les Requêtes

**Dans notre projet** : useFetch avec gestion d'erreur détaillée

```typescript
catch (err) {
  if (axios.isAxiosError(err)) {
    if (err.response) {
      // Erreur serveur (404, 500, etc.)
      errorMessage = `Erreur ${err.response.status}`;
    } else if (err.request) {
      // Pas de réponse du serveur
      errorMessage = "Impossible de se connecter";
    } else {
      // Erreur de configuration
      errorMessage = err.message;
    }
  }
}
```

**Types d'erreurs** :
1. **Erreur réseau** : Pas de connexion internet
2. **Erreur serveur** : 404, 500, etc.
3. **Erreur client** : Mauvaise configuration de la requête

### 8.2 Affichage des Erreurs à l'Utilisateur

**Dans notre projet** : Message d'erreur avec bouton de retry

```typescript
{error ? (
  <div className="flex flex-col items-center gap-4">
    <AlertCircle className="text-red-400 w-12 h-12" />
    <p className="text-red-400">{error}</p>
    <Button onClick={() => window.location.reload()}>
      Réessayer
    </Button>
  </div>
) : (
  // Contenu normal
)}
```

**Bonnes pratiques** :
- Message clair et compréhensible
- Action possible (retry, retour)
- Design cohérent (couleur rouge pour erreur)

### 8.3 Gestion d'Erreur pour les Images

**Dans notre projet** : Image de secours si chargement échoue

```typescript
<img 
  src={item.imageUrl} 
  alt={item.title}
  onError={(e) => {
    const target = e.target as HTMLImageElement;
    if (target.src !== fallbackImage) {
      target.src = fallbackImage;
    }
  }}
/>
```

**Important** : Vérifier que l'image de secours n'est pas la même pour éviter une boucle infinie

### 8.4 Error Boundaries (Exemple Avancé)

**Scénario** : Capturer les erreurs de rendu

```typescript
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Erreur capturée:', error, errorInfo);
    // Envoyer à un service de logging (Sentry, etc.)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-container">
          <h2>Quelque chose s'est mal passé</h2>
          <button onClick={() => this.setState({ hasError: false })}>
            Réessayer
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Utilisation
<ErrorBoundary>
  <App />
</ErrorBoundary>
```

---

## 9. Optimisations de Performance

### 9.1 Lazy Loading des Images

**Dans notre projet** : Attribut `loading="lazy"`

```typescript
<img 
  src={imageUrl} 
  loading="lazy"  // Charge l'image seulement quand elle est visible
  alt={title}
/>
```

**Avantage** : Réduit le temps de chargement initial

### 9.2 Mémoization avec useMemo

**Scénario** : Calcul coûteux

```typescript
const ExpensiveComponent = ({ items, filter }) => {
  // ❌ Recalcule à chaque render
  const filteredItems = items.filter(item => 
    item.category === filter
  ).map(item => expensiveTransform(item));

  // ✅ Calcule seulement si items ou filter change
  const filteredItems = useMemo(() => 
    items
      .filter(item => item.category === filter)
      .map(item => expensiveTransform(item)),
    [items, filter]
  );

  return <div>{filteredItems.map(...)}</div>;
};
```

### 9.3 Callback Memoization avec useCallback

**Scénario** : Fonction passée en prop

```typescript
const Parent = () => {
  const [count, setCount] = useState(0);

  // ❌ Nouvelle fonction à chaque render
  const handleClick = () => console.log('clicked');

  // ✅ Même fonction si dépendances inchangées
  const handleClick = useCallback(() => {
    console.log('clicked');
  }, []); // Dépendances vides = fonction stable

  return <Child onClick={handleClick} />;
};

const Child = React.memo(({ onClick }) => {
  // Ne re-render que si onClick change
  return <button onClick={onClick}>Cliquer</button>;
});
```

### 9.4 Code Splitting avec React.lazy

**Scénario** : Charger les pages à la demande

```typescript
// Au lieu de
import HeavyComponent from './HeavyComponent';

// Utiliser
const HeavyComponent = React.lazy(() => import('./HeavyComponent'));

// Dans le composant
<Suspense fallback={<Loader />}>
  <HeavyComponent />
</Suspense>
```

**Dans notre projet** : Application possible

```typescript
const News = React.lazy(() => import('./pages/News'));
const Webb = React.lazy(() => import('./pages/Webb'));

// Dans le router
{ 
  path: "news", 
  element: (
    <Suspense fallback={<Loader2 />}>
      <News />
    </Suspense>
  )
}
```

### 9.5 Virtualisation (Exemple Avancé)

**Scénario** : Liste de 1000+ éléments

```typescript
import { useVirtualizer } from '@tanstack/react-virtual';

const VirtualList = ({ items }) => {
  const parentRef = useRef(null);

  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 100, // Hauteur estimée d'un élément
  });

  return (
    <div ref={parentRef} className="h-96 overflow-auto">
      <div style={{ height: `${virtualizer.getTotalSize()}px` }}>
        {virtualizer.getVirtualItems().map(virtualItem => (
          <div
            key={virtualItem.key}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: `${virtualItem.size}px`,
              transform: `translateY(${virtualItem.start}px)`,
            }}
          >
            {items[virtualItem.index]}
          </div>
        ))}
      </div>
    </div>
  );
};
```

---

## 10. Patterns de Design

### 10.1 Container/Presentational Pattern

**Principe** : Séparer la logique de la présentation

**Dans notre projet** : Composants de présentation purs

```typescript
// Presentational Component (pur, réutilisable)
const ArticleCard = ({ title, summary, imageUrl, onReadMore }) => {
  return (
    <article className="glass rounded-xl">
      <img src={imageUrl} alt={title} />
      <h3>{title}</h3>
      <p>{summary}</p>
      <button onClick={onReadMore}>Lire plus</button>
    </article>
  );
};

// Container Component (logique, données)
const NewsPage = () => {
  const { data, loading, error } = useFetch<NewsResponse>(URLS.NEWS);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <div className="grid">
      {data?.results.map(article => (
        <ArticleCard
          key={article.id}
          title={article.title}
          summary={article.summary}
          imageUrl={article.image_url}
          onReadMore={() => window.open(article.url)}
        />
      ))}
    </div>
  );
};
```

### 10.2 Compound Components Pattern

**Principe** : Composants qui travaillent ensemble

```typescript
const Tabs = ({ children, defaultTab }) => {
  const [activeTab, setActiveTab] = useState(defaultTab);

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </TabsContext.Provider>
  );
};

const TabsList = ({ children }) => (
  <div className="flex border-b">{children}</div>
);

const TabsTrigger = ({ value, children }) => {
  const { activeTab, setActiveTab } = useTabsContext();
  return (
    <button
      onClick={() => setActiveTab(value)}
      className={activeTab === value ? 'active' : ''}
    >
      {children}
    </button>
  );
};

const TabsContent = ({ value, children }) => {
  const { activeTab } = useTabsContext();
  return activeTab === value ? <div>{children}</div> : null;
};

// Utilisation
<Tabs defaultTab="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Onglet 1</TabsTrigger>
    <TabsTrigger value="tab2">Onglet 2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Contenu 1</TabsContent>
  <TabsContent value="tab2">Contenu 2</TabsContent>
</Tabs>
```

### 10.3 Render Props Pattern

**Principe** : Passer une fonction comme enfant

```typescript
const DataFetcher = ({ url, children }) => {
  const { data, loading, error } = useFetch(url);

  return children({ data, loading, error });
};

// Utilisation
<DataFetcher url={URLS.NEWS}>
  {({ data, loading, error }) => {
    if (loading) return <Loader />;
    if (error) return <Error error={error} />;
    return <NewsList articles={data?.results} />;
  }}
</DataFetcher>
```

### 10.4 Custom Hooks Pattern

**Principe** : Extraire la logique réutilisable

**Dans notre projet** : `useFetch` est un excellent exemple

**Autre exemple** : Hook pour formulaire

```typescript
const useForm = (initialValues, validate) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleChange = (name, value) => {
    setValues(prev => ({ ...prev, [name]: value }));
    
    if (touched[name]) {
      const error = validate[name]?.(value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (name) => {
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validate[name]?.(values[name]);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleSubmit = (onSubmit) => (e) => {
    e.preventDefault();
    const formErrors = Object.keys(validate).reduce((acc, key) => {
      const error = validate[key]?.(values[key]);
      if (error) acc[key] = error;
      return acc;
    }, {});

    if (Object.keys(formErrors).length === 0) {
      onSubmit(values);
    } else {
      setErrors(formErrors);
    }
  };

  return { values, errors, touched, handleChange, handleBlur, handleSubmit };
};

// Utilisation
const LoginForm = () => {
  const { values, errors, handleChange, handleBlur, handleSubmit } = useForm(
    { email: '', password: '' },
    {
      email: (val) => (!val ? 'Email requis' : !val.includes('@') ? 'Email invalide' : ''),
      password: (val) => (!val ? 'Mot de passe requis' : val.length < 8 ? 'Trop court' : ''),
    }
  );

  return (
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      <input
        name="email"
        value={values.email}
        onChange={(e) => handleChange('email', e.target.value)}
        onBlur={() => handleBlur('email')}
      />
      {errors.email && <span>{errors.email}</span>}
      {/* ... */}
    </form>
  );
};
```

---

## 🎯 Conclusion et Prochaines Étapes

### Concepts Maîtrisés

Après ce cours, vous devriez comprendre :
- ✅ Architecture React moderne
- ✅ Hooks personnalisés et leur utilité
- ✅ Routing avec React Router
- ✅ Gestion d'état locale
- ✅ Composants réutilisables
- ✅ Styling avec Tailwind CSS
- ✅ Gestion des erreurs
- ✅ Optimisations de performance
- ✅ Patterns de design React

### Prochaines Étapes Recommandées

1. **État Global** : Apprendre Context API ou Zustand/Redux
2. **Tests** : Jest + React Testing Library
3. **Formulaires** : React Hook Form
4. **Animations** : Framer Motion
5. **Backend** : Intégration avec Node.js/Express
6. **Déploiement** : Vercel, Netlify, ou AWS

### Ressources Complémentaires

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [React Router Docs](https://reactrouter.com)

---

**Bon courage dans votre apprentissage ! 🚀**

