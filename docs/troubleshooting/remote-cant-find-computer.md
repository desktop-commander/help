---
title: "Why can't Desktop Commander Remote find my computer?"
sidebarTitle: "Computer offline or missing"
description: "For Desktop Commander Remote: your computer shows as offline, isn't listed, or the AI says no device is online. Here is how to find out why and fix it."
order: 1
related:
  - /devices/connect-computer
  - /troubleshooting/usage-limit-after-upgrading
---

# Why can't Desktop Commander Remote find my computer?

This article is for Desktop Commander Remote, which you use from ChatGPT, Claude on the web or another web app.

There are two usual reasons: Desktop Commander isn't running on your computer right now, or your AI app and your computer are signed in to different Desktop Commander accounts. What the AI says tells you which one.

## Your computer shows as Offline

The dashboard at [mcp.desktopcommander.app](https://mcp.desktopcommander.app/) shows Offline, or the AI says "No Desktop Commander device is currently online". Your computer is connected to your account, but Desktop Commander isn't running on it right now.

1. Make sure the computer is on and connected to the internet.
2. Find the terminal window where you started Desktop Commander. If you closed it, pressed Ctrl+C, restarted the computer or it went to sleep, the connection stopped. Desktop Commander Remote doesn't start again by itself after a restart.
3. Run the same setup command again. On Windows, if you created the **Desktop Commander Remote** shortcut during setup, double click it instead. You usually don't need to verify the computer again.
4. Wait until the terminal shows **Device ready**, then try again in the chat.

To stay online:

- Keep the terminal window open while the AI works on the computer
- On a Mac, Desktop Commander keeps the computer awake while it runs. On Windows and Linux, set your power settings so the computer doesn't sleep
- If your internet drops for a moment, Desktop Commander reconnects by itself within a couple of minutes

Still offline?

- Try without a VPN, or on another network
- Check that a firewall or antivirus isn't blocking Desktop Commander
- Removing the computer and connecting it again rarely helps, so try the steps above first
- Send us a diagnostics report. Press Ctrl+C in the terminal and run `npx @wonderwhy-er/desktop-commander@latest remote --report` (on Windows, `npx.cmd` instead of `npx`). It sends a report without your email, sign in details or anything the AI did on your computer, and shows a report ID. Email that ID to [support@desktopcommander.app](mailto:support@desktopcommander.app)

## Your computer is Online, but the AI can't reach it

1. Check that your AI app and your computer use the same email. See the next section.
2. Start a new chat and try a simple request, such as "Use Desktop Commander to list the files in my Downloads folder."
3. If that still fails, disconnect Desktop Commander in your AI app and connect it again: in ChatGPT under Settings › Apps › Remote Desktop Commander, in Claude under Settings › Connectors.

## "No Desktop Commander devices are connected yet"

Your AI app is connected to an account with no computers. Usually your computer is connected to a different account.

1. **Check the email your AI app uses.** Ask in the chat: "Use Desktop Commander to show which account email I'm connected with." In ChatGPT you can also open Settings › Apps › Remote Desktop Commander.
2. **Check the email your computer uses.** It's on the **User:** line under **Device ready** in the terminal.
3. **If the emails are different, reconnect your AI app with the email your computer uses.** In ChatGPT, open Settings › Apps › Remote Desktop Commander, click ••• next to the email, choose Disconnect and connect again. In Claude, open Settings › Connectors, disconnect Remote Desktop Commander and connect it again. Do this in the browser where you're signed in to [mcp.desktopcommander.app](https://mcp.desktopcommander.app/) with that email.
4. **Start a new chat** and try again.

Want to keep the email your AI app uses instead? Sign in at [mcp.desktopcommander.app](https://mcp.desktopcommander.app/) with the other email, remove the computer under Devices, then run the setup command again and confirm with the email your AI app uses. If you have Pro, use the email that has Pro.

If your computer isn't in any of your accounts, setup didn't finish. Run the setup command and click **Verify device** on the page that opens.

## The AI asks which computer to use

When more than one computer is online, the AI needs to know which one to work on. Tell it by name, for example "Use my MacBook". To see the names, ask "List my Desktop Commander devices" or open [mcp.desktopcommander.app](https://mcp.desktopcommander.app/).
