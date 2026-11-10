---
title: "Why was my tool call blocked by OpenAI's safety checks?"
sidebarTitle: "Blocked by safety checks"
description: "For Desktop Commander Remote in ChatGPT: ChatGPT sometimes blocks legitimate tool calls before they reach your computer. What to try and how to report it."
order: 4
related:
  - /troubleshooting/chatgpt-doesnt-use-desktop-commander
  - /security-privacy/use-safely-limit-access
---

# Why was my tool call blocked by OpenAI's safety checks?

This article is for Desktop Commander Remote users in ChatGPT.

This message comes from ChatGPT, not from Desktop Commander. OpenAI checks tool calls before they are sent, and sometimes blocks legitimate work. A blocked call never reaches your computer, so nothing ran.

## What you see

> This tool call was blocked by OpenAI's safety checks. Please double check what you are sending.

It only happens in OpenAI apps, like ChatGPT. We've reported it to OpenAI and are collecting examples to help them fix false positives, but there is no date for a fix yet.

## Review and run the blocked call

After a block, the AI can open a Desktop Commander review panel that shows you the blocked call.

- The panel shows the exact call: the command, file or setting it uses.
- **Run** sends that call once. **Cancel** stops it, and nothing runs.
- After Run, the result goes back to the AI and it continues your task.
- If the panel says the call may or may not have run, check before running it again.

Check the call before you press Run. ChatGPT checks the call again when you press Run, so it can still be blocked. If it is, try the steps below.

## Other things to try

- **Explain the goal.** Tell the AI what you're trying to do and why, then ask it to try again
- **Go step by step.** Ask the AI to split the task into smaller steps
- **Start a new chat.** Blocks sometimes stay in one conversation
- **Keep secrets out of commands.** Don't put passwords, API keys or tokens directly in a command
- **Run that one step yourself.** If the same step keeps getting blocked, run it in your own terminal and paste the result into the chat

Don't ask the AI to disguise or encode commands to get past the check.

## Help us report it

1. Give the blocked ChatGPT response a thumbs down and describe it as a "suspected false positive security block".
2. In ChatGPT, use Help › Report a bug, or contact OpenAI support through the Help Center, and save the support case ID if you get one. In Codex, send `/feedback` in that conversation and save the ID it returns.
3. Email [support@desktopcommander.app](mailto:support@desktopcommander.app) with:
   - Any feedback ID or OpenAI support case ID, if you got one
   - What was blocked and what you were trying to do
   - The exact error, or a cropped screenshot
   - When it happened, with your time zone

If you're comfortable sharing cleaned up tool call details or a link to the conversation, tell us whether we may include them in our report to OpenAI. You don't need to repeat the blocked action.

## Different messages

These come from Desktop Commander, not OpenAI, and are caused by your own settings:

- **"Command not allowed"**: the command is on your blocked commands list
- **"Path not allowed"**: the file is outside your allowed folders

These can also appear after you press Run in the review panel. The panel only helps with ChatGPT's block. Your Desktop Commander settings still apply.

See [How do I use Desktop Commander safely and limit its access?](/security-privacy/use-safely-limit-access) to change them.

A prompt asking "Allow ChatGPT to use …?" with Allow once, Always allow and Deny is not a block. It's ChatGPT asking for your OK. Choose Allow once to send that call.
