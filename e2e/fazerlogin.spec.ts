import test from "@playwright/test";
import PaginaLogin from "./page-objects/PaginaLogin";


test.describe("Pagina de Login", () => {
    test("Deve conseguir fazer Login com os dados válidos", async ({ page }) => {
        const paginaLogin = new PaginaLogin(page);

        await paginaLogin.visitar();
        await paginaLogin.fazerLogin('luizanjos88@gmail.com', '123456');
        await paginaLogin.loginFeitoComSucesso()
    });

    test("Não deve conseguir fazer login com o email não cadastrado", async ({ page }) => {

        const paginaLogin = new PaginaLogin(page);
        await paginaLogin.visitar();
        await paginaLogin.fazerLogin('luizerrado@gmail.com', '123456');
        await paginaLogin.estaMostrandoMsgDeErro('Você não está autorizado a acessar este recurso');

    })

    test("Deve aparecer a mensagem de email inválido quando se coloca um email inválido", async ({ page }) => {

        const paginaLogin = new PaginaLogin(page);
        await paginaLogin.visitar();
        await paginaLogin.loginInvalido('luizanjos88gmail.com', '123456');
        await paginaLogin.mensagemInvalido('E-mail inválido');
    })

    test("Deve aparecer mesnsagem de erro quanto o campo senha ou Email estiver vázio", async ({ page }) => {
        const paginaLogin = new PaginaLogin(page);
        await paginaLogin.visitar();
        await paginaLogin.loginInvalido('', '123456');
        await paginaLogin.mensagemInvalido('E-mail é obrigatório');

    })

})

