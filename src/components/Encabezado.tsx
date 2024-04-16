import Link from "next/link";

export default function Encabezado(props: { user: any }) {
    return (
        <header>
            <h1 className="text-2xl">Librería</h1>
            {props.user && (
                <>
                    <h2><Link href="/dashboard">Dashboard</Link></h2>
                    <h2><Link href="/logout">Logout</Link></h2>
                </>
            )}
            {!props.user && (
                <>
                    <h2><Link href="/login">Login</Link></h2>
                    <h2><Link href="/register">Register</Link></h2>
                </>
            )}
        </header>
    );
};
