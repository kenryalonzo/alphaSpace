# 📖 Guide de Référence Rapide - alphaSpace

## 🚀 Démarrage Rapide

### Structure d'un Composant React

```typescript
import { useState, useEffect } from 'react';

interface Props {
  title: string;
}

const MonComposant = ({ title }: Props) => {
  const [state, setState] = useState<string>('');

  useEffect(() => {
    // Effet de bord
    return () => {
      // Nettoyage
    };
  }, []);

  return <div>{title}</div>;
};

export default MonComposant;
```

---

## 🎣 Hooks Essentiels

### useState
```typescript
const [value, setValue] = useState<Type>(initialValue);
setValue(newValue); // Mise à jour directe
setValue(prev => prev + 1); // Mise à jour fonctionnelle
```

### useEffect
```typescript
useEffect(() => {
  // Code à exécuter
  return () => {
    // Nettoyage (optionnel)
  };
}, [dependencies]); // [] = une fois, [dep] = quand dep change
```

### useRef
```typescript
const ref = useRef<HTMLDivElement>(null);
ref.current?.focus(); // Accès à l'élément DOM
```

### useMemo
```typescript
const expensiveValue = useMemo(() => {
  return computeExpensiveValue(a, b);
}, [a, b]); // Recalcule seulement si a ou b change
```

### useCallback
```typescript
const memoizedCallback = useCallback(() => {
  doSomething(a, b);
}, [a, b]); // Même fonction si dépendances inchangées
```

---

## 🧭 React Router

### Configuration
```typescript
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
    ],
  },
]);
```

### Navigation
```typescript
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';

<Link to="/about">À propos</Link>

<NavLink
  to="/about"
  className={({ isActive }) => isActive ? 'active' : ''}
>
  À propos
</NavLink>

const navigate = useNavigate();
navigate('/about');

const location = useLocation();
console.log(location.pathname);
```

---

## 🎨 Tailwind CSS - Classes Utiles

### Layout
```typescript
<div className="flex items-center justify-between">
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
<div className="flex flex-col space-y-4">
```

### Responsive
```typescript
<div className="text-sm md:text-base lg:text-lg">
<div className="hidden md:block">Visible sur tablette+</div>
<div className="block md:hidden">Visible sur mobile</div>
```

### États
```typescript
<button className="hover:bg-gray-100 focus:ring-2 focus:ring-blue-500">
<div className="group hover:scale-105 transition-transform">
```

### Opacité et Backdrop
```typescript
<div className="bg-black/80 backdrop-blur-sm">
<div className="bg-white/10 border border-white/20">
```

---

## 🔄 Patterns Courants

### Gestion d'État avec useState
```typescript
// État simple
const [count, setCount] = useState(0);

// État objet
const [user, setUser] = useState({ name: '', email: '' });
setUser(prev => ({ ...prev, name: 'John' }));

// État tableau
const [items, setItems] = useState<string[]>([]);
setItems(prev => [...prev, newItem]);
setItems(prev => prev.filter(item => item !== removedItem));
```

### Requête API avec useEffect
```typescript
useEffect(() => {
  let isMounted = true;
  const abortController = new AbortController();

  const fetchData = async () => {
    try {
      const response = await axios.get(url, {
        signal: abortController.signal,
      });
      if (isMounted) {
        setData(response.data);
      }
    } catch (error) {
      if (isMounted && !abortController.signal.aborted) {
        setError(error.message);
      }
    }
  };

  fetchData();

  return () => {
    isMounted = false;
    abortController.abort();
  };
}, [url]);
```

### Formulaire Contrôlé
```typescript
const [formData, setFormData] = useState({ email: '', password: '' });

<input
  value={formData.email}
  onChange={(e) => setFormData(prev => ({
    ...prev,
    email: e.target.value
  }))}
/>
```

---

## 🛠️ TypeScript - Types Utiles

