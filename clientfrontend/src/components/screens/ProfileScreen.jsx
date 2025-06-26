import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { profile } from '../../redux/actions/userActions';

const ProfileScreen = () => {
  const dispatch = useDispatch();

  const profileData = useSelector((state) => state.profile);
  const { loading, error, userInfo } = profileData;

  useEffect(() => {
    dispatch(profile());
  }, [dispatch]);

  return (
    <div>
      {loading ? (
        <p>Loading...</p> 
      ) : error ? (
        <p>Error: {error}</p> 
      ) : userInfo ? (
        <div>
          <div>Email: {userInfo[0].email}</div>
          <div>First Name: {userInfo[0].first_name}</div>
          <div>Last Name: {userInfo[0].last_name}</div>
        </div>
      ) : (
        <p>No profile data available</p> 
      )}
    </div>
  );
};

export default ProfileScreen;
