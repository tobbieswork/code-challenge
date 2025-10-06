import { Button, Chip, Stack } from "@mui/material";

const percentages = [25, 50, 75];

interface PercentageSelectProps {
    balance: number;
    setAmount: (val: string) => void;
}

export default function PercentageSelect({
    balance,
    setAmount,
}: PercentageSelectProps) {
    return (
        <Stack direction={"row"} mt={1} spacing={1} overflow={"scroll"}>
            {percentages.map((percentage) => (
                <Button
                    key={percentage}
                    size="small"
                    onClick={() =>
                        setAmount(((balance * percentage) / 100).toFixed(6))
                    }
                >
                    <Chip label={`${percentage}%`} />
                </Button>
            ))}
            <Button size="small" onClick={() => setAmount(balance.toFixed(6))}>
                <Chip label="MAX" />
            </Button>
        </Stack>
    );
}
