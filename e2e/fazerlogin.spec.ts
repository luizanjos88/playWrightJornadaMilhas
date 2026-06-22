import test from "@playwright/test";
import PaginaLogin from "./page-objects/PaginaLogin";


test.describe("Pagina de Login", () => {
    test("Deve conseguir fazer Login com os dados válidos", async ({ page }) => {
        const paginaLogin = new PaginaLogin(page);

        await paginaLogin.visitar();
        await paginaLogin.fazerLogin('luizanjos88@gmail.com', '123456');
        await paginaLogin.loginFeitoComSucesso()
    });

    test("Não deve conseguir fazer login com o email inválido", async ({ page }) => {

        const paginaLogin = new PaginaLogin(page);
        await paginaLogin.visitar();
        await paginaLogin.fazerLogin('luizerrado@gmail.com', '123456');
        await paginaLogin.estaMostrandoMsgDeErro('Você não está autorizado a acessar este recurso');

    })
})
