import { Locator, Page, expect } from "@playwright/test"
export default class PaginaPrincipal {

    private readonly page: Page;
    private readonly botaoLogin: Locator;
    private readonly inputEmail: Locator;
    private readonly inputSenha: Locator;
    private readonly botaoAcessarConta: Locator;
    private readonly botaoSomenteIda: Locator;
    private readonly botaoAbrirModalDoPassageiro: Locator;
    private readonly botaoIncrementarAdulto: Locator;
    private readonly botaoIncrementarCrianca: Locator;
    private readonly botaoIncremetarBebe: Locator;
    private readonly botaoFecharModalPassageiros: Locator;
    private readonly campoDropdownDestino: Locator;
    private readonly campoDropdownOrigen: Locator;
    private readonly inputDataDeIda: Locator;
    private readonly botaoBuscarPassagem: Locator;
    private readonly botaoComprar: Locator;
    private readonly textoIdaVolta: Locator;
    private readonly containerOrigem: Locator;
    private readonly containerDestino: Locator;


    constructor(page: Page) {
        this.page = page;
        this.botaoLogin = page.getByTestId('botao-login');
        this.inputEmail = page.getByTestId('input-email');
        this.inputSenha = page.getByTestId('input-senha');
        this.botaoAcessarConta = page.getByTestId('botao-acessar-conta');

        this.botaoSomenteIda = page.getByRole('button', { name: 'SOMENTE IDA' });
        this.botaoAbrirModalDoPassageiro = page.getByTestId('abrir-modal-passageiros')
        this.botaoIncrementarAdulto = page.getByTestId('seletor-passageiro-adultos').getByRole('button', { name: 'Ícone do operador de adição' });
        this.botaoIncrementarCrianca = page.getByTestId('seletor-passageiro-criancas').getByRole('button', { name: 'Ícone do operador de adição' });
        this.botaoIncremetarBebe = page.getByTestId('seletor-passageiro-bebes').getByRole('button', { name: 'Ícone do operador de adição' })
        this.botaoFecharModalPassageiros = page.getByTestId('fechar-modal-passageiros');
        this.campoDropdownOrigen = page.getByTestId('campo-dropdown-origem').getByLabel('origem');
        this.campoDropdownDestino = page.getByTestId('campo-dropdown-destino').getByLabel('destino');
        this.inputDataDeIda = page.getByText('Data de ida');
        this.botaoBuscarPassagem = page.getByTestId('botao-buscar-passagens');
        this.textoIdaVolta = page.getByTestId('texto-ida-volta');
        this.containerOrigem = page.getByTestId('container-origem');
        this.containerDestino = page.getByTestId('container-destino');
        this.botaoComprar = page.getByTestId('botao-comprar');
        this.botaoComprar = page.getByTestId('botao-comprar');

    }

    async visitar(email: string, senha: string) {

        await this.page.goto('/');
        await this.botaoLogin.click();
        await expect(this.page).toHaveURL('/auth/login');
        await this.inputEmail.fill(email);
        await this.inputSenha.fill(senha);
        await this.botaoAcessarConta.click();
        await expect(this.page).toHaveURL('/home');

    }

    async definirSomenteIda() {
        await this.botaoSomenteIda.click();

    }

    async abrirModalPassageiros() {
        await this.botaoAbrirModalDoPassageiro.click();

    }
    async definirPassageirosAdultos(quantidade: number) {
        for (let i = 1; i < quantidade; i++) {
            await this.botaoIncrementarAdulto.click();
        }
    }

    async definirPassageirosCriancas(quantidade: number) {
        for (let i = 0; i < quantidade; i++) {
            await this.botaoIncrementarCrianca.click();
        }
    }

    async definirPassageirosBebes(quantidade: number) {
        for (let i = 0; i < quantidade; i++) {
            await this.botaoIncremetarBebe.click();
        }
    }

    async fecharModal() {
        await this.botaoFecharModalPassageiros.click();
    }

    async definirOrigemEDestino(origem: string, destino: string) {
        await this.campoDropdownOrigen.fill(origem);
        await this.campoDropdownOrigen.press('Enter');
        await this.campoDropdownDestino.fill(destino);
        await this.campoDropdownDestino.press('Enter');

    }

    async definirDataDeIda(data: Date) {
        const dataFormatada = data.toLocaleString('en-US', { dateStyle: 'short' });
        await this.inputDataDeIda.fill(dataFormatada);

    }

    async buscarPassagem() {
        await this.botaoBuscarPassagem.click();
        await expect(this.page).toHaveURL('/busca');
    }
    async estaMostrandoPassagem(
        tipoTrajeto: string,
        origem: string,
        destino: string
    ) {
        //await expect(this.textoIdaVolta).toHaveText(tipoTrajeto);
        await expect(this.containerOrigem).toContainText(origem);
        await expect(this.containerDestino).toContainText(destino);
        await expect(this.botaoComprar).toBeVisible();
    }
}



