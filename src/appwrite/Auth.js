import conf from '../conf/conf'
import { Client ,Databases,Account} from 'appwrite';


const client = new Client();

client
    .setEndpoint(conf.appwriteUrl)
    .setProject(conf.appwriteProjectId);

const databases = new Databases(client);
const account = new Account(client);


export{client,databases,account};