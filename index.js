const { select, input } = require("@inquirer/prompts");

let metas = [
  { value: "Tomar 3L de água por dia", checked: false },
];

const cadastrarMeta = async () => {
  const novaMeta = await input({ message: "Digite a meta:" });

  if (novaMeta.length === 0) {
    console.log("A meta não pode ser vazia");
    return;
  }

  metas.push({ value: novaMeta, checked: false });
  return novaMeta;
};

const listarMetas = () => {
  metas.forEach((meta, index) => {
    console.log(`${index + 1}. ${meta.value}`);
  });
};

const start = async () => {
  while (true) {
    const opcao = await select({
      message: "Menu >",
      choices: [
        { name: "cadastrar meta", value: "cadastrar" },
        { name: "listar metas", value: "listar" },
        { name: "sair", value: "sair" },
      ],
    });

    switch (opcao) {
      case "cadastrar":
        await cadastrarMeta();
        console.log("Meta cadastrada com sucesso!");
        break;
      case "listar":
        listarMetas();
        break;
      case "sair":
        console.log("Até a próxima!");
        return;
    }
  }
};

start();


