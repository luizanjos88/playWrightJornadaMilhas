import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/login.page';

test.describe('Cadastro', () => {
  test('Deve realizar o cadastro de um novo usuário com dados corretos', async ({ page }) => {
    // 1. Acessa a página inicial
    await page.goto('http://localhost:4200');

    // 2. Clica no botão de cadastro no cabeçalho
    await page.getByRole('button', { name: 'CADASTRE-SE' }).click();

    // 3. Verifica se foi redirecionado para a página de cadastro
    await expect(page).toHaveURL('http://localhost:4200/auth/cadastro');

    // 4. Preenche os dados pessoais
    await page.getByLabel('Nome').fill('Usuário de Teste');
    await page.getByLabel('Data de Nascimento').fill('10/15/1995');
    
    // Gera dados únicos para CPF e e-mail para evitar duplicação no banco de dados
    const uniqueId = Date.now();
    const randomCPF = `${Math.floor(10000000000 + Math.random() * 90000000000)}`;
    const email = `teste_${uniqueId}@email.com`;

    await page.getByLabel('CPF').fill(randomCPF);
    await page.getByLabel('Cidade').fill('São Paulo');
    
    // Seleciona o gênero (ex: Feminino)
    await page.getByRole('radio', { name: 'Feminino' }).click();
    
    await page.getByLabel('Telefone').fill('11999999999');

    // Seleciona o Estado (Campo com autocomplete)
    const estadoInput = page.getByRole('combobox', { name: 'Estado' });
    await estadoInput.fill('São Paulo');
    // Clica na opção "São Paulo" do autocomplete que aparece na tela
    await page.getByRole('option', { name: 'São Paulo' }).click();

    // 5. Preenche os dados de acesso
    await page.getByLabel('E-mail', { exact: true }).fill(email);
    await page.getByLabel('Senha', { exact: true }).fill('senha123');
    await page.getByLabel('Confirmar E-mail').fill(email);
    await page.getByLabel('Confirmar Senha').fill('senha123');

    // 6. Aceita os termos e condições
    await page.getByRole('checkbox', { name: 'Li e aceito os termos' }).click();

    // 7. Clica no botão de cadastrar
    await page.getByRole('button', { name: 'CADASTRAR' }).click();

    // 8. Verifica se foi redirecionado para a tela de login após cadastro bem-sucedido
    await expect(page).toHaveURL('http://localhost:4200/auth/login');

    const loginPage = new LoginPage(page);

    // 9. Realiza o login com o usuário recém-criado usando o Page Object
    await loginPage.realizarLogin(email, 'senha123');

    // 10. Verifica se o login foi bem sucedido
    await expect(page).toHaveURL('http://localhost:4200/home');
    await expect(page.getByRole('button', { name: 'SAIR' })).toBeVisible();
  });
});
