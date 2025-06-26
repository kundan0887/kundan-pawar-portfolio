import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Hero from '../../src/components/Hero';

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
  },
  AnimatePresence: ({ children }: any) => children,
}));

describe('Hero Component', () => {
  const mockOnScrollToSection = jest.fn();

  beforeEach(() => {
    // Mock IntersectionObserver
    global.IntersectionObserver = class IntersectionObserver {
      constructor() {}
      disconnect() {}
      observe() {}
      unobserve() {}
    } as any;
  });

  it('renders hero section with correct content', () => {
    render(
      <Hero onScrollToSection={mockOnScrollToSection} resumeUrl='/resume.pdf' />
    );

    // Check for main heading
    expect(screen.getByText(/Kundan Pawar/i)).toBeInTheDocument();

    // Check for role/title
    expect(screen.getByText(/Senior Frontend Developer/i)).toBeInTheDocument();

    // Check for description
    expect(
      screen.getByText(/Crafting exceptional digital experiences/i)
    ).toBeInTheDocument();
  });

  it('displays CTA buttons', () => {
    render(
      <Hero onScrollToSection={mockOnScrollToSection} resumeUrl='/resume.pdf' />
    );

    // Check for primary CTA button
    const primaryButton = screen.getByRole('button', { name: /get in touch/i });
    expect(primaryButton).toBeInTheDocument();

    // Check for secondary CTA button
    const secondaryButton = screen.getByRole('button', {
      name: /download resume/i,
    });
    expect(secondaryButton).toBeInTheDocument();
  });

  it('displays tech stack cards', () => {
    render(
      <Hero onScrollToSection={mockOnScrollToSection} resumeUrl='/resume.pdf' />
    );

    // Check for tech stack items
    expect(screen.getByText(/React/i)).toBeInTheDocument();
    expect(screen.getByText(/TypeScript/i)).toBeInTheDocument();
    expect(screen.getByText(/Next.js/i)).toBeInTheDocument();
  });

  it('has proper accessibility attributes', () => {
    render(
      <Hero onScrollToSection={mockOnScrollToSection} resumeUrl='/resume.pdf' />
    );

    // Check for proper heading structure
    const mainHeading = screen.getByRole('heading', { level: 1 });
    expect(mainHeading).toBeInTheDocument();

    // Check for proper button roles
    const buttons = screen.getAllByRole('button');
    buttons.forEach(button => {
      expect(button).toHaveAttribute('type', 'button');
    });
  });

  it('handles button clicks', async () => {
    render(
      <Hero onScrollToSection={mockOnScrollToSection} resumeUrl='/resume.pdf' />
    );

    const primaryButton = screen.getByRole('button', { name: /get in touch/i });
    fireEvent.click(primaryButton);

    await waitFor(() => {
      expect(mockOnScrollToSection).toHaveBeenCalledWith('contact');
    });
  });

  it('displays profile image with initials', () => {
    render(
      <Hero onScrollToSection={mockOnScrollToSection} resumeUrl='/resume.pdf' />
    );

    // Check for initials display
    expect(screen.getByText('KP')).toBeInTheDocument();
  });

  it('has responsive design classes', () => {
    const { container } = render(
      <Hero onScrollToSection={mockOnScrollToSection} resumeUrl='/resume.pdf' />
    );

    // Check for responsive container classes
    const heroSection = container.querySelector('section');
    expect(heroSection).toHaveClass('min-h-screen');
  });
});
