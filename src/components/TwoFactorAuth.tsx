import { useState } from "react";

interface TwoFactorAuthProps {
    onSuccess: () => void;
}

export default function TwoFactorAuth({ onSuccess }: TwoFactorAuthProps) {
    const [code, setCode] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (code === "coolcode123") {
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
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                />
                <button type="submit">Verify</button>
            </form>
            {error && <p role="alert">{error}</p>}
        </div>
    );
}
