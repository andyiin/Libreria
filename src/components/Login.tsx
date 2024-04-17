export default function Login(props: { handleLogin: (formData: FormData) => void }) {
    return (
        <form action={props.handleLogin}>
            <div>
                <label htmlFor="email">Correo</label>
                <input className="text-black" type="email" id="email" name="email" required />
            </div>
            <div>
                <label htmlFor="password">Contraseña</label>
                <input className="text-black" type="password" id="password" name="password" required />
            </div>
            <button type="submit">Iniciar sesión</button>
        </form>
    );
};
