import React from "react";

export default function Footer() {
    return (
        <footer className="bg-zinc-900 text-white py-4">
            <div className="container mx-auto flex flex-col items-center">
                <p className="mb-2">Creado por</p>
                <div className="flex space-x-4 mb-4">
                    <a
                        href="https://github.com/a19sotean"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.11.82-.26.82-.577v-2.165c-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.73.083-.73 1.205.085 1.84 1.237 1.84 1.237 1.07 1.835 2.807 1.305 3.492.997.108-.775.42-1.305.763-1.605-2.665-.305-5.466-1.335-5.466-5.93 0-1.31.467-2.38 1.235-3.22-.123-.305-.535-1.54.117-3.205 0 0 1.008-.322 3.3 1.23.957-.266 1.98-.398 3-.403 1.02.005 2.043.137 3 .403 2.29-1.552 3.297-1.23 3.297-1.23.653 1.665.24 2.9.117 3.205.77.84 1.235 1.91 1.235 3.22 0 4.61-2.803 5.62-5.475 5.92.43.37.823 1.1.823 2.22v3.293c0 .32.22.694.825.577C20.565 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
                        </svg>
                        <span>a19sotean</span>
                    </a>
                    <a
                        href="https://github.com/a19camoan"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.11.82-.26.82-.577v-2.165c-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.73.083-.73 1.205.085 1.84 1.237 1.84 1.237 1.07 1.835 2.807 1.305 3.492.997.108-.775.42-1.305.763-1.605-2.665-.305-5.466-1.335-5.466-5.93 0-1.31.467-2.38 1.235-3.22-.123-.305-.535-1.54.117-3.205 0 0 1.008-.322 3.3 1.23.957-.266 1.98-.398 3-.403 1.02.005 2.043.137 3 .403 2.29-1.552 3.297-1.23 3.297-1.23.653 1.665.24 2.9.117 3.205.77.84 1.235 1.91 1.235 3.22 0 4.61-2.803 5.62-5.475 5.92.43.37.823 1.1.823 2.22v3.293c0 .32.22.694.825.577C20.565 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
                        </svg>
                        <span>a19camoan</span>
                    </a>
                </div>
                <p className="mb-2">Redes sociales</p>
                <div className="flex space-x-4">
                    <a
                        href="https://twitter.com/@ies_grancapitan"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path d="M22.46 6c-.77.35-1.6.58-2.46.69a4.28 4.28 0 001.88-2.37 8.59 8.59 0 01-2.72 1.04 4.28 4.28 0 00-7.29 3.9A12.14 12.14 0 013 4.8a4.28 4.28 0 001.32 5.7 4.27 4.27 0 01-1.94-.54v.05a4.28 4.28 0 003.43 4.2 4.28 4.28 0 01-1.93.07 4.28 4.28 0 004 2.97A8.6 8.6 0 012 19.54a12.14 12.14 0 006.56 1.92c7.88 0 12.2-6.53 12.2-12.2 0-.19 0-.37-.01-.56A8.72 8.72 0 0024 5.5a8.59 8.59 0 01-2.54.7z" />
                        </svg>
                    </a>
                    <a
                        href="https://instagram.com/iesgrancapitan"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path d="M12 2.16c3.2 0 3.584.012 4.85.07 1.17.054 1.97.24 2.43.4a4.92 4.92 0 011.77 1.03 4.92 4.92 0 011.03 1.77c.16.46.346 1.26.4 2.43.058 1.266.07 1.65.07 4.85s-.012 3.584-.07 4.85c-.054 1.17-.24 1.97-.4 2.43a4.92 4.92 0 01-1.03 1.77 4.92 4.92 0 01-1.77 1.03c-.46.16-1.26.346-2.43.4-1.266.058-1.65.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.054-1.97-.24-2.43-.4a4.92 4.92 0 01-1.77-1.03 4.92 4.92 0 01-1.03-1.77c-.16-.46-.346-1.26-.4-2.43-.058-1.266-.07-1.65-.07-4.85s.012-3.584.07-4.85c.054-1.17.24-1.97.4-2.43a4.92 4.92 0 011.03-1.77 4.92 4.92 0 011.77-1.03c.46-.16 1.26-.346 2.43-.4 1.266-.058 1.65-.07 4.85-.07zm0-2.16C8.74 0 8.332.012 7.05.07 5.77.128 4.9.32 4.2.6a6.92 6.92 0 00-2.5 1.5 6.92 6.92 0 00-1.5 2.5c-.28.7-.472 1.57-.53 2.85C0 8.332 0 8.74 0 12s.012 3.668.07 4.95c.058 1.28.25 2.15.53 2.85a6.92 6.92 0 001.5 2.5 6.92 6.92 0 002.5 1.5c.7.28 1.57.472 2.85.53 1.28.058 1.688.07 4.95.07s3.668-.012 4.95-.07c1.28-.058 2.15-.25 2.85-.53a6.92 6.92 0 002.5-1.5 6.92 6.92 0 001.5-2.5c.28-.7.472-1.57.53-2.85.058-1.28.07-1.688.07-4.95s-.012-3.668-.07-4.95c-.058-1.28-.25-2.15-.53-2.85a6.92 6.92 0 00-1.5-2.5 6.92 6.92 0 00-2.5-1.5c-.7-.28-1.57-.472-2.85-.53C15.668.012 15.26 0 12 0z" />
                            <path d="M12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z" />
                        </svg>
                    </a>
                </div>
            </div>
        </footer>
    );
}
