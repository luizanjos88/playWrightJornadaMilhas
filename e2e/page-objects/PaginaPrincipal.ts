import { Locator, Page, expect } from "@playwright/test"
export default class PaginaPrincipal {

    private readonly page: Page;
    private readonly botaoLogin: Locator;
    private readonly inputEmail: Locator;
    private readonly inputSenha: Locator;
    private readonly botaoAcessarConta: Locator;
    private readonly botaoSomenteIda: Locator;
    private readonly abrirModalDoPasageiro: Locator;
    private readonly botaoIncrementarAdulto: Locator;
    private readonly botaoIncrementarCriança: Locator;
    private readonly botaoIncremetarBebe: Locator;
    private readonly botaoFecharModalPassageiros: Locator;
    private readonly campoDropdownDestino: Locator;
    private readonly campoDropdownOrigen: Locator;
    private readonly inputDataDeIda: Locator;
    private readonly botaoBuscarPassagem: Locator;

    constructor(page: Page) {
        this.page = page;
        this.botaoLogin = page.getByTestId('botao-login');
        this.inputEmail = page.getByTestId('input-email');
        this.inputSenha = page.getByTestId('input-senha');
        this.botaoAcessarConta = page.getByTestId('botao-acessar-conta');

        this.botaoSomenteIda = page.getByRole('button', { name: 'SOMENTE IDA' });
        this.abrirModalDoPasageiro = page.getByTestId('abrir-modal-passageiros')
        this.botaoIncrementarAdulto = page.getByTestId('seletor-passageiro-adultos').getByRole('button', { name: 'Ícone do operador de adição' });
        this.botaoIncrementarCriança = page.getByTestId('seletor-passageiro-criancas').getByRole('button', { name: 'Ícone do operador de adição' });
        this.botaoIncremetarBebe = page.getByTestId('seletor-passageiro-bebes').getByRole('button', { name: 'Ícone do operador de adição' })
        this.botaoFecharModalPassageiros = page.getByTestId('fechar-modal-passageiros');
        this.campoDropdownOrigen = page.getByTestId('campo-dropdown-origem').getByLabel('origem');
        this.campoDropdownDestino = page.getByTestId('campo-dropdown-destino').getByLabel('destino');
        this.inputDataDeIda = page.getByText('Data de ida');
        this.botaoBuscarPassagem = page.getByTestId('botao-buscar-passagens');

    }
    async visitar(email: string, senha: string) {
        await this.page.goto('/');
        await this.botaoLogin.click();
        await expect(this.page).toHaveURL('/auth/login')
        await this.inputEmail.fill(email);
        await this.inputSenha.fill(senha);
        await this.botaoAcessarConta.click();
        await expect(this.page).toHaveURL('/home')
    }

    async selecionarPassagem() {
        await this.botaoSomenteIda.click();
        await this.abrirModalDoPasageiro.click();
        await this.botaoIncrementarAdulto.click();
        await this.botaoFecharModalPassageiros.click();
        //await this.campoDropdownOrigen.fill('São Paulo');
        //await this.campoDropdownOrigen.click();
        //await this.campoDropdownDestino.fill('Alagoas');
        //await this.campoDropdownDestino.click();
        //await this.inputDataDeIda.fill('04/23/2027');
        //await this.botaoBuscarPassagem.click();

    }

}


