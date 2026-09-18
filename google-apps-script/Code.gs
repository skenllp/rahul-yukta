/**
 * RSVP backend for the Jishnu & Vibha wedding site.
 *
 * What this does:
 *  1. Receives the RSVP form data (POST request) from index.html
 *  2. Appends a new row to a "RSVP Responses" sheet in this spreadsheet
 *  3. Emails a notification to NOTIFY_EMAIL for every new RSVP
 *
 * Setup instructions are in GOOGLE_SHEET_SETUP.md
 */

const SHEET_NAME = "RSVP Responses";
const NOTIFY_EMAIL = "jishnumud@gmail.com";

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    const sheet = getOrCreateSheet_();
    sheet.appendRow([
      new Date(),
      data.name || "",
      data.phone || "",
      data.guests || "",
      data.attending === "yes" ? "Joyfully Yes" : "Regretfully No",
      data.message || ""
    ]);

    sendNotificationEmail_(data);

    return ContentService
      .createTextOutput(JSON.stringify({ result: "success" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: "error", error: String(error) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Lets you open the Web App URL directly in a browser to sanity-check it's deployed.
function doGet(e) {
  return ContentService.createTextOutput("RSVP endpoint is live.");
}

function getOrCreateSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(["Timestamp", "Name", "Phone", "Guests", "Attending", "Message"]);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function sendNotificationEmail_(data) {
  const attendingLabel = data.attending === "yes" ? "Joyfully Yes 🎉" : "Regretfully No";
  const subject = `New RSVP from ${data.name || "a guest"} — ${attendingLabel}`;
  const body =
    "A new RSVP just came in for Jishnu & Vibha's wedding:\n\n" +
    "Name: " + (data.name || "-") + "\n" +
    "Phone: " + (data.phone || "-") + "\n" +
    "Guests: " + (data.guests || "-") + "\n" +
    "Attending: " + attendingLabel + "\n" +
    "Message: " + (data.message || "(none)") + "\n\n" +
    "Submitted: " + new Date().toLocaleString();

  MailApp.sendEmail(NOTIFY_EMAIL, subject, body);
}
