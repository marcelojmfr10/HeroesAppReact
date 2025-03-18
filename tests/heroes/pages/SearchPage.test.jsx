import { fireEvent, render, screen } from "@testing-library/react";
import { SearchPage } from "../../../src/heroes/pages/SearchPage";
import { MemoryRouter } from "react-router-dom";

const mockedUseNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUseNavigate
}));

describe('Pruebas en SearchPage', () => {

    beforeEach(() => jest.clearAllMocks());

    test('Debe de mostrarse correctamente con valores por defecto', () => {
        const {container} = render(
            <MemoryRouter>
                <SearchPage />
            </MemoryRouter>
        );

        // screen.debug();
        expect(container).toMatchSnapshot();
    });

    test('Debe de mostrar a batman y el input con el valor del queryString', () => {
        const {container} = render(
            <MemoryRouter initialEntries={['/search?q=batman']}>
                <SearchPage />
            </MemoryRouter>
        );

        // screen.debug();
        const input = screen.getByRole('textbox');
        expect(input.value).toBe('batman');
        
        const img = screen.getByRole('img');
        expect(img.src).toContain('/heroes/dc-batman.jpg');

        const divAlert = screen.getByLabelText('searchHero');
        // console.log(divAlert.style);
        expect(divAlert.style.display).toBe('none');
    });

    test('Debe de mostrar un error si no se encuentra el hero', () => {
        const {container} = render(
            <MemoryRouter initialEntries={['/search?q=batman123']}>
                <SearchPage />
            </MemoryRouter>
        );

        // screen.debug();

        const divAlert = screen.getByLabelText('errorHero');
        // console.log(divAlert.style);
        expect(divAlert.style.display).toBe('');
        expect(divAlert.innerHTML).toBe('No hero with <b>batman123</b>');
    });

    test('Debe de llamar el navigate a la pantalla nueva', () => {
        const inputValue = 'superman';
        const {container} = render(
            <MemoryRouter initialEntries={['/search']}>
                <SearchPage />
            </MemoryRouter>
        );

        const input = screen.getByRole('textbox');
        fireEvent.change(input, {target: {name: 'searchText', value: inputValue}});

        const form = screen.getByLabelText('form');
        fireEvent.submit(form);
        
        expect(mockedUseNavigate).toHaveBeenCalledWith(`?q=${inputValue}`);

    });
    

});
