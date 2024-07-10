import { CreateTrip } from "./pages/create-trip";
import { TripDetailsPage } from "./pages/trip-details";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <CreateTrip />,
  },
  {
    path: "/trips/:tripid",
    element: <TripDetailsPage />,
  },
])

export function App() {
  return (
    <RouterProvider router={router} />
  );
}
