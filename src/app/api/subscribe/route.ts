type SubscribePayload = {
  email?: unknown;
  source?: unknown;
  website?: unknown;
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  let payload: SubscribePayload;

  try {
    payload = await request.json();
  } catch {
    return Response.json({ message: 'Invalid request body.' }, { status: 400 });
  }

  if (typeof payload.website === 'string' && payload.website.trim() !== '') {
    return Response.json({ message: 'Subscription received.' }, { status: 202 });
  }

  const email = typeof payload.email === 'string' ? payload.email.trim().toLowerCase() : '';

  if (!isValidEmail(email)) {
    return Response.json({ message: 'Enter a valid email address.' }, { status: 400 });
  }

  const endpoint = process.env.NEWSLETTER_SUBSCRIBE_ENDPOINT;
  const apiKey = process.env.NEWSLETTER_API_KEY;

  if (!endpoint || !apiKey) {
    return Response.json(
      {
        message:
          'Email signup is ready, but the newsletter provider is not configured yet. Add NEWSLETTER_SUBSCRIBE_ENDPOINT and NEWSLETTER_API_KEY.',
      },
      { status: 503 }
    );
  }

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        email,
        source: typeof payload.source === 'string' ? payload.source : 'website',
      }),
    });

    if (!response.ok) {
      return Response.json(
        { message: 'The newsletter provider rejected the signup. Please try again later.' },
        { status: 502 }
      );
    }

    return Response.json({ message: "You're subscribed. Check your inbox for confirmation." });
  } catch {
    return Response.json(
      { message: 'Subscription service is temporarily unavailable. Please try again later.' },
      { status: 502 }
    );
  }
}
