import {config, AppDataSource} from "@repo/config";
import express from 'express'



const app = express();


app.listen(config.PORT_BACKEND, () => {
    console.log('Server is running at port: ', config.PORT_BACKEND);
})