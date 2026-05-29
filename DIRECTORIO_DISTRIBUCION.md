# Email Backend - Дерево директорий дистрибутива

> Vista estructural del backend (modulos, API, export, widgets y pruebas).  
> Se omiten carpetas generadas como `node_modules`, `dist` o coverage.

```text
email-backend/
├── .env
├── .env.example
├── .gitignore
├── README.md
├── docker-compose.yml
├── eslint.config.mjs
├── nest-cli.json
├── package.json
├── tsconfig.build.json
├── tsconfig.json
├── src/
│   ├── app.controller.ts
│   ├── app.module.ts
│   ├── main.ts
│   ├── common/
│   │   └── index.ts
│   ├── config/
│   │   └── configuration.ts
│   ├── database/
│   │   ├── database.module.ts
│   │   └── entities/
│   │       ├── template.entity.ts
│   │       └── widget.entity.ts
│   ├── dto/
│   │   ├── create-template.dto.ts
│   │   ├── create-widget.dto.ts
│   │   ├── export-html.dto.ts
│   │   ├── generate-qr.dto.ts
│   │   ├── preview.dto.ts
│   │   └── update-template.dto.ts
│   ├── interfaces/
│   │   └── widget-renderer.interface.ts
│   ├── types/
│   │   └── editor.types.ts
│   ├── utils/
│   │   └── html.utils.ts
│   └── modules/
│       ├── export/
│       │   ├── export.controller.ts
│       │   ├── export.module.ts
│       │   ├── html-export.service.ts
│       │   ├── html-export.service.spec.ts
│       │   └── renderers/
│       │       ├── base.renderers.ts
│       │       ├── product-grid.renderer.ts
│       │       ├── qr-code.renderer.ts
│       │       └── social.renderer.ts
│       ├── preview/
│       │   ├── preview.controller.ts
│       │   └── preview.module.ts
│       ├── products/
│       │   ├── products.controller.ts
│       │   ├── products.module.ts
│       │   ├── products.service.ts
│       │   ├── products.service.spec.ts
│       │   └── data/
│       │       └── products.mock.json
│       ├── templates/
│       │   ├── templates.controller.ts
│       │   ├── templates.module.ts
│       │   └── templates.service.ts
│       └── widgets/
│           ├── widgets.controller.ts
│           ├── widgets.module.ts
│           ├── widgets.seed.ts
│           └── widgets.service.ts
└── test/
    ├── jest-e2e.json
    ├── export/
    │   └── export.e2e-spec.ts
    ├── preview/
    │   └── preview.e2e-spec.ts
    ├── products/
    │   └── products.e2e-spec.ts
    ├── templates/
    │   └── templates.e2e-spec.ts
    ├── validation/
    │   └── validation.e2e-spec.ts
    ├── widgets/
    │   └── widgets.e2e-spec.ts
    └── utils/
        ├── create-test-app.ts
        └── sample-blocks.ts
```
