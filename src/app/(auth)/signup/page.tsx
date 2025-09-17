import { checkPendingRequest } from '@/auth/signup';
import SignupForm from './signupForm';
import PendingMessage from './PendingMessage';
import { checkCurrentUser } from '@/auth/login';
import { redirect } from 'next/navigation';

export default async function SignupPage() {
  const { isLoggedin } = await checkCurrentUser();

  if (isLoggedin) {
    redirect('/dashboard');
  }

  const result = await checkPendingRequest();
  const showPendingMessage = result.hasPendingRequest && result.success;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        {showPendingMessage ? (
          <PendingMessage />
        ) : (
          <SignupForm />
        )}
      </div>
    </div>
  );
}