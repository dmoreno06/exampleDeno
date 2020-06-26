//enrutador
import { Router } from 'https://deno.land/x/oak/mod.ts'; 
import * as indexCtrollers from '../controllers/index.controllers.ts';

const router = new Router();

router.get('/', ({response}) => {
    response.body = "Hello Globant"//cuando te mande esta ruta respondeme 
});

router.get('/employees',indexCtrollers.getEmployees);
router.get('/employee/:id',indexCtrollers.getEmployee);
router.post('/employee',indexCtrollers.postCreateEmployee);
router.put('/employee/:id',indexCtrollers.putUpdateEmployee);
router.delete('/employee/:id',indexCtrollers.deleteEmployee);
//exportarlo 
export default router;