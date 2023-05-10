const editProfileHandler = async (event) => {
    event.preventDefault();

    // update User table

    const username = document.querySelector('#username-edit').value.trim();
    const first_name = document.querySelector('#first-name-edit').value.trim();
    const last_name = document.querySelector('#last-name-edit').value.trim();
    const password = document.querySelector('#password-edit').value.trim();
    const email = document.querySelector('#email-edit').value.trim();

    const userResponse = await fetch('/api/users/login', {
        method: 'PUT',
        body: JSON.stringify({username, first_name, last_name, password, email}),
        headers: { 'Content-Type': 'application/json' },
    });

    if(!userResponse.ok) {
        alert(userResponse.statusText);
    }

    // update Profile table

    const location = document.querySelector('#location-edit').value.trim();
    // TODO: add picture to edit page
    //const picture = document.querySelector('picture-edit').value.trim();
    const availability = document.querySelector('#availability-edit').value.trim();
    const bio = document.querySelector('#bio-edit').value.trim();
    const user_id = document.querySelector('#edit-profile').getAttribute('data-user-id');

    const profileResponse = await fetch('/api/profiles', {
        method: 'PUT',
        body: JSON.stringify({location, availability, bio, user_id}),
        headers: { 'Content-Type': 'application/json' },
    });

    if(!profileResponse.ok) {
        alert(profileResponse.statusText);
    }

    // update UserCuisine table
    const cuisines = document.querySelectorAll('input[type="checkbox"]');

    cuisines.forEach( async (checkbox) => {
        const cuisine_id = checkbox.getAttribute('data-cuisine-id');
        if(checkbox.checked) {
          await fetch('/api/cuisines', {
            method: 'POST',
            body: JSON.stringify({cuisine_id}),
            headers: { 'Content-Type': 'application/json' },
          });
        } else {
            //const cuisineId = document.querySelector('.form-check-input').getAttribute('data-cuisine-id');
            //console.log("Cuisine Name: " + cuisineName);
            await fetch('/api/cuisines', {
                method: 'DELETE',
                body: JSON.stringify({cuisine_id: cuisine_id}),
                headers: { 'Content-Type': 'application/json' },
            });
        }
    });
}


document
    .querySelector('#edit-profile')
    .addEventListener('submit', editProfileHandler);