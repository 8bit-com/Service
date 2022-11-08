async function editUser(modal, id) {
    let oneUser = await userFetch.findOneUser(id);
    let user = oneUser.json();

    modal.find('.modal-title').html('Edit user');

    let editButton = `<button  class="btn btn-info" id="editButton">Edit</button>`;
    let closeButton = `<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>`
    modal.find('.modal-footer').append(editButton);
    modal.find('.modal-footer').append(closeButton);

    user.then(user => {
        let bodyForm = `
            <form class="form-group text-center" id="editUser">
               <div class="form-group">
                    <label for="userId" class="col-form-label">ID</label>
                    <input type="text" class="form-control username" id="userId" value="${user.userId}" readonly>
               </div>
                   
               <div class="form-group">
                    <label for="username" class="col-form-label">Username</label>
                    <input type="text" class="form-control username" id="username" value="${user.username}">
               </div>

                <div class="form-group">
                    <label for="password" class="com-form-label">Password</label>
                    <input type="password" class="form-control" id="password" value="${user.password}">
                </div>

                <div class="form-group">
                    <label for="name" class="com-form-label">Name</label>
                    <input type="text" class="form-control" id="name" value="${user.name}">
                </div>

                <div class="form-group">
                    <label for="surname" class="com-form-label">Surname</label>
                    <input type="text" class="form-control" id="surname" value="${user.surname}">
                </div>

                <div class="form-group">
                    <label for="age" class="com-form-label">Age</label>
                    <input type="number" class="form-control" id="age" value="${user.age}">
                </div>

                <div class="form-group">
                    <label for="email" class="com-form-label">Email</label>
                    <input type="text" class="form-control" id="email" value="${user.email}">
                </div>
                
                <div class="form-group">
                    <label for="roles" class="com-form-label">Role</label>
                    <select multiple id="roles" size="2" class="form-control" style="max-height: 100px">
                    <option value="ROLE_USER">USER</option>
                    <option value="ROLE_ADMIN">ADMIN</option>
                    </select>
                </div>
            </form>
        `;
        modal.find('.modal-body').append(bodyForm);
    })

    $("#editButton").on('click', async () => {
        let checkedRoles = () => {
            let array = []
            let options = document.querySelector('#roles').options
            for (let i = 0; i < options.length; i++) {
                if (options[i].selected) {
                    array.push(roleList[i])
                }
            }
            return array;
        }
        let userId = modal.find("#userId").val().trim();
        let username = modal.find("#username").val().trim();
        let password = modal.find("#password").val().trim();
        let name = modal.find("#name").val().trim();
        let surname = modal.find("#surname").val().trim();
        let age = modal.find("#age").val().trim();
        let email = modal.find("#email").val().trim();
        let data = {
            userId: userId,
            username: username,
            password: password,
            name: name,
            surname: surname,
            age: age,
            email: email,
            roles: checkedRoles()

        }
        const response = await userFetch.updateUser(data, id);

        if (response.ok) {
            await getUsers();
            modal.modal('hide');
        } else {
            let body = await response.json();
            let alert = `<div class="alert alert-danger alert-dismissible fade show col-12" role="alert" id="messageError">
                            ${body.info}
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>`;
            modal.find('.modal-body').prepend(alert);
        }
    })
}


async function editOrder(modal, id) {
    let oneOrder = await orderFetch.findOneOrder(id);
    let order = oneOrder.json();

    modal.find('.modal-title').html('Edit order');

    let editButton = `<button  class="btn btn-info" id="editButton">Edit</button>`;
    let closeButton = `<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>`
    modal.find('.modal-footer').append(editButton);
    modal.find('.modal-footer').append(closeButton);

    order.then(order => {
        let bodyForm = `
            <form class="form-group text-center" id="editOrder">
               <div class="form-group">
                    <label for="id" class="col-form-label">ID</label>
                    <input type="text" class="form-control" id="id" value="${order.id}" readonly>
               </div>
               
               <div class="form-group">
                    <label for="dateCreate" class="col-form-label">dateCreate</label>
                    <input type="text" class="form-control" id="dateCreate" value="${order.dateCreate}" readonly>
               </div>
                   
               <div class="form-group">
                    <label for="lastName" class="col-form-label">LastName</label>
                    <input type="text" class="form-control" id="lastName" value="${order.lastName}">
               </div>

                <div class="form-group">
                    <label for="telephone" class="com-form-label">telephone</label>
                    <input type="number" class="form-control" id="telephone" value="${order.telephone}">
                </div>

                <div class="form-group">
                    <label for="device" class="com-form-label">device</label>
                    <input type="text" class="form-control" id="device" value="${order.device}">
                </div>

                <div class="form-group">
                    <label for="comments" class="com-form-label">comments</label>
                    <input type="text" class="form-control" id="comments" value="${order.comments}">
                </div>

                <div class="form-group">
                    <label for="master" class="com-form-label">master</label>
                    <input type="text" class="form-control" id="master" value="${order.master}">
                </div>

                <div class="form-group">
                    <label for="sum" class="com-form-label">sum</label>
                    <input type="number" class="form-control" id="sum" value="${order.sum}">
                </div>
                
                <div class="form-group">
                    <label for="orderStatus" class="com-form-label">orderStatus</label>
                    <input type="text" class="form-control" id="orderStatus" value="${order.orderStatus}">
                </div>
                
            </form>
        `;
        modal.find('.modal-body').append(bodyForm);
    })

    $("#editButton").on('click', async () => {

        let id = modal.find("#id").val().trim();
        let lastName = modal.find("#lastName").val().trim();
        let dateCreate = modal.find("#dateCreate").val().trim();
        let telephone = modal.find("#telephone").val().trim();
        let device = modal.find("#device").val().trim();
        let comments = modal.find("#comments").val().trim();
        let master = modal.find("#master").val().trim();
        let sum = modal.find("#sum").val().trim();
        let orderStatus = modal.find("#orderStatus").val().trim();

        let data = {
            id: id,
            dateCreate: dateCreate,
            lastName: lastName,
            telephone: telephone,
            device: device,
            comments: comments,
            master: master,
            sum: sum,
            orderStatus: orderStatus

        }
        const response = await orderFetch.updateOrder(data, id);

        if (response.ok) {
            await getOrders();
            modal.modal('hide');
        } else {
            let body = await response.json();
            let alert = `<div class="alert alert-danger alert-dismissible fade show col-12" role="alert" id="messageError">
                            ${body.info}
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>`;
            modal.find('.modal-body').prepend(alert);
        }
    })
}