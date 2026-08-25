import DomainPage from '@/components/DomainPage';
import { F } from '@/lib/facts';

const dom = F.domains.find((d) => d.slug === 'ai-innovation');
export const metadata = { title: dom.name, description: dom.intro };

export default function Page() { return <DomainPage slug='ai-innovation' />; }
