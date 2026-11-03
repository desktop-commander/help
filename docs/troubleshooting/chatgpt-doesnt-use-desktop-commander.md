---
title: "Why doesn't ChatGPT use Desktop Commander?"
sidebarTitle: "ChatGPT doesn't use it"
description: "For Desktop Commander Remote in ChatGPT: ChatGPT doesn't use the app, asks you to run commands yourself, or stops after a few seconds. What to check and try."
order: 3
related:
  - /troubleshooting/remote-cant-find-computer
  - /troubleshooting/tool-call-blocked-by-safety-checks
  - /getting-started/what-can-i-do
---

# Why doesn't ChatGPT use Desktop Commander?

This article is for Desktop Commander Remote users in ChatGPT.

ChatGPT decides for each message whether to use an app. Sometimes it doesn't use Desktop Commander, even when it is connected and your computer is online. This usually happens on ChatGPT's side and isn't a Desktop Commander outage.

## What you see

- ChatGPT says it can't access your computer, or asks you to run commands or send screenshots yourself
- It answers in plain text instead of doing the work
- A request runs for a few seconds and then stops
- It works in some chats but not in others
- It suggests switching to Work or Codex. You don't need to: Desktop Commander works in a normal chat

## First, check the connection

- Your computer shows **Online** at [mcp.desktopcommander.app](https://mcp.desktopcommander.app/). If it doesn't, see [Why can't Desktop Commander Remote find my computer?](/troubleshooting/remote-cant-find-computer)
- Desktop Commander is connected in ChatGPT under Settings › Apps › Remote Desktop Commander

If the AI says you've reached this month's usage, or that a tool call was blocked by OpenAI's safety checks, that is a different problem. See [Why do I still see the usage limit after upgrading to Pro?](/troubleshooting/usage-limit-after-upgrading) or [Why was my tool call blocked by OpenAI's safety checks?](/troubleshooting/tool-call-blocked-by-safety-checks)

## Then try these

1. **Name the app in your message.** For example: "Use Remote Desktop Commander to list the files in my Downloads folder. Don't change anything." If your ChatGPT lets you pick an app from the message box, choose Remote Desktop Commander there.
2. **Start small.** Try a short read only request like the one above before a big task.
3. **Start a new chat.** One chat can stop using tools while others still work.
4. **Add an instruction.** In your project instructions or custom instructions, add: "Use Remote Desktop Commander for anything that needs my files, terminal or computer. Don't ask me to run commands or send screenshots." This helps, but doesn't guarantee it.
5. **Try the other ChatGPT app.** If you use the website, try the desktop app, or the other way around.
6. **Wait and try again.** If it worked earlier and stopped in every chat, it may be a temporary problem on ChatGPT's side. Check [status.openai.com](https://status.openai.com/), wait a while, then try in one chat.
