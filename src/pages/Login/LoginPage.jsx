import React, { useState } from 'react';
import { Api_Endpoints } from '../../Api/apiEndpoint';
import { makeApiCall } from '../../Api/makeApiCall';
import { Logo } from '../../Constant/ImageConstant';
import { setUserSession } from '../../utils/auth';
import { showErrorToast, showSuccessToast } from '../../utils/toastService';
import './LoginPage.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    const response = await makeApiCall(Api_Endpoints.login_Endpoint, 'POST', {Email:email,Password:password,Type:'admin' });

      console.log(response)
    if (response.status===200) {
      showSuccessToast(response?.message)

    setTimeout(() => {
      window.location.reload();
    }, 500 );       
      setUserSession(response?.data);
    } else {
       showErrorToast(response?.data?.message)
    }
  };

  return (
    <div className="login-page">
      <div className="login-page-container">
        <img src={Logo} className="logo" alt="Company LOGO" />
        <h1>Login</h1>

        <form className="form" onSubmit={handleLogin}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@gmail.com"
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="**********"
            />
          </div>
          <button className="primary" type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
