let picture = '';

var myWidget = cloudinary.createUploadWidget({
  cloudName: 'dkuq7bvia', 
  uploadPreset: 'e8akbvsl'}, (error, result) => { 
    if (!error && result && result.event === "success") { 
      console.log('Done! Here is the image info: ', result.info);
      picture = result.info.url; 
    }
  }
);

const signupFormHandler = async (event) => {
  try {
    event.preventDefault();
    
    const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    const location = document.querySelector('#location-signup').value.trim();
    const first_name = document.querySelector('#first-name-signup').value.trim();
    const last_name = document.querySelector('#last-name-signup').value.trim();
    const bio = document.querySelector('#bio-signup').value.trim();
    const availability = document.querySelector('#availability-signup').value.trim();

    const cuisines = document.querySelectorAll('input[type="checkbox"]');

  
    // TODO: Need to change based on cuisine check box instead of select menu

    
    
    if  (
      (username && email && password) && 
      (location && first_name && last_name)) {
        
      const response1 = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ username, first_name, last_name, email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
      
      if (picture === '') {
        picture = '/images/blank-profile-pic.png';
      }

      const response2 = await fetch('/api/profiles', {
        method: 'POST',
        body: JSON.stringify({ location, availability, picture, bio }),
        headers: { 'Content-Type': 'application/json' },
      }); 
      
      // const response3 = await fetch('/api/cuisines', {
        //   method: 'POST',
        //   body: JSON.stringify({ cuisine }),
        //   headers: { 'Content-Type': 'application/json' },
        // });
        
        cuisines.forEach( async (checkbox) => {
          if(checkbox.checked) {
            const cuisine_id = checkbox.getAttribute('data-cuisine-id');
            await fetch('/api/cuisines', {
              method: 'POST',
              body: JSON.stringify({cuisine_id}),
              headers: { 'Content-Type': 'application/json' },
            });
          }
        });
        
        if (response1.ok && response2.ok) {
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
  
  document.getElementById("upload_widget").addEventListener("click", function(){
      myWidget.open();
    }, false);

  document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);
  


// NOTES
  // CUISINE VALUE IS SINGLE AND NOT AN ARRAY
  // cuisineController POST route is bulkCreate
    // TODO: Need to fix controller POST route