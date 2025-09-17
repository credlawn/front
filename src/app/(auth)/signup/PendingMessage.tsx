
import { Clock } from 'lucide-react';

export default function PendingMessage() {
  return (
    <div className="text-center">
      <div className="rounded-full bg-yellow-100 w-16 h-16 flex items-center justify-center mx-auto mb-4">
        <Clock className="h-8 w-8 text-yellow-600" />
      </div>
      
      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        Account Pending Activation
      </h2>
      
      <p className="text-gray-600 mb-6">
        Your account is pending for activation. Please wait for admin approval.
        You will receive an email notification once your account is activated.
      </p>
      
      <div className="flex justify-center">
        <a
          href="/login"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Go to Login
        </a>
      </div>
    </div>
  );
}