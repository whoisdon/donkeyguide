---
title: Advanced implementation
---

# Advanced implementation

First of all, congratulations! You've managed to implement our structure in your application in a 100% functional way. Now, this guide is for those who are already familiar with the structure and want to upgrade their functionality. Unfortunately, this module doesn't feature many images (we believe you've already gained enough familiarity with the structure to understand and fit the methods on your own), but we'll still strive to be as clear as possible to leave no doubts.

## Adding `Utilities`

The `Utils` folder in our project serves a clear and valuable purpose. It acts as a central repository for all our auxiliary functions and utilities. These functions are thoughtfully organized and maintained here to enhance development efficiency, code reuse, and simplified maintenance

In our Visual Studio Code, we will create a new folder within the `src` directory. This folder will be named `Utils`.

### Custom logging

Alright, with the `Utils` folder created, why don't we add a distinct logging system? It will be better to differentiate each action that our structure performs with meaningful colors and clear naming.

So, here we go. Inside our `Utils` folder, we will create a subfolder named `Function` with a file named `getColors.js` to customize our logs.

**File Map:** `src > Utils > Functions > getColors.js` <br>
**Package:** [`npm i colors`](https://www.npmjs.com/package/colors) <br>
**Content:** <br>
```js
import colors from 'colors';

const log = (message = message.replace(' ', '⠀'), type = types[0]) => {
  
  const types = ['error', 'system', 'commands', 'firebase', 'cache', 'success', 'client', 'mysql', 'notice'];

  const colorFormat = {
    error: ['[ ❌ Error ]'.bgRed, 'red'],
    system: ['[ 💻 System ]'.bgBlue, 'blue'],
    commands: ['[ 🤖 Commands ]'.bgCyan, 'cyan'],
    cache: ['[ 📙 Cache ]'.bgGreen, 'green'],
    success: ['[ ✔️ Success ]'.bgGreen, 'green'],
    client: ['[ 💁 Client ]'.bgMagenta, 'magenta'],
    notice: ['[ 🔔 Notice ]'.bgYellow + '⠀➜ '.italic.red, 'yellow']
  };

  if (!types.includes(type)) {
    type = types[0];
  }

  const [typeString, color] = colorFormat[type];

  console.log(`${typeString}⠀${colors[color](message)}`);
}

export default log;
```

If you want to implement it in any of your systems already, feel free to do so. In the next module, we will implement it in the classes.

### Creating `mosaic`

Have you ever seen those Neofetch-style mosaics and been captivated, imagining yourself creating one? Well, now we're going to implement a Discord mosaic. To start, let's stay in the `Functions` folder and create a file called `createMosaic.js`.

**File Map:** `src > Utils > Functions > createMosaic.js` <br>
**Package:** [`npm i moment`](https://www.npmjs.com/package/moment) <br>
**Content:** <br>
```js
import os from 'os';

import moment from 'moment';
moment.locale('pt-BR');

const createMosaic = `
\x1b[0;95m⠀⠀⠀⠀⢀⣀⣤⣤⡀⠀⠀⠀⠀⢀⣤⣤⣀⡀⠀⠀⠀⠀  A guide for donkeys\x1b[0m
\x1b[0;95m⠀⠀⢠⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⡄⠀⠀  \x1b[0m-----------------------
\x1b[0;95m⠀⢠⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡄⠀  OS\x1b[0m: ${os.platform()}
\x1b[0;95m⢀⣿⣿⣿⣿⣿⡿⠿⣿⣿⣿⣿⣿⣿⠿⢿⣿⣿⣿⣿⣿⡀  Pterodactyl\x1b[0m: ${moment(Date.now()).format('LL')}
\x1b[0;95m⣸⣿⣿⣿⣿⡏⠀⠀⠀⢻⣿⣿⡟⠀⠀⠀⢹⣿⣿⣿⣿⣇  Arch:\x1b[0m: ${os.arch()}
\x1b[0;95m⣿⣿⣿⣿⣿⣧⡀⠀⣀⣾⣿⣿⣷⣀⠀⢀⣼⣿⣿⣿⣿⣿  Author\x1b[0m: only.don
\x1b[0;95m⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿  Terminal\x1b[0m: code block
\x1b[0;95m⠙⠻⢿⣿⣿⣶⡭⠙⠛⠛⠛⠛⠛⠛⠋⢭⣶⣿⣿⡿⠟⠋  \x1b[0m
\x1b[0;95m⠀⠀⠀⠈⠙⠛⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠛⠋⠁⠀⠀⠀    \x1b[0;30m███\x1b[0;31m███\x1b[0;32m███\x1b[0;34m███\x1b[0;35m███\x1b[0;36m███\x1b[0;37m███
`

export default createMosaic;
```
How wonderful, isn't it? Let's add it to our `ready` event before registering the slash commands. Like this:
```js
import EventMap from '../../Structure/EventMap.js';
import terminal from '../../Utils/Functions/createMosaic.js';

export default class extends EventMap {
  constructor(client) {
    super(client, {
      name: 'ready',
      once: true
    });
  }
  run = async () => {
    console.log(terminal)  
      
    await this.client.registerCommands();
    console.log(`Ready! Logged in as ${this.client.user.tag}`); 
  };
};
```

### Implementing a cache system

Okay, we've configured the mosaic, which, by the way, looks fantastic. Now, let's set up the caching system. In this step, we will only create the file where the command cache will be stored.

**File Map:** `src > Utils > .cache > .commandsCache.json` <br>
**Content:** <br>
```json
{}
```
Well, for now, that's it. In the next module, you will start using this file. Remember that `.cache` is a folder and not a file.

## Structure `advanced`

Well, now we will update and enhance our classes [`Client`](./starting-the-application.md#client), [`EventMap`](./starting-the-application.md#eventmap), [`PrefixCommands`](./starting-the-application.md#prefixcommands) and [`SlashCommands`](./starting-the-application.md#slashcommands) for better performance.

### Separating configuration file

Well, let's split the configuration file to avoid redundant settings and organize our files more efficiently.

**File Map:** `src > Config > Config.json` <br>
**Content:** <br>
```json
{
  "default_prefix": "--",
  "default_developers": ["828677274659586068"]
}
```

Here, we've introduced two objects: `default_prefix` for the application's prefix, which we'll use when updating our `messageCreate`, and `default_developers`, an array of predefined configurations containing user IDs with developer permissions within our application.

### Client

Alright, now let's enhance our client class. It's quite simple, and we can improve it. First, let's go back to our `Client.js` file and add our logging system to the constructor like this:

```js
import log from '../Utils/Functions/getColors.js';

export default class extends Client {
    constructor(options) {
        super(options);

        this.SlashCommandArray = [];
        this.PrefixCommandArray = [];
        this.getPrefixCommands();
        this.getSlashCommands();
        this.getEvents();
        this.log = log;
        this.cooldown = new Set();
    }
```
Alright, now it's time to update our `registerCommands` and implement a system of local and global scopes, as well as a caching system to avoid unnecessary requests to the Discord API. First, let's implement a new method called `cacheCommands` to separate commands with local and global scopes to keep the cache more organized, like this:

```js
cacheCommands(commands, isGlobal) {
    let cacheData = JSON.parse(readFileSync(searchFile, 'utf-8'));
    let hasChanges = false;
  
    const cacheObjectName = isGlobal ? 'globalCommandsCache' : 'localCommandsCache';
    const cacheObject = cacheData[cacheObjectName] || {};
  
    for (const name in cacheObject) {
      if (!commands.some(command => command.name === name)) {
        delete cacheObject[name];
        hasChanges = true;
      }
    }
  
    for (const command of commands) {
      const name = command.name;
      const json = JSON.stringify(command, null, 2);
  
      if (!cacheObject.hasOwnProperty(name) || cacheObject[name] !== json) {
        cacheObject[name] = json;
        hasChanges = true;
      }
    }
  
    cacheData[cacheObjectName] = cacheObject;
  
    writeFileSync(searchFile, JSON.stringify(cacheData, null, 2), 'utf8');
  
    return hasChanges;
}
```
So, let's update the imports like this:
```js
import { readdirSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { Client } from 'discord.js';

import log from '../Utils/Functions/getColors.js';
const searchFile = './src/Utils/.cache/.commandsCache.json';
```
And finally, let's update our `registerCommands` to include this implementation of the cache system we created like this:
```js
async registerCommands() {
    this.log('Please wait while the application loads the commands (/)...', 'system');

    const existingCommands = this.application.commands.cache;
    const globalCommands = this.SlashCommandArray.filter(command => !command.guildCollection?.length);
    const commandsInLocalScope = this.SlashCommandArray.filter(command => command.guildCollection).map(command => Object.assign(command, command.data));

    const filterLocalCommands = commandsInLocalScope.filter(local => !existingCommands.some(cache => cache.name === local.name));
    const booleanLocalCommands = this.cacheCommands(filterLocalCommands, false);

    const filterGlobalCommands = globalCommands.filter(global => !existingCommands.some(cache => cache.name === global.name));
    const booleanGlobalCommands = this.cacheCommands(filterGlobalCommands, true);

    if (!(booleanLocalCommands || booleanGlobalCommands)) {
        this.log('There are no commands to load. No changes have been made!', 'cache');
        return;
    }

    if (booleanGlobalCommands) {
        await this.application.commands.set(globalCommands).catch((err) => this.log(err, 'error'));
        this.log('Global scope application commands (/) have been successfully loaded!', 'client');
    }

    if (booleanLocalCommands) {
        for (const guildID of commandsInLocalScope.flatMap(command => command.guildCollection)) {
            const commands = commandsInLocalScope.filter(
                cmd => cmd.guildCollection.includes(guildID)
            );

            const guild = this.guilds.cache.get(guildID);
            if (!guild) {
                this.log(`The server ${guild.name} (${guild.id}) is not in the client's cache`, 'error');
                continue;
            }

            await guild.commands.set(commands).catch((err) => this.log(err, 'error'));
            this.log(`Local scope application commands (/) have been successfully loaded in the guild: ${guild.name} (${guild.id})!`, 'client');
        }
    }
}
```

### EventMap

All right, now let's take our event class to the next level. It's a straightforward process with room for improvement. Continuing in the `Structures` folder, let's open our `EventMap.js` file and update our structure to:

```js
class EventMap {
  constructor(client, options) {
    this.client = client;
    this.name = options.name;
    this.once = options.once || false;
    this.log = this.client.log;
  }
}

export default EventMap;
```
This way, we've implemented the system for custom logs by calling it from our extended client class.

### PrefixCommands

Now, within our `PrefixCommands.js` file, we will enhance it for better performance and organization. So, let's update it as follows:

```js
import { PermissionFlagsBits } from 'discord.js';

class PrefixCommands {
  constructor(client, options) {
    this.client = client;
    this.name = options.name;
    this.description = options?.description;
    this.aliases = options?.aliases;
    this.isPrivate = options.isPrivate;
    this.userPermissions = options.userPermissions;
    this.botPermissions = options.botPermissions || [PermissionFlagsBits.SendMessages];
    this.mentionCommand = options?.mentionCommand;
    this.onlyDevs = options.onlyDevs;
    this.guildCollection = options.guildCollection;
    this.log = this.client.log;
  }
}

export default PrefixCommands;
```
Now, you can refer to the table below for detailed information about the properties of PrefixCommands class:

| Property          | Description                                                                                   | Type      |
|-------------------|-----------------------------------------------------------------------------------------------|-----------|
| `name`            | The unique name associated with the command.                                                  | String    | 
| `description`     | A description of the command.                                                                 | String    | 
| `aliases`         | An array of aliases associated with the command.                                              | Array     | 
| `isPrivate`       | A boolean value indicating whether the property is used in direct messages (DMs) or not.      | Boolean   | 
| `userPermissions` | An array of required user permissions for the command.                                        | Array     |  
| `botPermissions`  | An array of required bot permissions for the command, with a default value of SendMessages.   | Array     | 
| `mentionCommand`  | A boolean value indicating whether the property serves as a command mention.                  | Boolean   | 
| `onlyDevs`        | A boolean value indicating whether the property is private and accessible only to developers. | Boolean   | 
| `guildCollection` | An array representing the collection of servers associated with the command.                  | Array     | 
| `log`             | A function that represents the client's log object.                                           | Function  | 

### SlashCommands

Now, let's enhance our latest `SlashCommands` class. To do that, navigate to the `Structure` folder and update it as follows:
```js
import { PermissionFlagsBits } from 'discord.js';

class SlashCommands {
  constructor(client, options) {
    this.client = client;
    this.name = options.name || options.data.name;
    this.description = options.description || options.data.description;
    this.options = options.options || options.data?.options;
    this.userPermissions = options.userPermissions;
    this.botPermissions = options.botPermissions || [PermissionFlagsBits.SendMessages]; 
    this.onlyDevs = options?.onlyDevs || false;
    this.deferReply = options.deferReply || false;
    this.guildCollection = options.guildCollection; 
    this.log = this.client.log;
  }
}

export default SlashCommands;
```
Now, you have access to the table below, providing in-depth information on the properties of SlashCommands class:

| Property          | Description                                                                                   | Type      |
|-------------------|-----------------------------------------------------------------------------------------------|-----------|
| `name`            | The unique name associated with the command.                                                  | String    | 
| `description`     | A description of the command.                                                                 | String    | 
| `options`         | The command's options.                                                                        | String    |  
| `userPermissions` | An array of required user permissions for the command.                                        | Array     |  
| `botPermissions`  | An array of required bot permissions for the command, with a default value of SendMessages.   | Array     | 
| `mentionCommand`  | A boolean value indicating whether the property serves as a command mention.                  | Boolean   | 
| `onlyDevs`        | A boolean value indicating whether the property is private and accessible only to developers. | Boolean   | 
| `deferReply     ` | A boolean value to delay the reply, often used for interactions with longer processing times. | Boolean   |
| `guildCollection` | An array representing the collection of servers associated with the command.                  | Array     | 
| `log`             | A function that represents the client's log object.                                           | Function  | 

## Syncing Events

Now that we've upgraded our structures for better performance, let's enhance our events to boost application efficiency. This module is essential for optimizing our application, as we'll improve and implement systems within the events to synchronize with our structures.

### ready

Now, let's implement our custom logs and the mosaic we created within the `ready` event. It's a straightforward change, like this:
```js
import EventMap from '../../Structure/EventMap.js';
import terminal from '../../Utils/Functions/createMosaic.js';

export default class extends EventMap {
  constructor(client) {
    super(client, {
      name: 'ready',
      once: true
    });
  }
  run = async () => {
    console.log(terminal)  
      
    await this.client.registerCommands();
    this.log(`O client ${`${this.client.user.tag}`.blue} ${`(${this.client.user.id})`.blue} foi iniciado com êxito!`, 'client');
  };
};
```

### interactionCreate

Here is where things get truly intriguing. We will sync our `interactionCreate` with the enhanced `SlashCommands` class, implementing various functionalities and handling potential future errors. This way, our event will look like this:

```js
import EventMap from '../../Structure/EventMap.js';
import Config from "../../Config/Config.json" assert { type: "json" };

export default class extends EventMap {
  constructor(client) {
    super(client, {
      name: 'interactionCreate'
    });
  }
  run = async (interaction) => {
    const commandName = interaction.commandName;
    const command = this.client.SlashCommandArray.find((c) => c.name === commandName);

    if (interaction.isAutocomplete()) {
      await command.autocomplete(interaction);
    } 
    
    else if (interaction.isChatInputCommand()) {
      let load = { content: `❌ **|** ${interaction.user} couldn't execute this command, it's either invalid or non-existent.`, ephemeral: true }
      if (!command) {
        await interaction.editReply(load).catch(() => interaction.reply(load));
        return;
      }

      if (command.onlyDevs && !Config.default_developers.includes(interaction.user.id)) {
        let dev = { content: `❌ **|** ${interaction.user} this command is private and can only be executed by authorized developers of this application.`, ephemeral: true }

        this.log(`User ${interaction.user.username} (${interaction.user.id}) is not an authorized developer.`, 'notice')
        await interaction.editReply(dev).catch(() => interaction.reply(dev));
        return;
      }

      const noUserPerm = { content: `❌ **|** ${interaction.user} you don't have permission to use this command!`, ephemeral: true }
      const noBotPerm = { content: `❌ **|** ${interaction.user} I don't have permission to execute this command!`, ephemeral: true }

      if (command.botPermissions && !command.botPermissions.some(role => interaction.guild.members.me.permissions.has(role))) {
        this.log(`I lack the permissions to execute the ${commandName} command in the server ${interaction.guild.name} (${interaction.guild.id}).`, 'notice')
        await interaction.editReply(noBotPerm).catch(() => interaction.reply(noBotPerm));
        return;
      } 
      
      else if (command.userPermissions && !command.userPermissions.some(role => interaction.member.permissions.has(role))) {
        this.log(`User ${interaction.user.username} (${interaction.user.id}) doesn't have permission to execute the ${commandName} command.`, 'notice')
        await interaction.editReply(noUserPerm).catch(() => interaction.reply(noUserPerm));
        return;
      }

      if (!this.client.cooldown.has(interaction.user.id)) {
        if (!command) {
          const updateCommand = "❌ **|** Sorry, we couldn't execute this command at the moment. Please try again later or contact support if the issue persists."

          this.log(`An error occurred while executing the ${commandName} command. Please check if the command is up to date.`, 'notice')
          await interaction.editReply(updateCommand).catch(() => interaction.reply({ content: `${updateCommand}`, ephemeral: true }));
          return;
        }

        const time = new Date(new Date().getTime() - (180 * 60 * 1000)); 
        const date = time.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });

        this.log(`User ${`${interaction.user.username}`.cyan} ${`(${interaction.user.id})`.cyan} executed the ${`'${commandName}'`.bgMagenta} command at ${`${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`.blue} on ${`${date}`.blue}`, 'notice')

        if (command.deferReply) {
          await interaction.deferReply();
        }

        command.run(interaction);
      } else {
        const cooldown =  `🚫 **|** ${interaction.user} you are in cooldown, please wait for 5 seconds to use commands again.`

        this.log(`User ${interaction.user.username} (${interaction.user.id}) reached cooldown with the ${commandName} command, as they attempted to execute it repeatedly.`, 'notice')
        await interaction.editReply(cooldown).catch(() => interaction.reply({ content: `${cooldown}`, ephemeral: true }));
        return;
      }

      await this.client.cooldown.add(interaction.user.id);
      setTimeout(async () => await this.client.cooldown.delete(interaction.user.id), 5000);
    }
  }
}
```
Wow, that's a significant change, isn't it? Feel free to explore each property I've added to handle any errors during interactions with the application. The text is just a superficial representation to report what's happening during user actions.

### messageCreate

And finally, in our latest update to the `messageCreate` event, we'll follow the same approach as in `interactionCreate` to handle potential errors and enhance the understanding of the structure.

```js
import EventMap from '../../Structure/EventMap.js';
import Config from '../../Config/Config.json' assert { type: "json" };

export default class extends EventMap {
    constructor(client) {
        super(client, {
            name: 'messageCreate'
        });
    }
    run = async (message) => {
        if (message.author.bot) return;

        const time = new Date(new Date().getTime() + (-180 * 60 * 1000));
        const date = time.toLocaleDateString('en-US', { day: '2-digit', month: '2-digit', year: 'numeric' });
 
        const prefix = Config.default_prefix;
        const [pv, ...argsArray] = message.content.trim().split(" ");

        if (!message.guild && this.client.PrefixCommandArray.some(command => command.name.toLowerCase() === pv.toLowerCase())) {
            const command = this.client.PrefixCommandArray.find(cmd => cmd.name.toLowerCase() === pv.toLowerCase());
            if (command.isPrivate && !message.guild) return;
            if (command.onlyDevs && !Config.default_developers.includes(message.author.id)) return;

            this.log(`User ${`${message.author.username}`.cyan} ${`(${message.author.id})`.cyan} executed the command ${`'${command.name}'`.bgMagenta} at ${`${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`.blue} on ${`${date}`.blue}`, 'notice')
            command.run(message, argsArray);
            return;
        }

        const startCommand = message.content.toLowerCase().startsWith(`<@${this.client.user.id}>`);

        if (!(message.content.toLowerCase().startsWith(prefix) || startCommand)) return;

        const content = startCommand ? message.content.slice(`<@${this.client.user.id}>`.length).trim() : message.content.slice(prefix.length).trim();
        const [cmd, ...args] = content.split(" ");
        const command = this.client.PrefixCommandArray.find((c) => c.name === cmd.toLowerCase() || c.aliases?.includes(cmd.toLowerCase()))

        if (!command) return;
        else if (!command?.mentionCommand && startCommand) return;
        else if (command.isPrivate && !message.guild) return;

        else if (command.onlyDevs && !Config.default_developers.includes(message.author.id)) {
            this.log(`User ${message.author.username} (${message.author.id}) is not a set developer.`, 'notice')
            return;
        }

        else if (Array.isArray(command.guildCollection) && !command.guildCollection.includes(message.guild?.id)) return;

        else if (message.guild) {
            if (command.botPermissions && !command.botPermissions.some(role => message.guild.members.me.permissions.has(role))) {
                this.log(`I lack permission to execute the command ${cmd} on the server ${message.guild.name} (${message.guild.id}).`, 'notice')
                message.reply(`❌ **|** ${message.author} I do not have permission to use this command!`).then(m => setTimeout(() => m?.delete(), 5000)).catch(() => { })
                return;
            }

            if (command.userPermissions && !command.userPermissions.some(role => message.member.permissions.has(role))) {
                this.log(`User ${message.author.username} (${message.author.id}) does not have permission to execute the command ${cmd}.`, 'notice')
                message.reply(`❌ **|** ${message.author} you do not have permission to use this command!`).then(m => setTimeout(() => m?.delete(), 5000))
                return;
            }
        }

        else if (!this.client.cooldown.has(message.author.id)) {
            this.log(`User ${`${message.author.username}`.cyan} ${`(${message.author.id})`.cyan} executed the command ${`'${cmd}'`.bgMagenta} at ${`${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`.blue} on ${`${date}`.blue}`, 'notice')
            command.run(message, args);
        } else {
            this.log(`User ${`${message.author.username}`.cyan} ${`(${message.author.id})`.cyan} hit cooldown with the command ${`'${cmd}'`.bgMagenta}` +
            ` as they attempted to execute it repeatedly.`, 'notice')
            message.reply(`🚫 **|** ${message.author} you are in cooldown, please wait 5 seconds to use commands again.`).then((m) => setTimeout(() => m?.delete(), 5000));
            return;
        }

        await this.client.cooldown.add(message.author.id);
        setTimeout(async () => await this.client.cooldown.delete(message.author.id), 5000);
    }
}
```
