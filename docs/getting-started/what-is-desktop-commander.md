---
title: "What is Desktop Commander and how do I install it?"
sidebarTitle: "Overview and install"
description: "Desktop Commander Remote for ChatGPT, Claude and other web apps, Desktop Commander (local MCP) for AI apps on your computer, and how to install each."
order: 1
related:
  - /devices/connect-computer
  - /local-mcp/install-claude-desktop-cowork-claude-code
  - /getting-started/what-can-i-do
---

# What is Desktop Commander and how do I install it?

Desktop Commander gives your AI app access to your computer. It can read and edit files, run terminal commands and search your projects, so the AI does the work instead of telling you what to type.

There are two versions. Which one you need depends on where your AI app runs.

| Your AI app runs | Install | Examples |
| --- | --- | --- |
| On the web | Desktop Commander Remote | ChatGPT, Claude on the web, and other AI apps that support remote MCP connectors |
| On your computer | Desktop Commander (local MCP) | Claude Desktop, Cowork, Cursor, Claude Code, Codex, and other apps that support MCP servers |

Claude Desktop can use either version: Desktop Commander Remote to work on other computers too, or Desktop Commander (local MCP) for the computer it runs on.

## What it can do

Both versions have the same core tools:

- **Files:** read, write, move and organize files and folders
- **Terminal:** run commands and scripts, and keep long running processes going
- **Code editing:** make targeted changes inside files
- **Search:** find files by name or by content across a project

With Desktop Commander Remote you can also connect several computers and servers to one account.

## Install Desktop Commander Remote

For ChatGPT, Claude and other web apps.

**You need:** a Windows, Mac or Linux computer with internet access. Setup installs Node.js if it is missing, and asks you first.

### 1. Add Desktop Commander to your AI app

In ChatGPT and Claude, Desktop Commander Remote is listed as Remote Desktop Commander.

**ChatGPT:** open [Remote Desktop Commander in ChatGPT](https://chatgpt.com/apps/remote-desktop-commander/asdk_app_6a057d268ebc81919918d37eec718425) and connect it. You can manage it later under Settings › Apps.

**Claude:** open [Remote Desktop Commander in Claude](https://claude.ai/customize/connectors/directory/remote-desktop-commander) and connect it. It works on the web and in the Claude desktop app. If you can't find it, add a custom connector under Settings › Connectors with the URL `https://mcp.desktopcommander.app/mcp`.

**Other AI apps:** add a remote MCP connector with the URL `https://mcp.desktopcommander.app/mcp`, then sign in when asked.

### 2. Create your account

Sign up with Google or your email when asked. Use the same email every time you sign in to Desktop Commander, on every computer and when you upgrade to Pro.

### 3. Connect your computer

The setup page shows the easiest option for your system:

**Windows:** [download DesktopCommander-Remote.cmd](https://mcp.desktopcommander.app/remote-windows.cmd) and double click it, or paste this in PowerShell:

```powershell
irm -ErrorAction Stop https://raw.githubusercontent.com/wonderwhy-er/DesktopCommanderMCP/main/scripts/remote/remote-windows.ps1 | iex
```

**Mac:** paste this in Terminal:

```bash
curl -fsSL https://raw.githubusercontent.com/wonderwhy-er/DesktopCommanderMCP/main/scripts/remote/remote-macos.sh | sh
```

**Linux:** paste this in your terminal:

```bash
curl -fsSL https://raw.githubusercontent.com/wonderwhy-er/DesktopCommanderMCP/main/scripts/remote/remote-linux.sh | sh
```

If Node.js is missing, setup asks whether to install it. Type Yes or press Enter. You can [view the setup scripts on GitHub](https://github.com/wonderwhy-er/DesktopCommanderMCP/tree/main/scripts/remote) before you run them.

**npx (advanced).** If you already have Node.js 22.12 or newer, you can start Desktop Commander Remote with npx instead. On Windows, paste this in PowerShell:

```powershell
npx.cmd @wonderwhy-er/desktop-commander@latest remote
```

On a Mac or Linux, paste this in your terminal:

```bash
npx @wonderwhy-er/desktop-commander@latest remote
```

### 4. Verify your device

A page opens in your browser. Check that the code on the page matches the code in your terminal, then click **Verify device**. Keep the terminal window open.

If the codes don't match, don't verify. Close the page and run the setup command again.

### 5. Try it

Go back to ChatGPT or Claude and ask: "Use Desktop Commander Remote to find the 5 largest files in my Downloads folder."

Desktop Commander Remote works only while it runs in the terminal.

You can see and manage your devices at [mcp.desktopcommander.app](https://mcp.desktopcommander.app/). If your computer shows as offline or your AI app can't reach it, see [Why can't Desktop Commander Remote find my computer?](/troubleshooting/remote-cant-find-computer)

## Install Desktop Commander (local MCP)

For Claude Desktop, Cowork, Cursor and other AI apps on your computer. Desktop Commander (local MCP) is free and open source. It needs Node.js on your computer: download the Windows (.msi) or Mac (.pkg) installer from [nodejs.org](https://nodejs.org/en/download) and run it.

### Claude Desktop and Cowork

Open Terminal (Mac) or PowerShell (Windows) and run:

```bash
npx @wonderwhy-er/desktop-commander@latest setup
```

On a Mac without Node.js, run this instead. It installs Node.js for you:

```bash
curl -fsSL https://raw.githubusercontent.com/wonderwhy-er/DesktopCommanderMCP/refs/heads/main/install.sh | bash
```

Then restart Claude Desktop and ask: "What can I do with Desktop Commander?"

For other ways to install, including Claude Code, see [How do I install Desktop Commander (local MCP) in Claude Desktop, Cowork or Claude Code?](/local-mcp/install-claude-desktop-cowork-claude-code)

### Other apps

For Cursor, Windsurf, VS Code, Claude Code, Codex and other apps, add Desktop Commander as an MCP server that runs `npx -y @wonderwhy-er/desktop-commander@latest`. The [GitHub README](https://github.com/wonderwhy-er/DesktopCommanderMCP#how-to-install) has the steps for each app.

Desktop Commander (local MCP) updates itself when you restart your AI app. To remove it, run `npx @wonderwhy-er/desktop-commander@latest remove`.
