---
title: "How do I use Desktop Commander safely and limit its access?"
sidebarTitle: "Safety and access limits"
description: "Limit Desktop Commander to certain folders, block commands, control your computers and follow a few simple habits. For Remote and local MCP."
order: 2
related:
  - /security-privacy/data-privacy
  - /troubleshooting/tool-call-blocked-by-safety-checks
---

# How do I use Desktop Commander safely and limit its access?

By default, Desktop Commander can open any file and run any command that your user account can. You can narrow that down with allowed folders and blocked commands, and a few habits keep you in control. Everything here works for both Desktop Commander Remote and Desktop Commander (local MCP).

## What Desktop Commander can access

- It runs as your user account, so it reaches the same files and commands you do, and no more
- Admin commands such as sudo are blocked by default
- Until you set allowed folders, it can work with files anywhere on your computer
- With Desktop Commander Remote, it only works on a computer while it is running in that computer's terminal

## Limit it to certain folders

Settings are saved on each computer. With Desktop Commander Remote, set them on every computer you connect.

Start a new chat, not one where the AI is in the middle of a task, and ask:

> Set Desktop Commander allowed directories to only C:\Users\me\Projects

On a Mac or Linux, use a path like /Users/me/Projects. You can list several folders. To check what is set, ask:

> Show my Desktop Commander settings

To give full access again, set allowed directories to an empty list.

Allowed folders apply when the AI reads, writes and searches files. Terminal commands can still reach other folders, so for a hard limit see [Stronger isolation](#stronger-isolation) below.

## Block commands

Desktop Commander comes with a list of commands it refuses to run, including sudo, shutdown, reboot, format and diskpart, and Windows commands such as reg and net. To add your own:

> Add rm and git to Desktop Commander blocked commands

Blocking works by command name, so blocking git blocks every git command.

## Change settings in the file

You can also edit the settings file on each computer:

- Mac and Linux: `~/.claude-server-commander/config.json`
- Windows: `%USERPROFILE%\.claude-server-commander\config.json`

Change `allowedDirectories` or `blockedCommands`, then restart your AI app if you use Desktop Commander (local MCP), or run the setup command again if you use Desktop Commander Remote.

## Keep approvals on

ChatGPT, Claude and other AI apps can ask you to approve actions that change files or run commands. Read what the AI wants to do before you allow it.

If the AI asks to change Desktop Commander settings while it works on a task, say no unless you asked for it. It may try this when an allowed folder gets in its way.

## Control your computers (Desktop Commander Remote)

- **Stop a computer:** press Ctrl+C in its terminal. It goes offline and nothing reaches it until you start the command again
- **Remove a computer:** remove or revoke it on [mcp.desktopcommander.app](https://mcp.desktopcommander.app/). **Revoke all devices** disconnects every computer at once
- **Sign out on a computer:** run `npx @wonderwhy-er/desktop-commander@latest remote --logout`
- **Protect your AI account:** anyone who can use your ChatGPT or Claude account can use your connected computers, so turn on two factor authentication there
- **Clean up:** remove computers and AI connections you no longer use

## Stronger isolation

Allowed folders and blocked commands prevent mistakes. They are not a wall: a command or script can get around them. If the AI must not reach the rest of your computer:

- Run Desktop Commander (local MCP) in Docker and share only the folders it needs. See the Docker option in the [GitHub README](https://github.com/wonderwhy-er/DesktopCommanderMCP#how-to-install)
- Use a virtual machine, a separate user account with access to only the files it needs, or a separate computer, and connect only that to Desktop Commander

## Good habits

- **Start with read only tasks:** "Look at this folder and tell me what is in it. Don't change anything."
- **Ask for a plan first:** "Show me the plan before you change anything."
- **Test small:** try one folder or a copy before running on everything
- **Keep backups:** back up important files and use Git for projects
- **Keep secrets out of the chat:** don't paste passwords, API keys or private keys
- **Be careful with content from strangers:** files, web pages and emails can contain hidden instructions for the AI. Check what it plans to do after reading them

## See what the AI did

Every action is logged on the computer where it ran, for Desktop Commander Remote too:

- Ask: "Show my recent Desktop Commander tool calls"
- Or open `claude_tool_call.log` in the `.claude-server-commander` folder in your home folder

With Desktop Commander Remote, tool calls and results pass through Desktop Commander's servers only to deliver them, and are deleted shortly after each call finishes.
