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

It only happens in ChatGPT. We've reported it to OpenAI and are collecting examples to help them fix false positives, but there is no date for a fix yet.

## What you can try

- **Explain the goal.** Tell the AI what you're trying to do and why, then ask it to try again
- **Go step by step.** Ask the AI to split the task into smaller steps
- **Start a new chat.** Blocks sometimes stay in one conversation
- **Keep secrets out of commands.** Don't put passwords, API keys or tokens directly in a command
- **Run that one step yourself.** If the same step keeps getting blocked, run it in your own terminal and paste the result into the chat

Don't ask the AI to disguise or encode commands to get past the check.

## Help us report it

1. Give the blocked ChatGPT response a thumbs down and describe it as a "suspected false positive security block".
2. If `/feedback` works in your ChatGPT, send it in that conversation and save any ID it returns. Otherwise use Help › Report a bug, or contact OpenAI support through the Help Center.
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

See [How do I use Desktop Commander safely and limit its access?](/security-privacy/use-safely-limit-access) to change them.
