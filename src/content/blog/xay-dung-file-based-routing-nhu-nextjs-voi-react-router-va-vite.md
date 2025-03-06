---
external: false
draft: false
title: "Xây dựng File-based routing như NextJS với React Router và Vite"
description: "Xây dựng File-based routing như NextJS với React Router và Vite làm như thế nào? "
date: "2025-03-06"
author: "Minh Nhật Nguyễn"
slug: "xay-dung-file-based-routing-nhu-nextjs-voi-react-router-va-vite"
status: "Published"
categories:
  - name: "front-end"
    color: "blue"
readingTime: "20 min read"
---

Xin chào mọi người, hôm nay mình muốn chia sẻ cách xây dựng một file-based routing với React Router DOM. Chắc hẳn khi sử dụng Next.js, mọi người sẽ thấy meta framework này có cách tổ chức `pages` khá hay: chỉ cần đặt tên file và thư mục là đã có route tương ứng. Hiện tại, Next.js đã chuyển sang cách tổ chức mới với thư mục `app`, nhưng ý tưởng chung về cách tổ chức file để tạo route tự động vẫn rất hữu ích.


Vậy có cách nào để áp dụng ý tưởng này khi sử dụng React và Vite không? Câu trả lời là **có**, và chúng ta có thể làm điều đó bằng cách tận dụng sức mạnh của React Router DOM. Bây giờ, hãy cùng mình xây dựng tính năng tương tự với React Router DOM và Vite nhé. Mình tin là nó sẽ giúp chúng ta tổ chức file tốt hơn trong dự án dùng hoàn toàn chỉ với React.


# Một chút nền tảng về React Router Dom 


Trong React Router DOM (phiên bản 6 trở lên), chúng ta thường có hai cách chính để cấu hình routing:


## Cách 1: Sử dụng `<Routes>` và `<Route>` trong Component


Đây là cách truyền thống và phổ biến nhất khi làm việc với React Router DOM. Các route được định nghĩa trực tiếp trong component, sử dụng các thẻ `<Routes>` và `<Route>` để khai báo đường dẫn và component tương ứng.


Ví dụ:


```javascript
import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import NavBar from './components/NavBar';
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Products = lazy(() => import('./pages/Products'));
const ProductDetails = lazy(() => import('./pages/products/ProductDetails'));
const ProductReviews = lazy(() => import('./pages/products/ProductReviews'));
const NoMatch = lazy(() => import('./components/NoMatch'));

const App = () => {
  return (
    <Router>
      <NavBar />
      <Suspense fallback={<div className="container">Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />}>
            <Route path=":productId" element={<ProductDetails />}>
              <Route path="reviews" element={<ProductReviews />} />
            </Route>
          </Route>
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
```


### Đặc điểm:

- Routes và Route được định nghĩa trực tiếp trong component.
- Có thể sử dụng `<Suspense>` để lazy load các component khi cần thiết.
- Thích hợp cho các dự án nhỏ và vừa, nơi cấu trúc routing không quá phức tạp.

## Cách 2: Sử dụng `createBrowserRouter` và `RouterProvider`


Đây là cách tiếp cận mới và linh hoạt hơn, giúp chúng ta quản lý routing theo kiểu cấu hình (configuration-based). Cách này phù hợp khi mình muốn xây dựng hệ thống routing phức tạp, đặc biệt là khi có nhiều nested route.


Ví dụ:


```javascript
import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import NavBar from './components/NavBar';
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Products = lazy(() => import('./pages/Products'));
const ProductDetails = lazy(() => import('./pages/products/ProductDetails'));
const ProductReviews = lazy(() => import('./pages/products/ProductReviews'));
const NoMatch = lazy(() => import('./components/NoMatch'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <NoMatch />,
    children: [
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'products',
        element: <Products />,
        children: [
          {
            path: ':productId',
            element: <ProductDetails />,
            children: [
              {
                path: 'reviews',
                element: <ProductReviews />,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <NoMatch />,
  },
]);

const App = () => {
  return (
    <>
      <NavBar />
      <Suspense fallback={<div className="container">Loading...</div>}>
        <RouterProvider router={router} />
      </Suspense>
    </>
  );
};

export default App;
```


### Đặc điểm:

