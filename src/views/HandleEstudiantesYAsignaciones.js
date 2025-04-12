import { ref } from "vue";
import { getCollection, entities } from "@/Database/firestore.js";

/** DEF ASIGNATURA INICIAL Y ASIGNATURA DEL FORMULARIO */
const ASIGNATURAS = [];
export const asignaturas = ref([]);
/** LLENA ASIGNATURAS */
export async function refreshAsignaturas() {
  const asignaturasData = await getCollection(entities.asignaturas);
  // .then((data) => {
  // });
  asignaturasData
    .sort((a, b) => {
      return a.nombre.localeCompare(b.nombre);
    })
    .forEach((item) => {
      ASIGNATURAS.push({
        title: item.nombre,
        value: item.nombre,
        carreras: item.carrera,
        semestre: item.semestre,
      });
    });
  /** llena asignatura del formulario */
  asignaturas.value = ASIGNATURAS;
}
await refreshAsignaturas();

/** DEF ESTUDIANTES */
export const estudiantes = ref([]);

export async function refreshEstudiantes() {
  const estudiantesData = await getCollection(entities.estudiantes);
  estudiantes.value = estudiantesData.map((item) => {
    return {
      title: `${item.apellido} ${item.nombre} - ${item.cedula}`,
      value: item.cedula,
      carreras: item.carreras,
    };
  });
}
await refreshEstudiantes();

/** HOOKS PARA CONTROL DEL FORMULARIO */
export const estudianteIsDisabled = ref(false);
export const asignaturasIsDisabled = ref(true);

/** FILTRA ASIGNATURAS DEL FORMULARIO
 * CUANDO SE SELECCIONA EL ESTUDIANTE
 */
export const onUpdateEstudianteModel = (id) => {
  const estudiante = estudiantes.value.find((item) => item.value === id);

  estudiante.carreras.forEach((carrera) => {
    asignaturas.value = ASIGNATURAS.filter((item) => {
      return item.carreras.includes(carrera);
    });
  });
  asignaturasIsDisabled.value = false;
};

/** MANEJA EL COMPORTAMIENTO DEL FORMULARIO DESPUES DE TERMINAR UNA ACCION */
export const afterRequest = (method, item) => {
  if (["POST", "PUT", "CANCEL"].includes(method)) {
    asignaturasIsDisabled.value = true;
    estudianteIsDisabled.value = false;
  }
};

/** MANEJA EL COMPORTAMIENTO DEL FORMULARIO AL ENTRAR EN MODOD EDICION*/
export const onUpdateClick = (item) => {
  asignaturasIsDisabled.value = false;
  estudianteIsDisabled.value = true;
};
