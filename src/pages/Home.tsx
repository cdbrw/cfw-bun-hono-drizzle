import MainLayout from '../layouts/MainLayout';

export default function Home() {
  return (
    <MainLayout>
      <section class="flex flex-col justify-center items-center mt-12">
        <h1 class="text-4xl">Hello! 👋</h1>
        <p>
          Welcome to probably the worlds most underwhelming blogging application
          ...
        </p>
        <p class="mt-6">
          <a href="/login" class="hover:underline">
            Log in
          </a>{' '}
          /{' '}
          <a href="/signup" class="hover:underline">
            Sign up
          </a>{' '}
          to get started.
        </p>
      </section>
    </MainLayout>
  );
}
