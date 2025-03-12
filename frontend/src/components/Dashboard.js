import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';

export default function Dashboard() {
  const { user, jwt, signOut, copyJwtToClipboard } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignOut = async () => {
    setIsLoading(true);
    const { success, error } = await signOut();
    
    if (success) {
      toast.success('Signed out successfully!');
    } else {
      toast.error(error || 'Failed to sign out');
    }
    
    setIsLoading(false);
  };

  const handleCopyJwt = async () => {
    const { success, error } = await copyJwtToClipboard();
    
    if (success) {
      toast.success('JWT copied to clipboard!');
    } else {
      toast.error(error || 'Failed to copy JWT');
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Dashboard
        </h2>
        
        <div className="mt-10 bg-white p-6 shadow rounded-lg">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900">User Information</h3>
              <p className="mt-1 text-sm text-gray-500">Email: {user?.email}</p>
              <p className="mt-1 text-sm text-gray-500">ID: {user?.id}</p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-900">JWT Token</h3>
              <div className="mt-2">
                <button
                  onClick={handleCopyJwt}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Copy JWT to Clipboard
                </button>
              </div>
            </div>
            
            <div className="pt-4 border-t border-gray-200">
              <button
                onClick={handleSignOut}
                disabled={isLoading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
              >
                {isLoading ? 'Signing out...' : 'Sign out'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
