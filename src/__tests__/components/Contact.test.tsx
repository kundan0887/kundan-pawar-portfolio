import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  render,
  testAccessibility,
  testFormValidation,
} from '../utils/test-utils';
import Contact from '@/components/Contact';

// Mock Framer Motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    span: ({ children, ...props }: any) => <span {...props}>{children}</span>,
    p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
    h1: ({ children, ...props }: any) => <h1 {...props}>{children}</h1>,
    h2: ({ children, ...props }: any) => <h2 {...props}>{children}</h2>,
    button: ({ children, ...props }: any) => (
      <button {...props}>{children}</button>
    ),
    a: ({ children, ...props }: any) => <a {...props}>{children}</a>,
    form: ({ children, ...props }: any) => <form {...props}>{children}</form>,
    input: ({ ...props }: any) => <input {...props} />,
    textarea: ({ children, ...props }: any) => (
      <textarea {...props}>{children}</textarea>
    ),
  },
  AnimatePresence: ({ children }: any) => children,
}));

// Mock react-hook-form
jest.mock('react-hook-form', () => ({
  useForm: () => ({
    register: jest.fn(),
    handleSubmit: jest.fn(fn => fn),
    formState: {
      errors: {},
      isSubmitting: false,
      isSubmitted: false,
    },
    reset: jest.fn(),
    watch: jest.fn(),
    setValue: jest.fn(),
    getValues: jest.fn(),
  }),
}));

