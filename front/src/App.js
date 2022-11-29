import { GeoLocationProvider } from "./hooks/useGeoLocation";
import Home from "./components/Home";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => (
  <div className="App" style={{ padding: 10 }}>
    <QueryClientProvider client={queryClient}>
      <Home />
    </QueryClientProvider>
  </div>
);

export default App;
