import jwt_decode from 'jwt-decode';

export default function isAuthenticated() {
  const token = localStorage.getItem('token');
  if (!token) {
    return false;
  }

  try {
    const decoded = jwt_decode(token);
    // Check for token expiration and other claims as needed
    return true;
  } catch (error) {
    return false;
  }
}
