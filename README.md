# NOBRAINS website

Website for NOBRAINS, an independent creative and marketing agency: strategy, design, content and production.

Plain HTML, CSS and JavaScript. There is no build step.

- `index.html`, `about.html`, `services.html`, `contact.html` are the live pages. `design-ideas.html` is an unlinked page of folder-layout options, and `work.html` / `project.html` are the portfolio, hidden for now.
- `assets/` holds the styles, scripts, logos, client logos and images.
- `apps-script/` is the Google Apps Script behind the contact form. It saves each enquiry to a Google Sheet, emails the studio and sends the visitor an automatic reply. See `apps-script/SETUP.txt`.

To preview locally, run `python -m http.server 5178` in this folder and open http://localhost:5178.
