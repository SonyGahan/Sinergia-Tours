// Espera a que el DOM se cargue completamente
document.addEventListener('DOMContentLoaded', () => {
    // Selecciona el formulario en el DOM
    const form = document.getElementById('form');

    // Agrega un evento de escucha para cuando se envía el formulario
    form.addEventListener('submit', (event) => {
        // Si la validación del formulario no es exitosa
        if (!validaFormulario()) {
            // Muestra un mensaje en la consola indicando que el formulario no es válido
            console.log('Los datos del formulario son incorrectos. Por favor, corrige los errores.');
            // Evita que el formulario se envíe
            event.preventDefault(); // Evita que el formulario se envíe si hay errores de validación
        } else {
            // Si la validación del formulario es exitosa, muestra un mensaje en la consola
            console.log('El formulario es válido. Enviar datos...');
        }
    });

    // Función para validar todo el formulario
    const validaFormulario = () => {
        let esValido = true;
        // Validar campo de email
        esValido = validaCampoEmail('email', 'El correo electrónico es inválido') && esValido;
        // Validar campo de contraseña
        esValido = validaCampo('password', 'La contraseña es obligatoria') && esValido;
        return esValido;
    };


    // Función para validar el campo de correo electrónico
    const validaCampoEmail = (campoId, mensajeError) => {
        // Obtiene el elemento del campo de correo electrónico mediante su ID
        const campo = document.getElementById(campoId);
        // Obtiene el valor del campo y elimina los espacios en blanco al principio y al final
        const email = campo.value.trim();
        // Si el campo de correo electrónico está vacío
        if (email === '') {
            // Establece un mensaje de error para el campo de correo electrónico
            setMensajeError(campo, 'El campo correo electrónico es obligatorio');
            // Devuelve false indicando que la validación ha fallado
            return false;
            // Si el campo de correo electrónico no está vacío pero no es válido
        } else if (!esEmail(email)) {
            // Establece un mensaje de error para el campo de correo electrónico
            setMensajeError(campo, mensajeError);
            // Devuelve false indicando que la validación ha fallado
            return false;
        } else {
            // Si el campo de correo electrónico es válido, elimina cualquier mensaje de error anterior
            setEliminaMensajeError(campo);
            // Devuelve true indicando que la validación ha tenido éxito
            return true;
        }
    };


    // Función para validar un campo específico
    const validaCampo = (campoId, mensajeError) => {
        // Obtiene el elemento del campo mediante su ID
        const campo = document.getElementById(campoId);
        // Obtiene el valor del campo y elimina los espacios en blanco al principio y al final
        const valor = campo.value.trim();
        // Si el valor del campo está vacío
        if (valor === '') {
            // Establece un mensaje de error para el campo
            setMensajeError(campo, mensajeError);
            // Devuelve false indicando que la validación ha fallado
            return false;
        } else {
            // Si el valor del campo no está vacío, elimina cualquier mensaje de error anterior
            setEliminaMensajeError(campo);
            // Devuelve true indicando que la validación ha tenido éxito
            return true;
        }
    };


    // Función para establecer un mensaje de error en un campo
    const setMensajeError = (campoEntrada, mensaje) => {
        // Encuentra el elemento padre del campo de entrada
        const formControl = campoEntrada.closest('div');
        // Encuentra el elemento de texto de error dentro del elemento padre
        const errorText = formControl.querySelector('.error-text');
        //Se asegura de que los elementos de error (.error-text) existen antes de asignarles un valor
        if (!errorText) {
            errorText = document.createElement('p');
            errorText.className = 'error-text';
            formControl.appendChild(errorText);
        }
        // Agrega la clase de error al elemento padre para resaltar el campo
        formControl.classList.add('error');
        // Establece el texto del mensaje de error
        errorText.innerText = mensaje;
        // Establece el foco en el campo de entrada para una corrección rápida
        campoEntrada.focus();
    };

    // Función para eliminar un mensaje de error de un campo
    const setEliminaMensajeError = (campoEntrada) => {
        // Encuentra el elemento padre del campo de entrada
        const formControl = campoEntrada.closest('div');
        // Elimina la clase de error del elemento padre
        formControl.classList.remove('error');
        // Encuentra el elemento de texto de error dentro del elemento padre
        const errorText = formControl.querySelector('.error-text');
        // Establece el texto de error como vacío
        if (errorText) {
            errorText.innerText = '';
        }
    };

    // Función para validar si una cadena es una dirección de correo electrónico válida
    const esEmail = (email) => {
        // Expresión regular para validar el formato de correo electrónico
        const regular = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        // Verifica si el correo electrónico cumple con el formato
        return regular.test(email);
    };

    // Agrega eventos para borrar las clases de error cuando se completa el input o se presiona Tab
    form.querySelectorAll('input').forEach(input => {
        input.addEventListener('input', () => {
            // Obtiene el valor del campo y elimina los espacios en blanco al principio y al final
            const valor = input.value.trim();
            // Si el campo no está vacío, elimina cualquier mensaje de error
            if (valor !== '') {
                setEliminaMensajeError(input);
            }
        });
    });

    // Agrega eventos para borrar las clases de error cuando se selecciona una opción del select
    form.querySelectorAll('select').forEach(select => {
        select.addEventListener('change', () => {
            // Obtiene el valor seleccionado del campo de selección
            const valor = select.value;
            // Si se selecciona una opción, elimina cualquier mensaje de error
            if (valor !== '') {
                setEliminaMensajeError(select);
            }
        });
    });
});