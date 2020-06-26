import { Request,Response, Body} from "https://deno.land/x/oak/mod.ts";
//generar un id
import { v4 } from "https://deno.land/std/uuid/mod.ts";//generador de ids
//interface de usuarios
interface Employee{
    id: string;
    name: string;
    dni: string;
    salary: number;
};
let employees: Employee[] = [{
    id:"1",
    name: "Ryan Ray",// creador de de deno
    dni: "123",
    salary: 400000
},
{
    id:"2",
    name: "Anders Hejlsberg", //creador de typescrip
    dni: "1235",
    salary: 300000
},
{
    id:"3",
    name: "Brendan Eich",// creador de javascript
    dni: "1234",
    salary: 600000
}
];

//Employees
export const getEmployees = ({response}: {response: Response}) => {
    response.body = {
        message: "successful Query",
        employees,
    };
    response.status = 200;
};
//Employee Id
export const getEmployee = ({
    params, response
    }: { 
        params: {id: string},response: Response
    }) => {
    let employeeFound = employees.find(employee => employee.id == params.id)
    if(employeeFound){
        response.status = 200;
        response.body = {
            message: "!Heeeeee...! you found a Employee",
            employeeFound,
        };
    }else{
        response.status = 404;
        response.body = {
            message: "!Hoooooo not...! Employee not found",
            
        }
    }
}
//create Employee
export const postCreateEmployee = async ({
    request, response
    }: {
    request: Request;
    response: Response;
    }) => {
    let body: Body = await request.body();

    if(!request.hasBody){
        response.status = 404;
        response.body = {
            message: "Bady is required"
        };
    }else{
        const newEmployee = body.value;
        newEmployee.id = v4.generate();
        employees.push(newEmployee)//agregeme este nuevo empleado
        response.status= 200;
        response.body = {
        message: "New push created",
        newEmployee,
    }
    }
    
}
//update employee
export const putUpdateEmployee = async ({
    request, response, params
    }:{ 
    params: {id: string };
    request: Request;
    response:Response;
}) => {
    let employeeFound = employees.find(employee => employee.id === params.id);

    if (!employeeFound){
        response.status = 404;
        response.body = {
            message: "Employee not found"
        };
    } else {
        const bodyEmployee = await request.body();//guardamos el dato que obtivimos del request bady
        //y lo guardamos en un objeto llamado  bodyEmployee 
        const updateEmployee = bodyEmployee.value;

        employees = employees.map((employee) => 
        employee.id === params.id ?
        { ...employee, ...updateEmployee}: employee
        );//recorrer los usuarios 
        //y cuando un usuario sea igual a el parametrp
        response.status = 200;
        response.body = {
            updateEmployee,
        };
    }
};
//delete user
export const deleteEmployee = ({params, response}: {params: {id: string}, response: Response
}) => {
    employees = employees.filter(employee => employee.id !== params.id)
    response.status = 200;
    response.body = {
    message: " ); delete Employee successfully",
    employees
};
};