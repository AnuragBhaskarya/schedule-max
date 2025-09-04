// File: functions/api/listener.js

/**
 * A simple function to reply to a /start command.
 */
async function handleStartCommand(chatId, botToken) {
  const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
  await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text: '✅ Bot is active and listening!',
    }),
  });
}

/**
 * This function is the main entry point for the webhook.
 */
export async function onRequest(context) {
  // Only allow POST requests, which is what Telegram uses for webhooks
  if (context.request.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  try {
    const botToken = context.env.TELEGRAM_BOT_TOKEN;
    if (!botToken) {
      console.error('Bot token secret is not set!');
      return new Response('Server configuration error', { status: 500 });
    }

    // Get the update data sent by Telegram
    const update = await context.request.json();

    // Check if the update contains a message with the text "/start"
    if (update.message && update.message.text && update.message.text.toLowerCase() === '/start') {
      const chatId = update.message.chat.id;
      await handleStartCommand(chatId, botToken);
    }

    // Always return a 200 OK to Telegram, otherwise it will keep re-sending the update.
    return new Response('OK', { status: 200 });

  } catch (error) {
    console.error('Error in listener function:', error);
    // Return OK even on error to prevent Telegram from retrying and spamming the function.
    return new Response('OK', { status: 200 });
  }
}