---
title: "How do I connect an Android phone to Desktop Commander Remote?"
sidebarTitle: "Connect an Android phone"
description: "Experimental: run Desktop Commander Remote on an Android phone with Termux, a free terminal app from Google Play. Setup takes a few minutes."
order: 2
related:
  - /devices/connect-computer
  - /security-privacy/use-safely-limit-access
  - /troubleshooting/remote-cant-find-computer
---

# How do I connect an Android phone to Desktop Commander Remote?

::: warning Experimental
Desktop Commander doesn't officially support Android. We've tested these steps, but we can't promise everything will work smoothly on every phone.
:::

There's no Android app for Desktop Commander, but you can run Desktop Commander Remote on an Android phone or tablet with Termux, a free, open source terminal app. Setup takes a few minutes. The phone then works as a device of its own, so the AI can use it even when your computers are off.

This article is for Desktop Commander Remote, which you use from ChatGPT, Claude or another AI app.

## Before you start

- Desktop Commander Remote is added to your AI app. See [What is Desktop Commander and how do I install it?](/getting-started/what-is-desktop-commander)
- An Android phone or tablet with Android 11 or newer

## What the AI can do on your phone

The AI works through Termux, so it can do what Termux can do:

- Read and manage files in your phone's storage, like photos and videos, downloads and WhatsApp media, after you allow storage access
- Show what takes up space and find large or duplicate files
- Run command line tools that you install in Termux

It can't change Android settings, manage your installed apps or read other apps' private data.

## Set up Termux

1. Install Termux from [Google Play](https://play.google.com/store/apps/details?id=com.termux).
2. Open Termux and update its packages:

   ```bash
   pkg update && pkg upgrade -y
   ```

   If it asks a question while updating, press Enter to keep the default answer.

3. Install Node.js and the Android tools:

   ```bash
   pkg install nodejs-lts android-tools -y
   ```

4. Give Termux access to your files:

   ```bash
   termux-setup-storage
   ```

   Allow access when Android asks. On some phones this opens a settings page where you turn on file access for Termux.

## Connect your phone

Run this in Termux:

```bash
npx -y @wonderwhy-er/desktop-commander@latest remote
```

Termux shows a link and a code. If your browser doesn't open by itself, open the link in your phone's browser. Check that the code on the page matches the code in Termux, then tap **Verify device**.

If the codes don't match, don't verify. Run the command again.

## What you should see

Termux shows **Device ready**. Your phone appears in your device list at [mcp.desktopcommander.app](https://mcp.desktopcommander.app/) with the name `localhost`.

Go back to ChatGPT or Claude and ask: "Use Desktop Commander Remote to show how much free space my Android phone has and what takes up the most."

If your computers are online too, tell the AI to use the device called `localhost`.

## Stay online

Desktop Commander works only while it runs in Termux.

- You can switch to other apps, but don't close Termux
- Android can stop apps in the background to save battery. To keep Termux running, pull down its notification and tap **Acquire wakelock**, and turn off battery optimization for Termux in your phone's settings
- After the phone restarts, open Termux and run the command from [Connect your phone](#connect-your-phone) again

## Stop or remove your phone

- **Stop:** pull down the Termux notification and tap **Exit**. The phone goes offline until you run the command again
- **Remove:** remove or revoke the phone on [mcp.desktopcommander.app](https://mcp.desktopcommander.app/)

## If it didn't work

- If `pkg` can't download packages, run `termux-change-repo` and pick a different mirror
- [Why can't Desktop Commander Remote find my computer?](/troubleshooting/remote-cant-find-computer)
