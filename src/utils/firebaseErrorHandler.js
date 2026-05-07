export const formatFirebaseError = (error) => {
  const errorCode = error.code;

  const errorMessages = {
    "auth/email-already-in-use":
      "This email is already registered. Try logging in instead.",
    "auth/invalid-email": "Please enter a valid email address.",
    "auth/weak-password": "Password should be at least 6 characters long.",
    "auth/user-not-found": "No account found with this email. Try signing up.",
    "auth/wrong-password": "Incorrect password. Please try again.",
    "auth/user-disabled": "This account has been disabled. Contact support.",
    "auth/too-many-requests":
      "Too many failed attempts. Please try again later.",
    "auth/operation-not-allowed":
      "This operation is not allowed. Contact support.",
    "auth/invalid-credential": "Invalid email or password.",
    "auth/missing-email": "Please enter your email.",
    "auth/missing-password": "Please enter your password.",
  };

  return errorMessages[errorCode] || error.message;
};
