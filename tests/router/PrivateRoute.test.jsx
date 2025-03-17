import { render, screen } from "@testing-library/react";
import { AuthContext } from "../../src/auth/context/AuthContext";
import { PrivateRoute } from "../../src/router/PrivateRoute";
import { MemoryRouter } from "react-router-dom";


describe('Pruebas en el PrivateRoute', () => {
    test('Debe de mostrar el children si está autenticado', () => {

        Storage.prototype.setItem = jest.fn();

        const contextValue = {
            logged: true,
            user: {
                id: 'abc',
                name: 'Jonatan'
            }
        }

        render(<AuthContext.Provider value={contextValue}>
            <MemoryRouter initialEntries={['/search?q=batman']}>
                <PrivateRoute>
                    <h1>ruta privada</h1>
                </PrivateRoute>
            </MemoryRouter>

        </AuthContext.Provider>);

        expect(screen.getByText('ruta privada')).toBeTruthy();
        expect(localStorage.setItem).toHaveBeenCalledWith("lastPath", "/search?q=batman");
    });

});