describe('Contact Component', () => {
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Form Rendering', () => {
    it('renders contact form with all required fields', () => {
      render(<Contact />);

      // Check for form fields
      expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/subject/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/message/i)).toBeInTheDocument();

      // Check for submit button
      expect(
        screen.getByRole('button', { name: /send message/i }),
      ).toBeInTheDocument();
    });

    it('displays contact information correctly', () => {
      render(<Contact />);

      expect(screen.getByText(/get in touch/i)).toBeInTheDocument();
      expect(screen.getByText(/kundan@example.com/i)).toBeInTheDocument();
      expect(screen.getByText(/\+1234567890/i)).toBeInTheDocument();
    });

    it('shows social media links', () => {
      render(<Contact />);

      const githubLink = screen.getByRole('link', { name: /github/i });
      const linkedinLink = screen.getByRole('link', { name: /linkedin/i });
      const twitterLink = screen.getByRole('link', { name: /twitter/i });

      expect(githubLink).toBeInTheDocument();
      expect(linkedinLink).toBeInTheDocument();
      expect(twitterLink).toBeInTheDocument();
    });
  });

  describe('Form Validation', () => {
    it('validates required fields', async () => {
      const user = userEvent.setup();
      render(<Contact />);

      const submitButton = screen.getByRole('button', {
        name: /send message/i,
      });
      await user.click(submitButton);

      // Should show validation errors
      expect(screen.getByText(/name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/email is required/i)).toBeInTheDocument();
      expect(screen.getByText(/message is required/i)).toBeInTheDocument();
    });

    it('validates email format', async () => {
      const user = userEvent.setup();
      render(<Contact />);

      const emailInput = screen.getByLabelText(/email/i);
      await user.type(emailInput, 'invalid-email');
      await user.tab(); // Trigger blur event

      expect(
        screen.getByText(/please enter a valid email/i),
      ).toBeInTheDocument();
    });

    it('accepts valid email format', async () => {
      const user = userEvent.setup();
      render(<Contact />);

      const emailInput = screen.getByLabelText(/email/i);
      await user.type(emailInput, 'test@example.com');
      await user.tab(); // Trigger blur event

      expect(
        screen.queryByText(/please enter a valid email/i),
      ).not.toBeInTheDocument();
    });

    it('validates message length', async () => {
      const user = userEvent.setup();
      render(<Contact />);

      const messageInput = screen.getByLabelText(/message/i);
      await user.type(messageInput, 'Short');
      await user.tab(); // Trigger blur event

      expect(
        screen.getByText(/message must be at least 10 characters/i),
      ).toBeInTheDocument();
    });

    it('accepts valid message length', async () => {
      const user = userEvent.setup();
      render(<Contact />);

      const messageInput = screen.getByLabelText(/message/i);
      await user.type(
        messageInput,
        'This is a valid message with more than 10 characters.',
      );
      await user.tab(); // Trigger blur event

      expect(
        screen.queryByText(/message must be at least 10 characters/i),
      ).not.toBeInTheDocument();
    });

    it('clears validation errors when user starts typing', async () => {
      const user = userEvent.setup();
      render(<Contact />);

      const submitButton = screen.getByRole('button', {
        name: /send message/i,
      });
      await user.click(submitButton);

      // Should show validation errors
      expect(screen.getByText(/name is required/i)).toBeInTheDocument();

      // Start typing in name field
      const nameInput = screen.getByLabelText(/name/i);
      await user.type(nameInput, 'John');

      // Error should be cleared
      expect(screen.queryByText(/name is required/i)).not.toBeInTheDocument();
    });
  });

  describe('Form Submission', () => {
    it('handles successful form submission', async () => {
      const user = userEvent.setup();
      const mockSubmit = jest.fn().mockResolvedValue({ success: true });

      render(<Contact onSubmit={mockSubmit} />);

      // Fill out form
      await user.type(screen.getByLabelText(/name/i), 'John Doe');
      await user.type(screen.getByLabelText(/email/i), 'john@example.com');
      await user.type(screen.getByLabelText(/subject/i), 'Test Subject');
      await user.type(
        screen.getByLabelText(/message/i),
        'This is a test message with enough characters.',
      );

      // Submit form
      const submitButton = screen.getByRole('button', {
        name: /send message/i,
      });
      await user.click(submitButton);

      await waitFor(() => {
        expect(mockSubmit).toHaveBeenCalledWith({
          name: 'John Doe',
          email: 'john@example.com',
          subject: 'Test Subject',
          message: 'This is a test message with enough characters.',
        });
      });
    });

    it('shows loading state during submission', async () => {
      const user = userEvent.setup();
      const mockSubmit = jest
        .fn()
        .mockImplementation(
          () => new Promise(resolve => setTimeout(resolve, 1000)),
        );

      render(<Contact onSubmit={mockSubmit} />);

      // Fill out form
      await user.type(screen.getByLabelText(/name/i), 'John Doe');
      await user.type(screen.getByLabelText(/email/i), 'john@example.com');
      await user.type(
        screen.getByLabelText(/message/i),
        'This is a test message with enough characters.',
      );

      // Submit form
      const submitButton = screen.getByRole('button', {
        name: /send message/i,
      });
      await user.click(submitButton);

      // Should show loading state
      expect(submitButton).toBeDisabled();
      expect(screen.getByText(/sending/i)).toBeInTheDocument();
    });

    it('handles submission errors', async () => {
      const user = userEvent.setup();
      const mockSubmit = jest
        .fn()
        .mockRejectedValue(new Error('Submission failed'));

      render(<Contact onSubmit={mockSubmit} />);

      // Fill out form
      await user.type(screen.getByLabelText(/name/i), 'John Doe');
      await user.type(screen.getByLabelText(/email/i), 'john@example.com');
      await user.type(
        screen.getByLabelText(/message/i),
        'This is a test message with enough characters.',
      );

      // Submit form
      const submitButton = screen.getByRole('button', {
        name: /send message/i,
      });
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
      });
    });
  });

  describe('Error State Display', () => {
    it('displays error message for network errors', async () => {
      const user = userEvent.setup();
      const mockSubmit = jest
        .fn()
        .mockRejectedValue(new Error('Network error'));

      render(<Contact onSubmit={mockSubmit} />);

      // Fill and submit form
      await user.type(screen.getByLabelText(/name/i), 'John Doe');
      await user.type(screen.getByLabelText(/email/i), 'john@example.com');
      await user.type(
        screen.getByLabelText(/message/i),
        'This is a test message with enough characters.',
      );

      const submitButton = screen.getByRole('button', {
        name: /send message/i,
      });
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/network error/i)).toBeInTheDocument();
      });
    });

    it('displays error message for server errors', async () => {
      const user = userEvent.setup();
      const mockSubmit = jest.fn().mockRejectedValue(new Error('Server error'));

      render(<Contact onSubmit={mockSubmit} />);

      // Fill and submit form
      await user.type(screen.getByLabelText(/name/i), 'John Doe');
      await user.type(screen.getByLabelText(/email/i), 'john@example.com');
      await user.type(
        screen.getByLabelText(/message/i),
        'This is a test message with enough characters.',
      );

      const submitButton = screen.getByRole('button', {
        name: /send message/i,
      });
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/server error/i)).toBeInTheDocument();
      });
    });

    it('allows retry after error', async () => {
      const user = userEvent.setup();
      const mockSubmit = jest
        .fn()
        .mockRejectedValueOnce(new Error('Network error'))
        .mockResolvedValueOnce({ success: true });

      render(<Contact onSubmit={mockSubmit} />);

      // Fill and submit form
      await user.type(screen.getByLabelText(/name/i), 'John Doe');
      await user.type(screen.getByLabelText(/email/i), 'john@example.com');
      await user.type(
        screen.getByLabelText(/message/i),
        'This is a test message with enough characters.',
      );

      const submitButton = screen.getByRole('button', {
        name: /send message/i,
      });
      await user.click(submitButton);

      // Wait for error
      await waitFor(() => {
        expect(screen.getByText(/network error/i)).toBeInTheDocument();
      });

      // Retry submission
      await user.click(submitButton);

      await waitFor(() => {
        expect(mockSubmit).toHaveBeenCalledTimes(2);
      });
    });
  });

  describe('Success State Display', () => {
    it('shows success message after successful submission', async () => {
      const user = userEvent.setup();
      const mockSubmit = jest.fn().mockResolvedValue({ success: true });

      render(<Contact onSubmit={mockSubmit} />);

      // Fill out form
      await user.type(screen.getByLabelText(/name/i), 'John Doe');
      await user.type(screen.getByLabelText(/email/i), 'john@example.com');
      await user.type(
        screen.getByLabelText(/message/i),
        'This is a test message with enough characters.',
      );

      // Submit form
      const submitButton = screen.getByRole('button', {
        name: /send message/i,
      });
      await user.click(submitButton);

      await waitFor(() => {
        expect(
          screen.getByText(/message sent successfully/i),
        ).toBeInTheDocument();
      });
    });

    it('resets form after successful submission', async () => {
      const user = userEvent.setup();
      const mockSubmit = jest.fn().mockResolvedValue({ success: true });

      render(<Contact onSubmit={mockSubmit} />);

      // Fill out form
      const nameInput = screen.getByLabelText(/name/i);
      const emailInput = screen.getByLabelText(/email/i);
      const messageInput = screen.getByLabelText(/message/i);

      await user.type(nameInput, 'John Doe');
      await user.type(emailInput, 'john@example.com');
      await user.type(
        messageInput,
        'This is a test message with enough characters.',
      );

      // Submit form
      const submitButton = screen.getByRole('button', {
        name: /send message/i,
      });
      await user.click(submitButton);

      await waitFor(() => {
        expect(nameInput).toHaveValue('');
        expect(emailInput).toHaveValue('');
        expect(messageInput).toHaveValue('');
      });
    });

    it('provides option to send another message', async () => {
      const user = userEvent.setup();
      const mockSubmit = jest.fn().mockResolvedValue({ success: true });

      render(<Contact onSubmit={mockSubmit} />);

      // Fill and submit form
      await user.type(screen.getByLabelText(/name/i), 'John Doe');
      await user.type(screen.getByLabelText(/email/i), 'john@example.com');
      await user.type(
        screen.getByLabelText(/message/i),
        'This is a test message with enough characters.',
      );

      const submitButton = screen.getByRole('button', {
        name: /send message/i,
      });
      await user.click(submitButton);

      await waitFor(() => {
        expect(
          screen.getByText(/message sent successfully/i),
        ).toBeInTheDocument();
      });

      // Should be able to send another message
      expect(
        screen.getByRole('button', { name: /send another message/i }),
      ).toBeInTheDocument();
    });
  });

  describe('File Upload Functionality', () => {
    it('renders file upload input when enabled', () => {
      render(<Contact allowFileUpload={true} />);

      const fileInput = screen.getByLabelText(/attach file/i);
      expect(fileInput).toBeInTheDocument();
      expect(fileInput).toHaveAttribute('type', 'file');
    });

    it('handles file selection', async () => {
      const user = userEvent.setup();
      render(<Contact allowFileUpload={true} />);

      const file = new File(['test content'], 'test.txt', {
        type: 'text/plain',
      });
      const fileInput = screen.getByLabelText(/attach file/i);

      await user.upload(fileInput, file);

      expect(fileInput.files?.[0]).toBe(file);
      expect(screen.getByText('test.txt')).toBeInTheDocument();
    });

    it('validates file size', async () => {
      const user = userEvent.setup();
      render(<Contact allowFileUpload={true} maxFileSize={1024 * 1024} />); // 1MB limit

      // Create a large file
      const largeFile = new File(['x'.repeat(1024 * 1024 + 1)], 'large.txt', {
        type: 'text/plain',
      });
      const fileInput = screen.getByLabelText(/attach file/i);

      await user.upload(fileInput, largeFile);

      expect(screen.getByText(/file size exceeds limit/i)).toBeInTheDocument();
    });

    it('validates file type', async () => {
      const user = userEvent.setup();
      render(
        <Contact allowFileUpload={true} allowedFileTypes={['.pdf', '.doc']} />,
      );

      const invalidFile = new File(['test'], 'test.exe', {
        type: 'application/octet-stream',
      });
      const fileInput = screen.getByLabelText(/attach file/i);

      await user.upload(fileInput, invalidFile);

      expect(screen.getByText(/file type not allowed/i)).toBeInTheDocument();
    });

    it('allows removing attached file', async () => {
      const user = userEvent.setup();
      render(<Contact allowFileUpload={true} />);

      const file = new File(['test content'], 'test.txt', {
        type: 'text/plain',
      });
      const fileInput = screen.getByLabelText(/attach file/i);

      await user.upload(fileInput, file);
      expect(screen.getByText('test.txt')).toBeInTheDocument();

      const removeButton = screen.getByRole('button', { name: /remove file/i });
      await user.click(removeButton);

      expect(screen.queryByText('test.txt')).not.toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('meets accessibility standards', async () => {
      await testAccessibility(<Contact />);
    });

    it('has proper form labels and associations', () => {
      render(<Contact />);

      const nameInput = screen.getByLabelText(/name/i);
      const emailInput = screen.getByLabelText(/email/i);
      const messageInput = screen.getByLabelText(/message/i);

      expect(nameInput).toHaveAttribute('id');
      expect(emailInput).toHaveAttribute('id');
      expect(messageInput).toHaveAttribute('id');

      // Check label associations
      const nameLabel = screen.getByText(/name/i);
      const emailLabel = screen.getByText(/email/i);
      const messageLabel = screen.getByText(/message/i);

      expect(nameLabel).toHaveAttribute('for', nameInput.id);
      expect(emailLabel).toHaveAttribute('for', emailInput.id);
      expect(messageLabel).toHaveAttribute('for', messageInput.id);
    });

    it('provides error announcements for screen readers', async () => {
      const user = userEvent.setup();
      render(<Contact />);

      const submitButton = screen.getByRole('button', {
        name: /send message/i,
      });
      await user.click(submitButton);

      // Should have live region for error announcements
      const liveRegion = screen.getByRole('alert');
      expect(liveRegion).toBeInTheDocument();
    });

    it('supports keyboard navigation', async () => {
      const user = userEvent.setup();
      render(<Contact />);

      const nameInput = screen.getByLabelText(/name/i);
      const emailInput = screen.getByLabelText(/email/i);
      const messageInput = screen.getByLabelText(/message/i);
      const submitButton = screen.getByRole('button', {
        name: /send message/i,
      });

      await user.tab();
      expect(nameInput).toHaveFocus();

      await user.tab();
      expect(emailInput).toHaveFocus();

      await user.tab();
      expect(messageInput).toHaveFocus();

      await user.tab();
      expect(submitButton).toHaveFocus();
    });

    it('has proper ARIA attributes for form validation', () => {
      render(<Contact />);

      const nameInput = screen.getByLabelText(/name/i);
      const emailInput = screen.getByLabelText(/email/i);
      const messageInput = screen.getByLabelText(/message/i);

      expect(nameInput).toHaveAttribute('aria-required', 'true');
      expect(emailInput).toHaveAttribute('aria-required', 'true');
      expect(messageInput).toHaveAttribute('aria-required', 'true');
    });
  });

  describe('Error Handling', () => {
    it('handles network timeouts gracefully', async () => {
      const user = userEvent.setup();
      const mockSubmit = jest
        .fn()
        .mockImplementation(
          () =>
            new Promise((_, reject) =>
              setTimeout(() => reject(new Error('Timeout')), 100),
            ),
        );

      render(<Contact onSubmit={mockSubmit} />);

      // Fill and submit form
      await user.type(screen.getByLabelText(/name/i), 'John Doe');
      await user.type(screen.getByLabelText(/email/i), 'john@example.com');
      await user.type(
        screen.getByLabelText(/message/i),
        'This is a test message with enough characters.',
      );

      const submitButton = screen.getByRole('button', {
        name: /send message/i,
      });
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/timeout/i)).toBeInTheDocument();
      });
    });

    it('handles form reset errors', async () => {
      const user = userEvent.setup();
      const mockSubmit = jest.fn().mockResolvedValue({ success: true });
      const mockReset = jest.fn().mockImplementation(() => {
        throw new Error('Reset failed');
      });

      render(<Contact onSubmit={mockSubmit} onReset={mockReset} />);

      // Fill and submit form
      await user.type(screen.getByLabelText(/name/i), 'John Doe');
      await user.type(screen.getByLabelText(/email/i), 'john@example.com');
      await user.type(
        screen.getByLabelText(/message/i),
        'This is a test message with enough characters.',
      );

      const submitButton = screen.getByRole('button', {
        name: /send message/i,
      });
      await user.click(submitButton);

      // Should handle reset error gracefully
      await waitFor(() => {
        expect(
          screen.getByText(/message sent successfully/i),
        ).toBeInTheDocument();
      });
    });
  });
});
