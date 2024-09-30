// src/app/page.tsx
import React from 'react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
      <header className="w-full py-5 bg-blue-500 text-white text-center">
        <h1 className="text-3xl font-bold">24-Hour Healthcare Scheduler</h1>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-5">
        <section className="text-center max-w-md">
          <h2 className="text-2xl font-semibold mb-4">Book Healthcare Appointments Anytime</h2>
          <p className="text-gray-700 mb-6">
            Conveniently find and book appointments with healthcare providers near you.
          </p>
          {/* <Link href="/book-appointment"> */}
            <a href='/providers' className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
              Book an Appointment
            </a>
          {/* </Link> */}
        </section>

        <section className="text-center mt-10">
          <h3 className="text-xl font-medium mb-3">Our Features</h3>
          <ul className="list-disc text-gray-700 text-left">
            <li>View available appointments</li>
            <li>Book without an account</li>
            <li>Easy access to healthcare providers</li>
          </ul>
        </section>
      </main>

      <footer className="w-full py-3 bg-gray-800 text-white text-center">
        <p>&copy; {new Date().getFullYear()} 24-Hour Healthcare Scheduler</p>
      </footer>
    </div>
  );
}
