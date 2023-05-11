const profileRedirect = (e) => {
    e.preventDefault();
    console.log("TEST");

    let target = e.target;

    if (target.matches('.search')) {
    //     console.log("TESTING CLICK");
        const id = target.getAttribute('data-profile-id');
    //     console.log(id);
        document.location.replace(`/profiles/${id}`);
    }
};

document
    .querySelector('.profile-container')
    .addEventListener('click', profileRedirect);