import { google } from 'googleapis';
import { NextRequest, NextResponse } from 'next/server';

const SHEET_ID = '1wv00B3nn89HcV5wSRmTn2uPLbAQO0IBC59eNfimtJOY';

export async function POST(request: NextRequest) {
  try {
    const { email, role, linkedin } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const PERSONAL_DOMAINS = new Set([
      'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'live.com',
      'icloud.com', 'me.com', 'mac.com', 'aol.com', 'protonmail.com',
      'proton.me', 'zoho.com', 'yandex.com', 'mail.com', 'gmx.com',
      'rediffmail.com', 'msn.com', 'inbox.com', 'fastmail.com',
    ]);
    const domain = email.split('@')[1]?.toLowerCase();
    if (!domain || PERSONAL_DOMAINS.has(domain)) {
      return NextResponse.json({ error: 'Please use your company email address' }, { status: 400 });
    }

    const serviceAccountKey = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
    if (!serviceAccountKey) {
      return NextResponse.json({ error: 'Server misconfigured' }, { status: 500 });
    }
    const credentials = JSON.parse(serviceAccountKey);

    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    const timestamp = new Date().toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    });

    const row = [email, role, linkedin || '', timestamp];

    // Check if headers exist
    const existingData = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: 'DrishtyResponses!A:A',
    });

    if (!existingData.data.values || existingData.data.values.length === 0) {
      await sheets.spreadsheets.values.update({
        spreadsheetId: SHEET_ID,
        range: 'DrishtyResponses!A1:D1',
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values: [['Email', 'Role', 'LinkedIn', 'Timestamp']],
        },
      });
    }

    const refreshedData = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: 'DrishtyResponses!A:A',
    });
    const lastRow = (refreshedData.data.values?.length || 0) + 1;

    await sheets.spreadsheets.values.update({
      spreadsheetId: SHEET_ID,
      range: `DrishtyResponses!A${lastRow}:D${lastRow}`,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [row],
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Waitlist submission error:', error);
    const msg = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}
