/** UI config for home page and footer (not from API). */

export const features = [
  { id: 'roadmaps', title: 'Structured Roadmaps', description: 'Step-by-step paths for each topic so you know what to learn next.', icon: '🗺️' },
  { id: 'questions', title: 'Real Interview Questions', description: 'Curated questions from top companies with clear explanations.', icon: '❓' },
  { id: 'ui', title: 'Clean UI Experience', description: 'Focus on learning with a simple, distraction-free interface.', icon: '✨' },
  { id: 'progress', title: 'Track Your Progress', description: 'See what you have covered and what is left to master.', icon: '📈' },
] as const;

export const footerLinks = [
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
  { label: 'Privacy Policy', href: '#privacy' },
  { label: 'Terms', href: '#terms' },
] as const;

export const socialLinks = [
  { label: 'Twitter', href: '#', icon: '𝕏' },
  { label: 'LinkedIn', href: '#', icon: 'in' },
  { label: 'GitHub', href: '#', icon: '⌘' },
] as const;
