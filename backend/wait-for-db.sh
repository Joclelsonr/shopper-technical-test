#!/bin/sh
set -e

host="$1"
port="$2"
shift 2 # Remove os dois primeiros argumentos (host e port) e deixa o resto para ser executado

echo "Aguardando o banco de dados em $host:$port..."

# Aguarda até que o banco de dados esteja acessível
until nc -z "$host" "$port"; do
  >&2 echo "Banco de dados ainda não disponível - aguardando"
  sleep 1
done

>&2 echo "Banco de dados está pronto - iniciando o backend"
exec "$@" # Executa o comando restante passado ao script
