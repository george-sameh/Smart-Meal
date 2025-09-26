import { useAuth } from "./contexts/authContext";
import { Navigate } from "react-router-dom";
import { dosignout } from "./Firebase/auth";

const Profile = () => {
  const { userLoggedIn, currentUser } = useAuth();

  if (!userLoggedIn) {
    return <Navigate to="/login" />;
  } else if(!currentUser.emailVerified) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <h1>Welcome {currentUser?.name || "User"} 👋</h1>
      <p>Email: {currentUser?.email}</p>
      <button onClick={dosignout}>Log Out</button>
    </div>
  );
};

export default Profile;