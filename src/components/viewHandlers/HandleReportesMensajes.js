/** RESPORTES DE ESTUDIANTES */
export function reportesEstudiantes(reportConfig, i, tableData) {
  if (tableData.value.length == 0) {
    reportConfig[i].messages.push("No hay estudiantes registrados.");
  } else {
    const carrerasCount = {
      Computacion: 0,
      Biologia: 0,
      Matematicas: 0,
      Fisica: 0,
      Quimica: 0,
    };
    tableData.value.forEach((item) => {
      item.carreras.forEach((carrera) => {
        carrerasCount[carrera]++;
      });
    });
    for (const [key, value] of Object.entries(carrerasCount)) {
      if (value > 0) {
        reportConfig[i].messages.push(
          `${key}: hay ${value} estudiantes, que representan el ${(
            (value / tableData.value.length) *
            100
          ).toFixed(2)}% de la poblacion.`
        );
      } else {
        reportConfig[i].messages.push(`${key}: No hay estudiantes.`);
      }
    }
  }
}

/** REPORTES DE ASIGNATURAS*/
export function reportesAsignaturas(reportConfig, i, tableData) {
  if (tableData.value.length == 0) {
    reportConfig[i].messages.push("No hay asignaturas registradas.");
  } else {
    const creditosCount = {
      Computacion: 0,
      Biologia: 0,
      Matematicas: 0,
      Fisica: 0,
      Quimica: 0,
    };
    tableData.value.forEach((item) => {
      item.carrera.forEach((carrera) => {
        creditosCount[carrera] += Number(item.creditos);
      });
    });
    for (const [key, value] of Object.entries(creditosCount)) {
      if (value > 0) {
        reportConfig[i].messages.push(
          `${key}: cuenta con ${value} creditos en total.`
        );
      } else {
        reportConfig[i].messages.push(`${key}: No tiene asignaturas.`);
      }
    }
  }
}

/** REPORTES DE MATRICULACION */
export function reportesMatriculacion(reportConfig, i, tableData) {
  if (tableData.value.length == 0) {
    reportConfig[i].messages.push("No hay asignaturas registradas.");
  } else {
    const asignaturasRegistradas = {};

    tableData.value.forEach((item) => {
      item.asignaturas.forEach((asignatura) => {
        if (asignaturasRegistradas.hasOwnProperty(asignatura)) {
          asignaturasRegistradas[asignatura]++;
        } else {
          asignaturasRegistradas[asignatura] = 1;
        }
      });
    });
    for (const [key, value] of Object.entries(asignaturasRegistradas)) {
      reportConfig[i].messages.push(
        `${key}: cuenta con ${value} estudiantes matriculados para este semestre.`
      );
    }
  }
}

/** REPORTES DE CALIFICACIONES */
export function reportesCalificaciones(reportConfig, i, tableData) {
  if (tableData.value.length == 0) {
    reportConfig[i].messages.push("No hay calificaciones registradas.");
  } else {
    const calificacionesCount = {};
    const calificacionesSum = {};
    tableData.value.forEach((item) => {
      if (calificacionesCount.hasOwnProperty(item.asignatura)) {
        calificacionesCount[item.asignatura]++;
        calificacionesSum[item.asignatura] += Number(item.calificacion);
      } else {
        calificacionesCount[item.asignatura] = 1;
        calificacionesSum[item.asignatura] = Number(item.calificacion);
      }
    });

    for (const [key, value] of Object.entries(calificacionesCount)) {
      reportConfig[i].messages.push(
        `${key}: tiene un promedio de calificaciones de ${
          calificacionesSum[key] / value
        }.`
      );
    }
  }
}
