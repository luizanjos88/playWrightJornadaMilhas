import { Locator, Page, expect } from "@playwright/test"

export default class PaginaCadastro {
    private readonly page: Page;
    private readonly botaoCadastrar: Locator;
    private readonly inputname: Locator;
    private readonly inputDataDeNascimento: Locator;
    private readonly inputCPF: Locator;
    private readonly radioFeminino: Locator;
    private readonly radioMasculino: Locator;
    private readonly radioOutro: Locator;
    private readonly inputTelefone: Locator;
    private readonly inputCidade: Locator;
    private readonly inputEstado: Locator;
    private readonly inputEmail: Locator;
    private readonly confirmarEmail: Locator;
    private readonly inputSenha: Locator;
    private readonly confirmarSenha: Locator;
    private readonly checkBoxAceitarTermos: Locator;
    private readonly botaoConcluirCadastro: Locator;


    constructor(page: Page) {
        this.page = page;
        this.botaoCadastrar = page.getByRole('button', { name: 'CADASTRE-SE' });
        this.inputname = page.getByRole('textbox', { name: 'Nome' });
        this.inputDataDeNascimento = page.getByText('Data de Nascimento');
        this.inputCPF = page.getByRole('textbox', { name: 'CPF' });
        this.inputTelefone = page.getByRole('textbox', { name: 'Telefone' })
        this.radioFeminino = page.getByRole('radio', { name: 'Feminino' });
        this.radioMasculino = page.getByRole('radio', { name: 'Masculino' });
        this.radioOutro = page.getByRole('radio', { name: 'Prefiro não informar' });
        this.inputCidade = page.getByRole('textbox', { name: 'Cidade' });
        this.inputEstado = page.getByRole('combobox', { name: 'Estado' });
        this.inputEmail = page.getByRole('textbox', { name: 'E-mail', exact: true });
        this.confirmarEmail = page.getByRole('textbox', { name: 'Confirmar E-mail' });
        this.inputSenha = page.getByRole('textbox', { name: 'Senha', exact: true });
        this.confirmarSenha = page.getByRole('textbox', { name: 'Confirmar Senha' });
        this.checkBoxAceitarTermos = page.getByRole('checkbox', { name: 'Li e aceito os termos e condi' });
        this.botaoConcluirCadastro = page.getByRole('button', { name: 'CADASTRAR', exact: true });

    }
    async cadastrar() {
        await this.page.goto("/");
        await this.botaoCadastrar.click();
        await expect(this.page).toHaveURL('/auth/cadastro');

    }

    async preencherDados(nome: string, dataDeNascimento: string, CPF: string, telefone: string) {
        await this.inputname.fill(nome);
        await this.inputDataDeNascimento.fill(dataDeNascimento);
        await this.inputCPF.fill(CPF);
        await this.inputTelefone.fill(telefone);


    }

    async selecionarGenero(genero: 'Feminino' | 'Masculino' | 'Prefiro não informar') {
        if (genero === 'Feminino') {
            await this.radioFeminino.check();
        } else if (genero === 'Masculino') {
            await this.radioMasculino.check();
        } else {
            await this.radioOutro.check();
        }
    }

    async preencherEnderecosESenha(cidade: string, estado: string, email: string, senha: string) {

        await this.inputCidade.fill(cidade);
        await this.inputEstado.fill(estado);
        await this.inputEstado.press('Enter');
        await this.inputEmail.fill(email);
        await this.confirmarEmail.fill(email);
        await this.inputSenha.fill(senha);
        await this.confirmarSenha.fill(senha);
        await this.checkBoxAceitarTermos.check();

    }

    async submeterCadastro() {
        await this.botaoConcluirCadastro.click();
        await expect(this.page).toHaveURL('/auth/login');
    }
}


