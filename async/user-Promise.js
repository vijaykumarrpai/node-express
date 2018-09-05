let findUsers = new Promise((resolve,reject) => {
    setTimeout(() => {
        let users = ['U1','U2','U3'];
        if(users.length > 0)
        {
            resolve(users);
        }else{
            reject('no users found');
        }
    },1000);
});

findUsers.then((users) => {
    console.log(users);
}).catch((err) => {
    console.log(err);
})
