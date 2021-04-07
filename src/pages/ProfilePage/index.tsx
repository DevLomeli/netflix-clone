import "./index.css";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/reducers/authReducer";
const ProfilePage = () => {
  const dispatch = useDispatch();

  return (
    <div className="profile">
      <h1>Profile Page</h1>
      <button
        className="profile__button button button--primary"
        onClick={() => {
          dispatch(logout());
        }}
      >
        Sign out
      </button>
    </div>
  );
};

export default ProfilePage;
