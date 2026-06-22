import test from "@playwright/test";
import PaginaLogin from "./page-objects/PaginaLogin";

test.describe("Pagina de Login", () => {
    test("Deve conseguir fazer Login com os dados válidos", async ({ page }) => {
        const paginaLogin = new PaginaLogin(page);

        await paginaLogin.visitar()


    })
})