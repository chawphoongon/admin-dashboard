// import React, { useEffect, useState } from "react";
// import api from "../api";
// import { Card, CardContent } from "@mui/material";
// import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

// export default function Dashboard() {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     api.get("/users").then(res => setData(res.data));
//   }, []);

//   return (
//     <div style={{ display: "flex", gap: "20px" }}>
//       <Card style={{ flex: 1 }}>
//         <CardContent>
//           <h2>User Statistics</h2>
//           <BarChart width={400} height={300} data={data}>
//             <XAxis dataKey="name" />
//             <YAxis />
//             <Tooltip />
//             <Bar dataKey="id" fill="#8884d8" />
//           </BarChart>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }


import React from "react";

export default function Dashboard() {
  return <h2>Welcome to the Dashboard</h2>;
}

