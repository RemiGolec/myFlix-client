

/* the following code was copied from login-view 
NOT SURE THIS CODE IS CORRECT */

import React, { useState } from 'react';

export function RegistrationView (props) {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, password);
        /* Send a request to the server for authentication */
        /* then call props.onLoggedIn(username) */
        props.onRegistration(username);
      };
    
      return (
        <form>
          <label>
            Username:
            <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
          </label>
          <label>
            Password:
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
          </label>
          <button type="submit" onClick={handleSubmit}>Submit</button>
        </form>
      );
}
