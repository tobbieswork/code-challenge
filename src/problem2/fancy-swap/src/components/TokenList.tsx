import {
    Avatar,
    Box,
    CircularProgress,
    List,
    ListItem,
    Stack,
    Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { fetchTokenPrices, type TokenPrice } from "../api/prices";
import { REFRESH_INTERVAL_MS } from "../constants";
import { getTokenIconUrl } from "../utils/index";

export default function TokenList() {
    const {
        data: tokenPrices,
        isLoading,
        error,
    } = useQuery<TokenPrice[], Error>({
        queryKey: ["tokenPrices"],
        queryFn: fetchTokenPrices,
        refetchInterval: REFRESH_INTERVAL_MS,
    });
    const [elapsedMilliseconds, setElapsedMilliseconds] = useState(0);

    useEffect(() => {
        const startTime = Date.now();

        const intervalId = setInterval(() => {
            const now = Date.now();
            const milliseconds = Math.floor(now - startTime);
            setElapsedMilliseconds(milliseconds);
        }, 250);

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    if (isLoading) return <Typography>Loading...</Typography>;
    if (error) return <Typography>Error loading token prices</Typography>;

    return (
        <Box overflow={"scroll"} height={1} px={4}>
            <Box
                sx={{
                    position: "sticky",
                    top: 0,
                    bgcolor: "background.paper",
                    zIndex: 1,
                    p: 2,
                    borderRadius: 2,
                }}
            >
                <Typography variant="h6">Token Prices</Typography>
                <Stack direction="row" alignItems="center" spacing={1}>
                    <Typography variant="caption" color="textSecondary">
                        (Updates every {REFRESH_INTERVAL_MS / 1000} seconds)
                    </Typography>
                    <CircularProgress
                        size={16}
                        thickness={6}
                        variant="determinate"
                        value={
                            ((elapsedMilliseconds % REFRESH_INTERVAL_MS) /
                                REFRESH_INTERVAL_MS) *
                            100
                        }
                    />
                </Stack>
            </Box>
            <List>
                {tokenPrices?.map((token) => (
                    <ListItem
                        key={token.currency}
                        sx={{
                            borderRadius: 2,
                            mb: 1,
                            p: 1,
                            bgcolor: "#f7f9fc",
                        }}
                    >
                        <Avatar
                            src={getTokenIconUrl(token.currency)}
                            alt={token.currency}
                            sx={{ width: 24, height: 24 }}
                        />
                        <Typography variant="body2" ml={1} width={100}>
                            {token.currency}
                        </Typography>
                        <Typography
                            variant="body2"
                            fontWeight={600}
                            ml={1}
                            color="primary"
                        >
                            ${token.price.toFixed(4)}
                        </Typography>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
}
