---
title: "What can I do with Desktop Commander?"
sidebarTitle: "Use cases and prompts"
description: "Use cases and example prompts for ChatGPT, Claude and other AI apps, with Desktop Commander Remote or Desktop Commander (local MCP)."
order: 2
related:
  - /security-privacy/use-safely-limit-access
  - /account-billing/plans-and-tool-call-limits
---

# What can I do with Desktop Commander?

Desktop Commander lets your AI app work directly on your computer: it reads and edits files, runs commands and scripts, and checks the results. You describe the task in plain words, and the AI does the steps instead of telling you what to type.

It works the same way in both versions:

- **Desktop Commander Remote** connects ChatGPT, Claude and other AI apps to one or more of your computers or servers. You can start tasks from any device, including your phone.
- **Desktop Commander (local MCP)** is open source and runs on the same computer as your AI app, for example Claude Desktop or Cursor.

Most examples below work with both. Sections marked **Remote** need Desktop Commander Remote.

## Before you start

- Desktop Commander is connected to your AI app
- With Desktop Commander Remote, the computer you want to use is on and online
- You know which folder, file or device you want the AI to work on. Full paths work best

## Build scripts, tools and small apps

Describe what you want. The AI writes the code, saves it on your computer, runs it and fixes errors until it works. You don't need to know how to code.

- Write a quick script for a task you repeat often
- Build a web page, dashboard or small app that runs on your computer
- Turn an idea into a working prototype
- Set up an automation that runs on a schedule

**Try asking:**

> Write a Python script that renames every photo in my Pictures\Trip folder to the date it was taken. Test it on copies of three photos first.

> Build a simple expense tracker that saves data in a local file and opens in my browser. Run it and give me the link.

> Create a PowerShell script that copies my Documents folder to drive E: every evening, and schedule it in Task Scheduler.

## Organize files, documents and data

- Sort a messy Downloads or Desktop folder
- Rename hundreds of files to one naming pattern
- Pull data from PDFs, invoices and receipts into a spreadsheet
- Analyze, clean up and merge CSV and Excel files
- Convert images, documents and data files to other formats
- Check backups: compare folders and drives, find duplicates and missing files

**Try asking:**

> Look at my Downloads folder and suggest how to sort it into subfolders. Show me the plan before you move anything.

> Read all PDF invoices in Documents\Invoices and put the date, supplier, total and VAT of each one in a new Excel file.

> Compare my Projects folder with the backup on drive E: and list the files that are missing or different. Don't change anything.

## Work on your code

- Explain how an unfamiliar project is structured
- Find and fix a bug from an error message
- Run tests, builds and type checks, then fix what fails
- Work with Git: status, diffs, branches, commits and pull requests
- Write documentation from the actual code
- Review code quality and dependencies

**Try asking:**

> Explain how the project in C:\Projects\shop is structured. Then run the tests and tell me what fails.

> When I start the app I get this error: [paste the error]. Find the cause, fix it and run the tests again.

> Check git status and summarize what changed. Then commit with a clear message and push to a new branch.

## Manage servers, homelabs and several machines (Remote)

Connect several computers and servers to the same account, and the AI can work on each of them without you opening SSH or Remote Desktop. Tell it which device to use.

- Find out why a website or service is down: status, logs, disk space, ports
- Update Docker Compose stacks and restart services
- Install and configure software on a server or VPS
- Check on long running jobs and processes
- Keep an always on machine, like a Mac mini or a homelab server, as a place where the AI can work

**Try asking:**

> On my Linux server, find out why the website is down. Check the service status, the latest error logs and free disk space. Don't change anything until I approve.

> On my homelab server, add [service name] to the Docker Compose file, restart the stack and check that the new container is running.

> Check whether last night's backup job ran on my Mac mini, then do the same check on my Windows PC.

## Work from your phone (Remote)

Start a task on your computer from the AI app on your phone, then come back for the result.

**Try asking:**

> Check whether the script I started on my PC this morning has finished, and summarize the output.

> Open the project notes on my laptop and add these ideas to the task list: [your ideas].

## Keep project notes and knowledge in one place

- Build a knowledge base from a folder of documents, notes and PDFs
- Save ideas to Obsidian or other Markdown notes, with links between related notes
- Write project specs, workflows and decision logs
- Keep a project notes file that the AI reads at the start of a chat, so you can continue where you left off

**Try asking:**

> Save this idea as a note in my Obsidian vault, find related notes and add links between them.

> Read the files in my project folder and write `PROJECT_NOTES.md` with the goal, current status and next steps.

> Read `PROJECT_NOTES.md` in C:\Projects\shop so we can continue where we left off.

## Set up and fix your computer

- Install and set up software and developer tools
- Find out why a computer is slow: processes, startup apps, disk space
- Change app settings and config files, for example for a camera system, a game or a simulator
- Diagnose network problems

**Try asking:**

> Install Node.js and Git on this computer and check that both work.

> My laptop is slow. Check what is using CPU, memory and disk, and which apps start with Windows. Suggest changes before you make any.

## Use it alongside coding agents

Many people plan in ChatGPT or Claude chat and use Desktop Commander to check the work of coding agents, such as Codex or Claude Code, on the same computer.

- Review changes another agent made and run the tests
- Start a coding agent on your computer and check its result
- Update the docs once the code is done

**Try asking:**

> Codex just finished a task in C:\Projects\shop. Review the changes, run the tests and tell me if anything is broken before I merge.

## Learn as you go

- Ask the AI to explain each command before it runs it
- Learn a new tool by doing a real task, one step at a time
- Write a prompt your colleagues can run to set up the same tools on their own computers

**Try asking:**

> Before you run anything, explain in one line what each command does. Then set up a Python virtual environment for this project.

## Tips for good results

- **Ask for a plan first.** For anything that changes files, ask the AI to show what it will do before it does it
- **Start with read only tasks.** Let it look and report before it edits
- **Test small.** Try one folder or a few copies before running on everything
- **Name the device and folder.** Full paths remove guesswork
- **Ask it to check its work.** End with "run the tests" or "check the result"
- **Remind the AI it has access.** If it asks you to run a command yourself or send a screenshot, tell it to use Desktop Commander
- **Split long jobs.** Ask the AI to save progress to a file, so it can pick up again after an interruption
- **Big tasks use more tool calls.** Every action the AI takes on your computer is one tool call

## More prompts

The [Desktop Commander prompt library](https://desktopcommander.app/library/prompts/) has 70+ prompts you can filter by task and role. Each one comes with a short description, the prompt text and tips.
