const errorMapping = {
    'auth/user-not-found' : "Please enter a valid email address or signup",
    'auth/wrong-password' : "Incorrect credentials",
    'auth/email-already-in-use' : "Email already in use",
    'auth/weak-password' : 'Password must be 6 or more characters long',
    'auth/unknown' : 'Please try again later',
    'auth/invalid-email': 'Invalid Email',
    'auth/invalid-credential': 'Invalid credentials'
}

export default errorMapping;