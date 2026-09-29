---
title: Microsoft Foundry Setup
description: Attach the TI Mindmap HUB MCP server to a Microsoft Foundry agent using a key-based project connection.
---

# Microsoft Foundry Setup

Connect a **Microsoft Foundry Agent Service** agent to TI Mindmap HUB so it can use threat intelligence tools while reasoning.

## Prerequisites

- A Microsoft Foundry project, with the **Foundry User** role (and **Foundry Project Manager** to create connections)
- A TI Mindmap HUB API key from **My Profile → MCP Server API Keys** — see [MCP Server API Keys](../using-the-platform/account-and-access.md#mcp-server-api-keys)
- MCP endpoint: `https://mcp.ti-mindmap-hub.com/mcp`

## 1. Store the API key in a project connection

Keep the key in a **project connection** instead of your code. With the Azure Developer CLI:

```bash
azd ai project set "https://<account>.services.ai.azure.com/api/projects/<project>"

azd ai connection create ti-mindmap-hub \
  --kind remote-tool \
  --target https://mcp.ti-mindmap-hub.com/mcp \
  --auth-type custom-keys \
  --custom-key "X-API-Key=<your tim_ key>"
```

You can also create an equivalent key-based connection in the Foundry portal. If a tool only lets you set an `Authorization` header, use `Authorization=Bearer <your tim_ key>` — the server accepts API keys in both forms.

## 2. Add the MCP tool to an agent (Python)

```python
from azure.identity import DefaultAzureCredential
from azure.ai.projects import AIProjectClient
from azure.ai.projects.models import PromptAgentDefinition, MCPTool

project = AIProjectClient(
    endpoint="https://<account>.services.ai.azure.com/api/projects/<project>",
    credential=DefaultAzureCredential(),
)

ti_tool = MCPTool(
    server_label="ti_mindmap_hub",
    server_url="https://mcp.ti-mindmap-hub.com/mcp",
    project_connection_id="ti-mindmap-hub",
    require_approval="always",
    allowed_tools=[
        "list_reports", "get_report_content", "search_ioc",
        "search_cve", "get_latest_briefing", "kg_search_entities", "kg_get_entity_cluster",
    ],
)

agent = project.agents.create_version(
    agent_name="cti-analyst",
    definition=PromptAgentDefinition(
        model="<your-model-deployment>",
        instructions=(
            "You are a CTI analyst. Use TI Mindmap HUB tools to answer questions. "
            "Cite report titles and links. Flag that outputs are AI-generated."
        ),
        tools=[ti_tool],
    ),
)
```

- `allowed_tools` limits the agent to the tools it needs (see [the full list](server.md#available-tools-27))
- `require_approval="always"` makes the run pause for approval of each tool call — handle `mcp_approval_request` items in your app, or relax it once you trust the setup

For the full request/approval loop, see Microsoft Learn: [Connect agents to MCP servers](https://learn.microsoft.com/azure/foundry/agents/how-to/tools/model-context-protocol).

## 3. Try it

```text
List this week's reports about ransomware, then show the IOCs of the most relevant one.
```

## Tips

- Use a dedicated API key per agent or environment, and rotate it with **Regenerate** in **My Profile**
- Treat tool output as untrusted input — it can contain text from third-party reports
- You can also bundle TI Mindmap HUB into a **Foundry Toolbox** to reuse it across agents

## Related

- [MCP Server](server.md) — tools and protocol
- [Microsoft Copilot Studio Setup](copilot-studio.md) — low-code alternative
