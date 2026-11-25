export async function POST(request: Request) {
  let body: {
    name?: string;
    email?: string;
    phone?: string;
    subject?: string;
    message?: string;
  };

  try {
    body = await request.json();
  } catch {
    return Response.json(
      { error: "Invalid request payload." },
      { status: 400 }
    );
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const phone = typeof body.phone === "string" ? body.phone.trim() : "";
  const subject = typeof body.subject === "string" ? body.subject.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (!name || !email || !subject || !message) {
    return Response.json(
      { error: "Please fill in all required fields." },
      { status: 400 }
    );
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    return Response.json(
      { error: "Please enter a valid email address." },
      { status: 400 }
    );
  }

  return Response.json(
    {
      success: true,
      message:
        "Thank you! Your message has been sent. Our team will get back to you shortly.",
      submission: {
        name,
        email,
        phone,
        subject,
      },
    },
    { status: 200 }
  );
}
