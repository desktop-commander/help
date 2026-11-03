---
title: "How do I install Desktop Commander (local MCP) in Claude Desktop, Cowork or Claude Code?"
sidebarTitle: "Install in Claude apps"
description: "All the ways to add Desktop Commander (local MCP) to Claude Desktop, Cowork and Claude Code, plus fixes, updates and removal."
order: 1
related:
  - /getting-started/what-is-desktop-commander
  - /security-privacy/use-safely-limit-access
---

# How do I install Desktop Commander (local MCP) in Claude Desktop, Cowork or Claude Code?

Desktop Commander (local MCP) runs on the same computer as your AI app. Claude Desktop and Cowork share one setup, so you install it once for both. Claude Code has its own setup.

**You need:** Node.js 22.12 or newer. Check with `node --version`, or get the installer from [nodejs.org](https://nodejs.org/en/download). On a Mac, the install script below installs Node.js for you.

## Claude Desktop and Cowork

**From the terminal (recommended).** Open Terminal (Mac) or PowerShell (Windows) and run:

```bash
npx @wonderwhy-er/desktop-commander@latest setup
```

On a Mac without Node.js, run this instead:

```bash
curl -fsSL https://raw.githubusercontent.com/wonderwhy-er/DesktopCommanderMCP/refs/heads/main/install.sh | bash
```

**From Claude's directory.** In Claude Desktop, open **Customize**, browse connectors or plugins, search for Desktop Commander and click **Install**. Pick **Desktop Commander**, not **Remote Desktop Commander**, which is the version for ChatGPT and Claude on the web.

Then fully quit Claude Desktop (on a Mac, quit from the menu bar), open it again and ask: "What can I do with Desktop Commander?"

**Prefer to edit the config file?** Add this to `claude_desktop_config.json`, next to any servers already in it:

```json
{
  "mcpServers": {
    "desktop-commander": {
      "command": "npx",
      "args": ["-y", "@wonderwhy-er/desktop-commander@latest"]
    }
  }
}
```

The file is at `~/Library/Application Support/Claude/claude_desktop_config.json` on a Mac, `%APPDATA%\Claude\claude_desktop_config.json` on Windows and `~/.config/Claude/claude_desktop_config.json` on Linux.

## Claude Code

Run this in your terminal to add Desktop Commander for all your projects:

```bash
claude mcp add --scope user desktop-commander -- npx -y @wonderwhy-er/desktop-commander@latest
```

Or install it as a plugin inside Claude Code:

```txt
/plugin marketplace add wonderwhy-er/DesktopCommanderMCP
/plugin install desktop-commander@desktop-commander
```

Already set up in Claude Desktop? On a Mac or in WSL, run `claude mcp add-from-claude-desktop` to copy it over.

Installing in Claude Desktop doesn't add Desktop Commander to Claude Code, and the other way around. Install it in each app you use.

## If something doesn't work

- **The setup command fails:** check that `node --version` shows 22.12 or newer, then run the command again. You can also edit the config file by hand
- **Claude can't find Desktop Commander:** fully quit and reopen Claude Desktop. On a Mac, check System Settings › Privacy & Security in case it asks you to allow something
- **It works in one Claude app but not another:** each app needs its own install, see above

## Update or remove

Desktop Commander (local MCP) updates itself each time you restart your AI app.

- **Claude Desktop and Cowork:** run `npx @wonderwhy-er/desktop-commander@latest remove`. It backs up your config first. If you installed from Claude's directory, remove it under Customize
- **Claude Code:** run `claude mcp remove desktop-commander`, or `/plugin uninstall desktop-commander@desktop-commander` if you installed the plugin

To limit which folders and commands it can use, see [How do I use Desktop Commander safely and limit its access?](/security-privacy/use-safely-limit-access)