- Routes được định nghĩa bằng một mảng object thông qua `createBrowserRouter`.
- Cấu trúc rõ ràng, dễ quản lý khi dự án lớn với nhiều nested route.
- Tách biệt phần định nghĩa route ra khỏi component, dễ dàng bảo trì và mở rộng.
> Cách tiếp cận thứ 2 này giúp chúng ta có thể dễ dàng xây dựng hệ thống routing theo hướng **file-based routing** như trong Next.js.

# Một chút nền tảng về syntax của React jsx


Làm việc nhiều với `jsx` hay `tsx` chắc chúng ta sẽ thường không để ý sự khác biệt của syntax trong `jsx` được biên dịch khác như nào đâu nhỉ .


Mình sẽ đi qua các syntax chính và đặt biệt là với cú pháp `<Component />` sau khi biên dịch nó thực tế sẽ là như thế nào 


### 1. Thẻ đơn giản


```javascript
const element = <h1>Hello, world!</h1>;
```


Biên dịch thành:


```javascript
const element = React.createElement('h1', null, 'Hello, world!');
```


### 2. Component


```javascript
const element = <MyComponent />;
```


Biên dịch thành:


```javascript
const element = React.createElement(MyComponent, null);
```


### 3. Props


```javascript
const element = <MyComponent name="John" age={30} />;
```


Biên dịch thành:


```javascript
const element = React.createElement(MyComponent, { name: 'John', age: 30 });
```


### 4. Children


```javascript
const element = (
  <MyComponent>
    <h1>Hello</h1>
    <p>World</p>
  </MyComponent>
);
```


Biên dịch thành:


```javascript
const element = React.createElement(
  MyComponent,
  null,
  React.createElement('h1', null, 'Hello'),
  React.createElement('p', null, 'World')
);
```


### 5. Fragment


```javascript
const element = (
  <>
    <h1>Hello</h1>
    <p>World</p>
  </>
);
```


Biên dịch thành:


```javascript
const element = React.createElement(
  React.Fragment,
  null,
  React.createElement('h1', null, 'Hello'),
  React.createElement('p', null, 'World')
);
```


### 6. Conditional Rendering


```javascript
const element = <div>{isLoggedIn ? <User /> : <Guest />}</div>;
```


Biên dịch thành:


```javascript
const element = React.createElement(
  'div',
  null,
  isLoggedIn ? React.createElement(User, null) : React.createElement(Guest, null)
);
```


### 7. Array of Elements


```javascript
const element = (
  <ul>
    {items.map((item) => (
      <li key={item.id}>{item.name}</li>
    ))}
  </ul>
);
```


Biên dịch thành:


```javascript
const element = React.createElement(
  'ul',
  null,
  items.map((item) =>
    React.createElement('li', { key: item.id }, item.name)
  )
);
```


### 8. Event Handling


```javascript
const element = <button onClick={handleClick}>Click Me</button>;
```


Biên dịch thành:


```javascript
const element = React.createElement('button', { onClick: handleClick }, 'Click Me');
```


`React.createElement()` là cách mà React hiểu và tạo ra các phần tử DOM ảo (Virtual DOM).


Việc hiểu rõ cách biên dịch này giúp ta hình dung rõ hơn về cách React thực sự tạo ra các thành phần trên giao diện.


### JSX:


```javascript
const NoMatch = lazy(() => import('./components/NoMatch'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <NoMatch />,
    children: [
      // ...
    ]
  }
]);
```


### Biên dịch thành JavaScript:


```javascript
const NoMatch = lazy(() => import('./components/NoMatch'));

const router = createBrowserRouter([
  {
    path: '/',
    element: React.createElement(Home, null),
    errorElement: React.createElement(NoMatch, null),
    children: [
      // ...
    ]
  }
]);
```


# Cùng xây dựng **File-based với Vite** 


Vite cung cấp cho ta hai cách để import hàng loạt file một cách linh hoạt là

- `import.meta.glob()` (**dynamic import**)
- `import.meta.globEager()` (**static import**)

### **`import.meta.glob()`**(**dynamic import**)

- Trả về một object chứa các hàm `import()` dùng để lazy load các module khi cần thiết.
- Phù hợp khi chúng ta muốn load các component theo nhu cầu (ví dụ: dựa trên route).

### **Ví dụ:**


```plain text
const modules = import.meta.glob('./components/*.tsx');
console.log(modules);
```


**Kết quả:**


```plain text
{
  './components/Header.tsx': () => import('./components/Header.tsx'),
  './components/Footer.tsx': () => import('./components/Footer.tsx')
}
```


---


### **`import.meta.globEager()`**(**static import**)

