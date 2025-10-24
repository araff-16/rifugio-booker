module.exports = function (plop) {
  plop.setGenerator("component", {
    description: "Generate a React component with TS, CSS, and test",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Component name:",
      },
    ],
    actions: [
      {
        type: "add",
        path: "src/components/{{pascalCase name}}/{{pascalCase name}}.tsx",
        templateFile: "plop-templates/Component.tsx.hbs",
      },
      {
        type: "add",
        path: "src/components/{{pascalCase name}}/{{pascalCase name}}.css",
        templateFile: "plop-templates/Component.module.css.hbs",
      },
      {
        type: "append",
        path: "src/components/index.ts",
        pattern: "/* PLOP_INJECT_EXPORT */",
        template:
          "export { default as {{pascalCase name}} } from './{{pascalCase name}}/{{pascalCase name}}';",
      },
    ],
  });
};
