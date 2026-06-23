import { test, expect } from "@playwright/test";
import PaginaPrincipal from "./page-objects/PaginaPrincipal";

test.describe('Buscar Passagens', () => {
    test('Deve fazer a jornada do usuário buscando passagens de somente ida', async ({ page }) => {
        const paginaPrincipal = new PaginaPrincipal(page);
        await paginaPrincipal.visitar('luizanjos88@gmail.com', '123456');
        await paginaPrincipal.selecionarPassagem();


    })

})