- Trả về một object chứa **nội dung đã import sẵn** của các module.
- Phù hợp khi ta muốn import tất cả từ đầu (ví dụ: khi cần xây dựng routing tĩnh).

### **Ví dụ:**


```plain text
const modules = import.meta.globEager('./components/*.tsx');
console.log(modules);
```


**Kết quả:**


```plain text
{
  './components/Header.tsx': { default: [Function: Header] },
  './components/Footer.tsx': { default: [Function: Footer] }
}
```


### **Lưu ý:**

- Nếu chúng ta dùng **default export**, component sẽ nằm trong `.default`.
- Nếu chúng ta dùng **named export**, ta phải gọi chính xác tên đã export. `import('./components/Header.tsx').Header`

## **Xây dựng** **`buildGlobRoutes()`** **với** **`import.meta.glob()`**


Chúng ta sẽ xây dựng một `buildGlobRoutes()` sử dụng `import.meta.glob()` để lazy load các component khi cần thiết. Để mở đầu đơn giản thì hàm này chỉ đơn giản 

- lấy tên file static loại bỏ extension
- lấy tên file động `[]` và chuyển thành `:id`
- catch all với file `[...]` và chuyển thành `*`

### **File:** **`src/lib/route-builder.ts`**


```typescript
import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';

export const buildGlobRoutes = (MODULES: Record<string, () => Promise<any>>): RouteObject[] => {
  return Object.keys(MODULES).map((route) => {
    const path = route
      .replace(/\/src\/pages|index|\.tsx$/g, '')
      .replace(/\[\.{3}.+\]/, '*')
      .replace(/\[(.+)\]/, ':$1');

    // Sử dụng React.lazy() để lazy load component
    const Component = lazy(MODULES[route]);
    return {
      path,
      element: Component.default,
    };
  });
};
```


### **File:** **`src/main.tsx`**


```typescript
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import { buildGlobRoutes } from './lib/route-builder';

// Sử dụng import.meta.glob() để lazy load các component
const globTree = import.meta.glob('/src/pages/**/[a-z[]*.tsx');
const tree = buildGlobRoutes(globTree);

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: tree,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
```


Bây giờ để nâng cao thì chúng ta sẽ tạo một `buildPathName` function giúp nhận vào tên đường dẫn file và đặt tên theo cách nguyên tắc sau 

1. **Index routes**:
	- `src/pages/index.tsx` → `/`
	- `src/pages/posts/index.tsx` → `/posts`
2. **Nested routes**:
	- `src/pages/posts/topic.tsx` → `/posts/topic`
3. **Dynamic routes**:
	- `src/pages/posts/[slug].tsx` → `/posts/:slug`
	- `src/pages/[user]/settings.tsx` → `/:user/settings`
	- `src/pages/posts/[...all].tsx` → `/posts/*`
4. **Layout routes**:
	- `src/pages/layout.tsx` → layout cho tất cả các route bắt đầu từ `/`
5. **Skip folder**:
	- `src/pages/(admin)/post.tsx` → `/post` (bỏ qua folder `(admin)`)
6. **Skip prefix** **`_`**:
	- `src/pages/_components.tsx` → Không tạo route cho `_components`
7. **not-found.tsx**:
	- `src/pages/post/not-found.tsx` → Được sử dụng cuối cùng cho `/post/*`
8. **error.tsx**:
	- `src/pages/post/error.tsx` → Được sử dụng cho lỗi của `/post/*`

## 1. **sortRoutes**


Hàm này sẽ giúp sắp xếp các file theo đúng thứ tự ưu tiên . Trách trường hợp `post/:id` đặt nằm trước static `/post/static`


### Công dụng:


Sắp xếp các route theo thứ tự ưu tiên từ cao đến thấp:

- Root index (`/src/pages/index.tsx`)
- Các index khác (`/index.tsx`)
- Static routes (như `/about`, `/contact`)
- Dynamic routes (như `/[id]`)
- Catch-all routes (`[...slug]`)

