document
    .querySelector('.fav-cuisine')
    .addEventListener('click', redirectPage = () => {
        const id = document.querySelector('.fav-cuisine').getAttribute('data-cuisine-id');
        document.location.replace(`/search/cuisine/${id}`);
    });