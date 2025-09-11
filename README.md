# it-express-website

This repo contains the static files for the IT Express website and a small
Express server used only for local development. Form submissions are handled by
a Cloudflare Worker which sends the details to the service email.

```
public/
  index.html    # Home page
  booking.html  # Booking page
  contact.html  # Contact page
  css/
    style.css   # Shared styles
  js/
    script.js   # Client-side logic
  img/          # Images for the site
server.js       # Express server
```

## Development

1. Install dependencies:
   ```
   npm install
   ```
2. Start the server:
   ```
   npm start
   ```

The booking and contact forms POST to `/api/book` and `/api/contact`, which are
routed to a Cloudflare Worker. The Worker uses Cloudflare Email Routing to
deliver messages to `service@it-express.org` without any local SMTP
configuration.