```typescript
/**
 * Sorts routes by priority root index > other index > static > dynamic > catch-all
 */
function sortRoutes(MODULES: GlobModules): string[] {
  return Object.keys(MODULES)
    .filter(route => {
      return !route.match(/\/_[^/]+$/) && 
             !route.endsWith('/layout.tsx') &&
             !route.endsWith('/error.tsx') &&
             !route.endsWith('/not-found.tsx');
    })
    .sort((a, b) => {
      // Priority: root index > other index > static > dynamic > catch-all
      const aIsRootIndex = a === '/src/pages/index.tsx';
      const bIsRootIndex = b === '/src/pages/index.tsx';
      const aIsIndex = a.endsWith('/index.tsx');
      const bIsIndex = b.endsWith('/index.tsx');
      const aIsCatchAll = a.includes('[...');
      const bIsCatchAll = b.includes('[...');
      const aIsDynamic = a.includes('[') && !aIsCatchAll;
      const bIsDynamic = b.includes('[') && !bIsCatchAll;
      const aIsStatic = !aIsDynamic && !aIsCatchAll;
      const bIsStatic = !bIsDynamic && !bIsCatchAll;
    
      // 1. Root index first
      if (aIsRootIndex) return -1;
      if (bIsRootIndex) return 1;
    
      // 2. Other index routes
      if (aIsIndex !== bIsIndex) return aIsIndex ? -1 : 1;
    
      // 3. Static routes before dynamic and catch-all
      if (aIsStatic !== bIsStatic) return aIsStatic ? -1 : 1;
      
      // Extract clean paths for more accurate segment comparison
      const aPath = a.replace(/^\/src\/pages\//, '').replace(/\.tsx$/, '');
      const bPath = b.replace(/^\/src\/pages\//, '').replace(/\.tsx$/, '');
      
      // Count segments more accurately
      const aSegments = aPath.split('/').filter(Boolean).length;
      const bSegments = bPath.split('/').filter(Boolean).length;
    
      // 4. Static and Dynamic routes - sort by segments length first
      if (aSegments !== bSegments) return aSegments - bSegments;
    
      // 5. Within same type, sort alphabetically
      if (aIsStatic && bIsStatic) return a.localeCompare(b);
      if (aIsDynamic && bIsDynamic) return a.localeCompare(b);
    
      // 6. Dynamic routes before catch-all
      if (aIsDynamic !== bIsDynamic) return aIsDynamic ? -1 : 1;
    
      // 7. Catch-all routes last
      if (aIsCatchAll !== bIsCatchAll) return aIsCatchAll ? 1 : -1;
    
      // 8. Within same type, sort by path length
      return a.length - b.length;
    });
}
```


## 2. **convertToRoutePath**


Hàm này sẽ giúp chuyển đổi đường dẫn file thành URL hợp lệ cho React Router.


Ví dụ:

- `/src/pages/index.tsx` → `/`
- `/src/pages/about.tsx` → `/about`
- `/src/pages/[id].tsx` → `/:id`
- `/src/pages/[...slug].tsx` → `/*`

```typescript
/**
 * Converts a file path to a valid route path
 */
function convertToRoutePath(route: string): string {
  let path = route;
  // Remove src/pages prefix and .tsx extension
  path = path.replace(/^\/src\/pages\//, '').replace(/\.tsx$/, '');
  // Remove group notation, e.g., (admin)
  path = path.replace(/\([^)]+\)\//g, '');
  // Handle index routes
  path = path.replace(/\/index$/, '');
  if (path === 'index') path = '';
  // Convert dynamic segments [param] to :param
  path = path.replace(/\[([^\.].*?)\]/g, ':$1');
  // Convert catch-all segments [...param] to *
  path = path.replace(/\[\.\.\.(.+?)\]/g, '*');
  
  // Ensure path starts with /
  if (!path.startsWith('/')) {
    path = '/' + path;
  }
  
  return path;
}
```


## 3. **collectLayouts**


Thu thập tất cả các file `layout.tsx`.component từ `MODULES` và lưu chúng vào `Map` để dễ dàng áp dụng cho các route.


```typescript
/**
 * Collects layout components from the modules
 */
function collectLayouts(MODULES: GlobModules): Map<string, React.ComponentType> {
  const layoutRoutes = new Map<string, React.ComponentType>();
  
  Object.keys(MODULES).forEach((route) => {
    if (route.endsWith('/layout.tsx')) {
      let layoutKey;
      
      // Special case for root layout
      if (route === '/src/pages/layout.tsx') {
        layoutKey = '';
      } else {
        layoutKey = route
          .replace(/^\/src\/pages\//, '')
          .replace(/\/layout\.tsx$/, '');
      }
      
      const Layout = lazy(MODULES[route]);
      layoutRoutes.set(layoutKey, Layout);
    }
  });
  
  console.log("All collected layout keys:", Array.from(layoutRoutes.keys()));
  return layoutRoutes;
}
```


