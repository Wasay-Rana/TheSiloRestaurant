# The Silo — Clifton, Karachi

Marketing site for The Silo (Continental & Japanese cuisine, rooftop and dome dining).
Built with React 19, Vite, Framer Motion, Lenis and lucide-react.

## Run

```bash
npm install
npm run dev        # local dev server
npm run build      # production build -> dist/
npm run preview    # serve the build
./tunnel.sh        # build + serve + public Cloudflare quick tunnel (needs cloudflared)
```

## Edit content

- `src/data.js` — brand details, phone, address, menu, occasions, gallery.
- `public/images/` — logo, façade and rooftop photos.
- Reservation form sends a prefilled WhatsApp message to `BRAND.whatsapp`.

Confirm prices, the plot number and the phone number with the restaurant before launch.
