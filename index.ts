//importar el modulo aplicaion
import { Application} from "https://deno.land/x/oak/mod.ts";//desde el framewor de oak voy a importar algunas cosas 
// bamos a crar una nueva aplicacion
import router from './routes/index.routes.ts';//modulo de enrutador

const app = new Application();// creamos una nueva aplicacion  y creamos una instancia de la aplicacion

// y esto me va a devolver un objeto llamado app
//miderwer
app.use(router.routes());// 
app.use(router.allowedMethods());//peritir todos los metodos /perimitida por deno
console.log('Server runnin on port', 3000);
app.listen({port: 3000}); // await solo es por que voy a estar ecuchado 
//voy a esc