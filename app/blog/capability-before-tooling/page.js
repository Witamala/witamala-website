import PostPage from '@/components/PostPage';
import { F } from '@/lib/facts';

const post = F.posts.find((p) => p.slug === 'capability-before-tooling');
export const metadata = { title: post.title, description: post.challenge };

export default function Page() { return <PostPage slug='capability-before-tooling' />; }
