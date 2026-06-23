import test from "@playwright/test";
import PaginaCadastro from "./page-objects/PaginaCadastro";




test.describe('Página Inicial', () => {
    test("Deve realizar o cadsatro com sucesso", async ({ page }) => {

        const paginaCadastro = new PaginaCadastro(page);

        await paginaCadastro.cadastrar();
        await paginaCadastro.preencherDados('Luiz', '01/01/01', '07868099909');


    })
})