import DomainPage from '@/components/DomainPage';
import { F } from '@/lib/facts';

const dom = F.domains.find((d) => d.slug === 'public-policy');
export const metadata = { title: dom.name, description: dom.intro };

export default function Page() { return <DomainPage slug='public-policy' />; }
