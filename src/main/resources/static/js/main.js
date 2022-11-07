let roleList = [
    {id: 1, role: "ROLE_USER"},
    {id: 2, role: "ROLE_ADMIN"}
]
let isUser = true;

$(async function () {
    await getUser();
    await infoUser();
    await tittle();
    await getUsers();
    await getNewUserForm();
    await getDefaultModal();
    await createUser();
    await getOrders();
    await getNewOrderForm();
    await createOrder();

})

const userFetch = {
    head: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Referer': null
    },
    findAllUsers: async () => await fetch('api/users'),
    findUserByUsername: async () => await fetch(`api/user`),
    findOneUser: async (id) => await fetch(`api/users/${id}`),
    addNewUser: async (user) => await fetch('api/users', {method: 'POST', headers: userFetch.head, body: JSON.stringify(user)}),
    updateUser: async (user, id) => await fetch(`api/users/${id}`, {method: 'PUT', headers: userFetch.head, body: JSON.stringify(user)}),
    deleteUser: async (id) => await fetch(`api/users/${id}`, {method: 'DELETE', headers: userFetch.head})
}

const orderFetch = {
    head: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Referer': null
    },
    findAllOrders: async () => await fetch('api/orders'),
    findOneOrder: async (id) => await fetch(`api/orders/${id}`),
    addNewOrder: async (order) => await fetch('api/orders', {method: 'POST', headers: orderFetch.head, body: JSON.stringify(order)}),
    updateOrder: async (order, id) => await fetch(`api/orders/${id}`, {method: 'PUT', headers: orderFetch.head, body: JSON.stringify(order)}),
    deleteOrder: async (id) => await fetch(`api/orders/${id}`, {method: 'DELETE', headers: orderFetch.head})
}


async function infoUser() {
    let temp = '';
    const info = document.querySelector('#info');
    await userFetch.findUserByUsername()
        .then(res => res.json())
        .then(user => {
            temp += `
             <span style="color: white">
               ${user.username} with roles <span>${user.roles.map(e => " " + e.role.substr(5))}</span>
                </div>
            </span>
                </tr>
            `;
        });
    info.innerHTML = temp;
}