import {
    Autocomplete,
    Avatar,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import { type TokenPrice } from "../api/prices";
import { getTokenIconUrl } from "../utils";

interface CurrencySelectorProps {
    value: TokenPrice | null;
    options: TokenPrice[];
    onChange: (value: TokenPrice | null) => void;
    disabled?: boolean;
    name?: string;
    onBlur?: () => void;
}

export default function CurrencySelector({
    value,
    options,
    onChange,
    disabled,
    name,
    onBlur,
}: CurrencySelectorProps) {
    return (
        <Autocomplete
            sx={{
                width: 150,
                bgcolor: "#f7f9fc",
                borderRadius: 2,
                ".MuiInputBase-root": {
                    borderRadius: 2,
                    bgcolor: "#f7f9fc",
                    fontWeight: 600,
                    fontSize: 16,
                    boxShadow: "0 1px 4px 0 rgba(0,0,0,0.04)",
                    transition: "box-shadow 0.2s",
                },
            }}
            options={options}
            getOptionLabel={(option) => option.currency}
            isOptionEqualToValue={
                (option, value) =>
                    option.currency === value.currency &&
                    option.price === value.price // In case two tokens have the same currency name but different prices
            }
            value={value}
            renderValue={(option) => (
                <Stack
                    direction="row"
                    alignItems="center"
                    spacing={1}
                    component="li"
                >
                    <Avatar
                        src={getTokenIconUrl(option.currency)}
                        alt={option.currency}
                        sx={{ width: 24, height: 24 }}
                    />
                    <Typography variant="body2">{option.currency}</Typography>
                </Stack>
            )}
            onChange={(_, value) => onChange(value)}
            disabled={disabled}
            renderOption={(props, option) => {
                const { key, ...rest } = props;
                return (
                    <Stack
                        key={key}
                        direction="row"
                        alignItems="center"
                        spacing={1}
                        component="li"
                        {...rest}
                    >
                        <Avatar
                            src={getTokenIconUrl(option.currency)}
                            alt={option.currency}
                            sx={{ width: 24, height: 24 }}
                        />
                        <Typography variant="body2">
                            {option.currency}
                        </Typography>
                    </Stack>
                );
            }}
            renderInput={(params) => (
                <TextField
                    {...params}
                    variant="outlined"
                    size="small"
                    name={name}
                    onBlur={onBlur}
                    sx={{
                        bgcolor: "#f7f9fc",
                        borderRadius: 2,
                        fontWeight: 600,
                        fontSize: 16,
                    }}
                />
            )}
        />
    );
}
