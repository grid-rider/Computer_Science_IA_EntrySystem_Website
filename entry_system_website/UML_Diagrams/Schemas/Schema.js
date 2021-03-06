
function userDocumentModel(email, FirstName, LastName, School, Role, url) {

    return({

        email: string,
        entry_status: boolean,
        first_name: string,
        last_name: string,
        school: string,
        role: string,
        img_url: string,
        last_entry: Timestamp,
        last_exit: Timestamp,
        
    })
}

function userEntryRecordSchema(type, station){

    return({

        user_id: string,
        first_name: string,
        last_name: string,
        timestamp: Timestamp,
        acess_type: string,
        school: string,
        station: string, 

    })
}

function stationDocumentModel(name,school){

    return({

        name: string, 
        school: string,
        file_url: string,

    })

}