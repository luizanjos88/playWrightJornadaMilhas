import test, { expect } from "@playwright/test";

test.describe('Página Inicial', () => {
    test('Deve visitar a página inicial', async ({ page }) => {
        await page.goto('/');
        await expect(page).toHaveTitle('Jornada Milhas')


        //const tituloPassagem = page.getByRole('heading', { name: 'Passagens' });
        // await expect(tituloPassagem).toBeVisible();

        const textoPassagem = page.getByTestId('titulo-passagens');
        const tituloPromocoes = page.getByTestId('titulo-promocoes');
        const tituloDepoimentos = page.getByTestId('titulo-depoimentos');

        await expect(tituloPromocoes).toBeVisible();
        await expect(tituloDepoimentos).toBeVisible();
        await expect(textoPassagem).toBeVisible();

    })
})

