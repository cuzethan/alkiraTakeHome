import { useState } from "react";

interface TwoFactorAuthProps {
    onSuccess: () => void;
}

const VALID_CODE = "123456";

export default function TwoFactorAuth({ onSuccess }: TwoFactorAuthProps) {
    const [code, setCode] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (code.length !== 6) {
            setError("Verification code must be exactly 6 characters long");
            return;
        }

        if (!/^\d{6}$/.test(code)) {
            setError("Verification code must contain only digits");
            return;
        }

        if (code === VALID_CODE) {
            setError("");
            onSuccess();
        } else {
            setError("Invalid verification code");
        }
    };

    return (
        <div>
            <h1>Two-Factor Authentication</h1>
            <p>Enter the code sent to your device.</p>
            <form onSubmit={handleSubmit}>
                <label htmlFor="mfa-code">Verification Code</label>
                <input
                    id="mfa-code"
                    type="text"
                    inputMode="numeric"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                />
                <button type="submit">Verify</button>
            </form>
            {error && <p role="alert">{error}</p>}
        </div>
    );
}
