export default function TwoFactorAuth() {
    return (
        <div>
            <h1>Two-Factor Authentication</h1>
            <p>Enter the code sent to your device.</p>
            <form>
                <label htmlFor="mfa-code">Verification Code</label>
                <input id="mfa-code" type="text" />
                <button type="submit">Verify</button>
            </form>
        </div>
    )
}
