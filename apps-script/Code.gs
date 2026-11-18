/**
 * NOBRAINS enquiry form -> Google Sheet + notification + automatic reply.
 *
 * Runs inside Google Apps Script, signed in as nobrainscollective@gmail.com,
 * so every email goes out FROM that address. See SETUP.txt for the steps.
 */

var OWNER = 'nobrainscollective@gmail.com';
var SHEET_NAME = 'Enquiries';
var MAX_PER_HOUR = 40; // stops anyone from using the form to flood inboxes
var HEADERS = ['Date', 'Name', 'Email', 'Company or brand', 'Location', 'Services', 'Message', 'Phone'];

function doPost(e) {
  var p = (e && e.parameter) || {};
  try {
    if (p._gotcha) return reply({ ok: true }); // hidden trap field: a bot filled it in

    var name = clean(p.name, 120);
    var email = clean(p.email, 160);
    var phone = clean(p.phone, 40);
    var company = clean(p.company, 160);
    var location = clean(p.location, 160);
    var services = clean(p.stages, 300);
    var message = clean(p.message, 4000);

    if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !/^[+\d][\d\s().-]{5,}$/.test(phone) || !message) {
      return reply({ ok: false, error: 'invalid' });
    }

    var cache = CacheService.getScriptCache();
    var used = Number(cache.get('hourly') || 0);
    if (used >= MAX_PER_HOUR) return reply({ ok: false, error: 'busy' });
    cache.put('hourly', String(used + 1), 3600);

    // 1. save the enquiry as a new row (Phone is the last column)
    getSheet().appendRow([new Date(), safe(name), safe(email), safe(company), safe(location), safe(services), safe(message), safe(phone)]);

    // 2. tell the studio
    MailApp.sendEmail({
      to: OWNER,
      replyTo: email,
      name: 'NOBRAINS website',
      subject: 'New enquiry from ' + name,
      body: 'Name: ' + name + '\nEmail: ' + email + '\nPhone: ' + (phone || '-') +
            '\nCompany or brand: ' + (company || '-') +
            '\nLocation: ' + (location || '-') + '\nServices: ' + (services || 'Not specified') + '\n\n' + message +
            '\n\n(Reply to this email to answer ' + name + ' directly.)'
    });

    // 3. automatic reply to the visitor, from the same address
    var first = name.split(/\s+/)[0];
    MailApp.sendEmail({
      to: email,
      replyTo: OWNER,
      name: 'NOBRAINS',
      subject: 'We got you',
      body: 'Thanks for reaching out, ' + first + '!\n\n' +
            "We've received your message, and someone from our team will be in touch shortly.\n\n" +
            'See you soon!\n\n' +
            'The NOBRAINS team',
      htmlBody: '<div style="font-family:Arial,sans-serif;font-size:16px;line-height:1.6;color:#1b1111;max-width:560px">' +
                '<p>Thanks for reaching out, ' + esc(first) + '!</p>' +
                "<p>We've received your message, and someone from our team will be in touch shortly.</p>" +
                '<p>See you soon!</p>' +
                '<p><strong>The NOBRAINS team</strong></p></div>'
    });

    return reply({ ok: true });
  } catch (err) {
    return reply({ ok: false, error: 'server' });
  }
}

function doGet() { return reply({ ok: true }); } // opening the web address in a browser shows this

function getSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
  } else if (sheet.getRange(1, 1).getValue() === 'Date' && sheet.getRange(1, HEADERS.length).getValue() !== 'Phone') {
    sheet.getRange(1, HEADERS.length).setValue('Phone'); // adds the new heading to an existing sheet
  }
  return sheet;
}

function clean(v, max) { return String(v || '').replace(/[\u0000-\u001f]+/g, ' ').trim().slice(0, max); }
function safe(v) { return /^[=+\-@]/.test(v) ? "'" + v : v; } // stops a cell being read as a formula
function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
function reply(o) { return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON); }
