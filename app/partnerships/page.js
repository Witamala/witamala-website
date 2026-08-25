import DomainPage from '@/components/DomainPage';
import { F } from '@/lib/facts';

const dom = F.domains.find((d) => d.slug === 'partnerships');
export const metadata = { title: dom.name, description: dom.intro };

export default function Page() { return <DomainPage slug='partnerships' />; }
