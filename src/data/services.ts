export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  href: string;
}

export const services: Service[] = [
  {
    id: 'pilot-campaign',
    title: 'Pilot Campaign Launch',
    description: 'Test your offer with 200 free prospects',
    icon: '🚀',
    href: '/services/pilot-campaign'
  },
  {
    id: 'consultation',
    title: 'Consultation Call & System Audit',
    description: 'Get expert analysis & strategy for your outbound system',
    icon: '🎯',
    href: '/services/consultation'
  },

];
