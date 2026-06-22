import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/login.page';

test.describe('Login', () => {
  test('Deve realizar login com dados corretos', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // 1. Acessa a página inicial
    await page.goto('http://localhost:4200');

    // 2. Clica no botão de login no cabeçalho
    await page.getByTestId('botao-login').click();

    // 3. Verifica se foi redirecionado para a página de login
    await expect(page).toHaveURL('http://localhost:4200/auth/login');

    // 4. Preenche os dados de login corretos usando o Page Object
    await loginPage.realizarLogin('luizanjos88@gmail.com', '123456');

    // 5. Verifica se voltou para a página inicial (login com sucesso redirecionando para /home)
    await expect(page).toHaveURL('http://localhost:4200/home');

    // 6. Verifica se o botão 'SAIR' ou o ícone do perfil estão visíveis
    await expect(page.getByRole('button', { name: 'SAIR' })).toBeVisible();
    await expect(page.getByAltText('Ícone da pessoa usuária')).toBeVisible();
  });
});
