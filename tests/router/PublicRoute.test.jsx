import { render, screen } from "@testing-library/react";
import { PublicRoute } from "../../src/router/PublicRoute";
import { AuthContext } from "../../src/auth/context/AuthContext";
import { MemoryRouter, Route, Routes } from "react-router-dom";


describe('Pruebas en PublicRoute', () => {
    test('Debe de mostrar el children si no está autenticado', () => {

        const contextValue = {
            logged: false
        }

        render(<AuthContext.Provider value={contextValue}>
            <PublicRoute>
                <h1>ruta pública</h1>
            </PublicRoute>
        </AuthContext.Provider>);

        expect(screen.getByText('ruta pública')).toBeTruthy();
    });

    test('Debe de navegar si está autenticado', () => {
        const contextValue = {
            logged: true,
            user: {
                name: 'Jonatan',
                id: 'abc'
            }
        }

        render(<AuthContext.Provider value={contextValue}>
            <MemoryRouter initialEntries={['/login']}>

                <Routes>
                    <Route path="login" element={
                        <PublicRoute>
                            <h1>ruta pública</h1>
                        </PublicRoute>
                    } />
                    <Route path="marvel" element={<h1>Página Marvel</h1>} />
                </Routes>


            </MemoryRouter>

        </AuthContext.Provider>);

        expect(screen.getByText('Página Marvel')).toBeTruthy();
    });

});
