# nollama


## Server
```sh
OLLAMA_HOST="0.0.0.0:11434" OLLAMA_ORIGINS="*" ollama serve
```

## Client
```sh
$ export OLLAMA_HOST="http://192.168.1.3:11434"
$ sudo npm install -g nollama
# or
$ npm install -g nollama
# and
$ nollama
```

or

```sh
$ export OLLAMA_HOST="http://192.168.1.3:11434"
$ npx --yes nollama
```
