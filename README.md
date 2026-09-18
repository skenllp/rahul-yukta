# Rahul & Yukta — Wedding Invitation Website

A premium, cinematic wedding invitation site built on the same architecture (intro-video gate,
scratch-to-reveal save-the-date, cinematic video cards, scattered photo-wall gallery with
lightbox, RSVP → Google Sheets, ICS calendar download, Google Maps venue card, scroll
animations) as the reference site you supplied — fully rebranded for Rahul Suresh Ragav & Yukta Jain.

## 1. Open it

Just open `index.html` in a browser, or deploy the whole folder to any static host
(Netlify, Vercel, GitHub Pages, or your own server / domain).

## 2. Folder structure

```
index.html                     – the whole site (HTML + CSS + JS in one file)
intro.mp4                      – opening full-screen invitation video
music.webm                     – background music (carried over from the reference site —
                                  swap it for your own track any time, same filename)
hero-bg.jpg / couple-bg.jpg /
footer-bg.jpg / og-image.jpg   – background photos + WhatsApp/social link-preview image
assets/engagement/*.mp4        – the 4 engagement-day videos (Kapila Event Park)
assets/gallery/*.jpg           – "Our Moments" photo wall images
assets/images/*.jpg            – two bonus source images (the physical invitation card
                                  artwork, and the Kapila Event Park signage) — not used on
                                  the page itself, kept here in case you want them elsewhere
google-apps-script/Code.gs     – the Apps Script that receives RSVP submissions into a
                                  Google Sheet (same script from your reference project)
GOOGLE_SHEET_SETUP.md          – step-by-step instructions for wiring up the sheet
```

## 3. Editable content — no rebuilding required

All three of the dynamic sections you asked for are driven by plain JavaScript arrays near
the top of the `<script>` block at the bottom of `index.html`. Search for these three
comments to find them:

- **`EDITABLE DATA: ENGAGEMENT VIDEOS`** — add a video by appending another
  `{ src: "assets/engagement/your-file.mp4", title: "Your Title" }` object to the
  `engagementVideos` array, and drop the matching file into `assets/engagement/`.
- **`EDITABLE DATA: WEDDING DAY SCHEDULE`** — add, remove or reorder programme items in the
  `weddingSchedule` array (`{ time: "...", title: "..." }`) — the timeline rebuilds itself.
- **`EDITABLE DATA: GALLERY IMAGES`** — add a photo by appending its path to the
  `galleryImages` array and dropping the file into `assets/gallery/`. The scattered
  photo-wall look, rotation, and entrance animation are generated automatically for any
  number of photos.

## 4. RSVP → Google Sheets

The reference project's Google Apps Script (`google-apps-script/Code.gs`) is included as-is.
**The original RSVP endpoint URL was specific to the previous couple's tracking sheet, so
it has been removed** — the form currently just stores responses locally in the visitor's
browser as a safe fallback. To connect it to your own Google Sheet:

1. Follow `GOOGLE_SHEET_SETUP.md` to deploy `Code.gs` as a Web App under your own Google
   account and get its `/exec` URL.
2. In `index.html`, find the line:
   ```js
   const RSVP_ENDPOINT = "PASTE_YOUR_GOOGLE_APPS_SCRIPT_URL_HERE";
   ```
   and paste your URL in place of the placeholder.

## 5. Haldi section

No Haldi photos or videos were supplied yet, so that section currently shows a "Family
Only" badge and a placeholder card. As soon as you have media, add an `<img>`/`<video>`
inside the `.haldi-media-placeholder` block (or ask to have it wired up the same
data-driven way as the Engagement videos).

## 6. Before you publish

- Update `og:url` / `twitter:image` in the `<head>` once the site has a real domain, so
  WhatsApp/social previews point at the right place.
- The wedding-day schedule is marked as indicative in the UI, per your note that the full
  programme is still being finalised — update `weddingSchedule` whenever it's confirmed.
