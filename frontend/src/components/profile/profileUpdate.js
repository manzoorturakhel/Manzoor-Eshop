import React, { useState } from "react";

const ProfileUpdate = ({ user }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profile, setProfile] = useState(null);
  console.log("first,", profile);
  return (
    <div className="profile__update__form">
      <form className="form" onSubmit={(e) => e.preventDefault()}>
        <label>Name:</label>
        <input
          onChange={(e) => setName(e.target.value)}
          className="input_profile"
          name="name"
          value={name || user.name}
        />
        <label>Email:</label>
        <input
          onChange={(e) => setEmail(e.target.value)}
          className="input_profile"
          name="email"
          value={email || user.email}
        />
        <label>Profile:</label>
        <input
          type="file"
          onChange={(e) => setProfile(e.target.files[0])}
          className="input_profile"
        />
        <button className="btn">Update Profile</button>
      </form>
    </div>
  );
};

export default ProfileUpdate;
