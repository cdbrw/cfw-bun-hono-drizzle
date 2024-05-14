import { AuthForm } from '../components/AuthForm';
import MainLayout from '../layouts/MainLayout';

export default function SignUp() {
  return (
    <MainLayout>
      <div class="flex justify-center">
        <AuthForm
          action="Sign up"
          description="Enter your email below to create your account."
        />
      </div>
    </MainLayout>
  );
}
