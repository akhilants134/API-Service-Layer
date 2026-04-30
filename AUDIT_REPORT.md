# AUDIT_REPORT.md

## API Calls, Hardcoded URLs, and Token Retrievals

### 1. ProductsPage.jsx

- **fetch() calls:** 3
  - Fetch products
  - Fetch categories
  - Add to cart
- **Hardcoded URLs:** 3 (`https://fakestoreapi.com/products`, `/products/categories`, `/carts`)
- **Manual token retrievals:** 1 (`localStorage.getItem('auth_token')`)
- **Error handling:** Inconsistent, no global handler, some errors just logged or set in state.

### 2. ProductDetailPage.jsx

- **fetch() calls:** 4
  - Fetch product detail
  - Fetch related products (nested)
  - Add to cart
  - Submit review
- **Hardcoded URLs:** 4 (all to `https://fakestoreapi.com`)
- **Manual token retrievals:** 2 (add to cart, submit review)
- **Error handling:** Inconsistent, uses `alert()` in some cases, no global handler.

### 3. CartPage.jsx

- **fetch() calls:** 3+
  - Fetch user cart
  - Fetch product details for each cart item (multiple nested fetches)
  - Remove from cart
- **Hardcoded URLs:** 3+ (cart, product details, remove)
- **Manual token retrievals:** 1 (remove from cart)
- **Error handling:** Inconsistent, uses `alert()` in some cases, generic error messages.

### 4. ProfilePage.jsx

- **fetch() calls:** 2
  - Fetch user profile
  - Update user profile
- **Hardcoded URLs:** 2 (user profile get/put)
- **Manual token retrievals:** 1 (update profile)
- **Error handling:** Inconsistent, manual 401 check, no global handler.

---

## Architectural Problems

- **Scattered API logic:** Every page/component makes its own fetch calls, with hardcoded URLs and manual token handling.
- **No single source of truth:** API base URL is duplicated everywhere. Changing the backend URL requires editing every file.
- **Inconsistent error handling:** Some errors are logged, some are shown as alerts, some are ignored. No global error handler.
- **Manual token injection:** Every component manually grabs the auth token, leading to copy-paste and risk of mistakes.
- **Nested fetches:** Some components (e.g., CartPage, ProductDetailPage) have deeply nested fetch calls, making code hard to read and maintain.
- **No request/response interceptors:** No way to handle 401/403/5xx errors globally or to attach headers in one place.

---

(Deployment URL and PR/video links to be added after implementation.)
