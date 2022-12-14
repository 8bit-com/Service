async function createUser() {
    let temp5 = '';
    const table5 = document.querySelector('#rolesCreate');

    roleList.forEach(role => {
        temp5 += `
            <option value=${role.role}>${role.role}</option>
        `;
    })
    table5.innerHTML = temp5;


    $('#addUser').click(async () =>  {
        let addUserForm = $('#addForm')
        let username = addUserForm.find('#usernameCreate').val().trim();
        let password = addUserForm.find('#passwordCreate').val().trim();
        let name = addUserForm.find('#nameCreate').val().trim();
        let surname = addUserForm.find('#surnameCreate').val().trim();
        let age = addUserForm.find('#ageCreate').val().trim();
        let email = addUserForm.find('#emailCreate').val().trim();
        let checkedRoles = () => {
            let array = []
            let options = document.querySelector('#rolesCreate').options
            for (let i = 0; i < options.length; i++) {
                if (options[i].selected) {
                    array.push(roleList[i])
                }
            }
            return array;
        }
        let data = {
            username: username,
            password: password,
            name: name,
            surname: surname,
            age: age,
            email: email,
            roles: checkedRoles()
        }

        const response = await userFetch.addNewUser(data);
        if (response.ok) {
            await getUsers();
            addUserForm.find('#usernameCreate').val('');
            addUserForm.find('#passwordCreate').val('');
            addUserForm.find('#nameCreate').val('');
            addUserForm.find('#surnameCreate').val('');
            addUserForm.find('#ageCreate').val('');
            addUserForm.find('#emailCreate').val('');
            addUserForm.find(checkedRoles()).val('');
            let alert = `<div class="alert alert-success alert-dismissible fade show col-12" role="alert" id="successMessage">
                         User create successful!
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>`;
            addUserForm.prepend(alert);
            $('.nav-tabs a[href="#adminTable"]').tab('show');
        } else {
            let body = await response.json();
            let alert = `<div class="alert alert-danger alert-dismissible fade show col-12" role="alert" id="messageError">
                            ${body.info}
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>`;
            addUserForm.prepend(alert);
        }
    });
}

async function createOrder() {
    let temp3 = '';
    const table3 = document.querySelector('#statusCreate');

    orderStatusList.forEach(orStat => {
        temp3 += `
            <option value=${orStat.orderStatus}>${orStat.orderStatus}</option>
        `;
    })
    table3.innerHTML = temp3;


    let temp4 = '';
    const table4 = document.querySelector('#masterCreate');
    let masterList = [];
    await userFetch.findUserByRole()
        .then(res => res.json())
        .then(users => {
            masterList = users;
        })

    masterList.forEach(master => {
        temp4 += `
            <option value=${master.surname}>${master.surname}</option>
        `;
    })
    table4.innerHTML = temp4;


    $('#addOrder').click(async () =>  {
        let addOrderForm = $('#addForm2')
        let lastName = addOrderForm.find('#lastNameCreate').val().trim();
        let telephone = addOrderForm.find('#telephoneCreate').val().trim();
        let device = addOrderForm.find('#deviceCreate').val().trim();
        let comments = addOrderForm.find('#commentsCreate').val().trim();
        let master = "";
        let options2 = document.querySelector('#masterCreate').options
        for (let i = 0; i < options2.length; i++) {
            if (options2[i].selected) {
                master = masterList[i].surname;
            }
        }
        console.log(master);
        let sum = addOrderForm.find('#sumCreate').val().trim();
        let checkedOrderStatus = () => {
            let array = []
            let options = document.querySelector('#statusCreate').options
            for (let i = 0; i < options.length; i++) {
                if (options[i].selected) {
                    array.push(orderStatusList[i])
                }
            }
            return array;
        }

        let data = {
            lastName: lastName,
            telephone: telephone,
            device: device,
            comments: comments,
            master: master,
            sum: sum,
            orderStatus: checkedOrderStatus()

        }

        const response = await orderFetch.addNewOrder(data);
        if (response.ok) {
            await getOrders();
            addOrderForm.find('#lastNameCreate').val('');
            addOrderForm.find('#telephoneCreate').val('');
            addOrderForm.find('#deviceCreate').val('');
            addOrderForm.find('#commentsCreate').val('');
            addOrderForm.find('#masterCreate').val('');
            addOrderForm.find('#sumCreate').val('');
            addOrderForm.find(checkedOrderStatus()).val('');
            let alert = `<div class="alert alert-success alert-dismissible fade show col-12" role="alert" id="successMessage">
                         Order create successful!
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>`;
            addOrderForm.prepend(alert);
            $('.nav-tabs a[href="#tableAllOrders"]').tab('show');
        } else {
            let body = await response.json();
            let alert = `<div class="alert alert-danger alert-dismissible fade show col-12" role="alert" id="messageError">
                            ${body.info}
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>`;
            addOrderForm.prepend(alert);
        }
    });
}