### Types de Base
```typescript
type User = {
  id: number;
  name: string;
  email: string;
  age?: number; // Optionnel
};

interface Product {
  id: string;
  title: string;
  price: number;
}

type Status = 'loading' | 'success' | 'error';
```

### Types Génériques
```typescript
type ApiResponse<T> = {
  data: T;
  status: number;
  message: string;
};

function useFetch<T>(url: string): FetchState<T> {
  // ...
}
```

### Types d'Événements
```typescript
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  console.log(e.target.value);
};

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
};

const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
  e.preventDefault();
};
```

---

## 🎯 Gestion d'Erreurs

### Try/Catch avec Axios
```typescript
try {
  const response = await axios.get(url);
  setData(response.data);
} catch (err) {
  if (axios.isAxiosError(err)) {
    if (err.response) {
      // Erreur serveur (404, 500, etc.)
      console.error('Erreur:', err.response.status);
    } else if (err.request) {
      // Pas de réponse
      console.error('Pas de réponse du serveur');
    }
  }
}
```

### Image Fallback
```typescript
<img
  src={imageUrl}
  onError={(e) => {
    const target = e.target as HTMLImageElement;
    target.src = 'fallback-image.jpg';
  }}
/>
```

---

## ⚡ Optimisations

### Lazy Loading
```typescript
const HeavyComponent = React.lazy(() => import('./HeavyComponent'));

<Suspense fallback={<Loader />}>
  <HeavyComponent />
</Suspense>
```

### Memoization
```typescript
const ExpensiveComponent = React.memo(({ data }) => {
  return <div>{/* ... */}</div>;
});

const memoizedValue = useMemo(() => compute(data), [data]);
const memoizedCallback = useCallback(() => doSomething(), [dep]);
```

---

## 📦 Imports Courants

```typescript
// React
import { useState, useEffect, useRef, useMemo, useCallback } from 'react';

// React Router
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';

// Axios
import axios, { type AxiosRequestConfig } from 'axios';

// Types
import type { ComponentProps, ReactNode } from 'react';
```

---

## 🎨 Classes Tailwind Personnalisées

```typescript
// Effet glass
className="glass rounded-xl"

// Alignement centré avec max-width
className="align-element"

// Police personnalisée
className="cube-font"

// Animation
className="animate__animated animate__fadeIn"
```

---

## 🔍 Debugging

### Console Logs
```typescript
console.log('Valeur:', value);
console.table(array);
console.error('Erreur:', error);
```

### React DevTools
- Installer l'extension Chrome/Firefox
- Inspecter les composants
- Voir l'état et les props
- Profiler les performances

---

## 📝 Checklist Avant de Commiter

- [ ] Pas d'erreurs TypeScript
- [ ] Pas d'erreurs ESLint
- [ ] Composants testés manuellement
- [ ] Responsive vérifié (mobile/tablette/desktop)
- [ ] Gestion d'erreurs implémentée
- [ ] Loading states ajoutés
- [ ] Accessibilité de base (alt, aria-label)

---

## 🚨 Erreurs Courantes et Solutions

### "Cannot read property of undefined"
```typescript
// ❌ Mauvais
data.results.map(...)

// ✅ Bon
data?.results?.map(...)
```

### "Maximum update depth exceeded"
```typescript
// ❌ Mauvais - setState dans render
const Component = () => {
  setState(value); // ❌
  return <div>...</div>;
};

// ✅ Bon - dans useEffect
useEffect(() => {
  setState(value); // ✅
}, []);
```

### "Warning: Can't perform a React state update"
```typescript
// ✅ Solution : Vérifier si monté
let isMounted = true;
if (isMounted) {
  setState(value);
}
return () => { isMounted = false; };
```

---

## 📚 Ressources Rapides

- **React Docs** : https://react.dev
- **TypeScript** : https://www.typescriptlang.org/docs/
- **Tailwind** : https://tailwindcss.com/docs
- **React Router** : https://reactrouter.com
- **Axios** : https://axios-http.com/docs/intro

---

**Gardez ce guide à portée de main ! 📌**

