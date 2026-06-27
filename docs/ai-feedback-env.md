# AI feedback environment settings

The AI feedback endpoint supports an optional Origin allowlist:

```env
AI_ALLOWED_ORIGINS=https://your-domain.vercel.app
```

Use a comma-separated list for multiple deployment origins:

```env
AI_ALLOWED_ORIGINS=https://your-domain.vercel.app,https://preview-domain.vercel.app
```

Leave it empty for local development. When set, browser requests whose `Origin` header is not in the list will receive `403 Origin not allowed`.
