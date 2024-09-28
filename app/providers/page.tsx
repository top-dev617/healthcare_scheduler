"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Provider {
  id: string;
  facilityName: string;
  doctorName: string;
  specialty: string;
  availableHours: string[]; // This should contain datetime strings
}

const Providers = () => {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const response = await fetch("/api/providers");
        const data = await response.json();
        setProviders(data);
        
        console.log("Fetched providers:", data); // Debugging log
      } catch (error) {
        console.error("Error fetching providers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProviders();
  }, []);

  const handleReserveAppointment = (providerId: string, dateTime: string) => {
    console.log("Reserving appointment with Provider ID:", providerId, "at", dateTime); // Debugging log
    router.push(`/book?providerId=${providerId}&dateTime=${encodeURIComponent(dateTime)}`);
  };

  if (loading) return <p className="text-center text-xl">Loading providers...</p>;

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col items-center py-8">
      <div className="max-w-6xl w-full mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-blue-700 mb-10">Available Healthcare Providers</h1>
        
        {providers.length === 0 ? (
          <p className="text-center text-lg">No providers available at this time.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {providers.map((provider) => (
              <div key={provider.id} className="bg-white shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105 hover:shadow-xl">
                <h2 className="text-xl font-semibold text-blue-600">{provider.facilityName}</h2>
                <p className="text-gray-700">{provider.doctorName}</p>
                <p className="text-gray-500 italic">{provider.specialty}</p>
                <h3 className="mt-4 font-bold">Available Times:</h3>
                <ul className="list-disc list-inside mt-2">
                  {provider.availableHours.map((hour, index) => (
                    <li key={index} className="cursor-pointer text-blue-500 hover:underline" onClick={() => handleReserveAppointment(provider._id, hour)}>
                      {new Date(hour).toLocaleString()} {/* Formats the date and time */}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Providers;
