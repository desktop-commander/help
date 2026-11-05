---
title: "Why do I still see the usage limit after upgrading to Pro?"
sidebarTitle: "Limit after upgrading"
description: "Your AI app or computer is probably connected to a different Desktop Commander account than the one with Pro. Here is how to check and fix it."
order: 2
related:
  - /account-billing/plans-and-tool-call-limits
  - /account-billing/change-email-move-pro
  - /troubleshooting/remote-cant-find-computer
---

# Why do I still see the usage limit after upgrading to Pro?

This article is for Desktop Commander Remote.

Usually this means your AI app or your computer is connected to a different Desktop Commander account than the one with Pro. Tool calls count against the account your AI app is connected to, so Pro on another account doesn't apply. The fix is to connect everything to the account that has Pro.

## What you see

In ChatGPT or Claude, the AI says something like:

> You've reached this month's Desktop Commander usage, so tool calls are paused. Your device remains connected and paired. Do not retry or reconnect.

If you really are on the free plan, that advice is right. If you paid for Pro, reconnecting with the right account is the fix.

## 1. Check which account has Pro

Sign in at [mcp.desktopcommander.app](https://mcp.desktopcommander.app/) with the email you used when you upgraded, and open **Plan & billing**. It should show Pro.

If none of your emails shows Pro, contact support.

## 2. Check which account your AI app uses

Any of these shows the email in use:

- **Ask in the chat:** "Use Desktop Commander to show which account email I'm connected with." This works even while tool calls are paused
- **ChatGPT:** open Settings › Apps › Remote Desktop Commander
- **Your computer:** the terminal running Desktop Commander shows it on the **User:** line under **Device ready**

If every place shows the email with Pro and you still see the limit, contact support.

## 3. Move everything to the account with Pro

Do these in order.

1. **Remove your computer from the old account.** Sign in at [mcp.desktopcommander.app](https://mcp.desktopcommander.app/) with the old email, open Devices and click Revoke or Remove. If you skip this, the setup command connects the old account again.
2. **Connect your computer to the Pro account.** Sign out, sign in with the email that has Pro, and run the setup command again. Confirm with the same email on the page that opens.
3. **Reconnect your AI app.** In ChatGPT, open Settings › Apps › Remote Desktop Commander, click ••• next to the old email, choose Disconnect and connect again. In Claude, open Settings › Connectors, disconnect Remote Desktop Commander and connect it again. Do this in the browser where you're signed in to [mcp.desktopcommander.app](https://mcp.desktopcommander.app/) with the Pro email, so the right account is picked.
4. **Start a new chat** and try again.

Can't sign in to the old account? Instead of step 1, press Ctrl+C in the terminal and run `npx @wonderwhy-er/desktop-commander@latest remote --logout` (on Windows, `npx.cmd` instead of `npx`). Then continue with step 2.

The same steps are in your dashboard under [Plan & billing](https://mcp.desktopcommander.app/billing#one-account).

## How to avoid this

Use one email for everything: when you connect ChatGPT or Claude, when you connect each computer and when you upgrade. Before you upgrade, check that the account you're signed in to lists your computers.
