import { SelectPost } from '../db/schema';

import MainLayout from '../layouts/MainLayout';
import NewPost from '../components/NewPost';
import PostsList from '../components/PostsList';

export default function Posts({ posts }: { posts: SelectPost[] }) {
  return (
    <MainLayout isLoggedIn>
      <div class="flex flex-row gap-6 mt-8 w-full dark:text-white">
        <NewPost />
        <PostsList posts={posts} />
      </div>
    </MainLayout>
  );
}
