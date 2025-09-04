// File: functions/api/notify.js

export async function onRequest(context) {
  // Only allow POST requests
  if (context.request.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  try {
    const { message } = await context.request.json();
    if (!message) {
      return new Response('Message text is required', { status: 400 });
    }

    // Securely get the secrets you will set in the next step
    const botToken = context.env.TELEGRAM_BOT_TOKEN;
    const chatId = context.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
        console.error('Telegram secrets are not configured in Cloudflare environment.');
        return new Response('Server configuration error', { status: 500 });
    }

    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

    // Send the message to Telegram
    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'HTML',
      }),
    });

    // Send a success confirmation back to the browser
    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in notification function:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}