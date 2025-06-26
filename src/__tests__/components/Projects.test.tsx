import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  render,
  testAccessibility,
  testKeyboardNavigation,
  createMockProject,
} from '../utils/test-utils';
import Projects from '@/components/Projects';

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
    img: ({ ...props }: any) => <img {...props} />,
  },
  AnimatePresence: ({ children }: any) => children,
}));

describe('Projects Component', () => {
  const mockProjects = [
    createMockProject({ id: 1, title: 'React App', category: 'web' }),
    createMockProject({ id: 2, title: 'Mobile App', category: 'mobile' }),
    createMockProject({ id: 3, title: 'API Service', category: 'backend' }),
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Project Cards Rendering', () => {
    it('renders all project cards with correct data', () => {
      render(<Projects />);

      // Check for project titles
      expect(screen.getByText('React App')).toBeInTheDocument();
      expect(screen.getByText('Mobile App')).toBeInTheDocument();
      expect(screen.getByText('API Service')).toBeInTheDocument();

      // Check for project descriptions
      mockProjects.forEach(project => {
        expect(screen.getByText(project.description)).toBeInTheDocument();
      });
    });

    it('displays project technologies correctly', () => {
      render(<Projects />);

      mockProjects.forEach(project => {
        project.technologies.forEach(tech => {
          expect(screen.getByText(tech)).toBeInTheDocument();
        });
      });
    });

    it('shows project images with proper alt text', () => {
      render(<Projects />);

      const images = screen.getAllByRole('img');
      images.forEach((image, index) => {
        if (index < mockProjects.length) {
          expect(image).toHaveAttribute('alt');
          expect(image).toHaveAttribute('src');
        }
      });
    });

    it('displays project links correctly', () => {
      render(<Projects />);

      const githubLinks = screen.getAllByRole('link', { name: /github/i });
      const liveLinks = screen.getAllByRole('link', { name: /live/i });

      expect(githubLinks.length).toBeGreaterThan(0);
      expect(liveLinks.length).toBeGreaterThan(0);
    });
  });

  describe('Filter Functionality', () => {
    it('renders filter buttons for all categories', () => {
      render(<Projects />);

      expect(screen.getByRole('button', { name: /all/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /web/i })).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: /mobile/i })
      ).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: /backend/i })
      ).toBeInTheDocument();
    });

    it('filters projects by category when filter button is clicked', async () => {
      const user = userEvent.setup();
      render(<Projects />);

      // Click web filter
      const webFilter = screen.getByRole('button', { name: /web/i });
      await user.click(webFilter);

      // Should show only web projects
      expect(screen.getByText('React App')).toBeInTheDocument();
      expect(screen.queryByText('Mobile App')).not.toBeInTheDocument();
      expect(screen.queryByText('API Service')).not.toBeInTheDocument();
    });

    it('shows all projects when "All" filter is selected', async () => {
      const user = userEvent.setup();
      render(<Projects />);

      // First filter by web
      const webFilter = screen.getByRole('button', { name: /web/i });
      await user.click(webFilter);

      // Then click "All"
      const allFilter = screen.getByRole('button', { name: /all/i });
      await user.click(allFilter);

      // Should show all projects
      expect(screen.getByText('React App')).toBeInTheDocument();
      expect(screen.getByText('Mobile App')).toBeInTheDocument();
      expect(screen.getByText('API Service')).toBeInTheDocument();
    });

    it('highlights active filter button', async () => {
      const user = userEvent.setup();
      render(<Projects />);

      const webFilter = screen.getByRole('button', { name: /web/i });
      await user.click(webFilter);

      expect(webFilter).toHaveClass(/active|bg-blue-600|text-white/);
    });
  });

  describe('Search Functionality', () => {
    it('renders search input field', () => {
      render(<Projects />);

      const searchInput = screen.getByPlaceholderText(/search projects/i);
      expect(searchInput).toBeInTheDocument();
    });

    it('filters projects based on search query', async () => {
      const user = userEvent.setup();
      render(<Projects />);

      const searchInput = screen.getByPlaceholderText(/search projects/i);
      await user.type(searchInput, 'React');

      // Should show only React project
      expect(screen.getByText('React App')).toBeInTheDocument();
      expect(screen.queryByText('Mobile App')).not.toBeInTheDocument();
      expect(screen.queryByText('API Service')).not.toBeInTheDocument();
    });

    it('searches in project title and description', async () => {
      const user = userEvent.setup();
      render(<Projects />);

      const searchInput = screen.getByPlaceholderText(/search projects/i);
      await user.type(searchInput, 'API');

      // Should show API Service project
      expect(screen.getByText('API Service')).toBeInTheDocument();
    });

    it('clears search when input is cleared', async () => {
      const user = userEvent.setup();
      render(<Projects />);

      const searchInput = screen.getByPlaceholderText(/search projects/i);
      await user.type(searchInput, 'React');
      await user.clear(searchInput);

      // Should show all projects
      expect(screen.getByText('React App')).toBeInTheDocument();
      expect(screen.getByText('Mobile App')).toBeInTheDocument();
      expect(screen.getByText('API Service')).toBeInTheDocument();
    });
  });

  describe('Modal Functionality', () => {
    it('opens modal when project card is clicked', async () => {
      const user = userEvent.setup();
      render(<Projects />);

      const projectCard = screen.getByText('React App').closest('div');
      if (projectCard) {
        await user.click(projectCard);
      }

      // Modal should be visible
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('displays project details in modal', async () => {
      const user = userEvent.setup();
      render(<Projects />);

      const projectCard = screen.getByText('React App').closest('div');
      if (projectCard) {
        await user.click(projectCard);
      }

      // Check modal content
      expect(screen.getByText('React App')).toBeInTheDocument();
      expect(
        screen.getByText('A test project description')
      ).toBeInTheDocument();
    });

    it('closes modal when close button is clicked', async () => {
      const user = userEvent.setup();
      render(<Projects />);

      // Open modal
      const projectCard = screen.getByText('React App').closest('div');
      if (projectCard) {
        await user.click(projectCard);
      }

      // Close modal
      const closeButton = screen.getByRole('button', { name: /close/i });
      await user.click(closeButton);

      // Modal should be closed
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('closes modal when clicking outside', async () => {
      const user = userEvent.setup();
      render(<Projects />);

      // Open modal
      const projectCard = screen.getByText('React App').closest('div');
      if (projectCard) {
        await user.click(projectCard);
      }

      // Click outside modal
      const backdrop = screen.getByTestId('modal-backdrop');
      await user.click(backdrop);

      // Modal should be closed
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });

  describe('Lazy Loading', () => {
    it('implements lazy loading for project images', () => {
      render(<Projects />);

      const images = screen.getAllByRole('img');
      images.forEach(image => {
        expect(image).toHaveAttribute('loading', 'lazy');
      });
    });

    it('shows loading state while images load', () => {
      render(<Projects />);

      const loadingElements = screen.getAllByTestId('image-loading');
      expect(loadingElements.length).toBeGreaterThan(0);
    });
  });

  describe('Keyboard Navigation', () => {
    it('supports keyboard navigation through projects', async () => {
      await testKeyboardNavigation(<Projects />, [
        { key: '{Tab}', description: 'Navigate to first project' },
        { key: '{Enter}', description: 'Open project modal' },
        { key: '{Escape}', description: 'Close modal' },
      ]);
    });

    it('allows navigation through filter buttons', async () => {
      const user = userEvent.setup();
      render(<Projects />);

      const allFilter = screen.getByRole('button', { name: /all/i });
      const webFilter = screen.getByRole('button', { name: /web/i });

      await user.tab();
      expect(allFilter).toHaveFocus();

      await user.tab();
      expect(webFilter).toHaveFocus();
    });

    it('supports keyboard activation of project cards', async () => {
      const user = userEvent.setup();
      render(<Projects />);

      const projectCard = screen.getByText('React App').closest('div');
      if (projectCard) {
        projectCard.focus();
        await user.keyboard('{Enter}');

        expect(screen.getByRole('dialog')).toBeInTheDocument();
      }
    });
  });

  describe('Responsive Grid Layout', () => {
    it('has responsive grid classes', () => {
      const { container } = render(<Projects />);

      const gridContainer = container.querySelector('.grid');
      expect(gridContainer).toHaveClass(
        /grid-cols-1|md:grid-cols-2|lg:grid-cols-3/
      );
    });

    it('adapts layout for different screen sizes', () => {
      const { container } = render(<Projects />);

      const projectCards = container.querySelectorAll(
        '[data-testid="project-card"]'
      );
      projectCards.forEach(card => {
        expect(card).toHaveClass(/col-span-1/);
      });
    });
  });

  describe('Accessibility', () => {
    it('meets accessibility standards', async () => {
      await testAccessibility(<Projects />);
    });

    it('has proper ARIA labels for interactive elements', () => {
      render(<Projects />);

      const searchInput = screen.getByPlaceholderText(/search projects/i);
      expect(searchInput).toHaveAttribute('aria-label');

      const filterButtons = screen.getAllByRole('button');
      filterButtons.forEach(button => {
        expect(button).toHaveAttribute('aria-pressed');
      });
    });

    it('provides proper focus management for modal', async () => {
      const user = userEvent.setup();
      render(<Projects />);

      // Open modal
      const projectCard = screen.getByText('React App').closest('div');
      if (projectCard) {
        await user.click(projectCard);
      }

      // Focus should be trapped in modal
      const modal = screen.getByRole('dialog');
      expect(modal).toHaveAttribute('aria-modal', 'true');
    });
  });

  describe('Error Handling', () => {
    it('handles empty projects list gracefully', () => {
      // Mock empty projects data
      jest.doMock('@/lib/data', () => ({
        projects: [],
      }));

      expect(() => render(<Projects />)).not.toThrow();
    });

    it('handles missing project data gracefully', () => {
      const incompleteProject = createMockProject({ title: undefined });
      jest.doMock('@/lib/data', () => ({
        projects: [incompleteProject],
      }));

      expect(() => render(<Projects />)).not.toThrow();
    });
  });
});
