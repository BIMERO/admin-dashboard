import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function LoadingPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(`/${searchParams.get("account_type")}/dashboard`);
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [navigate, searchParams]);
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
      }}
    >
      <Stack
        display={"flex"}
        flexDirection={"column"}
        sx={{
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress size={"2.2rem"} />
        <Typography mt={2} variant="h6" fontWeight={"bold"}>
          Loading...
        </Typography>
      </Stack>
    </Box>
  );
}
