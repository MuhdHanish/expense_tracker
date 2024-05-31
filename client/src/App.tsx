import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Hono client
import { hc } from 'hono/client';

// Type of Base API Route
import { type ApiRoutes } from "../../server/app";

// Client object
const client = hc<ApiRoutes>("/");

function App() {
  const [totalSpent, setTotalSpent] = useState(0);
  useEffect(() => { 
    async function fetchTotal() {
      const response = await client.api.expenses["total-spent"].$get();
      if (!response.ok) throw new Error("The server may be experiencing issues. Please try again later.");
      const { data } = await response.json();
      const { total } = data;
      setTotalSpent(total);
    }
    fetchTotal();
  }, []);
  
  return (
    <Card className="w-[350px] m-auto">
      <CardHeader>
        <CardTitle>Total Spent</CardTitle>
        <CardDescription>The total amount you've spent</CardDescription>
      </CardHeader>
      <CardContent>{totalSpent}</CardContent>
    </Card>
  );
}

export default App;
