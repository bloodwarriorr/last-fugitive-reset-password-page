import React, { useState } from "react";
import { Button, TextField, Typography } from "@mui/material";
export default function Form({ id, token, setIsLoading }) {
  const [password, setPassword] = useState();
  const [passwordConfirm, setPasswordConfirm] = useState();
  const [error, setError] = useState("");
  const [color, setColor] = useState();
  const resetPassword = async (e) => {
    e.preventDefault();
    setColor("red");
    if (!password && !passwordConfirm) {
      setError("All Fields Are Mendatory");
      return;
    } else if (password !== passwordConfirm) {
      setError("Passwords Does Not Match!");
      return;
    } else if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(password)) {
      setError(
        "Password Must Contain Atlest 6 Charcters With Capital Letter, Lowercase Letter And a Number"
      );
      return;
    }
    setError("");
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({ password: password }),
    };
    try {
      setIsLoading(true);
      const data = await fetch(process.env.REACT_APP_BASE_URL + id + "/" + token, requestOptions);
      if (data.ok) {
        setColor("green");
        setError("Password Successfully Updated, the window will be closed in 5 seconds");
      } else {
        setError("Token Has Expierd Or Invalid");
      }
    } catch {
      setError("Error While Updating The Password");
      throw new Error("Error While Updating The Password");
    }
    setIsLoading(false);
    setTimeout(() => {
      window.close();
    }, 5000);
  };
  return (
    <form onSubmit={resetPassword}>
      <Typography variant="h5">Reset Password</Typography>
      <div>
        {/* <label>Passowrd</label> */}
        <TextField
          fullWidth
          label="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        {/* <label>Passowrd Confirm</label> */}
        <TextField
          label="Password Confirm"
          type="password"
          fullWidth
          onChange={(e) => setPasswordConfirm(e.target.value)}
        />
      </div>
      <div className="form__btn">
        <Button fullWidth variant="contained" type="submit">
          Change Password
        </Button>
      </div>
      <Typography varient="h6" mt={1} style={{ color: color }}>
        {error}
      </Typography>
    </form>
  );
}
