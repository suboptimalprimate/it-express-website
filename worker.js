export default {
  async fetch(request, env) {
    if (request.method !== 'POST') {
      return new Response('Method Not Allowed', { status: 405 });
    }

    const url = new URL(request.url);
    const data = await request.json();
    let subject;
    let body;

    if (url.pathname.endsWith('/book')) {
      const { ticket, service, description, name, phone, email, appointment } = data;
      subject = `Ticket ${ticket}: ${service}`;
      body = `Name: ${name}\nPhone: ${phone}\nEmail: ${email}\nPreferred Date & Time: ${appointment}\n\nDescription:\n${description}`;
    } else if (url.pathname.endsWith('/contact')) {
      const { ticket, name, phone, email, message } = data;
      subject = `Contact: ${ticket}`;
      body = `Name: ${name}\nPhone: ${phone}\nEmail: ${email}\n\nMessage:\n${message}`;
    } else {
      return new Response('Not Found', { status: 404 });
    }

    const response = await fetch('https://api.mailchannels.net/tx/v1/send', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        personalizations: [{ to: [{ email: env.SERVICE_EMAIL }] }],
        from: { email: env.SERVICE_EMAIL },
        subject,
        content: [{ type: 'text/plain', value: body }]
      })
    });

    const success = response.ok;
    return new Response(JSON.stringify({ success }), {
      status: success ? 200 : 500,
      headers: { 'content-type': 'application/json' }
    });
  }
};

