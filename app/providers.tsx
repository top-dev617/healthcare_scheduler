import { useEffect, useState } from "react";

interface Provider {
  id: string;
  facilityName: string;
  doctorName: string;
  specialty: string;
  availableHours: string[];
}

const Providers = () => {
  const [providers, setProviders] = useState<Provider[]>([]);

  useEffect(() => {
    fetch("/api/providers")
      .then((res) => res.json())
      .then((data) => setProviders(data))
      .catch((error) => console.error('Error fetching providers:', error));
  }, []);

  return (
    <div>
      <h1>Available Providers</h1>
      {/* <h1>{providers}</h1> */}
      {providers.map((provider) => (
        <div key={provider.id}>
          <h2>{provider.facilityName}</h2>
          <p>{provider.doctorName}</p>
          <p>{provider.specialty}</p>
          <p>Available Times: {provider.availableHours.join(", ")}</p>
        </div>
      ))}
    </div>
  );
};

export default Providers;
