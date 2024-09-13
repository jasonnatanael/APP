const { select, input, checkbox } = require("@inquirer/prompts");

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

    if (respostas.length == 0) {
        console.log("Nenhuma meta selecionada!")
        return;
    }

    metas.forEach((meta) => {
        meta.checked = false
    })

    respostas.forEach((resposta) => {
        const meta = metas.find((m) => {
            return m.value == resposta
        })

        meta.checked = true

    })

    console.log('Meta(s) marcada(s) como concluída(s)')
};

const metasRealizadas = async () => {
    const realizadas = metas.filter((meta) => {
        return meta.checked
    })

    if(realizadas.length == 0) {
        console.log('Não existem metas realizadas! :(')
        return
    }
    
    await select({
        message: "Metas realizadas",
        choices: [...realizadas],
        
    })

};

const start = async () => {
  while (true) {
    const opcao = await select({
      message: "Menu >",
      choices: [
        { name: "cadastrar meta", value: "cadastrar" },
        { name: "listar metas", value: "listar" },
        { name: "metas realizadas", value: "realizadas" },
        { name: "sair", value: "sair" },
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
      case "sair":
        console.log("Até a próxima!");
        return;
    }
  }
};

start();


