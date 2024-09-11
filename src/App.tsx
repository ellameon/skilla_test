import React from 'react';
import "./App.scss"
import { TableComponent } from "./view/table/Table";
import { QueryClient, QueryClientProvider } from "react-query";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <TableComponent/>
      </div>
    </QueryClientProvider>
  );
}

export default App;
