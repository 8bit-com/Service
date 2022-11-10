async function deleteUser(modal, id) {
    let oneUser = await userFetch.findOneUser(id);
    let user = oneUser.json();

    modal.find('.modal-title').html('Delete user');

    let deleteButton = `<button  class="btn btn-danger" id="deleteButton">Delete</button>`;
    let closeButton = `<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>`
    modal.find('.modal-footer').append(deleteButton);
    modal.find('.modal-footer').append(closeButton);

    user.then(user => {
        let bodyForm = `
            <form class="form-group text-center" id="deleteUser">
               <div class="form-group">
                    <label for="userId" class="col-form-label">ID</label>
                    <input type="text" class="form-control username" id="userId" value="${user.userId}" readonly>
               </div>
                   
               <div class="form-group">
                    <label for="username" class="col-form-label">Username</label>
                    <input type="text" class="form-control username" id="username" value="${user.username}" readonly>
               </div>

                <div class="form-group">
                    <label for="name" class="com-form-label">Name</label>
                    <input type="text" class="form-control" id="name" value="${user.name}" readonly>
                </div>

                <div class="form-group">
                    <label for="surname" class="com-form-label">Surname</label>
                    <input type="text" class="form-control" id="surname" value="${user.surname}" readonly>
                </div>

                <div class="form-group">
                    <label for="age" class="com-form-label">Age</label>
                    <input type="number" class="form-control" id="age" value="${user.age}" readonly>
                    <div class="invalid-feedback">
                        Age cannot be empty
                    </div>
                </div>

                <div class="form-group">
                    <label for="email" class="com-form-label">Email</label>
                    <input type="text" class="form-control" id="email" value="${user.email}"  readonly>
                </div>
                
                 <div class="form-group">
                    <label for="roles" class="com-form-label">Role:</label>
                        <select id="roles" class="form-control select" size="2" name="roles" style="max-height: 100px" disabled>
                        <option>${user.roles.map(role => " " + role.role.substr(5))}</option>
                            })}</option>
                        </select>
                 </div>

            </form>
        `;
        modal.find('.modal-body').append(bodyForm);
    })

    $("#deleteButton").on('click', async () => {
        const response = await userFetch.deleteUser(id);

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

async function deleteOrder(modal, id) {
    console.log("deleteButton2 click");
    let oneOrder = await orderFetch.findOneOrder(id);
    let order = oneOrder.json();

    modal.find('.modal-title').html('Delete order');

    let deleteButton2 = `<button  class="btn btn-danger" id="deleteButton2">Delete</button>`;
    let closeButton2 = `<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>`
    modal.find('.modal-footer').append(deleteButton2);
    modal.find('.modal-footer').append(closeButton2);

    order.then(order => {
        let bodyForm = `
            <form class="form-group text-center" id="deleteOrder">
               <div class="form-group">
                    <label for="id" class="col-form-label">ID</label>
                    <input type="text" class="form-control id" id="id" value="${order.id}" readonly>
               </div>
                   
               <div class="form-group">
                    <label for="lastName" class="col-form-label">lastName</label>
                    <input type="text" class="form-control" id="lastName" value="${order.lastName}" readonly>
               </div>

                <div class="form-group">
                    <label for="telephone" class="com-form-label">telephone</label>
                    <input type="number" class="form-control" id="telephone" value="${order.telephone}" readonly>
                </div>

                <div class="form-group">
                    <label for="device" class="com-form-label">device</label>
                    <input type="text" class="form-control" id="device" value="${order.device}" readonly>
                </div>

                <div class="form-group">
                    <label for="comments" class="com-form-label">comments</label>
                    <input type="text" class="form-control" id="comments" value="${order.comments}" readonly>
                </div>

                <div class="form-group">
                    <label for="master" class="com-form-label">master</label>
                    <input type="text" class="form-control" id="master" value="${order.master}"  readonly>
                </div>
                
                <div class="form-group">
                    <label for="sum" class="com-form-label">sum</label>
                    <input type="number" class="form-control" id="sum" value="${order.sum}" readonly>
                </div>
                
                <div class="form-group">
                    <label for="orderStatus" class="com-form-label">OrderStatus:</label>
                        <select id="orderStatus" class="form-control select" size="2" name="orderStatus" style="max-height: 100px" disabled>
                        <option>${order.orderStatus.map(orderStatus => " " + orderStatus.orderStatus.substr(5))}</option>
                            })}</option>
                        </select>
                </div>

            </form>
        `;
        modal.find('.modal-body').append(bodyForm);
    })

    $("#deleteButton2").on('click', async () => {
        const response = await orderFetch.deleteOrder(id);
        console.log("deleteButton2 click");
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