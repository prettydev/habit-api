
const db = require('_helpers/db');
const WEEK = ["MON", "TUE", "WED", "THU", "FRI", "SAT"];
module.exports = {
    create,
    getAll,
    delete: _delete
};

async function create(id, params) {
    params.user_id = id;
    console.log(params);    
    const daily = JSON.parse(params.daily);
    let code = ''
    WEEK.map(week => {
        const index = daily.indexOf(week);
        if(index > -1) {
            code += '1';
        } else {
            code += '0';
        }
    })
    params.daily = code;
    
    const habit = await db.UserHabit.create(params); 
}

async function getAll(id) {
    const habits = await db.UserHabit.findAll({ where : { user_id: id }});
    return habits;
}


async function _delete(id) {
    const userHabit = await getUserHabit(id);
    await userHabit.destroy();
}

//helper
async function getUserHabit(id) {
    const userHabit = await db.UserHabit.findByPk(id);
    if (!userHabit) throw 'UserHabit not found';
    return userHabit;
}