import { databases } from "./Auth";
import { ID } from "appwrite";
import conf from "../conf/conf";


const db = {};

const collection = [
    {
        dbId:conf.appwriteDatabaseId,
        id:conf.appwriteCollectionId,
        name:'employe',

    },
    {
        dbId:conf.appwriteDatabaseId,
        id:conf.appwriteCollectionIdItem,
        name:'item',
    },
]

collection.forEach((col)=>{
    db[col.name]={
        create:(payload,permission,id=ID.unique())=>
            databases.createDocument(
                col.dbId,
                col.id,
                id,
                payload,
                permission
            ),
        update:(id,payload,permission)=>
            databases.updateDocument(
                col.dbId,
                col.id,
                id,
                payload,
                permission,
            ),
        delete:(id)=>databases.deleteDocument(col.dbId,col.id,id),
        list:(quries=[])=>
            databases.listDocuments(col.dbId,col.id,quries),
        get:(id)=>databases.getDocument(col.dbId,col.id,id),

    }
})


export default db;