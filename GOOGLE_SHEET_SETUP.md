# Connect the RSVP form to Google Sheets + Email

This makes every RSVP submission on your site:
1. Get saved as a new row in a Google Sheet
2. Trigger an email notification to **jishnumud@gmail.com**

It's free and uses only your own Google account — no third-party service.

## Step 1 — Create the Google Sheet
1. Go to https://sheets.google.com and create a new blank spreadsheet.
2. Name it something like **"Jishnu & Vibha RSVPs"**.

## Step 2 — Add the script
1. In the sheet, click **Extensions → Apps Script**.
2. Delete any starter code in the editor.
3. Open the file `google-apps-script/Code.gs` (included in this project folder), copy its full contents, and paste it into the Apps Script editor.
4. Click the save icon (or Ctrl/Cmd+S). Name the project e.g. "RSVP Backend".

## Step 3 — Deploy it as a Web App
1. In the Apps Script editor, click **Deploy → New deployment**.
2. Click the gear icon next to "Select type" and choose **Web app**.
3. Fill in:
   - Description: `RSVP endpoint`
   - Execute as: **Me**
   - Who has access: **Anyone**
4. Click **Deploy**.
5. Google will ask you to authorize the script — click through and allow it (it needs permission to edit the sheet and send email on your behalf).
6. Copy the **Web app URL** it gives you (looks like `https://script.google.com/macros/s/XXXXXXXXXXXX/exec`).

## Step 4 — Connect it to your website
1. Open `index.html`.
2. Find this line near the bottom (search for `RSVP_ENDPOINT`):
   ```js
   const RSVP_ENDPOINT = 'PASTE_YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE';
   ```
3. Replace the placeholder with the URL you copied in Step 3, e.g.:
   ```js
   const RSVP_ENDPOINT = 'https://script.google.com/macros/s/XXXXXXXXXXXX/exec';
   ```
4. Save and re-upload/publish your site.

## Step 5 — Test it
1. Open your live site, fill out the RSVP form, and submit.
2. Check the Google Sheet — a new row (Timestamp, Name, Phone, Guests, Attending, Message) should appear within a few seconds.
3. Check jishnumud@gmail.com — you should receive an email notification with the same details.

## Notes
- If you ever update the script code later, you must create a **new deployment version** (Deploy → Manage deployments → edit → New version) for changes to take effect — just saving the file isn't enough.
- The site also keeps a local backup copy of RSVPs in the visitor's browser (`localStorage`), purely as a fallback if their internet drops mid-submit.
- To change the notification email, edit the `NOTIFY_EMAIL` constant near the top of `Code.gs` and redeploy.