### Ví dụ:


```plain text
/src/pages/admin/layout.tsx
/src/pages/layout.tsx
```


Kết quả của `layoutRoutes` sẽ là:


```plain text
Map {
  'admin' => LayoutComponent,
  '' => RootLayoutComponent
}
```


## 4. **getLayoutPaths(path: string)**


Tạo ra mảng các đường dẫn layout từ cụ thể nhất đến root. Điều này giúp áp dụng layout theo cấp bậc từ layout cụ thể đến layout tổng quát nhất. Khi sử dụng chung với ,mảng trả về từ **`collectLayouts`**


```typescript
/**
 * Builds an array of possible layout paths for a given route
 */
function getLayoutPaths(path: string): string[] {
  // For root path, just return an empty string
  if (path === '/') {
    return [''];
  }
  
  // For other paths, build layout paths from most specific to least specific
  const segments = path.split('/').filter(Boolean);
  const paths = [];
  
  // Start with the most specific path
  // Build paths from most specific to least specific (excluding empty string for now)
  for (let i = segments.length; i > 0; i--) {
    paths.push(segments.slice(0, i).join('/'));
  }
  
  // Add root layout (empty string) last - this ensures it will be applied last
  paths.push('');
  
  return paths;
}
```


### Ví dụ:


```plain text
getLayoutPaths('/admin/dashboard/users')
// Kết quả: ['admin/dashboard/users', 'admin/dashboard', 'admin', '']
```


## 5. **applyLayouts(path, element, layoutRoutes)**


Áp dụng các layout từ cụ thể đến tổng quát cho một component.


Ví dụ: `/admin/dashboard` sẽ áp dụng layout cho:

- `/admin/dashboard`
- `/admin`
- `Root layout`

### Cách hoạt động:

- Sử dụng `getLayoutPaths()` để lấy danh sách các layout từ cụ thể đến root.
- Lặp qua từng layout và bọc component bằng `Suspense` để lazy load layout đó.

```typescript
/**
 * Applies layouts to a component
 */
function applyLayouts(
  path: string, 
  element: any, 
  layoutRoutes: Map<string, React.ComponentType>
): any {
  // Get layout paths from most specific to root
  const layoutPaths = getLayoutPaths(path);
  
  // Apply layouts from most specific to least specific (root layout last)
  layoutPaths.forEach(layoutPath => {
    const Layout = layoutRoutes.get(layoutPath);

    if (Layout) {
      element = createElement(
        Suspense, 
        { fallback: createElement('div', null, 'Loading layout...') },
        createElement(Layout, null, element)
      );
    }
  });
  
  return element;
}
```


### Ví dụ:


Giả sử ta có các layout sau:

- `/src/pages/admin/layout.tsx`
- `/src/pages/layout.tsx`

Với route `/admin/dashboard`, component sẽ được bọc như sau:


```plain text
<RootLayout>
  <AdminLayout>
    <DashboardComponent />
  </AdminLayout>
</RootLayout>
```


---


## 6. **addNotFoundRoutes(MODULES, routes, layoutRoutes)**


Thêm các route `not-found.tsx` vào cuối cùng của mảng routes để xử lý các trường hợp không tìm thấy route.


### Cách hoạt động:

- Tìm tất cả các file `not-found.tsx`.
- Chuyển đổi chúng thành route có path là `/*` hoặc `/:parent/*`.
- Áp dụng layout tương ứng cho các trang `not-found`.

