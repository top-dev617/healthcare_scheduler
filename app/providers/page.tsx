"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Modal from "@/components/ui/modal"; // Ensure you have a modal component
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "react-toastify";

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
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>(""); // State for error message
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

  const handleAddProvider = () => {
    if (password === "123") {
      // Logic to add provider
      // Placeholder for actual functionality
      setIsModalOpen(false);
      setErrorMessage(""); // Clear any previous error message
      setPassword(""); // Clear the password input
      router.push('/add-providers');
    } else {
      toast.error("Invalid password. Please try again."); // Set error message
    }
  };

  if (loading) return <p className="text-center text-xl">Loading providers...</p>;

  return (
    <div className="bg-gradient-to-r from-blue-200 to-blue-400 min-h-screen flex flex-col items-center py-8">
      <div className="max-w-6xl w-full mx-auto px-4 bg-white rounded-lg shadow-lg p-8 mt-10">
        <h1 className="text-4xl font-bold text-center text-blue-700 mb-10">Available Healthcare Providers</h1>
        
        <Button 
          className="mb-6 bg-green-600 text-white hover:bg-green-700 transition duration-300 absolute top-4 right-4"
          onClick={() => setIsModalOpen(true)}
        >
          Add Provider
        </Button>

        {providers.length === 0 ? (
          <p className="text-center text-lg">No providers available at this time.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {providers.map((provider) => (
              <div key={provider.id} className="bg-white shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105 hover:shadow-xl border border-gray-200">
                <h2 className="text-xl font-semibold text-blue-600">{provider.facilityName}</h2>
                <p className="text-gray-700">{provider.doctorName}</p>
                <p className="text-gray-500 italic">{provider.specialty}</p>
                <h3 className="mt-4 font-bold text-gray-800">Available Times:</h3>
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

      {/* Modal for adding provider */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add Provider">
        <div className="space-y-4">
          <Label htmlFor="password">Admin Password</Label>
          <Input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-300"
          />
          {errorMessage && (
            <p className="text-red-500">{errorMessage}</p> // Display error message
          )}
          <Button onClick={handleAddProvider} className="bg-blue-600 text-white hover:bg-blue-700 transition duration-300">
            Confirm
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default Providers;
