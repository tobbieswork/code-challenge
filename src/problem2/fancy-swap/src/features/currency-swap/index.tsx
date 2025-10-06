import { Stack } from "@mui/material";
import FancySwap from "../../components/FancySwap";
import TokenList from "../../components/TokenList";

export default function CurrencySwap() {
    return (
        <Stack direction={"row"} width={"100%"} height={"100%"}>
            <TokenList />
            <FancySwap />
        </Stack>
    );
}
