import { Container } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import CurrencySwap from "./features/currency-swap";

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Container
                sx={(theme) => ({
                    height: "100vh",
                    maxWidth: 1200,
                    bgcolor: "#F5EFE6",
                    color: theme.palette.text.primary,
                    p: 2,
                    margin: "auto",
                })}
            >
                <CurrencySwap />
            </Container>
            <ToastContainer />
        </QueryClientProvider>
    );
}

export default App;
