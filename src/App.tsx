import { QueryClient, QueryClientProvider } from "react-query";
import Contents from "pages/Contents";
import { Suspense } from "react";
import { GlobalStyle } from "styles/global-style";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyle />
      <Suspense>
        <Contents gener={"romance"} />
      </Suspense>
    </QueryClientProvider>
  );
};

export default App;
