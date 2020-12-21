# docker-api-student

## Importancia de la contenerización de aplicaciones

La contenerización es muy importante puesto que surge la completa despreocupación de que si una aplicación que se está construyendo en una máquina con cierto sistema operativo, 
será también posible desplegarla o bien continuarla trabajando en otra máquina. Aquí lo único que se requerirá es que la máquina donde se vuelva a trabajar dicho aplicativo
tenga instalado el sistema de contenerización (como por ejemplo Docker).

## Consumo de la API
### Pasos iniciales
Para consumir esta API es importante realizar los siguientes pasos de forma previa:
1. Clonar este repositorio (puesto que no se encuentra desplegada en la web).
2. Abriendo la terminal en la raíz de este proyecto ejecutar el comando docker-compose build
3. Luego ejecutar el comando docker-compose up

### Estructura de datos
Esta api en la base de datos, trabaja con objetos llamados student, cuyos valores que contiene son los siguientes:

_id: {type: String}

student_name: {type: String}

type_student_document: {type: String}

number_student_document: {type: Number}

course: {type: String}

score: {type: Number}

### Peticiones posibles

http://localhost:4000/student -> Para petición http de tipo GET para obtener una colección que contiene la información de todos los estudiantes.

http://localhost:4000/student/add -> Para petición http de tipo POST que recibe en el body la información del estudiante.

http://localhost:4000/student/edit/:id -> Pata petición http de tipo GET que recibe como parámetro la id de un estudiante y retorna la información de este.

http://localhost:4000/student/update:id -> Para petición http de tipo POST que recibe como parámetro la id de un estudiante y en el cuerpo la información de este, con el fin de poder actualizar su información.
                                           
http://localhost:4000/student/delete:id -> Para petición http de tipo DELETE que recibe como parámetro la id de un estudiante para proceder a eliminar en la base de datos.

http://localhost:4000/student/average/:course -> Para petición http de tipo GET que recibe como parámetro el nombre de un curso y retorna el promedio de las notas de los estudiantes que lo han cursado.

http://localhost:4000/student/approx/:course -> Para petición http de tipo GET que recibe como parámetro el nombre de un curso. Esto, para actualizar las notas de los estudiantes queo obtuvieron un 2.95 para dejárselas en 3.
