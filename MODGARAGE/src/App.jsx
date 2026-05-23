import RootLayout from "./layouts/RootLayout";
import AppRoutes from "./routes/AppRoutes";
import SessionLoader from "./components/auth/SessionLoader";

const App = () => {
  return (
    <SessionLoader>
      <RootLayout>
        <AppRoutes />
      </RootLayout>
    </SessionLoader>
  );
};

export default App;

