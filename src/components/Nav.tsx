import LogOutButton from './LogOutButton';

type NavProps = {
  isLoggedIn: boolean;
};

export default function Nav({ isLoggedIn }: NavProps) {
  return (
    <nav class="flex flex-row mt-8 w-full dark:text-white items-baseline justify-between">
      <div class="flex flex-col w-[170px]">
        <a href={isLoggedIn ? '/posts' : '/'}>
          <h1 class="text-4xl text-center">Blog Posts</h1>
        </a>
        <p class="italic text-right">by cdbrw</p>
      </div>
      <div class="flex flex-row gap-4 justify-center">
        {!isLoggedIn && (
          <>
            <a href="/login" class="hover:underline">
              Log in
            </a>
            <a href="/signup" class="hover:underline">
              Sign up
            </a>
          </>
        )}

        {isLoggedIn && (
          <>
            <LogOutButton />
          </>
        )}
      </div>
    </nav>
  );
}
