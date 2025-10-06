# 🧩 Problem 3: Messy React

## 🕐 Duration

**Estimated Time:** ≤ 6 hours

> For internship-level roles. Professionals should complete it significantly faster.

---

## 📝 Task

Analyze and improve the provided React + TypeScript code snippet.  
Your main goals are:

1. **Identify** all computational inefficiencies, anti-patterns, and bad practices.
2. **Explain** why each issue occurs and its impact on performance or readability.
3. **Refactor** the code into a clean, efficient, and maintainable version.

---

## 🧠 Context

The given component:

-   Uses **ReactJS with TypeScript**
-   Uses **Functional Components**
-   Uses **React Hooks** (such as `useMemo`)
-   Renders wallet balances and token prices

You must assess and optimize this component from both a **technical** and **design** perspective.

---

## ⚙️ Original Code

```tsx
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
    const { children, ...rest } = props;
    const balances = useWalletBalances();
    const prices = usePrices();

    const getPriority = (blockchain: any): number => {
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
    };

    const sortedBalances = useMemo(() => {
        return balances
            .filter((balance: WalletBalance) => {
                const balancePriority = getPriority(balance.blockchain);
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
    }, [balances, prices]);

    const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
        return {
            ...balance,
            formatted: balance.amount.toFixed(),
        };
    });

    const rows = sortedBalances.map(
        (balance: FormattedWalletBalance, index: number) => {
            const usdValue = prices[balance.currency] * balance.amount;
            return (
                <WalletRow
                    className={classes.row}
                    key={index}
                    amount={balance.amount}
                    usdValue={usdValue}
                    formattedAmount={balance.formatted}
                />
            );
        }
    );

    return <div {...rest}>{rows}</div>;
};
```
