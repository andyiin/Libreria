export default function Registro(props: { handleRegistro: (formData: FormData) => void }) {
    return (
        <form action={props.handleRegistro} method="post">
            <div>
                <label htmlFor="email">Correo</label>
                <input className="text-black" type="email" id="email" name="email" required />
            </div>
            <div>
                <label htmlFor="password">Contraseña</label>
                <input className="text-black" type="password" id="password" name="password" required />
            </div>
            <div>
                <label htmlFor="password-2">Repita la contraseña</label>
                <input className="text-black" type="password" id="password-2" name="password-2" required />
            </div>
            <button type="submit">Registrarse</button>
        </form>
    );
};
