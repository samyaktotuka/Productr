import React from "react";
import { Button, TextField, Box, Stack } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const isEmail = (value) => value.includes("@");
  const isMobile = (value) => /^[6-9]\d{9}$/.test(value);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Please enter email or phone number");
      return;
    }

    if (!isEmail(email) && !isMobile(email)) {
      setError("Enter a valid email or 10-digit mobile number");
      return;
    }

    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();

    console.log("Generated OTP:", generatedOtp);

    navigate("/otp", {
      state: {
        otp: generatedOtp,
        email,
      },
    });
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Stack
        sx={{
          width: "50ch",
          justifyContent: "space-around",
        }}
      >
        <Stack spacing={3}>
          <h1
            style={{
              fontSize: "22px",
              fontWeight: 700,
              color: "#0b1b4f",
            }}
          >
            Login to your Productr Account
          </h1>

          <form onSubmit={handleSubmit} className="font-semibold">
            <label>Email or Phone number</label>

            <TextField
              fullWidth
              label="Enter email or phone number"
              sx={{ mt: 1 }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={Boolean(error)}
              helperText={error}
            />

            <Button
              fullWidth
              type="submit"
              variant="contained"
              sx={{
                mt: 2,
                height: 44,
                backgroundColor: "#08105e",
                textTransform: "none",
              }}
            >
              Login
            </Button>
          </form>
        </Stack>

        <Button
          type="submit"
          fullWidth
          variant="outlined"
          sx={{
            mt: 6,
            py: 1.5,
            textTransform: "none",
            display: "flex",
            flexDirection: "column",
            gap: "2px",
            borderStyle: "dashed",
          }}
        >
          <span style={{ color: "black", opacity: "0.6" }}>
            Don't have a Productr account?
          </span>
          <a href="#">SignUp Here</a>
        </Button>
      </Stack>
    </Box>
  );
}

export default Signup;
