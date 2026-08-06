import type { Certificate } from '@/types/certificate';

export const CERTIFICATES: Certificate[] = [
  {
    name: 'AWS Certified Solutions Architect – Associate',
    issuer: 'Amazon Web Services',
    date: '2025-03',
    credentialUrl: 'https://aws.amazon.com/verify',
    expires: '2028-03',
  },
  {
    name: 'Certified Kubernetes Administrator (CKA)',
    issuer: 'CNCF',
    date: '2024-11',
    credentialUrl: 'https://www.cncf.io/certification/cka/',
    expires: '2027-11',
  },
  {
    name: 'HashiCorp Certified: Terraform Associate',
    issuer: 'HashiCorp',
    date: '2024-06',
    credentialUrl: 'https://www.hashicorp.com/certification/terraform-associate',
  },
];
