# Imagem base para o Angular
FROM node:16.14.0 as builder

# Definindo o diretório de trabalho
WORKDIR /ang

COPY . .

FROM nginx:alpine

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY --from=builder /ang/dist/erp-web .

COPY nginx.conf /etc/nginx/conf.d/default.conf

ENTRYPOINT ["nginx", "-g", "daemon off;"]
