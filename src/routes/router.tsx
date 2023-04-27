import { createBrowserRouter } from "react-router-dom";
import Rovers from "../ui/Rovers";
import RoverPhotos from "../ui/RoverPhotos";
// router object
const router = createBrowserRouter([
  {
    path: "/",
    element: <Rovers />,
  },
  {
    path: "rovers/:id/:name",
    element: <RoverPhotos />,
  },
]);
export default router;
