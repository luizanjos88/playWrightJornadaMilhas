import { Locator, Page, expect } from "@playwright/test"

export default class PaginaCadastro {
    private readonly page: Page;
    botaoCadastrar: Locator;
    inputname: Locator;
    inputDataDeNascimento: Locator;
    inputCPF: Locator;



    constructor(page: Page) {
        this.page = page;
        this.botaoCadastrar = page.getByRole('button', { name: 'CADASTRE-SE' });
        this.inputname = page.getByRole('textbox', { name: 'Nome' });
        this.inputDataDeNascimento = page.getByText('Data de Nascimento');
        this.inputCPF = page.getByRole('textbox', { name: 'CPF' });

    }
    async cadastrar() {
        await this.page.goto("/");
        await this.botaoCadastrar.click();
        await expect(this.page).toHaveURL('/auth/cadastro');

    }

    async preencherDados(nome: string, dataDeNascimento: string, CPF: string) {
        await this.inputname.fill(nome);
        await this.inputDataDeNascimento.fill(dataDeNascimento);
        await this.inputCPF.fill(CPF);
    }
}


