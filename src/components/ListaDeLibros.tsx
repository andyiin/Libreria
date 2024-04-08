export default function ListaDeLibros(props: Readonly<{ libros: any[] }>) {
  return (
    <div>
      <h1>Listado de Libros</h1>
      <ul>
        {props.libros.map((libro) => (
          <li key={libro._id}>{libro.name}</li>
        ))}
      </ul>
    </div>
  );
}
