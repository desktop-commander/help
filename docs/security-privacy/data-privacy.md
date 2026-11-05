---
title: "Is my data private? What Desktop Commander sends and stores"
sidebarTitle: "Data and privacy"
description: "How data moves with Desktop Commander Remote and Desktop Commander (local MCP), what our servers see, what we store and for how long, and how to limit it."
order: 1
related:
  - /security-privacy/use-safely-limit-access
  - /account-billing/delete-account
---

# Is my data private? What Desktop Commander sends and stores

Desktop Commander runs commands and opens files on your own computer. What leaves your computer depends on which version you use, and on your AI app.

|  | Desktop Commander (local MCP) | Desktop Commander Remote |
| --- | --- | --- |
| Where commands run | Your computer | Your computer |
| Goes through our servers | No | Yes, to reach your computer and come back |
| Tool calls and results stored by us | No | Only while the call runs, deleted shortly after it finishes |
| Account with us | No | Yes: your email and connected computers |
| Usage data we receive | Usage data linked only to a random ID, which you can turn off | Tool names, timing and monthly counts, without arguments or results |

## Your AI provider sees what the AI works with

In both versions, everything the AI opens or runs through Desktop Commander becomes part of your chat: file contents it reads, command output, error messages. Your AI provider, such as OpenAI or Anthropic, receives it and handles it under its own privacy policy and your settings there.

- Check your AI app's data settings, for example whether your chats can be used to train models
- Limit what the AI can open with allowed folders. See [How do I use Desktop Commander safely and limit its access?](/security-privacy/use-safely-limit-access)
- If nothing may leave your computer, use Desktop Commander (local MCP) with an AI app that runs a local model, and turn off telemetry

## Desktop Commander Remote: what our servers see and store

ChatGPT or Claude sends each tool call to our servers, which pass it to your computer and send the result back.

- **Tool calls and results.** Commands, file paths, file contents and output pass through our servers so they can be delivered. We keep them only while the call runs and delete them shortly after it finishes. We don't use them for anything else
- **Your account.** Your email, your name and picture if you sign in with Google, and sign in details such as the IP address, for security
- **Your computers.** Each computer's name, which tools it supports, whether it is online and when it was last seen
- **Usage.** Which tools were called, when, how long they took and whether they worked, plus your monthly tool call count for your plan. Not the arguments or results
- **Website and dashboard.** Product analytics and error reports, to fix problems and improve the service
- **Ad measurement.** If you came from one of our ads in ChatGPT and agreed to marketing, we may tell OpenAI that you signed up, connected a computer or made your first tool call, using hashed IDs. Never your files, commands or results

Our main servers are in the EU. Some service providers may process data elsewhere, as listed in the privacy policy. Data is encrypted in transit.

## Desktop Commander (local MCP): what we receive

- No tool calls, files or command output
- Usage data linked only to a random ID, not to your name or email: which features are used, your operating system and versions, file types and sizes, command names such as python (without arguments), and errors with paths removed
- No file paths, file contents, command arguments or usernames

To turn off usage data, ask your AI: "Disable Desktop Commander telemetry". Or set `"telemetryEnabled": false` in the settings file, as described in [How do I use Desktop Commander safely and limit its access?](/security-privacy/use-safely-limit-access)

The same applies to Desktop Commander running on each computer connected to Desktop Commander Remote.

## On your computer

Desktop Commander keeps a log of tool calls on the computer where they ran, in the `.claude-server-commander` folder in your home folder. It stays on your computer and isn't sent to us.

## Delete your data

- **Remove a computer:** revoke it on [mcp.desktopcommander.app](https://mcp.desktopcommander.app/)
- **Delete your Desktop Commander Remote account:** email [support@desktopcommander.app](mailto:support@desktopcommander.app). We delete your data within 30 days, unless the law requires us to keep it
- **Desktop Commander (local MCP):** uninstall it and delete the `.claude-server-commander` folder in your home folder

## Privacy policies

- [Desktop Commander Remote privacy policy](https://legal.desktopcommander.app/#/remote_privacy_policy)
- [Desktop Commander (local MCP) privacy policy](https://legal.desktopcommander.app/#/privacy_desktop_commander_mcp)
