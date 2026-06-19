import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 text-center">
            <h1 className="text-9xl font-extrabold text-blue-600 tracking-widest">404</h1>
            <div className="bg-amber-400 px-2 text-sm rounded rotate-12 absolute mb-24 font-semibold text-gray-900">
                Page Not Found
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mt-4">
                Oops! Page Not Found
            </h2>
            <p className="text-gray-500 mt-2 max-w-md">
                The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>
            <Link
                href="/"
                className="mt-6 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-all shadow-md"
            >
                Back to Home
            </Link>
        </div>
    );
}