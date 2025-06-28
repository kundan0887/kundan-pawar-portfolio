import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';
import ContactEmail from '@/components/emails/ContactEmail';
import { personalInfo } from '@/lib/data';

// Initialize Resend only if API key is available
const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters long.'),
  email: z.string().email('Invalid email address.'),
  message: z.string().min(10, 'Message must be at least 10 characters long.'),
});

export async function POST(req: NextRequest) {
  try {
    // Check if Resend is configured
    if (!resend) {
      return NextResponse.json(
        { success: false, error: 'Email service not configured.' },
        { status: 503 },
      );
    }

    const body = await req.json();
    const validation = contactFormSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid input.',
          details: validation.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const { name, email, message } = validation.data;

    const { data, error } = await resend.emails.send({
      from: 'Portfolio Contact <contact@kundanpawar.com>',
      to: [personalInfo.email], // Your personal email
      subject: `New Message from ${name} via Portfolio`,
      replyTo: email,
      react: ContactEmail({ name, email, message }),
    });

    if (error) {
      console.error('Resend API Error:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to send email.' },
        { status: 500 },
      );
    }

    return NextResponse.json(
      { success: true, message: 'Message sent successfully!', data },
      { status: 200 },
    );
  } catch (err) {
    console.error('Server Error:', err);
    return NextResponse.json(
      { success: false, error: 'An unexpected error occurred.' },
      { status: 500 },
    );
  }
}
