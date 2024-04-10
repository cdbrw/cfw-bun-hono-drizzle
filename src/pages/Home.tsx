import Layout from '../layouts';
import NewPost from '../components/NewPost';
import PostsList from '../components/PostsList';
import { SelectPost } from '../db/schema';

export default function Home({ posts }: { posts: SelectPost[] }) {
  return (
    <Layout>
      <div class="flex flex-row mt-8 w-full dark:text-white">
        <NewPost />
        <PostsList posts={posts} />
      </div>
    </Layout>
  );
}
