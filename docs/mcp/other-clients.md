---
title: Other MCP Clients
description: Connect Cursor, Claude Code, Claude Desktop (legacy bridge), and custom Python or HTTP clients to the TI Mindmap HUB MCP server.
---

# Other MCP Clients

Any client that supports **remote MCP servers over HTTP** can use TI Mindmap HUB. Key-based clients send your API key in the `X-API-Key` header.

| Setting | Value |
|---------|-------|
| Endpoint | `https://mcp.ti-mindmap-hub.com/mcp` |
| Transport | HTTP with SSE (streamable HTTP) |
| Header | `X-API-Key: tim_…` |
| Key | **My Profile → MCP Server API Keys** — see [MCP Server API Keys](../using-the-platform/account-and-access.md#mcp-server-api-keys) |

---

## Cursor

Add the server to `~/.cursor/mcp.json` (all projects) or `.cursor/mcp.json` (one project):

```json
{
  "mcpServers": {
    "ti-mindmap": {
      "url": "https://mcp.ti-mindmap-hub.com/mcp",
      "headers": {
        "X-API-Key": "tim_your_api_key_here"
      }
    }
  }
}
```

Restart Cursor and check the MCP settings page for the `ti-mindmap` server and its tools.

---

## Claude Code

```bash
claude mcp add --transport http ti-mindmap https://mcp.ti-mindmap-hub.com/mcp \
  --header "X-API-Key: tim_your_api_key_here"
```

Run `claude mcp list` to verify, then ask for example: *"Use ti-mindmap to get the latest weekly briefing."*

---

## Claude Desktop (legacy bridge)

Claude now supports a native OAuth connector — see [Claude Setup](claude.md). If you need a local, key-based setup, use the stdio bridge [`mcp-bridge.js`](https://github.com/TI-Mindmap-HUB-Org/ti-mindmap-hub-research/blob/main/mcp-integration/mcp-bridge.js) (requires Node.js 18+):

```json
{
  "mcpServers": {
    "ti-mindmap": {
      "command": "node",
      "args": ["/path/to/mcp-bridge.js"],
      "env": {
        "TI_MINDMAP_API_KEY": "tim_your_api_key_here"
      }
    }
  }
}
```

Config file: `%APPDATA%\Claude\claude_desktop_config.json` (Windows) or `~/Library/Application Support/Claude/claude_desktop_config.json` (macOS). Restart Claude Desktop afterwards.

---

## Python (MCP SDK)

```python
import asyncio, os
from mcp import ClientSession
from mcp.client.streamable_http import streamablehttp_client

URL = "https://mcp.ti-mindmap-hub.com/mcp"
HEADERS = {"X-API-Key": os.environ["TI_MINDMAP_API_KEY"]}

async def main():
    async with streamablehttp_client(URL, headers=HEADERS) as (read, write, _):
        async with ClientSession(read, write) as session:
            await session.initialize()
            tools = await session.list_tools()
            print([t.name for t in tools.tools])
            result = await session.call_tool(
                "list_reports", {"search": "ransomware", "time_range": "7d", "limit": 5}
            )
            print(result.content)

asyncio.run(main())
```

---

## Raw HTTP

See [MCP Server → Protocol Details](server.md#protocol-details) for `initialize` and `tools/call` examples with `curl`-style requests.

---

## Security Checklist

- Never commit API keys; use environment variables or a secret store
- Use one key per tool or environment so you can revoke them independently
- Keys expire after 365 days — regenerate them from **My Profile**
- Treat tool results as untrusted text from third-party reports
