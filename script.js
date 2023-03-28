const app = document.getElementById('app');
const url = 'https://randomuser.me/api/?nat=us&results=50';

async function getData() {
    try {
        const res = await fetch(url);
        const data = await res.json();
        const items = data.results;
        const users = items.map(user => {
            const { email, phone } = user;
            const { first, last } = user.name;
            const { street, city, state, country, postcode } = user.location;
            const { large } = user.picture;
            const { number, name } = street;
            return { email, phone, first, last, city, state, country, postcode, large, number, name };
        })
        return users;
    } catch {
        app.innerHTML = `<h2>Ooops! Trouble loading data</h2>`
    }
}

async function createUsers() {
    const data = await getData();
    const users = data.map(user => {
        const { email, phone, first, last, street, city, state, country, postcode, large, number, name } = user;
        return { email, phone, first, last, street, city, state, country, postcode, large, number, name };
    }).sort((a, b) => {
        if (a.first < b.first) {
            return -1
        }
        if (a.first > b.first) {
            return 1
        }
        return 0;
    }).map(item => {
        return `
        <li class="user">
            <img src="${item.large}" alt="${item.first} ${item.last}">
            <div class="user-details">
                <h3>${item.first} ${item.last}</h3>
                <p>${item.phone}</p>
                <p>${item.email}</p>
                <p>${item.number} ${item.name} ${item.city}, ${item.state} ${item.postcode}</p>
            </div>
        </li>
        `
    }).join('');

    app.innerHTML = `
    <section>
        <ul class="users">${users}</ul>
    </section>
    `
}

createUsers()