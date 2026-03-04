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
  {
    id: 'infrastructure-setup',
    title: 'Full Outbound Infrastructure Setup',
    description: 'Complete system deployment in 48 hours',
    icon: '⚙️',
    href: '/services/infrastructure-setup'
  },
  {
    id: 'evergreen-campaign',
    title: '24/7 Evergreen Signal Campaign Setup',
    description: 'Launch always-on automated campaigns',
    icon: '♾️',
    href: '/services/evergreen-campaign'
  }
];
