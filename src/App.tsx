import { RouterProvider } from "react-router-dom";
import router from "./routes/router";
import { SnackbarProvider } from "notistack";
function App() {
  return (
    <SnackbarProvider>
      <RouterProvider router={router} />
    </SnackbarProvider>
  );
}

export default App;
