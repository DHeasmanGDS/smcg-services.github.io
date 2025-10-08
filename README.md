<!-- =============================
FILE 4: README_DEPLOY.md
============================= -->
# SMCG – Agentic AI Proposal (Private Microsite)

## Folder layout
```
/proposals/
  .htaccess            # Optional (Apache only) — Basic Auth + noindex
  _shared/
    gate.js            # Lightweight JS gate (for static hosts)
  agentic/
    index.html         # The agentic AI demo page (wrapped by the gate)
```

## Choose ONE access control option

### Option A — **Apache Basic Auth** (recommended if you control the server)
1. Create an htpasswd file on the server:
   ```bash
   htpasswd -c /var/www/smcg/.htpasswd demo_user
   # Enter password when prompted
   ```
2. Place the provided `.htaccess` file in `/proposals/` (or your Apache vhost).
3. Confirm: navigating to `/proposals/agentic/` prompts for username & password.

### Option B — **Cloudflare Access** (best for static hosting)
Protect `/proposals/*` with Cloudflare Access (One‑Time PIN) for emails you specify.

### Option C — **Netlify site‑wide password** or Netlify Identity
Put `/proposals/*` behind Netlify password/Identity. Keep `noindex` meta tags.

### Option D — **JS Gate (provided)** for casual access only
- In `/proposals/_shared/gate.js` change:
  ```js
  const ACCESS_CODE = (window.SMCG_ACCESS_CODE || 'changeme-please');
  ```
  to your actual code, or set `window.SMCG_ACCESS_CODE` on the page before loading `gate.js`.
- **Note**: This only hides content; it is **not** security.

## Wire into your main site
- The public `index.html` already links to `proposals/agentic/`.
- Ensure the proposals folder is deployed with the main SMCG site.

## Remove the old GitHub Pages repo
1. **Archive the repo** (Settings → Archive) or set to Private.
2. Disable GitHub Pages (Settings → Pages → set to None).
3. Update any external links to the new `/proposals/agentic/` path on your main domain.

## Extra privacy
- Keep `<meta name="robots" content="noindex, nofollow, noarchive">` on private pages.
- If using Apache or a CDN, add an `X‑Robots‑Tag: noindex` response header.
- Avoid analytics scripts on proposals. Use simple access logs if needed.

## Updating the access code
- Apache: rotate the `.htpasswd` password.
- Cloudflare: update the Access policy.
- JS gate: change `ACCESS_CODE` and it will invalidate localStorage automatically.

## Contact
Questions or tweaks? Add more proposal microsites under `/proposals/<name>/` and reuse `_shared/gate.js`. 
