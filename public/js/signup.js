const signupFormHandler = async (event) => {
  try {
    event.preventDefault();
    
    const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    const location = document.querySelector('#location-signup').value.trim();
    const firstName = document.querySelector('#first-name-signup').value.trim();
    const lastName = document.querySelector('#last-name-signup').value.trim();
    const bio = document.querySelector('#bio-signup').value.trim();
    const availability = document.querySelector('#availability-signup').value.trim();

    const cuisine = document.querySelector('#cuisines-signup').value;
  
    if  (
        (username && email && password) && 
        (location && firstName && lastName) && 
        (cuisine)) {
      const response1 = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ username, email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
      const response2 = await fetch('/api/profiles', {
        method: 'POST',
        body: JSON.stringify({ location, firstName, lastName, bio, availability }),
        headers: { 'Content-Type': 'application/json' },
      }); 
      const response3 = await fetch('/api/cuisines', {
        method: 'POST',
        body: JSON.stringify({ cuisine }),
        headers: { 'Content-Type': 'application/json' },
      });
    
      if (response1.ok && response2.ok && response3.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to log in');
      }
    };

  } catch (error) {
    console.log(error);
    alert('Failed to sign up');
  }  
};

document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);



// NOTES
  // CUISINE VALUE IS SINGLE AND NOT AN ARRAY
  // cuisineController POST route is bulkCreate
    // TODO: Need to fix controller POST route