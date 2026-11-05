---
title: "Can I use Desktop Commander with multiple ChatGPT or Claude accounts?"
sidebarTitle: "Multiple AI accounts"
description: "Connect multiple AI accounts to one Desktop Commander Remote account and understand what devices, usage, and permissions they share."
order: 5
related:
  - /getting-started/what-is-desktop-commander
  - /account-billing/change-email-move-pro
  - /security-privacy/use-safely-limit-access
---

# Can I use Desktop Commander with multiple ChatGPT or Claude accounts?

This article is for Desktop Commander Remote.

Yes. Desktop Commander Remote is designed so more than one ChatGPT or Claude account can connect to the same Desktop Commander account. Each AI account must authorize Desktop Commander separately, but they can use the same computers that are already paired to that Desktop Commander account.

## Do the ChatGPT or Claude emails have to match my Desktop Commander email?

No. Your ChatGPT or Claude email can be different from your Desktop Commander email.

What matters is the Desktop Commander account you choose during authorization. When ChatGPT or Claude opens the Desktop Commander sign-in page, sign in to the Desktop Commander account that owns the paired computer.

## How do I connect another ChatGPT or Claude account?

1. Sign in to the additional ChatGPT or Claude account.
2. Add or connect Desktop Commander Remote from inside that AI app.
3. When the Desktop Commander sign-in page opens, sign in with the same Desktop Commander account that already owns the computer you want to use.
4. Return to ChatGPT or Claude, start a new conversation, and select or enable the Desktop Commander connection.
5. Test it with a small read-only request, such as listing your connected devices or files.

Signing in at [mcp.desktopcommander.app](https://mcp.desktopcommander.app/) by itself does not connect a ChatGPT or Claude account. The connection must be started from the AI app.

## Do I need to pair the computer again?

No. If the computer is already paired to that Desktop Commander account and shows Online, you do not need to pair it again just because you are adding another ChatGPT or Claude account.

The existing Desktop Commander Remote agent can handle requests from multiple connected assistants.

## What is shared between the accounts?

AI accounts connected to the same Desktop Commander account use the same:

- paired computers
- Desktop Commander Remote plan and usage
- access available to the operating-system user running the Remote agent

The assistants can be connected at the same time, but avoid having multiple assistants modify the same files or processes at the same time because their actions can conflict.

## Can I give each ChatGPT or Claude account different permissions?

Not currently. Desktop Commander Remote does not provide separate permissions or delegated access for each connected ChatGPT or Claude account.

Every assistant connected through the same Desktop Commander account can use the access exposed by the same Remote agent. If different people or AI accounts need different access boundaries, use separate isolated environments or devices and separate Desktop Commander accounts.

## What if one AI account sees no devices or a Free usage limit?

One common cause is that the Desktop Commander connection was authorized with a different Desktop Commander account.

Reconnect Desktop Commander in ChatGPT or Claude and, during authorization, sign in with the Desktop Commander account that owns the intended device and subscription. You do not need to change the email you use to sign in to ChatGPT or Claude.
