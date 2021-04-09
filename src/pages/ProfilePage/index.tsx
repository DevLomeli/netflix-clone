import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectAuth } from "../../redux/reducers/authReducer";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectAuth);

  return (
    <div className="profile">
      <div className="profile__content">
        <h1>Edit Profile</h1>
        <div className="profile__info">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
            alt="avatar"
          />
          <div className="profile__details">
            <h2>{user?.email}</h2>
            <div className="profile__plans">
              <h3>Plans (Current Plan: premium)</h3>
              <h4>Renewal date: 04/03/2021</h4>
              <div className="profile__plan">
                <p>
                  Netflix Standard <br /> <small>1080p</small>
                </p>
                <button className="button button--primary">Subscribe</button>
              </div>
              <div className="profile__plan">
                <p>
                  Netflix Basic <br /> <small>480p</small>
                </p>
                <button className="button button--primary">Subscribe</button>
              </div>
              <div className="profile__plan">
                <p>
                  Netflix Premium <br /> <small>4K+HDR</small>
                </p>
                <button className="button button--primary">Subscribe</button>
              </div>
              <button
                className="profile__button button button--primary"
                onClick={() => {
                  dispatch(logout());
                }}
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
