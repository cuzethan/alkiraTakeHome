# alkiraTakeHome

### Technologies/Libraries:
React.js, Vitest, React Testing Library

### Setup

1. Git clone this repo into your computer
2. Go to your terminal and change your directory to the repo
3. Run "npm i" to install npm modules

### Run locally
1. Go to your terminal and change your directory to the repo
2. Run "npm run dev" on the terminal
3. Terminal should redirect you to the localhost link to view the website "http://localhost:5173/"

### Mock user credentials/roles
Given user credentials: { username: 'testuser', password: 'testpass' }

Verification Code: "coolcode123"

### How to test the login/MFA flow
1. Go to your terminal and change your directory to the repo
2. Run "npm test" on the terminal (all tests from src/test are being ran)

### Key design decisions and assumptions

I assume that storage isn't a bottleneck, so I am just storing all credentials in a in-memory array

Since email/password validation wasn't specified in terms of login:
    If the credentials are correct, I immediately redirect to the 2FA screen.
    If for any reason (invalid credentials, unfilled fields, etc.) login doesn't work, then I just show the "Invalid Username/Password" message

For signup, I will add the following constraints:
    Username/Password no whitespace and at least 8 characters long
    Password must have at least 1 uppercase, 1 lowercase, 1 symbol, and 1 number


### Known limitations
1. There is no session management, meaning that if you refresh the page you lose your credentials.
2. Credentials are hardcoded so people can possibly find the logins.
3. The credential checking process is within the browser only, so you can maybe mess with devtools to bypass the login/2FA
4. Many more...
