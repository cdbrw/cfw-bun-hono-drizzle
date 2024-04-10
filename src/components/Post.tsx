import { SelectPost } from '../db/schema';

export default function Post({ post }: { post: SelectPost }) {
  return (
    <div
      key={post.id}
      class="block min-w-96 mb-2 p-6 border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
    >
      <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {post.title}
      </h5>
      <p class="font-normal text-gray-700 dark:text-gray-400">{post.content}</p>
    </div>
  );
}
