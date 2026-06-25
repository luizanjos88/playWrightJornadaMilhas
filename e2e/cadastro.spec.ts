import test from "@playwright/test";
import PaginaCadastro from "./page-objects/PaginaCadastro";
import { faker } from '@faker-js/faker';
import PaginaLogin from "./page-objects/PaginaLogin";




test.describe('Página Inicial', () => {
    test("Deve realizar o cadastro com sucesso", async ({ page }) => {

        const paginaCadastro = new PaginaCadastro(page);
        const paginaLogin = new PaginaLogin(page);
        const emailAleatorio = faker.internet.email();
        const senha6Digitos = faker.string.numeric(6);

        await paginaCadastro.cadastrar();
        await paginaCadastro.preencherDados('Luiz', '01/01/01', '07868099909', '66999999999');
        await paginaCadastro.selecionarGenero('Masculino');
        await paginaCadastro.preencherEnderecosESenha('Sinop', 'Mato Grosso', emailAleatorio, senha6Digitos);
        await paginaCadastro.submeterCadastro();
        await paginaLogin.fazerLogin(emailAleatorio, senha6Digitos);
        await paginaLogin.loginFeitoComSucesso();
    })
})