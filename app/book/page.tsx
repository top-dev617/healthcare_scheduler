"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Modal from "@/components/ui/modal"; // Import the modal component
import { toast } from "react-toastify";
import { useRouter } from "next/navigation"; // Import useRouter

const BookAppointment = () => {
  const router = useRouter(); // Initialize useRouter
  const searchParams = useSearchParams();

  const [providerId, setProviderId] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [email, setEmail] = useState("");
  const [reservationCode, setReservationCode] = useState("");
  const [appointmentId, setAppointmentId] = useState(""); // Store the appointment ID
  const [availableTimes, setAvailableTimes] = useState([]); // For rescheduling
  const [selectedTime, setSelectedTime] = useState(""); // To store selected time
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state

  useEffect(() => {
    // Retrieve and set values from URL parameters
    const providerIdParam = searchParams.get("providerId");
    const dateTimeParam = searchParams.get("dateTime");

    if (providerIdParam) {
      setProviderId(providerIdParam);
    }
    if (dateTimeParam) {
      setDateTime(dateTimeParam);
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/appointments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ providerId, dateTime, userEmail: email }),
    });

    const data = await res.json();
    if (res.ok) {
      setReservationCode(data.reservationCode);
      setAppointmentId(data.appointmentId); // Assume the appointment ID is returned
    } else {
      toast.error(`Failed to book appointment: ${data.message}`);
    }
  };

  const handleDelete = async () => {
    if (!appointmentId) {
      toast.success("No appointment to delete");
      return;
    }

    const res = await fetch(`/api/appointments/${appointmentId}`, {
      method: "DELETE",
    });

    if (res.ok) {
      toast.success("Appointment deleted successfully");
      setReservationCode(""); // Clear reservation code
      setAppointmentId(""); // Clear appointment ID
    } else {
      toast.error("Failed to delete appointment");
    }
  };

  const fetchAvailableTimes = async () => {
    // Fetch available times for the provider
    const res = await fetch(`/api/providers/${providerId}/available-times`);
    const data = await res.json();
    setAvailableTimes(data.availableTimes || []);
  };

  const handleReschedule = async () => {
    if (!appointmentId) {
      toast.success("No appointment to reschedule");
      return;
    }

    // Fetch available times and open modal
    await fetchAvailableTimes();
    setIsModalOpen(true); // Open the modal to show available times
  };

  const handleRescheduleSubmit = async () => {
    if (!selectedTime) {
      toast.success("Please select a new date and time.");
      return;
    }

    const res = await fetch("/api/appointments/reshedule", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: appointmentId, newDateTime: selectedTime }),
    });

    const data = await res.json();

    console.log("Reschedule Response:", data); // Log the response

    if (res.ok) {
      toast.success("Appointment rescheduled successfully");
      setDateTime(selectedTime); // Update state with new dateTime
      setIsModalOpen(false); // Close modal
    } else {
      toast.error(`Failed to reschedule appointment: ${data.message}`);
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-200 to-blue-400 min-h-screen flex flex-col items-center py-8">
      <div className="max-w-md w-full mx-auto bg-white shadow-lg rounded-lg p-6 mt-16">
        <div className="flex justify-between items-center mb-6">
          <Button onClick={() => router.push('/providers')} className="flex items-center text-blue-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12H3m0 0l6 6m-6-6l6-6" />
            </svg>
            Back to Providers
          </Button>
        </div>
        <h1 className="text-3xl font-bold text-center text-black mb-6">Book an Appointment</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="providerId">Provider ID</Label>
            <Input
              type="text"
              id="providerId"
              className="w-full border-gray-300 rounded-md p-2 text-black focus:outline-none focus:ring focus:ring-blue-300"
              value={providerId}
              onChange={(e) => setProviderId(e.target.value)}
              required
              defaultValue={providerId} // Fill with provider ID if available
            />
          </div>
          <div>
            <Label htmlFor="dateTime">Appointment Date & Time</Label>
            <input
              type="text"
              id="dateTime"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-300"
              value={dateTime}
              onChange={(e) => setDateTime(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="email">Email (optional)</Label>
            <Input
              type="email"
              id="email"
              className="w-full border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Book Appointment
          </Button>
        </form>
        {reservationCode && (
          <p className="mt-4 text-green-600 text-center">Your reservation code: <strong>{reservationCode}</strong></p>
        )}
        {appointmentId && (
          <div className="mt-6 flex justify-between">
            <Button onClick={handleDelete} className="bg-red-600 text-white hover:bg-red-700 transition duration-300">
              Delete Appointment
            </Button>
            <Button onClick={handleReschedule} className="bg-yellow-600 text-white hover:bg-yellow-700 transition duration-300">
              Reschedule Appointment
            </Button>
          </div>
        )}

        {/* Modal for selecting available times */}
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Reschedule Appointment">
          <div className="space-y-4">
            <p>Select a new date and time:</p>
            <div className="space-y-2">
              {availableTimes.map((time, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id={`time-${index}`}
                    name="availableTime"
                    value={time}
                    checked={selectedTime === time}
                    onChange={(e) => setSelectedTime(e.target.value)}
                  />
                  <label htmlFor={`time-${index}`}>{time}</label>
                </div>
              ))}
            </div>
            <Button onClick={handleRescheduleSubmit} className="bg-blue-600 text-white hover:bg-blue-700 transition duration-300">
              Confirm Reschedule
            </Button>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default BookAppointment;
