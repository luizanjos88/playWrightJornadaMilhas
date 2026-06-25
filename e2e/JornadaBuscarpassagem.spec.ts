import { test, expect } from "@playwright/test";
import PaginaPrincipal from "./page-objects/PaginaPrincipal";

test.describe('Buscar Passagens', () => {
    test('Deve fazer a jornada do usuário buscando passagens de somente ida', async ({ page }) => {
        const paginaPrincipal = new PaginaPrincipal(page);
        await paginaPrincipal.visitar('luizanjos88@gmail.com', '123456');
        await paginaPrincipal.definirSomenteIda();
        await paginaPrincipal.abrirModalPassageiros();
        await paginaPrincipal.definirPassageirosAdultos(3);
        await paginaPrincipal.definirPassageirosCriancas(1);
        await paginaPrincipal.definirPassageirosBebes(1);
        await paginaPrincipal.fecharModal();
        await paginaPrincipal.definirOrigemEDestino('minas gerais', 'rio de janeiro');
        await paginaPrincipal.definirDataDeIda(new Date());
        await paginaPrincipal.buscarPassagem();
        await paginaPrincipal.estaMostrandoPassagem('Somente Ida', 'Minas Gerais', 'Rio de Janeiro');


    })

})