```typescript
/**
 * Adds not-found routes to the routes array
 */
function addNotFoundRoutes(
  MODULES: GlobModules, 
  routes: RouteObject[], 
  layoutRoutes: Map<string, React.ComponentType>
): void {
  const notFoundRoutes = Object.keys(MODULES)
    .filter(route => route.endsWith('/not-found.tsx'));
  
  
  notFoundRoutes.forEach((route) => {
    let path = route
      .replace(/^\/src\/pages\//, '')
      .replace(/not-found\.tsx$/, '');
    
    // Remove group notation, e.g., (admin), (protect)
    path = path.replace(/\([^)]+\)\//g, '');
    
    // Remove trailing slash if exists
    path = path.replace(/\/$/, '');
    
    // If it's root not-found, use /*
    path = path ? `/${path}/*` : '/*';
    
    const NotFound = lazy(MODULES[route]);
    let element: any = createElement(
      Suspense, 
      { fallback: createElement('div', null, 'Loading...') },
      createElement(NotFound, null)
    );
    
    // Apply layouts - we need to remove the /* for layout matching
    const layoutPath = path.replace(/\/\*$/, '');
    
    element = applyLayouts(layoutPath, element, layoutRoutes);
    
    routes.push({ path, element });
  });
}
```


### Ví dụ:


Giả sử ta có:


```plain text
/src/pages/not-found.tsx
/src/pages/admin/not-found.tsx
```


Sẽ tạo ra các route:


```plain text
{
  path: '/*',
  element: <NotFoundComponent />
},
{
  path: '/admin/*',
  element: <AdminLayout><AdminNotFoundComponent /></AdminLayout>
}
```


---


## 7. **buildGlobRoutes(MODULES: GlobModules)**


Đây là hàm chính xây dựng mảng `routes` cho React Router dựa trên các module đã import.


```typescript
/**
 * Builds routes from the glob modules
 */
function buildGlobRoutes(MODULES: GlobModules): RouteObject[] {
  
  const routes: RouteObject[] = [];
  const layoutRoutes = collectLayouts(MODULES);
  const sortedRoutePaths = sortRoutes(MODULES);
  

  // Build regular routes
  sortedRoutePaths.forEach((route) => {
    const path = convertToRoutePath(route);
    
    const Component = lazy(MODULES[route]);
    let element: any = createElement(
      Suspense, 
      { fallback: createElement('div', null, 'Loading...') },
      createElement(Component, null)
    );
    
    // Apply layouts to the component
    element = applyLayouts(path, element, layoutRoutes);
    
    routes.push({ path, element });
  });

  // Add not-found routes at the end
  addNotFoundRoutes(MODULES, routes, layoutRoutes);
  
  return routes;
};
export default buildGlobRoutes;
```


### Cách hoạt động:

- **Bước 1:** Thu thập tất cả layout bằng `collectLayouts()`.
- **Bước 2:** Sắp xếp route bằng `sortRoutes()`.
- **Bước 3:** Chuyển đổi từng route thành `RouteObject`.
- **Bước 4:** Áp dụng layout cho từng route bằng `applyLayouts()`.
- **Bước 5:** Thêm các route `not-found` vào cuối bằng `addNotFoundRoutes()`.

Tổng hợp tất cả lại ta sẽ được file cuối cùng


## **File cuối cùng** `buildGlobRoutes`


```typescript
import React, { lazy, Suspense, createElement } from 'react';
import type { RouteObject } from 'react-router-dom';

interface RouteModule {
  default: React.ComponentType;
  Layout?: React.ComponentType<{ children: React.ReactNode }>;
}

export type GlobModules = Record<string, () => Promise<RouteModule>>;

/**
 * Sorts routes by priority root index > other index > static > dynamic > catch-all
 */
