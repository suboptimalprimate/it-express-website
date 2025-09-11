# it-express-website

This repo contains the static files for the IT Express website along with a
small Express server for handling form submissions.

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
2. Copy `.env.example` to `.env` and fill in your SMTP details.
3. Start the server:
   ```
   npm start
   ```

The booking and contact forms will send their details to the service email
configured in your environment variables.
