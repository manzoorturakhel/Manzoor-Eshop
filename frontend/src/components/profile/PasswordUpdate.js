import React, { useState } from "react";

const PasswordUpdate = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  return (
    <div className="profile__update__form">
      <form className="form" onSubmit={(e) => e.preventDefault()}>
        <label>oldPassword:</label>
        <input
          onChange={(e) => setOldPassword(e.target.value)}
          className="input_profile"
          name="name"
          value={oldPassword}
        />
        <lable>newPassword:</lable>
        <input
          onChange={(e) => setNewPassword(e.target.value)}
          className="input_profile"
          name="email"
          value={newPassword}
        />
        <label>Confirm newPassword:</label>
        <input
          onChange={(e) => setConfirmNewPassword(e.target.value)}
          className="input_profile"
          name="email"
          value={confirmNewPassword}
        />
        <button className="btn">Update Password</button>
      </form>
    </div>
  );
};

export default PasswordUpdate;
