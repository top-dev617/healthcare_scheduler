// import { useState } from "react";

// const BookAppointment = () => {
//   const [providerId, setProviderId] = useState("");
//   const [dateTime, setDateTime] = useState("");
//   const [email, setEmail] = useState("");
//   const [reservationCode, setReservationCode] = useState("");

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const res = await fetch("/api/appointments", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ providerId, dateTime, userEmail: email }),
//     });

//     const data = await res.json();
//     setReservationCode(data.reservationCode);
//   };

//   return (
//     <div>
//       <h1>Book an Appointment</h1>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="Provider ID"
//           value={providerId}
//           onChange={(e) => setProviderId(e.target.value)}
//         />
//         <input
//           type="datetime-local"
//           value={dateTime}
//           onChange={(e) => setDateTime(e.target.value)}
//         />
//         <input
//           type="email"
//           placeholder="Email (optional)"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <button type="submit">Book Appointment</button>
//       </form>
//       {reservationCode && <p>Your reservation code: {reservationCode}</p>}
//     </div>
//   );
// };

// export default BookAppointment;


import React from 'react'

function book() {
  return (
    <div>book</div>
  )
}

export default book