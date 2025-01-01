import React, { useEffect, useState } from 'react';

import Error from '../Components/Error/Error';
import Loading from '../Components/Loading/Loading';
import Profile from '../Components/Main/Profile';


function ProfilePage() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [userData, setUserData] = useState();
    useEffect(() => {
        const getData = async () => {
          try {
              const response = await fetch(
                  `https://api.anininja.ru/api/user/profile`,
                  {
                      method: 'GET',
                      credentials: "include",
                      headers: {
                          Accept: 'application/json',
                          'Content-Type': 'application/json',
                      },
                  }
              );
    
              if (response.ok) {
                  let value = await response.json();
                  setUserData(value);
                  setLoading(false);
              }
              else {
                    window.location.href = '/sign_in';
              }
          }
          catch(error) {
              console.log(error);
              setLoading(false);
              setError(true);
          }
          };
          getData();
      }, []);

    return (
        <>
        {
            error ?
            <Error/>
            :
            loading ?
            <Loading />
            :
            <Profile data={userData}/>
        }
        </>
    );
}   

export default ProfilePage;
