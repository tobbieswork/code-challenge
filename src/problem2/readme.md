# 💱 Problem 2: Fancy Form

## 📝 Task Overview

Create a **currency swap form** that allows users to exchange one token for another.  
You may use **any frontend libraries, frameworks, or plugins** to achieve a beautiful, interactive, and functional interface.

---

## 🎯 Requirements

### 1️⃣ Core Functionality

-   Build a form that lets a user:
    -   Select **two tokens** (From → To)
    -   Enter an **amount** to swap
    -   View the **converted amount** based on real-time token prices
-   Include a **Submit / Swap button** (mocked interaction is acceptable).

### 2️⃣ Enhancements

-   Add **form validation** (e.g., prevent swapping the same token, validate input > 0).
-   Add **error messages** or hints for invalid entries.
-   Include a **loading indicator** (simulate backend response delay).

### 3️⃣ Visual & UX Goals

-   The form should look **modern, elegant, and responsive**.
-   Use clean color schemes, rounded components, and smooth transitions.
-   You may disregard any provided starter files — design freely.

---

## 💡 Useful Resources

| Resource                                                                                         | Description                                                            |
| ------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------- |
| [Token Icons Repository](https://github.com/Switcheo/token-icons/tree/main/tokens)               | Contains SVG logos for many tokens.                                    |
| Example: [SWTH.svg](https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/SWTH.svg) | Direct link to token SVG.                                              |
| [Token Price Data](https://interview.switcheo.com/prices.json)                                   | JSON with token price information. Use this to compute exchange rates. |

---

## 🧠 Implementation Hints

-   Example UI elements to include:
    -   Dropdowns for selecting tokens
    -   Numeric input for the swap amount
    -   Swap button with animation/loading state
    -   Real-time conversion result display

---

## ⚙️ Example Behavior

1. User selects `From: ETH` → `To: BTC`
2. Enters `1.0` ETH
3. App shows conversion value based on price ratio  
   _e.g.,_ `1 ETH ≈ 0.056 BTC`
4. User clicks **Swap**
5. Button shows loading animation, then success message.

---

## 🚀 Getting Started

### 1️⃣ Install Dependencies

```bash
npm install
```
