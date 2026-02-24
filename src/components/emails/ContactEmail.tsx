import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
  Tailwind,
} from '@react-email/components';

interface ContactEmailProps {

  name: string;
  email: string;
  message: string;
}

const ContactEmail = ({ name, email, message }: ContactEmailProps) => (
  <Html>
    <Head />

    <Preview>New Message from Your Portfolio Site</Preview>
    <Tailwind>
      <Body className='bg-gray-100 font-sans'>
        <Container className='bg-white border border-gray-200 rounded-lg shadow-sm mx-auto my-10 p-10 w-[600px]'>
          <Heading className='text-2xl font-bold text-gray-800 text-center'>
            New Contact Form Submission
          </Heading>
          <Text className='text-gray-600'>
            You&apos;ve received a new message from your portfolio contact form.
          </Text>
          <Hr className='border-gray-300 my-5' />
          <Section>
            <Text className='text-lg font-semibold text-gray-800'>
              Sender's Details:
            </Text>
            <Text className='text-gray-700'>
              <strong>Name:</strong> {name}
            </Text>
            <Text className='text-gray-700'>
              <strong>Email:</strong>{' '}
              <a href={`mailto:${email}`} className='text-blue-600 underline'>
                {email}
              </a>
            </Text>
          </Section>
          <Hr className='border-gray-300 my-5' />
          <Section>
            <Text className='text-lg font-semibold text-gray-800'>
              Message:
            </Text>
            <Text className='text-gray-700 whitespace-pre-wrap'>{message}</Text>
          </Section>
          <Hr className='border-gray-300 my-5' />
          <Text className='text-sm text-gray-500 text-center'>
            This message was sent from your portfolio website.
          </Text>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);

export default ContactEmail;

