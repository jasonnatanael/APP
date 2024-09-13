const { select, input, checkbox } = require("@inquirer/prompts");

let mensagem = "Bem vindo ao gerenciador de metas!";

let metas = [
  { value: "Tomar 3L de água por dia", checked: false },
];

const cadastrarMeta = async () => {
  const novaMeta = await input({ message: "Digite a meta:" });

  if (novaMeta.length == 0) {
    console.log("A meta não pode ser vazia");
    return;
  }

  metas.push({ value: novaMeta, checked: false });
  return novaMeta;
};

const listarMetas = async () => {
    const respostas = await checkbox({
        message: "Use as setas para mudar de meta, o espaço para marcar ou desmarcar e enter para confirmar.",
        choices: [...metas],
        instructions: false,
    })

    metas.forEach((meta) => {
        meta.checked = false
    })

    if (respostas.length == 0) {
        mensagem = ("Nenhuma meta selecionada!")
        return;
    }

    respostas.forEach((resposta) => {
        const meta = metas.find((m) => {
            return m.value == resposta
        })

        meta.checked = true

    })

    mensagem = 'Meta(s) marcada(s) como concluída(s)'
};

const deletarMetas = async () => {
    const metasDesmarcadas = metas.map((meta) => {
        return {
            value: meta.value,
            checked: false
        }
    })

    const metaDeletar = await checkbox({
        message: "Selecione o item que deseja deletar.",
        choices: [...metasDesmarcadas],
        instructions: false,
    })

    if(metaDeletar.length == 0) {
        mensagem = 'Nenhum item foi selecionado!'
        return
    }

    metaDeletar.forEach((item) => {
        metas = metas.filter((meta) => {
            return meta.value != item
        })
        mensagem = 'Meta(s) deletada(s) com sucesso!'
    })
};

const metasRealizadas = async () => {
    const realizadas = metas.filter((meta) => {
        return meta.checked
    })

    if(realizadas.length == 0) {
        mensagem = 'Não existem metas realizadas! :('
        return
    }
    
    await select({
        message: "Metas realizadas" + realizadas.length,
        choices: [...realizadas],
        
    })

};

const metasAbertas = async () => {
    const abertas = metas.filter((meta) => {
        return !meta.checked
    })

    if(abertas.length == 0) {
        mensagem = 'Não existem metas abertas! :)'
        return
    }

    await select({
        message: "Metas abertas",
        choices: [...abertas],
        
    })

};

const mostrarMensagem = () => {
        console.clear();

    if (mensagem != "") {
        console.log(mensagem)
        console.log("")
        mensagem = ""
    }

};

const start = async () => {
    mostrarMensagem();

  while (true) {
    const opcao = await select({
      message: "Menu >",
      choices: [
        { name: "Cadastrar meta", value: "cadastrar" },
        { name: "Listar metas", value: "listar" },
        { name: "Metas realizadas", value: "realizadas" },
        { name: "Abertas", value: "abertas"},
        { name: "Deletar Metas", value: "deletar"},
        { name: "Sair", value: "sair" },
      ],
    });

    switch (opcao) {
        case "cadastrar":
            await cadastrarMeta();
            console.log("Meta cadastrada com sucesso!");
            break;
        case "listar":
            await listarMetas("Vamos listar as metas");
            break;
        case "listar":
            listarMetas();
            break;
        case "realizadas":
            await metasRealizadas();
            break;
        case "abertas":
            await metasAbertas();
            break;
        case "deletar":
            await deletarMetas();
            break;
        case "sair":
            console.log("Até a próxima!");
            return;
        }
    } 
};

start();


