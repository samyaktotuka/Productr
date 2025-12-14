import React, { useState, useRef, useEffect } from "react";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Otp() {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(30);
  const inputsRef = useRef([]);
  const location = useLocation();
  const correctOtp = location.state?.otp;
  const navigate = useNavigate();

  useEffect(() => {
    alert("Check console for OTP");
  }, []);

  if (!correctOtp) {
    return <p>Invalid access</p>;
  }

  // countdown timer
  useEffect(() => {
    if (timer === 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError("");

    if (value && index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handleVerify = () => {
    const enteredOtp = otp.join("");

    if (enteredOtp.length < 6) {
      setError("Please enter the complete OTP");
      return;
    }

    if (enteredOtp !== correctOtp) {
      setError("Incorrect OTP. Please try again.");
      return;
    }

    navigate("/dashboard/home");
  };

  const handleResend = () => {
    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();

    console.log("Resent OTP:", newOtp);

    setTimer(30);
    setOtp(Array(6).fill(""));
    setError("");
    inputsRef.current[0]?.focus();

    // update correct OTP
    location.state.otp = newOtp;
  };

  return (
    <Box sx={{ width: "100%", maxWidth: 360 }}>
      <Stack spacing={2.5} alignItems="center">
        <Typography fontSize={22} fontWeight={700} color="#0b1b4f">
          Login to your Productr Account
        </Typography>

        <Typography fontSize={14} color="black">
          Enter OTP
        </Typography>

        {/* OTP Inputs */}
        <Stack direction="row" spacing={2.5}>
          {otp.map((digit, index) => (
            <TextField
              key={index}
              inputRef={(el) => (inputsRef.current[index] = el)}
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              error={Boolean(error)}
              inputProps={{
                maxLength: 1,
                inputMode: "numeric",
                style: {
                  textAlign: "center",
                  fontSize: "16px",
                },
              }}
              sx={{ width: 44 }}
            />
          ))}
        </Stack>

        {/* Error message */}
        {error && (
          <Typography fontSize={13} color="error">
            {error}
          </Typography>
        )}

        <Button
          fullWidth
          variant="contained"
          onClick={handleVerify}
          sx={{
            height: 44,
            backgroundColor: "#08105e",
            textTransform: "none",
          }}
        >
          Enter your OTP
        </Button>

        {/* Resend section */}
        <Typography fontSize={13} color="gray">
          Didn't receive OTP? &nbsp;
          {timer > 0 ? (
            <span style={{ color: "blue", fontWeight: "bolder" }}>
              Resend in {timer}s
            </span>
          ) : (
            <span
              onClick={handleResend}
              style={{
                color: "blue",
                cursor: "pointer",
                fontWeight: "bolder",
              }}
            >
              Resend
            </span>
          )}
        </Typography>
      </Stack>
    </Box>
  );
}

export default Otp;
