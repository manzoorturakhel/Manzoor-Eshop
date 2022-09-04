import React, { useState } from "react";
import { useSelector } from "react-redux";

import Card from "../UI/Card";
import "./Profile.css";
import ProfileUpdate from "./profileUpdate";
import PasswordUpdate from "./PasswordUpdate";

const TABS = [
  {
    id: 1,
    name: "Profile Settings",
  },
  {
    id: 2,
    name: "Profile Password Change",
  },
  {
    id: 3,
    name: "My Orders",
  },
];

const Tab = ({ name, index, onSelected, activeTab }) => {
  const onSelectedTab = () => {
    onSelected(index);
  };
  return (
    <h4
      className={`${index === activeTab ? "active" : ""}`}
      onClick={onSelectedTab}
    >
      {name}
    </h4>
  );
};

const Profile = () => {
  const user = useSelector((state) => state.auth.user);
  const [activeTab, setActiveTab] = useState(0);

  const onSelected = (index) => {
    console.log("selected index", index);
    setActiveTab(index);
  };

  return (
    <Card>
      <div className="profile__details">
        <div className="profile__tab">
          <div className="profile__cover"></div>
          <div className="profile">
            <div className="profile__img">
              <img
                src={`http://localhost:8800/img/users/${user?.profile}`}
                alt="user profile"
              />
            </div>
            <div className="profile__user__detail">
              <h4>{user?.name}</h4>
              <h5>Joined on {user?.createdAt.split("T")[0]}</h5>
            </div>
          </div>
          <div className="profile__tabs">
            {TABS.map((tab, index) => {
              return (
                <Tab
                  onSelected={onSelected}
                  key={index}
                  name={tab.name}
                  index={index}
                  activeTab={activeTab}
                />
              );
            })}
          </div>
        </div>

        {activeTab === 0 && <ProfileUpdate user={user} />}
        {activeTab === 1 && <PasswordUpdate />}
        {activeTab === 2 && <div> My Orders </div>}
      </div>
    </Card>
  );
};

export default Profile;
