var Airtable = require('airtable');
var genderize = require('genderize');
var base = new Airtable({
    apiKey: 'keyqNRJIfyYYszvny'
}).base('appEWU66IO4KVQlfZ');

function updatePerson(record, gender) {
    base('Table 1').update(record.id, {
        "gender": gender
    }, function(err, record) {
        if (err) {
            console.error(err);
            return;
        }
        console.log(record.get('Name'));
    });
}

base('Table 1').select({
    view: 'Grid view'
}).firstPage(function(err, records) {
    if (err) {
        console.error(err);
        return;
    }
    records.forEach(function(record) {
        var name = record.get('first_name');
        var test = name.includes("@");
        if (!test) {
            //console.log('Retrieved', name);
            genderize(name, function(err, obj) {
                updatePerson(record, obj.gender);
                console.log(obj.gender);
            })
        }
    });
});
