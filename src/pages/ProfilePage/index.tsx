import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectAuth } from "../../redux/reducers/authReducer";
import db from "../../firebase";
import { useCallback, useEffect, useState } from "react";

interface IUserData {
  email?: string;
  plan?: string;
}

const ProfilePage = () => {
  const [userData, setUserData] = useState<IUserData | undefined>();
  const dispatch = useDispatch();
  const user = useSelector(selectAuth);

  const getPlanUser = useCallback(() => {
    db.collection("accounts")
      .doc(user?.uid)
      .get()
      .then((doc) => {
        if (doc.exists) {
          const data = doc.data();
          return setUserData(data);
        }
        return console.log("no such data");
      });
  }, [user?.uid]);

  useEffect(() => {
    getPlanUser();
  }, [getPlanUser]);

  const setPlan = (plan?: string) => {
    try {
      db.collection("accounts").doc(user?.uid).set({
        email: user?.email,
        plan,
      });
      getPlanUser();
    } catch (e) {
      console.log(e);
    }
  };

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
              <h3>{`Plans (Current Plan: ${userData?.plan})`}</h3>
              <h4>Renewal date: 04/03/2021</h4>
              <div className="profile__plan">
                <p>
                  Netflix Standard <br /> <small>1080p</small>
                </p>
                <button
                  onClick={() => setPlan("standard")}
                  className={`button ${
                    userData?.plan === "standard"
                      ? "button--selected"
                      : "button--primary"
                  }`}
                >
                  {userData?.plan === "standard" ? "Selected" : "Subscribe"}
                </button>
              </div>
              <div className="profile__plan">
                <p>
                  Netflix Basic <br /> <small>480p</small>
                </p>
                <button
                  onClick={() => setPlan("basic")}
                  className={`button ${
                    userData?.plan === "basic"
                      ? "button--selected"
                      : "button--primary"
                  }`}
                >
                  {userData?.plan === "basic" ? "Selected" : "Subscribe"}
                </button>
              </div>
              <div className="profile__plan">
                <p>
                  Netflix Premium <br /> <small>4K+HDR</small>
                </p>
                <button
                  onClick={() => setPlan("premium")}
                  className={`button ${
                    userData?.plan === "premium"
                      ? "button--selected"
                      : "button--primary"
                  }`}
                >
                  {userData?.plan === "premium" ? "Selected" : "Subscribe"}
                </button>
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