function sortRoutes(MODULES: GlobModules): string[] {
  return Object.keys(MODULES)
    .filter(route => {
      return !route.match(/\/_[^/]+$/) && 
             !route.endsWith('/layout.tsx') &&
             !route.endsWith('/error.tsx') &&
             !route.endsWith('/not-found.tsx');
    })
    .sort((a, b) => {
      // Priority: root index > other index > static > dynamic > catch-all
      const aIsRootIndex = a === '/src/pages/index.tsx';
      const bIsRootIndex = b === '/src/pages/index.tsx';
      const aIsIndex = a.endsWith('/index.tsx');
      const bIsIndex = b.endsWith('/index.tsx');
      const aIsCatchAll = a.includes('[...');
      const bIsCatchAll = b.includes('[...');
      const aIsDynamic = a.includes('[') && !aIsCatchAll;
      const bIsDynamic = b.includes('[') && !bIsCatchAll;
      const aIsStatic = !aIsDynamic && !aIsCatchAll;
      const bIsStatic = !bIsDynamic && !bIsCatchAll;
    
      // 1. Root index first
      if (aIsRootIndex) return -1;
      if (bIsRootIndex) return 1;
    
      // 2. Other index routes
      if (aIsIndex !== bIsIndex) return aIsIndex ? -1 : 1;
    
      // 3. Static routes before dynamic and catch-all
      if (aIsStatic !== bIsStatic) return aIsStatic ? -1 : 1;
      
      // Extract clean paths for more accurate segment comparison
      const aPath = a.replace(/^\/src\/pages\//, '').replace(/\.tsx$/, '');
      const bPath = b.replace(/^\/src\/pages\//, '').replace(/\.tsx$/, '');
      
      // Count segments more accurately
      const aSegments = aPath.split('/').filter(Boolean).length;
      const bSegments = bPath.split('/').filter(Boolean).length;
    
      // 4. Static and Dynamic routes - sort by segments length first
      if (aSegments !== bSegments) return aSegments - bSegments;
    
      // 5. Within same type, sort alphabetically
      if (aIsStatic && bIsStatic) return a.localeCompare(b);
      if (aIsDynamic && bIsDynamic) return a.localeCompare(b);
    
      // 6. Dynamic routes before catch-all
      if (aIsDynamic !== bIsDynamic) return aIsDynamic ? -1 : 1;
    
      // 7. Catch-all routes last
      if (aIsCatchAll !== bIsCatchAll) return aIsCatchAll ? 1 : -1;
    
      // 8. Within same type, sort by path length
      return a.length - b.length;
    });
}

/**
 * Converts a file path to a valid route path
 */
function convertToRoutePath(route: string): string {
  let path = route;
  // Remove src/pages prefix and .tsx extension
  path = path.replace(/^\/src\/pages\//, '').replace(/\.tsx$/, '');
  // Remove group notation, e.g., (admin)
  path = path.replace(/\([^)]+\)\//g, '');
  // Handle index routes
  path = path.replace(/\/index$/, '');
  if (path === 'index') path = '';
  // Convert dynamic segments [param] to :param
  path = path.replace(/\[([^\.].*?)\]/g, ':$1');
  // Convert catch-all segments [...param] to *
  path = path.replace(/\[\.\.\.(.+?)\]/g, '*');
  
  // Ensure path starts with /
  if (!path.startsWith('/')) {
    path = '/' + path;
  }
  
  return path;
}

/**
 * Collects layout components from the modules
 */
function collectLayouts(MODULES: GlobModules): Map<string, React.ComponentType> {
  const layoutRoutes = new Map<string, React.ComponentType>();
  
  Object.keys(MODULES).forEach((route) => {
    if (route.endsWith('/layout.tsx')) {
      let layoutKey;
      
      // Special case for root layout
      if (route === '/src/pages/layout.tsx') {
        layoutKey = '';
      } else {
        layoutKey = route
          .replace(/^\/src\/pages\//, '')
          .replace(/\/layout\.tsx$/, '');
      }
      
      const Layout = lazy(MODULES[route]);
      layoutRoutes.set(layoutKey, Layout);
    }
  });
  
  console.log("All collected layout keys:", Array.from(layoutRoutes.keys()));
  return layoutRoutes;
}

/**
 * Builds an array of possible layout paths for a given route
 */
function getLayoutPaths(path: string): string[] {
  // For root path, just return an empty string
  if (path === '/') {
    return [''];
  }
  
  // For other paths, build layout paths from most specific to least specific
  const segments = path.split('/').filter(Boolean);
  const paths = [];
  
  // Start with the most specific path
  // Build paths from most specific to least specific (excluding empty string for now)
  for (let i = segments.length; i > 0; i--) {
    paths.push(segments.slice(0, i).join('/'));
  }
  
  // Add root layout (empty string) last - this ensures it will be applied last
  paths.push('');
  
  return paths;
}




/**
 * Applies layouts to a component
 */
function applyLayouts(
  path: string, 
  element: any, 
  layoutRoutes: Map<string, React.ComponentType>
): any {
  // Get layout paths from most specific to root
  const layoutPaths = getLayoutPaths(path);
  
  // Apply layouts from most specific to least specific (root layout last)
  layoutPaths.forEach(layoutPath => {
    const Layout = layoutRoutes.get(layoutPath);

    if (Layout) {
      element = createElement(
        Suspense, 
        { fallback: createElement('div', null, 'Loading layout...') },
        createElement(Layout, null, element)
      );
    }
  });
  
  return element;
}


/**
 * Adds not-found routes to the routes array
 */
function addNotFoundRoutes(
  MODULES: GlobModules, 
  routes: RouteObject[], 
  layoutRoutes: Map<string, React.ComponentType>
): void {
  const notFoundRoutes = Object.keys(MODULES)
    .filter(route => route.endsWith('/not-found.tsx'));
  
  
  notFoundRoutes.forEach((route) => {
    let path = route
      .replace(/^\/src\/pages\//, '')
      .replace(/not-found\.tsx$/, '');
    
    // Remove group notation, e.g., (admin), (protect)
    path = path.replace(/\([^)]+\)\//g, '');
    
    // Remove trailing slash if exists
    path = path.replace(/\/$/, '');
    
    // If it's root not-found, use /*
    path = path ? `/${path}/*` : '/*';
    
    const NotFound = lazy(MODULES[route]);
    let element: any = createElement(
      Suspense, 
      { fallback: createElement('div', null, 'Loading...') },
      createElement(NotFound, null)
    );
    
    // Apply layouts - we need to remove the /* for layout matching
    const layoutPath = path.replace(/\/\*$/, '');
    
    element = applyLayouts(layoutPath, element, layoutRoutes);
    
    routes.push({ path, element });
  });
}

/**
 * Builds routes from the glob modules
 */
function buildGlobRoutes(MODULES: GlobModules): RouteObject[] {
  
  const routes: RouteObject[] = [];
  const layoutRoutes = collectLayouts(MODULES);
  const sortedRoutePaths = sortRoutes(MODULES);
  

  // Build regular routes
  sortedRoutePaths.forEach((route) => {
    const path = convertToRoutePath(route);
    
    const Component = lazy(MODULES[route]);
    let element: any = createElement(
      Suspense, 
      { fallback: createElement('div', null, 'Loading...') },
      createElement(Component, null)
    );
    
    // Apply layouts to the component
    element = applyLayouts(path, element, layoutRoutes);
    
    routes.push({ path, element });
  });

  // Add not-found routes at the end
  addNotFoundRoutes(MODULES, routes, layoutRoutes);
  
  return routes;
};

export default buildGlobRoutes;
```


---


Ta sẽ viết testcase để thử các trường hợp


```typescript
import { describe, it } from 'vitest';
import { buildGlobRoutes, GlobModules } from "./lib/route-builder";

describe('buildGlobRoutes', () => {
  it('should log route transformations', () => {
    const globTree = import.meta.glob('/src/pages/**/[a-z[]*.tsx');
    const tree = buildGlobRoutes(globTree as GlobModules);
    
    console.log('\n=== Debug Route Building Process ===');
    
    console.log('\n1. Original Routes:');
    console.log(Object.keys(globTree));

    console.log('\n2. After Transformation:');
    tree.forEach(route => {
      console.log(`${route.path}`);
    });
   
  });
});
```


---


## **Output mong đợi**


```shell
All collected layout keys: [ 'admin', 'app', '', 'protect', 'protect/settings' ]

=== Debug Route Building Process ===

1. Original Routes:
[
  '/src/pages/(auth)/sign-in.tsx',
  '/src/pages/admin/index.tsx',
  '/src/pages/admin/layout.tsx',
  '/src/pages/app/layout.tsx',
  '/src/pages/app/posts/[...all].tsx',
  '/src/pages/app/posts/[slug].tsx',
  '/src/pages/app/posts/index.tsx',
  '/src/pages/app/posts/topic.tsx',
  '/src/pages/error.tsx',
  '/src/pages/index.tsx',
  '/src/pages/layout.tsx',
  '/src/pages/not-found.tsx',
  '/src/pages/protect/[user]/settings.tsx',
  '/src/pages/protect/layout.tsx',
  '/src/pages/protect/settings/index.tsx',
  '/src/pages/protect/settings/layout.tsx',
  '/src/pages/protect/settings/not-found.tsx',
  '/src/pages/protect/settings/profile.tsx',
  '/src/pages/unauthorized.tsx'
]

2. After Transformation:
/
/admin
/app/posts
/protect/settings
/unauthorized
/sign-in
/app/posts/topic
/protect/settings/profile
/app/posts/:slug
/protect/:user/settings
/app/posts/*
/*
/protect/settings/*
```


# Tham khảo

- [https://omarelhawary.me/blog/file-based-routing-with-react-router/](https://omarelhawary.me/blog/file-based-routing-with-react-router/)
- [https://gist.github.com/thisanimus/aad22d1dbad33fd2d7a586b0b0e26250](https://gist.github.com/thisanimus/aad22d1dbad33fd2d7a586b0b0e26250)
- [https://vite.dev/guide/features.html#glob-import](https://vite.dev/guide/features.html#glob-import)

Link Source code example : [https://github.com/javier1234559/react-vite-next-file-router](https://github.com/javier1234559/react-vite-next-file-router)

