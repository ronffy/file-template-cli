# file-template-cli

This is a cli command-line tool that allows you to easily batch process duplicate files or folders, using templates to give file names or inject custom data into files

## Install

```shell
npm i file-template-cli -g
```

## Usage

### Mode1

You can run commands on the terminal

```shell
file-template --input=template --output=src --mapping="__name=h6&__Name=H6"
```

#### terminal options

- `-c, --config`(default: `${cwd}/template.config.js` || `${cwd}/template.config.json`) - path to the template config file
- `-i, --input`(default: `${cwd}/template`) - template file path
- `-o, --output`(default: `${cwd}/src`) - source file path
- `-m, --mapping` - mapping data

### Mode2

You can add `template.config.js` or `template.config.json` to the project root directory

project-root

```
+ |- template.config.js
```

or

```
+ |- template.config.json
```

Running commands

```shell
file-template
```

### Mode3

You can also place template.config.json somewhere else, or change it to another name.

project-root

```
+ |- /config
+   |- template.config.json
```

Running commands

```shell
file-template --config=config/template.config.json
```

### template.config.json

```json
{
  "input": "./template",
  "output": "./src",
  "mapping": {
    "__name": "h4",
    "__Name": "H4",
    "__cname": "海1"
  }
}
```
