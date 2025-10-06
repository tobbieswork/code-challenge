import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import TuneIcon from "@mui/icons-material/Tune";
import {
    Box,
    Button,
    Card,
    Stack,
    Tab,
    Tabs,
    TextField,
    Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { fetchTokenPrices, type TokenPrice } from "../api/prices";
import { REFRESH_INTERVAL_MS } from "../constants";
import CurrencySelector from "./CurrencySelector";
import PercentageSelect from "./PercentageSelect";

const DEFAULT_BALANCE = 1000;

export default function FancySwap() {
    const {
        data: tokenPrices,
        isLoading: isLoadingPrices,
        isError,
    } = useQuery<TokenPrice[], Error>({
        queryKey: ["tokenPrices"],
        queryFn: fetchTokenPrices,
        refetchInterval: REFRESH_INTERVAL_MS,
    });
    const [fromToken, setFromToken] = useState<TokenPrice | null>(null);
    const [toToken, setToToken] = useState<TokenPrice | null>(null);
    const [amount, setAmount] = useState<string>("0.00");
    const [converted, setConverted] = useState<string>("0.00");
    const [swapping, setSwapping] = useState(false);

    const handleSwap = () => {
        if (!fromToken || !toToken) {
            toast.error("Please select both tokens to swap.");
            return;
        } else if (parseFloat(amount) > DEFAULT_BALANCE) {
            toast.error("Insufficient balance for this swap.");
        } else {
            setSwapping(true);
            setTimeout(() => {
                setSwapping(false);
                toast.success(
                    `Swapped ${amount} ${fromToken.currency} to ${converted} ${toToken.currency}!`
                );
            }, 2000);
        }
    };
    const handleSwitchTokens = () => {
        setFromToken(toToken);
        setToToken(fromToken);
    };

    useEffect(() => {
        if (fromToken && toToken) {
            const fromPrice = fromToken.price;
            const toPrice = toToken.price;
            const amountNum = parseFloat(amount);
            if (!isNaN(amountNum)) {
                const convertedAmount = (amountNum * fromPrice) / toPrice;
                setConverted(convertedAmount.toFixed(6));
            } else {
                setConverted("0.00");
            }
        } else {
            setConverted("0.00");
        }
    }, [fromToken, toToken, amount]);

    useEffect(() => {
        if (!fromToken && !toToken && tokenPrices && tokenPrices.length >= 2) {
            setFromToken(tokenPrices[0]);
            setToToken(tokenPrices[1]);
        }
    }, [tokenPrices]);

    if (isLoadingPrices) return <Typography>Loading...</Typography>;
    if (isError || !tokenPrices)
        return <Typography>Error loading token prices</Typography>;
    return (
        <Stack
            p={3}
            width={"100%"}
            maxWidth={450}
            bgcolor={"#f7f9fc"}
            borderRadius={4}
            boxShadow={"0 4px 24px 0 rgba(0,0,0,0.08)"}
            spacing={1}
            sx={{
                transition: "box-shadow 0.3s",
                m: { xs: 1, sm: "auto" },
            }}
        >
            <Stack
                direction="row"
                spacing={2}
                justifyContent="space-between"
                alignItems="center"
            >
                <Tabs value={0} sx={{ minHeight: 40 }}>
                    <Tab label="Swap" sx={{ fontWeight: 600, minWidth: 80 }} />
                    <Tab label="Limit" disabled sx={{ minWidth: 80 }} />
                </Tabs>
                <Button
                    sx={{
                        minWidth: 40,
                        bgcolor: "#e3e8ee",
                        borderRadius: 2,
                        boxShadow: "none",
                        p: 1,
                        transition: "background 0.2s",
                        "&:hover": { bgcolor: "#d1d8e0" },
                    }}
                >
                    <TuneIcon fontSize="small" />
                </Button>
            </Stack>
            <Card
                sx={{
                    p: 2,
                    bgcolor: "#fff",
                    borderRadius: 3,
                    boxShadow: "0 2px 8px 0 rgba(0,0,0,0.04)",
                    mb: 1,
                }}
            >
                <Stack
                    direction={"row"}
                    justifyContent="space-between"
                    alignItems="flex-end"
                    spacing={2}
                >
                    <Box>
                        <Typography
                            fontWeight={500}
                            color="text.secondary"
                            mb={0.5}
                        >
                            You pay
                        </Typography>
                        <TextField
                            variant="outlined"
                            size="small"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            sx={{
                                width: 140,
                                bgcolor: "#f7f9fc",
                                borderRadius: 2,
                                input: {
                                    textAlign: "right",
                                    fontSize: 18,
                                    fontWeight: 600,
                                },
                            }}
                            disabled={isLoadingPrices}
                        />
                    </Box>
                    <Stack alignItems="flex-end" spacing={0.5}>
                        <Typography variant="caption" color="text.secondary">
                            Balance: {DEFAULT_BALANCE}
                        </Typography>
                        <CurrencySelector
                            options={tokenPrices}
                            value={fromToken}
                            onChange={setFromToken}
                        />
                    </Stack>
                </Stack>
                <PercentageSelect
                    balance={DEFAULT_BALANCE}
                    setAmount={setAmount}
                />
            </Card>
            <Stack alignItems="center" justifyContent="center">
                <Button
                    onClick={handleSwitchTokens}
                    sx={{
                        minWidth: 0,
                        bgcolor: "#e3e8ee",
                        borderRadius: 2,
                        p: 1,
                        "&:hover": { bgcolor: "#d1d8e0" },
                    }}
                    disabled={!fromToken || !toToken}
                >
                    <SwapHorizIcon fontSize="medium" />
                </Button>
            </Stack>
            <Card
                sx={{
                    p: 2,
                    bgcolor: "#fff",
                    borderRadius: 3,
                    boxShadow: "0 2px 8px 0 rgba(0,0,0,0.04)",
                }}
            >
                <Stack
                    direction={"row"}
                    justifyContent="space-between"
                    alignItems="flex-end"
                    spacing={2}
                >
                    <Box sx={{ width: "100%" }}>
                        <Typography
                            fontWeight={500}
                            color="text.secondary"
                            mb={0.5}
                        >
                            You receive
                        </Typography>
                        <TextField
                            variant="outlined"
                            size="small"
                            value={converted}
                            disabled
                            sx={{
                                width: 140,
                                bgcolor: "#f7f9fc",
                                borderRadius: 2,
                                input: {
                                    textAlign: "right",
                                    fontSize: 18,
                                    fontWeight: 600,
                                },
                            }}
                        />
                    </Box>

                    <Stack alignItems="flex-end">
                        <CurrencySelector
                            options={tokenPrices}
                            value={toToken}
                            onChange={setToToken}
                        />
                    </Stack>
                </Stack>
            </Card>
            {fromToken && toToken && (
                <Stack direction={"row"} textAlign="left">
                    <Typography variant="caption" color="text.secondary">
                        1 {fromToken.currency} ≈{" "}
                        {(fromToken.price / toToken.price).toFixed(6)}{" "}
                        {toToken.currency}
                    </Typography>
                </Stack>
            )}
            <Button
                variant="contained"
                size="large"
                sx={{
                    bgcolor: swapping ? "#e3e8ee" : "#3b82f6",
                    color: "#fff",
                    borderRadius: 3,
                    fontWeight: 700,
                    fontSize: 18,
                    py: 1.5,
                    boxShadow: "0 2px 8px 0 rgba(59,130,246,0.08)",
                    transition: "background 0.2s",
                    "&:hover": { bgcolor: "#2563eb" },
                }}
                onClick={handleSwap}
                disabled={isLoadingPrices || swapping}
            >
                {swapping ? "Swapping..." : "Swap"}
            </Button>
        </Stack>
    );
}
