import RootLayout from "./layouts/RootLayout";
import AppRoutes from "./routes/AppRoutes";

const App = () => {
  return (
    <RootLayout>
      <AppRoutes />
    </RootLayout>
  );
};

export default App;
