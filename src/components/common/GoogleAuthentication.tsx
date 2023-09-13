import {
  googleLogout,
  GoogleOAuthProvider,
  useGoogleLogin,
} from '@react-oauth/google';
import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';

export const GoogleAuthentication = () => {
  const [user, setUser] = useState();
  const [profile, setProfile] = useState();

  const GOOGLE_DRIVE_CLIENT_ID = import.meta.env
    .VITE_GOOGLE_DRIVE_CLIENT_ID as string;
  const SCOPES = [
    'https://www.googleapis.com/auth/drive.file',
    'https://www.googleapis.com/auth/drive.resource',
  ];

  useEffect(() => {
    if (user) {
      fetch(
        `https://people.googleapis.com/v1/people/me?personFields=names&access_token=${user.access_token}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${user.access_token}`,
            Accept: 'application/json',
            SameSite: 'None',
          },
        },
      )
        .then((res) => {
          setProfile(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  const login = useGoogleLogin({
    // scope: SCOPES.join(' '),
    onSuccess: (response) => setUser(response),
    onError: (error) => console.log(error),
  });

  const logout = () => {
    googleLogout();
    setUser([]);
  };

  return (
    <GoogleOAuthProvider clientId={GOOGLE_DRIVE_CLIENT_ID}>
      <Box sx={{ my: 2 }}>
        {profile ? (
          <div>
            <h3>User Logged in</h3>
            <p>Name: {profile.name}</p>
            <br />
            <br />
            <button onClick={logout}>Log out</button>
          </div>
        ) : (
          <button onClick={() => login()}>Sign in with Google 🚀 </button>
        )}
      </Box>
    </GoogleOAuthProvider>
  );
};