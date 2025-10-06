interface WalletBalance {
    currency: string;
    amount: number;
}
interface FormattedWalletBalance {
    currency: string;
    amount: number;
    formatted: string;
}

interface Props extends BoxProps {}
const WalletPage: React.FC<Props> = (props: Props) => {
    const { children, ...rest } = props; // children is unused
    const balances = useWalletBalances();
    const prices = usePrices();

    // getPriority will be called multiple times during sorting, consider memoizing if performance is a concern
    const getPriority = useCallback((blockchain: any): number => {
        switch (blockchain) {
            case "Osmosis":
                return 100;
            case "Ethereum":
                return 50;
            case "Arbitrum":
                return 30;
            case "Zilliqa":
                return 20;
            case "Neo":
                return 20;
            default:
                return -99;
        }
    }, []);

    // This sortedBalances useMemo with prices dependency is unnecessary
    const sortedBalances = useMemo(() => {
        return balances
            .filter((balance: WalletBalance) => {
                const balancePriority = getPriority(balance.blockchain);
                // lhsPriority is undefined
                if (lhsPriority > -99) {
                    if (balance.amount <= 0) {
                        return true;
                    }
                }
                return false;
            })
            .sort((lhs: WalletBalance, rhs: WalletBalance) => {
                const leftPriority = getPriority(lhs.blockchain);
                const rightPriority = getPriority(rhs.blockchain);
                if (leftPriority > rightPriority) {
                    return -1;
                } else if (rightPriority > leftPriority) {
                    return 1;
                }
            });
    }, [balances]);

    // This formattedBalances mapping should be inside useMemo to avoid re-computation on every render
    // This formattedBalances function is unused
    // const formattedBalances = useMemo(() => {
    //     return sortedBalances.map((balance: WalletBalance) => {
    //         return {
    //             ...balance,
    //             formatted: balance.amount.toFixed(6), // To fixed without specifying decimal places defaults to 0
    //         };
    //     });
    // }, [sortedBalances]);

    // sortedBalances is mapped again here, causing double computation
    // Use formattedBalances instead of re-mapping sortedBalances
    const rows = sortedBalances.map(
        (balance: FormattedWalletBalance, index: number) => {
            const usdValue = prices[balance.currency] * balance.amount;
            return (
                <WalletRow
                    className={classes.row}
                    key={index}
                    amount={balance.amount}
                    usdValue={usdValue}
                    formattedAmount={balance.amount.toFixed(6)} // Moved formatting here
                />
            );
        }
    );

    return <div {...rest}>{rows}</div>;
};
