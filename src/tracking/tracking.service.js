const db = require('_helpers/db');
module.exports = {
    create,
    
};

async function create(id, params) {
    params.user_id = id;
    const habit = await db.Tracking.create(params); 
    return habit;
}





