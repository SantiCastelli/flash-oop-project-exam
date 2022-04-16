let nextId = 0;

// Declarar de manera explícita los posibles estados del formulario nos evita tener que ir jugando con valores true/false e incluso nos ahorra variables
const FORM_MODE = {
    hidden: 0,
    add: 1,
    edit: 2
}


Vue.createApp({
    data() {
        return {
            notes: [],
            formMode: FORM_MODE.hidden,
            // Puesto que una nota se compone justamente de una pregunta y una respuesta, un objeto es una estructura adecuada para mantener sus dos propiedades juntas
            note: {
                id: nextId++,
                question: '',
                answer: ''
            }
        }
    },
    methods: {
        onAddQuestion() {
            // Queda muy explícita que estamos en modo 'añadir nueva nota'
            this.formMode = FORM_MODE.add;
        },
        // Ocultar el formulario es una funcionalidad que se repite en muchos requisitos, bueno tenerlo en un método
        onCloseForm() {
            this.formMode = FORM_MODE.hidden;
        },
        onAddNote() {
            this.notes.push(this.note); // añadimos la nota que estamos editando, no olvidemos añadir el identificador
            this.note = {
                id: nextId++,
                question: '',
                answer: ''
            }; // limpiamos la nota que estamos editando y preparamos el siguiente id
            this.formMode = FORM_MODE.hidden; // ocultamos el formulario
        },
        // Pasar el objeto entero es gratis, hacedlo siempre. Luego ya nos quedamos con los campos que nos interesa
        onDelete(note) {
            this.notes = this.notes.filter(n => note.id != n.id)
        }
    },
    computed:
    {
        // En qué casos tenemos que mostrar el formulario?
        mustShowForm() {
            return this.formMode == FORM_MODE.add;
        }
    },




}).mount('#app')