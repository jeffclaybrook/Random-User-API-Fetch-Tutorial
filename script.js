const STATE_DATA = [
    {
        name: 'Alabama',
        abbr: 'AL'
    },
    {
        name: 'Alaska',
        abbr: 'AK'
    },
    {
        name: 'Arizona',
        abbr: 'AZ'
    },
    {
        name: 'Arkansas',
        abbr: 'AR'
    },
    {
        name: 'California',
        abbr: 'CA'
    },
    {
        name: 'Colorado',
        abbr: 'CO'
    },
    {
        name: 'Connecticut',
        abbr: 'CT'
    },
    {
        name: 'Delaware',
        abbr: 'DE'
    },
    {
        name: 'Florida',
        abbr: 'FL'
    },
    {
        name: 'Georgia',
        abbr: 'GA'
    },
    {
        name: 'Hawaii',
        abbr: 'HI'
    },
    {
        name: 'Idaho',
        abbr: 'ID'
    },
    {
        name: 'Illinois',
        abbr: 'IL'
    },
    {
        name: 'Indiana',
        abbr: 'IN'
    },
    {
        name: 'Iowa',
        abbr: 'IA'
    },
    {
        name: 'Kansas',
        abbr: 'KS'
    },
    {
        name: 'Kentucky',
        abbr: 'KY'
    },
    {
        name: 'Louisiana',
        abbr: 'LA'
    },
    {
        name: 'Maine',
        abbr: 'ME'
    },
    {
        name: 'Maryland',
        abbr: 'MD'
    },
    {
        name: 'Massachusetts',
        abbr: 'MA'
    },
    {
        name: 'Michigan',
        abbr: 'MI'
    },
    {
        name: 'Minnesota',
        abbr: 'MN'
    },
    {
        name: 'Mississippi',
        abbr: 'MS'
    },
    {
        name: 'Missouri',
        abbr: 'MO'
    },
    {
        name: 'Montana',
        abbr: 'MT'
    },
    {
        name: 'Nebraska',
        abbr: 'NE'
    },
    {
        name: 'Nevada',
        abbr: 'NV'
    },
    {
        name: 'New Hampshire',
        abbr: 'NH'
    },
    {
        name: 'New Jersey',
        abbr: 'NJ'
    },
    {
        name: 'New Mexico',
        abbr: 'NM'
    },
    {
        name: 'New York',
        abbr: 'NY'
    },
    {
        name: 'North Carolina',
        abbr: 'NC'
    },
    {
        name: 'North Dakota',
        abbr: 'ND'
    },
    {
        name: 'Ohio',
        abbr: 'OH'
    },
    {
        name: 'Oklahoma',
        abbr: 'OK'
    },
    {
        name: 'Oregon',
        abbr: 'OR'
    },
    {
        name: 'Pennsylvania',
        abbr: 'PA'
    },
    {
        name: 'Rhode Island',
        abbr: 'RI'
    },
    {
        name: 'South Carolina',
        abbr: 'SC'
    },
    {
        name: 'South Dakota',
        abbr: 'SD'
    },
    {
        name: 'Tennessee',
        abbr: 'TN'
    },
    {
        name: 'Texas',
        abbr: 'TX'
    },
    {
        name: 'Utah',
        abbr: 'UT'
    },
    {
        name: 'Vermont',
        abbr: 'VT'
    },
    {
        name: 'Virginia',
        abbr: 'VA'
    },
    {
        name: 'Washington',
        abbr: 'WA'
    },
    {
        name: 'West Virginia',
        abbr: 'WV'
    },
    {
        name: 'Wisconsin',
        abbr: 'WI'
    },
    {
        name: 'Wyoming',
        abbr: 'WY'
    }
]
const app = document.getElementById('app');
const url = 'https://randomuser.me/api/?nat=us&results=50';

async function getData() {
    const res = await fetch(url);
    const data = await res.json();
    const users = data.results.map(user => {
        const { email, phone, name: { first, last }, location, dob, picture } = user;
        const { street, city, state, country, postcode } = location;
        const { number, name } = street;
        const { age } = dob;
        const { large } = picture;
        return { email, phone, first, last, number, name, city, state, country, postcode, age, large };
    })
    return users;
}

function getState(users) {
    let location;
    const states = users.map(item => {
        const { state } = item;
        const matches = STATE_DATA.filter(el => el.name === state);
        matches.forEach(match => {
            const { abbr } = match;
            location = abbr;
            return location;
        })
        return location;
    })
    return states;
}

function sortUsers(users) {
    const list = users.map(user => {
        return user;
    }).sort((a, b) => {
        if (a.first < b.first) {
            return -1;
        }
        if (a.first > b.first) {
            return 1;
        }
        return 0;
    })
    return list;
}

function createUser(users) {
    const states = getState(users);
    const sorted = sortUsers(users);
    const list = sorted.map((user, i) => {
        const state = states[i];
        const { email, phone, first, last, number, name, city, country, postcode, age, large } = user;
        return `
        <li class="user">
            <img src="${large}" alt="${first} ${last}" loading="lazy">
            <div class="user-details">
                <h3>${first} ${last} (${age})</h3>
                <p>${phone}</p>
                <p>${email}</p>
                <p>${number} ${name}</p>
                <p>${city} ${state}, ${postcode}, ${country}</p>
            </div>
        </li>
        `
    }).join('');
    return list;
}

function createList(users) {
    const list = createUser(users);
    app.innerHTML = `
    <section>
        <ul class="users">${list}</ul>
    </section>
    `
}

async function init() {
    const users = await getData();
    createList(users);
}

init()