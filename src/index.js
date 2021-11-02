import config from './config';
import server from './services/server'
import { connectDb } from './services/db';
import os from 'os'
import cluster from 'cluster';


let cpus=os.cpus().length;



const puerto=config.PORT;

      if (config.MODO=='CLUSTER' && cluster.isMaster) {
        console.log(`NUMERO DE CPUS ===> ${cpus}`);
        console.log(`PID MASTER ${process.pid}`);
      
        for (let i = 0; i < cpus; i++) {
          cluster.fork();
        }

      } else{
        const PORT = 8080;
        server.listen(PORT, () =>
          console.log(
            `Servidor express escuchando en el puerto ${PORT} - PID WORKER ${process.pid}`
          )
        );
    }
  



