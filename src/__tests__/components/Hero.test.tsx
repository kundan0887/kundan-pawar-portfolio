import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  render,
  testAccessibility,
  testKeyboardNavigation,
  mockOnScrollToSection,
  mockPersonalInfo,
} from '../utils/test-utils';
import Hero from '@/components/Hero';

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
  const defaultProps = {
    onScrollToSection: mockOnScrollToSection,
    resumeUrl: '/assets/documents/kundan_resume.pdf'',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders hero section with correct content', () => {
      render(<Hero {...defaultProps} />);

      // Check for main heading
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
      expect(screen.getByText(/Hi, I'm/)).toBeInTheDocument();
      expect(screen.getByText(mockPersonalInfo.name)).toBeInTheDocument();

      // Check for role/title
      expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
      expect(screen.getByText(mockPersonalInfo.title)).toBeInTheDocument();

      // Check for description
      expect(screen.getByText(mockPersonalInfo.shortBio)).toBeInTheDocument();

      // Check for availability badge
      expect(
        screen.getByText(/Available for opportunities/)
      ).toBeInTheDocument();
    });

    it('displays profile image with initials', () => {
      render(<Hero {...defaultProps} />);

      // Check for initials display
      const initials = mockPersonalInfo.name
        .split(' ')
        .map(n => n[0])
        .join('');
      expect(screen.getByText(initials)).toBeInTheDocument();
    });

    it('displays tech stack preview', () => {
      render(<Hero {...defaultProps} />);

      // Check for tech stack items
      expect(screen.getByText(/React/)).toBeInTheDocument();
      expect(screen.getByText(/TypeScript/)).toBeInTheDocument();
      expect(screen.getByText(/Next.js/)).toBeInTheDocument();
      expect(screen.getByText(/Node.js/)).toBeInTheDocument();
    });
  });

  describe('CTA Buttons', () => {
    it('displays CTA buttons with correct text', () => {
      render(<Hero {...defaultProps} />);

      // Check for primary CTA button
      const primaryButton = screen.getByRole('button', {
        name: /get in touch/i,
      });
      expect(primaryButton).toBeInTheDocument();

      // Check for secondary CTA button
      const secondaryButton = screen.getByRole('button', {
        name: /download resume/i,
      });
      expect(secondaryButton).toBeInTheDocument();
    });

    it('handles primary CTA button click', async () => {
      const user = userEvent.setup();
      render(<Hero {...defaultProps} />);

      const primaryButton = screen.getByRole('button', {
        name: /get in touch/i,
      });
      await user.click(primaryButton);

      expect(mockOnScrollToSection).toHaveBeenCalledWith('contact');
    });

    it('handles secondary CTA button click', async () => {
      const user = userEvent.setup();
      const mockOpen = jest.fn();
      Object.defineProperty(window, 'open', {
        writable: true,
        value: mockOpen,
      });

      render(<Hero {...defaultProps} />);

      const secondaryButton = screen.getByRole('button', {
        name: /download resume/i,
      });
      await user.click(secondaryButton);

      expect(mockOpen).toHaveBeenCalledWith('/resume.pdf', '_blank');
    });

    it('buttons have proper accessibility attributes', () => {
      render(<Hero {...defaultProps} />);

      const buttons = screen.getAllByRole('button');
      buttons.forEach(button => {
        expect(button).toHaveAttribute('type', 'button');
        expect(button).not.toBeDisabled();
      });
    });
  });

  describe('Responsive Behavior', () => {
    it('has responsive container classes', () => {
      const { container } = render(<Hero {...defaultProps} />);

      const heroSection = container.querySelector('section');
      expect(heroSection).toHaveClass('min-h-screen');

      const gridContainer = container.querySelector('.grid');
      expect(gridContainer).toHaveClass('lg:grid-cols-2');
    });

    it('displays correct text alignment on different screen sizes', () => {
      const { container } = render(<Hero {...defaultProps} />);

      const contentDiv = container.querySelector('.text-center.lg\\:text-left');
      expect(contentDiv).toBeInTheDocument();
    });
  });

  describe('Animation Triggers', () => {
    it('has animation attributes on motion components', () => {
      const { container } = render(<Hero {...defaultProps} />);

      const motionElements = container.querySelectorAll('[animate]');
      expect(motionElements.length).toBeGreaterThan(0);
    });

    it('has proper transition attributes', () => {
      const { container } = render(<Hero {...defaultProps} />);

      const transitionElements = container.querySelectorAll('[transition]');
      expect(transitionElements.length).toBeGreaterThan(0);
    });
  });

  describe('Accessibility', () => {
    it('meets accessibility standards', async () => {
      await testAccessibility(<Hero {...defaultProps} />);
    });

    it('has proper heading structure', () => {
      render(<Hero {...defaultProps} />);

      // Check for proper heading hierarchy
      const h1 = screen.getByRole('heading', { level: 1 });
      const h2 = screen.getByRole('heading', { level: 2 });

      expect(h1).toBeInTheDocument();
      expect(h2).toBeInTheDocument();
    });

    it('has proper ARIA labels and roles', () => {
      render(<Hero {...defaultProps} />);

      // Check for proper button roles
      const buttons = screen.getAllByRole('button');
      buttons.forEach(button => {
        expect(button).toHaveAttribute('type', 'button');
      });

      // Check for proper section role
      const section = screen.getByRole('region', { hidden: true });
      expect(section).toBeInTheDocument();
    });

    it('has proper color contrast', () => {
      render(<Hero {...defaultProps} />);

      // Check that text elements have proper contrast classes
      const headings = screen.getAllByRole('heading');
      headings.forEach(heading => {
        expect(heading).toHaveClass(/text-slate-900|text-white/);
      });
    });
  });

  describe('Keyboard Navigation', () => {
    it('supports keyboard navigation', async () => {
      await testKeyboardNavigation(<Hero {...defaultProps} />, [
        { key: '{Tab}', description: 'Tab to first button' },
        { key: '{Tab}', description: 'Tab to second button' },
        { key: '{Enter}', description: 'Activate button with Enter' },
      ]);
    });

    it('buttons are focusable', async () => {
      const user = userEvent.setup();
      render(<Hero {...defaultProps} />);

      const primaryButton = screen.getByRole('button', {
        name: /get in touch/i,
      });
      const secondaryButton = screen.getByRole('button', {
        name: /download resume/i,
      });

      await user.tab();
      expect(primaryButton).toHaveFocus();

      await user.tab();
      expect(secondaryButton).toHaveFocus();
    });

    it('supports Enter key activation', async () => {
      const user = userEvent.setup();
      render(<Hero {...defaultProps} />);

      const primaryButton = screen.getByRole('button', {
        name: /get in touch/i,
      });
      await user.click(primaryButton);

      expect(mockOnScrollToSection).toHaveBeenCalledWith('contact');
    });
  });

  describe('Scroll Functionality', () => {
    it('calls onScrollToSection with correct section ID', async () => {
      const user = userEvent.setup();
      render(<Hero {...defaultProps} />);

      const primaryButton = screen.getByRole('button', {
        name: /get in touch/i,
      });
      await user.click(primaryButton);

      expect(mockOnScrollToSection).toHaveBeenCalledWith('contact');
      expect(mockOnScrollToSection).toHaveBeenCalledTimes(1);
    });

    it('handles scroll function errors gracefully', async () => {
      const user = userEvent.setup();
      const mockErrorScroll = jest.fn().mockImplementation(() => {
        throw new Error('Scroll error');
      });

      render(
        <Hero onScrollToSection={mockErrorScroll} resumeUrl: '/assets/documents/kundan_resume.pdf'' />
      );

      const primaryButton = screen.getByRole('button', {
        name: /get in touch/i,
      });

      // Should not throw error
      await expect(user.click(primaryButton)).resolves.not.toThrow();
    });
  });

  describe('Error Handling', () => {
    it('handles missing props gracefully', () => {
      // @ts-ignore - Testing missing props
      expect(() => render(<Hero />)).not.toThrow();
    });

    it('handles invalid resume URL', async () => {
      const user = userEvent.setup();
      const mockOpen = jest.fn();
      Object.defineProperty(window, 'open', {
        writable: true,
        value: mockOpen,
      });

      render(<Hero onScrollToSection={mockOnScrollToSection} resumeUrl='' />);

      const secondaryButton = screen.getByRole('button', {
        name: /download resume/i,
      });
      await user.click(secondaryButton);

      expect(mockOpen).toHaveBeenCalledWith('', '_blank');
    });
  });
});
