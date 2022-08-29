import "./App.css";
import Form from "./components/Form";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import { useState } from "react";

function App() {
  const queryString = window.location.search;
  const urlParms = new URLSearchParams(queryString);
  const id = urlParms.get("id");
  const token = urlParms.get("token");
  const [isLoading, setIsLoading] = useState(false)
  return (
    <div className="App">
      <Form id={id} token={token} setIsLoading={(val)=>setIsLoading(val)}/>
      { isLoading && <Box className="box">
        <h1>In Progress...</h1>
        <LinearProgress sx={{width:'80%'}}/>
      </Box>}
    </div>
  );
}

export default App;
