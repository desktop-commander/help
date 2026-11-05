---
title: "How do I connect a computer to Desktop Commander Remote?"
sidebarTitle: "Connect a computer"
description: "Connect a Windows, Mac or Linux computer to Desktop Commander Remote, keep it online, and stop or remove it when you want."
order: 1
related:
  - /troubleshooting/remote-cant-find-computer
  - /security-privacy/use-safely-limit-access
---

# How do I connect a computer to Desktop Commander Remote?

Run one setup command on the computer, verify it in your browser, and keep the terminal open. This article is for Desktop Commander Remote, which you use from ChatGPT, Claude on the web or another web app.

## Before you start

- Desktop Commander Remote is added to your AI app. See [What is Desktop Commander and how do I install it?](/getting-started/what-is-desktop-commander)
- A Windows, Mac or Linux computer with internet access. Setup installs Node.js if it is missing, and asks you first

## Connect your computer

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

## Verify your device

A page opens in your browser. Check that the code on the page matches the code in your terminal, then click **Verify device**. Keep the terminal window open.

If the codes don't match, don't verify. Close the page and run the setup command again.

## What you should see

The terminal shows **Device ready**. Go back to ChatGPT or Claude and ask: "Use Desktop Commander Remote to find the 5 largest files in my Downloads folder."

You can see and manage your devices at [mcp.desktopcommander.app](https://mcp.desktopcommander.app/).

## Stay online

Desktop Commander Remote works only while it runs in the terminal.

- Keep the terminal window open while the AI works on the computer
- On a Mac, Desktop Commander keeps the computer awake while it runs. On Windows and Linux, set your power settings so the computer doesn't sleep
- If your internet drops for a moment, Desktop Commander reconnects by itself within a couple of minutes
- After a restart, run the same setup command again. On Windows, if you created the **Desktop Commander Remote** shortcut during setup, double click it instead. You usually don't need to verify the computer again

## Use more than one computer

When more than one computer is online, the AI needs to know which one to work on. Tell it by name, for example "Use my MacBook". To see the names, ask "List my Desktop Commander devices" or open [mcp.desktopcommander.app](https://mcp.desktopcommander.app/).

## Stop, remove or sign out

- **Stop a computer:** press Ctrl+C in its terminal. It goes offline and nothing reaches it until you start the command again
- **Remove a computer:** remove or revoke it on [mcp.desktopcommander.app](https://mcp.desktopcommander.app/). **Revoke all devices** disconnects every computer at once
- **Sign out on a computer:** run `npx @wonderwhy-er/desktop-commander@latest remote --logout`

## If it didn't work

- [Why can't Desktop Commander Remote find my computer?](/troubleshooting/remote-cant-find-computer)
