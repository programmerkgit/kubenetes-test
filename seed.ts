import { User } from './db/models';


const email = 'k.kubo.private.mobile@gmail.com';
const password = 'paz1woxq';

async function deleteUser() {
    await User.destroy({where: {email}});
}

deleteUser().then(result => {
    User.create({email, password, role: 0}).then(result => {
        console.log(result);
    }).catch(error => {
        console.log(error);
    });
});

