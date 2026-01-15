<!-- Banner placeholder - Add your banner image here -->
<div align="center">

  <!-- ![Agent Skills Banner](./docs/banner.png) -->
  <img width="410" height="263" alt="image" src="https://github.com/user-attachments/assets/710d2991-ed7d-4c6e-aa5e-ea0c43653a03" />

  <!-- Uncomment and add your banner image path above -->

# 🚀 Agent Skills Collection

### Carga progresiva para agentes de IA: más poder, menos tokens

[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![Agent Skills](https://img.shields.io/badge/Agent%20Skills-Compatible-green)](https://agentskills.io)
[![Cursor](https://img.shields.io/badge/Cursor-Ready-purple)](https://cursor.sh)
[![Claude](https://img.shields.io/badge/Claude-Compatible-orange)](https://claude.ai)

</div>

---

## 📖 Tabla de Contenidos

- [¿Qué son Agent Skills?](#-qué-son-agent-skills)
- [El Problema](#-el-problema)
- [La Solución](#-la-solución)
- [Skills Incluidos](#-skills-incluidos)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Cómo Usar](#-cómo-usar)
- [Cómo Crear un Skill](#-cómo-crear-un-nuevo-skill)
- [Compatibilidad](#-compatibilidad)
- [Mejores Prácticas](#-mejores-prácticas)
- [Recursos](#-recursos)
- [Contribuir](#-contribuir)
- [Licencia](#-licencia)

## 🤔 ¿Qué son Agent Skills?

**Agent Skills** son archivos markdown que enseñan a los agentes de IA workflows especializados, pero **solo se cargan cuando son relevantes**. Es como darle a un agente un manual de procedimientos que solo abre el capítulo exacto que necesita, en el momento exacto que lo necesita.

### 🎯 Características principales

- **Carga progresiva**: Solo cargas lo que necesitas, cuando lo necesitas
- **Estándar abierto**: Funciona en Claude, Cursor, GitHub Copilot, y más
- **Ahorro masivo de tokens**: De 50k+ tokens a ~1k al inicio
- **Workflows consistentes**: El agente sigue tus convenciones, no improvisa
- **Portable**: Escribe una vez, usa en cualquier herramienta compatible

## 😰 El Problema

Imagina esto: conectas varios MCPs (Model Context Protocol) para Jira, Notion, tu base de datos, dbt, etc. Cada uno útil por sí solo. Pero juntos, un problema silencioso:

```
Abres Claude Code → Sin escribir nada → 95k tokens consumidos
```

¿Por qué? Cada MCP carga su metadata completa al inicio: schemas de API, documentación de funciones, ejemplos de uso. Todo "por si acaso" lo necesitas. Y en cada sesión se repite.

**Resultado:** Context window lleno antes de empezar a trabajar.

## ✅ La Solución

Agent Skills usa **progressive disclosure** (divulgación progresiva) en tres niveles:

### Nivel 1: Metadata (siempre cargado)

- Solo `name` y `description` de todos los skills
- **Costo:** ~100 tokens por skill
- Ejemplo: `"pnpm-workflow: Workflow estandarizado para usar pnpm en este proyecto"`

### Nivel 2: Instrucciones completas (cuando es relevante)

- Usuario: "Instala las dependencias"
- Agente evalúa: "Esto requiere pnpm-workflow"
- Lee el `SKILL.md` completo
- **Costo:** <5k tokens (recomendación: mantener bajo 500 líneas)

### Nivel 3: Referencias y scripts (según se necesite)

- Las instrucciones dicen: "usa el template en references/prompts.md"
- Agente lee solo ese archivo
- Los scripts se ejecutan, solo el output entra al context window

**Impacto real:** 10 skills = 1k tokens vs 50k+ tokens con MCPs tradicionales

## 🎨 Skills Incluidos

Este repositorio incluye una colección completa de skills para desarrollo moderno:

### 📦 Package Managers

- **pnpm-extension** - Workflow con pnpm (workspaces, monorepos)
- **npm-extension** - Gestión tradicional con npm
- **bun-extension** - Runtime y package manager moderno

### 💻 Lenguajes de Programación

- **typescript-extension** - TypeScript type-safe y escalable
- **javascript-extension** - JavaScript moderno y mantenible
- **python-extension** - Python limpio y Pythonic
- **rust-extension** - Rust seguro, concurrente y performante
- **golang-extension** - Go idiomático y eficiente

### ⚛️ Frameworks Frontend

- **react-extension** - React con hooks y functional components
- **vue-extension** - Vue 3 con Composition API y TypeScript
- **angular-extension** - Angular moderno con RxJS

### 🎨 Styling

- **css-extension** - CSS mantenible, performante y escalable

### 🔧 Configuración Base

- **.claude/SKILL.md** - Configuración global del proyecto

## 📁 Estructura del Proyecto

```
.claude/
├── SKILL.md                         # Configuración global del proyecto
└── skills/
    ├── typescript-extension/
    │   └── SKILL.md                # Guidelines de TypeScript
    ├── react-extension/
    │   └── SKILL.md                # Best practices de React
    ├── pnpm-extension/
    │   └── SKILL.md                # Workflow de pnpm
    ├── python-extension/
    │   └── SKILL.md                # Guía de Python
    └── [más skills]/
```

Cada skill puede opcionalmente incluir:

```
skill-name/
├── SKILL.md              # Metadata + instrucciones (requerido)
├── references/           # Documentación adicional (opcional)
│   └── examples.md
└── scripts/              # Scripts reutilizables (opcional)
    └── setup.sh
```

## 🚀 Cómo Usar

### 1. Clona o copia los skills a tu proyecto

```bash
# Opción A: Clonar todo el repositorio
git clone https://github.com/tu-usuario/agent-skill.git
cd agent-skill

# Opción B: Copiar solo los skills que necesitas
mkdir -p .claude/skills
cp -r agent-skill/.claude/skills/typescript-extension .claude/skills/
cp -r agent-skill/.claude/skills/react-extension .claude/skills/
```

### 2. Personaliza según tu proyecto

Edita `.claude/SKILL.md` con tus preferencias específicas:

```yaml
---
description: Configuración del proyecto para [TU PROYECTO]
---

## Convenciones del equipo
- Usamos pnpm como package manager
- Alias: `dev` para development server
- Tests requeridos para nuevas features
```

### 3. Usa en tu IDE compatible

Los skills se cargan automáticamente cuando abres:

- Claude Code
- Cursor
- GitHub Copilot
- VS Code con extensión compatible
- Windsurf

### 4. Trabaja normalmente

El agente cargará los skills relevantes automáticamente según el contexto de tu trabajo.

## 📝 Cómo Crear un Nuevo Skill

### Paso 1: Crea la estructura

```bash
mkdir -p .claude/skills/my-new-skill
touch .claude/skills/my-new-skill/SKILL.md
```

### Paso 2: Define metadata e instrucciones

```markdown
---
name: my-new-skill
description: Breve descripción de qué hace este skill (usado para decidir cuándo cargarlo)
globs: "*.ext" # Opcional: patrones de archivos relevantes
---

# My New Skill

## When to Use This Skill

Usa este skill cuando:

- [Condición 1]
- [Condición 2]

## Instrucciones

Cuando el usuario pida [ACCIÓN]:

1. Paso específico 1
2. Paso específico 2
3. Paso específico 3

## Mejores prácticas

- Práctica 1
- Práctica 2
- Práctica 3
```

### Paso 3: Agrega recursos opcionales (si los necesitas)

```bash
# Referencias adicionales
mkdir -p .claude/skills/my-new-skill/references
echo "# Ejemplos" > .claude/skills/my-new-skill/references/examples.md

# Scripts reutilizables
mkdir -p .claude/skills/my-new-skill/scripts
echo "#!/bin/bash\necho 'Script'" > .claude/skills/my-new-skill/scripts/process.sh
chmod +x .claude/skills/my-new-skill/scripts/process.sh
```

### Ejemplo completo

```markdown
---
name: api-testing
description: Workflow para testing de APIs con Postman y Jest
globs: "*.test.ts"
---

# API Testing

## When to Use This Skill

Usa este skill cuando:

- Necesites crear tests de API
- Trabajes con archivos \*.test.ts
- El usuario mencione testing o endpoints

## Instrucciones

Cuando el usuario pida crear tests de API:

1. **Identificar el endpoint**: Extrae la URL y método HTTP
2. **Usar template**: Consulta `references/test-template.md`
3. **Escribir test cases**:
   - Happy path (200/201)
   - Error cases (400/401/404/500)
   - Edge cases (validaciones)
4. **Ejecutar**: `pnpm test` para verificar

## Best Practices

- Usa beforeEach para setup común
- Mock servicios externos
- Verifica status codes y response shape
- Incluye tests de validación de datos
```

## 🔌 Compatibilidad

Agent Skills es un estándar abierto soportado por:

| Herramienta                     | Estado      | Notas           |
| ------------------------------- | ----------- | --------------- |
| Claude (Claude.ai, Claude Code) | ✅ Completo | Soporte nativo  |
| Cursor                          | ✅ Completo | Soporte nativo  |
| GitHub Copilot                  | ✅ Completo | Soporte nativo  |
| VS Code Insiders                | ✅ Completo | Con extensión   |
| Windsurf                        | ✅ Completo | Soporte nativo  |
| OpenAI Codex                    | ✅ Completo | CLI y extensión |
| Goose                           | ✅ Completo | -               |
| Amp                             | ✅ Completo | -               |
| OpenCode                        | ✅ Completo | -               |

## 💡 Mejores Prácticas

### ✅ Hacer

- **Descripción específica**: El agente la usa para decidir cuándo cargar el skill
- **Instrucciones claras**: Pasos numerados y concisos
- **Mantener SKILL.md bajo 500 líneas**: Usa subdirectorios para contenido extenso
- **Un skill, un propósito**: Enfoque en una tarea específica
- **Scripts para lógica crítica**: Si no debe improvisarse, usa un script
- **Usar `globs`**: Ayuda al agente a saber cuándo es relevante

### ❌ Evitar

- Poner toda la documentación en SKILL.md (usa `references/`)
- Skills muy generales o ambiguos
- Duplicar información entre skills
- Instrucciones vagas o sin pasos específicos
- Scripts sin hacer ejecutables (`chmod +x`)

### 📏 Reglas de oro

1. **Metadata primero**: `name` y `description` deben ser claros
2. **Instrucciones concisas**: Si pasa de 500 líneas, divide el skill
3. **Referencias opcionales**: Mueve contenido extenso a `references/`
4. **Test tus skills**: Prueba que el agente los carga correctamente
5. **Documenta el "cuándo"**: Sé explícito sobre cuándo usar el skill

## 📚 Recursos

### Documentación Oficial

- 📖 **Especificación completa**: [agentskills.io](https://agentskills.io)
- 🏗️ **GitHub**: [anthropics/agentskills](https://github.com/anthropics/agentskills)
- 🐧 **Linux Foundation**: Bajo Agentic AI Foundation

### Artículos y Tutoriales

- 📝 [Agent Skills: más poder, menos tokens](https://www.tacosdedatos.com/p/agent-skills-mas-poder-menos-tokens) - Artículo completo en español
- 📚 [Model Context Protocol (MCP)](https://modelcontextprotocol.io) - Estándar complementario
- 🎓 [Anthropic Docs](https://docs.anthropic.com) - Documentación de Claude

### Comunidad

- 💬 Discord de Anthropic
- 🐦 Twitter: [@AnthropicAI](https://twitter.com/AnthropicAI)
- 📰 Newsletter: This Week in AI

## 🤝 Contribuir

Las contribuciones son bienvenidas! Aquí hay algunas formas de contribuir:

### Reportar Issues

¿Encontraste un problema? [Abre un issue](../../issues/new)

### Agregar o Mejorar Skills

1. Fork el repositorio
2. Crea un branch para tu skill: `git checkout -b skill/my-new-skill`
3. Sigue la estructura estándar de skills
4. Asegúrate de que tu SKILL.md sea claro y conciso
5. Commit: `git commit -m "Add: [nombre-skill] - descripción breve"`
6. Push: `git push origin skill/my-new-skill`
7. Abre un Pull Request

### Guías de Contribución

- **Skills de calidad**: Instrucciones claras y probadas
- **Documentación**: Explica el "por qué" no solo el "qué"
- **Ejemplos**: Incluye ejemplos prácticos cuando sea posible
- **Mantener conciso**: <500 líneas por SKILL.md
- **Idioma**: Preferible en inglés para alcance global, pero se aceptan ambos

## 📊 Comparación: Antes vs Después

### ❌ Antes (MCPs tradicionales)

```
Context Window al inicio: 95,000 tokens
- MCP Jira: 15k tokens
- MCP Notion: 18k tokens
- MCP Base de datos: 22k tokens
- MCP dbt: 25k tokens
- Otros MCPs: 15k tokens

Tokens disponibles para trabajar: 105,000 tokens (de 200k)
El agente "olvida" contexto rápidamente
```

### ✅ Después (Agent Skills)

```
Context Window al inicio: 1,000 tokens
- 10 skills × ~100 tokens metadata = 1,000 tokens

Tokens disponibles para trabajar: 199,000 tokens (de 200k)
Skills se cargan solo cuando son necesarios (<5k cada uno)
El agente mantiene todo el contexto de tu sesión
```

**Ahorro:** 94,000 tokens (94% de reducción)

## 🎯 Casos de Uso

### Para Desarrolladores Individuales

- Documenta tus preferencias personales (aliases, comandos)
- Reemplaza MCPs pesados con skills ligeros
- Mantén consistencia entre proyectos

### Para Equipos

- Estandariza workflows del equipo
- Onboarding más rápido (los agentes siguen tus convenciones)
- Code reviews automatizados con tus estándares

### Para Empresas

- Políticas de seguridad y compliance
- Integraciones con herramientas internas
- Documentación técnica siempre actualizada

## 🌟 Ventajas Clave

| Ventaja                 | Descripción                          | Impacto                           |
| ----------------------- | ------------------------------------ | --------------------------------- |
| 💰 **Ahorro de tokens** | 50k+ → ~1k tokens al inicio          | 94% menos tokens desperdiciados   |
| ⚡ **Consistencia**     | Workflows estandarizados             | No más improvisación del agente   |
| 🔄 **Portabilidad**     | Escribe una vez, usa en todas partes | Compatible con múltiples IDEs     |
| 🧩 **Modularidad**      | Skills independientes                | Reutilizable entre proyectos      |
| 📈 **Escalabilidad**    | Agrega skills sin llenar el context  | Infinitos skills posibles         |
| 🎯 **Precisión**        | Agente carga solo lo relevante       | Menos errores, mejores resultados |

## 📜 Licencia

ISC License - ver [LICENSE](LICENSE) para más detalles.

---

<div align="center">

**¿Te resultó útil? Dale una ⭐ al repo!**

Hecho con ❤️ por la comunidad de Agent Skills

[Reportar Bug](../../issues) · [Solicitar Feature](../../issues) · [Discusiones](../../discussions)

</div>
