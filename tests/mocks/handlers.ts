import { http, HttpResponse } from 'msw';

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

interface AnalyticsData {
  event: string;
}

// Mock API handlers for testing
export const handlers = [
  // Mock contact form submission
  http.post('/api/contact', async ({ request }) => {
    const body = await request.json() as ContactFormData;
    
    // Simulate validation
    if (!body?.name || !body?.email || !body?.message) {
      return HttpResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Simulate successful submission
    return HttpResponse.json(
      { message: 'Message sent successfully' },
      { status: 200 }
    );
  }),

  // Mock analytics tracking
  http.post('/api/analytics', async ({ request }) => {
    const body = await request.json() as AnalyticsData;
    
    // Simulate analytics tracking
    return HttpResponse.json(
      { success: true, event: body?.event },
      { status: 200 }
    );
  }),

  // Mock resume download
  http.get('/api/resume', () => {
    return HttpResponse.json(
      { url: '/resume.pdf' },
      { status: 200 }
    );
  }),

  // Mock project data
  http.get('/api/projects', () => {
    return HttpResponse.json([
      {
        id: 1,
        title: 'Test Project 1',
        description: 'A test project for testing purposes',
        technologies: ['React', 'TypeScript'],
        image: '/test-project-1.jpg',
        githubUrl: 'https://github.com/test/project1',
        liveUrl: 'https://test-project-1.com',
      },
      {
        id: 2,
        title: 'Test Project 2',
        description: 'Another test project for testing purposes',
        technologies: ['Next.js', 'Tailwind CSS'],
        image: '/test-project-2.jpg',
        githubUrl: 'https://github.com/test/project2',
        liveUrl: 'https://test-project-2.com',
      },
    ]);
  }),

  // Mock skills data
  http.get('/api/skills', () => {
    return HttpResponse.json([
      {
        name: 'React',
        level: 90,
        category: 'Frontend',
        yearsOfExperience: 5,
      },
      {
        name: 'TypeScript',
        level: 85,
        category: 'Language',
        yearsOfExperience: 4,
      },
      {
        name: 'Next.js',
        level: 80,
        category: 'Framework',
        yearsOfExperience: 3,
      },
    ]);
  }),

  // Mock experience data
  http.get('/api/experience', () => {
    return HttpResponse.json([
      {
        id: 1,
        title: 'Senior Frontend Developer',
        company: 'Test Company',
        period: '2022 - Present',
        description: 'Leading frontend development for web applications',
        technologies: ['React', 'TypeScript', 'Next.js'],
      },
      {
        id: 2,
        title: 'Frontend Developer',
        company: 'Another Test Company',
        period: '2020 - 2022',
        description: 'Developed responsive web applications',
        technologies: ['React', 'JavaScript', 'CSS'],
      },
    ]);
  }),

  // Mock 404 for unknown endpoints
  http.all('*', () => {
    return HttpResponse.json(
      { error: 'Not found' },
      { status: 404 }
    );
  }),
]; 